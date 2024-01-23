// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{
        AppHandle, Manager, CustomMenuItem, SystemTray, SystemTrayEvent, RunEvent, 
        SystemTrayMenu, SystemTrayMenuItem, SystemTraySubmenu, Window, GlobalShortcutManager,
        PhysicalPosition
};
use tauri_plugin_positioner::{WindowExt, Position};
use window_shadows::set_shadow;
use std::time::{Duration, Instant};
use std::error::Error;
use std::path::PathBuf;
use tokio::time::sleep;
use std::fs;
use base64::encode;
use windows::Win32::Foundation::POINT;
use windows::Win32::UI::WindowsAndMessaging::GetCursorPos;
use win_desktop_duplication::*;
use win_desktop_duplication::{tex_reader::*, devices::*};
use display_info::DisplayInfo;
use screenshots::Screen;
use video_rs::{Encoder, EncoderSettings, Locator, Options, PixelFormat, RawFrame, Time};
use anyhow::Result;
use ndarray::Array3;
use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use tauri_plugin_store::StoreBuilder;
use tauri_plugin_log::{LogTarget};

fn encode_frames(output_directory: &str, frames: Vec<Vec<u8>>, width: u32, height: u32, fps_store: u32, crf_store: u32) -> Result<()> {
    println!("Encoding...");
    video_rs::init().expect("Could not init video.");
    fs::create_dir_all(output_directory)?;
    let mut destination = PathBuf::from(output_directory);
    destination.push(&format!("video-new.mp4"));
    let destination: Locator = destination.into();
    let mut custom_opts = HashMap::new();
    custom_opts.insert("preset".to_string(), "veryfast".to_string());
    custom_opts.insert("crf".to_string(), crf_store.to_string());
    let encoder_options: Options = Options::new_from_hashmap(&custom_opts);
    let settings = EncoderSettings::for_h264_custom(width as usize, height as usize, PixelFormat::YUV420P, encoder_options);
    let mut encoder = Encoder::new(&destination, settings).expect("failed to create encoder");
    let duration: Time = Time::from_nth_of_a_second(fps_store as usize);
    let mut position = Time::zero();

    for frame_data in frames {
        let shape = (height as usize, width as usize, 4);
        let frame_array = Array3::from_shape_vec(shape, frame_data).expect("Failed to convert Vec<u8> to Array3<u8>");
        encoder.encode(&frame_array, &position)?;
        position = position.aligned_with(&duration).add();
    }

    encoder.finish()?;
    Ok(())
}

async fn capture_frames(dupl: &mut DesktopDuplicationApi, x: u32, y: u32, width: u32, height: u32, fps: u32,  recording: Arc<Mutex<bool>>) -> Result<Vec<Vec<u8>>> {
    let (device, ctx) = dupl.get_device_and_ctx();
    let mut texture_reader = TextureReader::new(device, ctx);
    let mut frames: Vec<Vec<u8>> = vec![];
    let frame_interval = Duration::from_secs_f32(1.0 / fps as f32);
    let mut last_display_time = Duration::new(0, 0);
    let start_time = Instant::now();
    let mut next_frame_time = start_time + frame_interval;
    while !*recording.lock().unwrap() {
        let tex = dupl.acquire_next_vsync_frame().await;
        if Instant::now() >= next_frame_time && tex.is_ok() {
            let mut pic_data: Vec<u8> = vec![0; (width * height * 4) as usize];
            texture_reader.get_data(&mut pic_data, &tex.unwrap(), x, y, width, height).unwrap();
            frames.push(pic_data);
            next_frame_time += frame_interval;
        }
    }
    Ok(frames)
}

async fn capture_video(x: u32, y: u32, width: u32, height: u32, fps_store: u32, crf_store: u32, output_store: &str, app: &AppHandle, state: Arc<Mutex<bool>>) {
    let width = if width % 2 != 0 { width - 1 } else { width };
    let height = if height % 2 != 0 { height - 1 } else { height };
    set_process_dpi_awareness();
    co_init();
    let adapter = AdapterFactory::new().get_adapter_by_idx(0).unwrap();
    let output = adapter.get_display_by_idx(0).unwrap();
    let display_mode = output.get_current_display_mode().unwrap();
    let mut dupl = DesktopDuplicationApi::new(adapter, output).unwrap();
    match capture_frames(&mut dupl, x, y, width, height, fps_store, state).await {
        Ok(frames) => {
            match encode_frames(output_store, frames, width, height, fps_store, crf_store) {
                Ok(()) => {
                    println!("Video capture and encoding successful.");
                    let window = app.get_window("regionselectWindow").unwrap();
                    window.emit("videoended", "").unwrap();
                },
                Err(e) => println!("Error during encoding: {:?}", e),
            }
        },
        Err(e) => println!("Error during frame capture: {:?}", e),
    }
}

#[tauri::command]
fn video_capture(x: u32, y: u32, width: u32, height: u32, fps: u32, crf: u32, output: &str, app_handle: tauri::AppHandle, state: tauri::State<AppState>) {
    let output_store_cloned = output.to_string();
    println!("X {}, Y {}, WIDTH {}, HEIGHT {}, FPS {}, CRF {}, OUTPUT PATH {}", x,y,width,height,fps,crf,&output_store_cloned);

    let recording = state.recording.clone();
    tauri::async_runtime::spawn(async move {
        capture_video(x, y, width, height, fps, crf, &output_store_cloned, &app_handle, recording).await;
    });
}

// fn excalidraw_window(app: &AppHandle) {
//     let window = app.get_window("regionselectWindow").unwrap();
// }

fn mouse_location() -> (i32, i32) {
    let mut point = POINT { x: 0, y: 0 };
    let result = unsafe { GetCursorPos(&mut point) };
    if result.as_bool() {
      (point.x, point.y)
    } else {
      (0, 0)
    }
}

fn region_selection_window(app: &AppHandle) {
    let (pos_x, pos_y) = mouse_location();
    println!("{:?},{:?} ", pos_x, pos_y);
    let display_info = DisplayInfo::from_point(pos_x as i32, pos_y as i32).unwrap();
    println!("display_info {display_info:?}");
    let screen = Screen::new(&display_info);
    let image = screen.capture().unwrap();
    let buffer = image.to_png().unwrap();
    let base64_string = encode(&buffer);
    let window = app.get_window("regionselectWindow").unwrap();

    window.set_position(tauri::LogicalPosition{ x:1, y:0 });
    window.set_size(tauri::LogicalSize{ width: display_info.width, height: display_info.height });
    window.emit("screenshot-data", base64_string).unwrap();
}

fn region_quick_capture(app: &AppHandle) {
    let (pos_x, pos_y) = mouse_location();
    println!("{:?},{:?} ", pos_x, pos_y);
    let display_info = DisplayInfo::from_point(pos_x as i32, pos_y as i32).unwrap();
    println!("display_info {display_info:?}");
    let screen = Screen::new(&display_info);
    let image = screen.capture().unwrap();
    let buffer = image.to_png().unwrap();
    let base64_string = encode(&buffer);
    let window = app.get_window("regionselectWindow").unwrap();

    window.set_position(tauri::LogicalPosition{ x:1, y:0 });
    window.set_size(tauri::LogicalSize{ width: display_info.width, height: display_info.height });
    window.emit("quickshot-data", base64_string).unwrap();
}

fn region_video_capture(app: &AppHandle)  {
    let (pos_x, pos_y) = mouse_location();
    println!("{:?},{:?} ", pos_x, pos_y);
    let display_info = DisplayInfo::from_point(pos_x as i32, pos_y as i32).unwrap();
    println!("display_info {display_info:?}");
    let screen = Screen::new(&display_info);
    let image = screen.capture().unwrap();
    let buffer = image.to_png().unwrap();
    let base64_string = encode(&buffer);
    let window = app.get_window("regionselectWindow").unwrap();
    
    window.set_position(tauri::LogicalPosition{ x:1, y:0 });
    window.set_size(tauri::LogicalSize{ width: display_info.width, height: display_info.height });
    window.emit("videocapture", base64_string).unwrap();
}

fn tray_events(app: &AppHandle, event: SystemTrayEvent) {
    tauri_plugin_positioner::on_tray_event(app, &event);
    match event {
        SystemTrayEvent::MenuItemClick { id, .. } => {
            let item_handle = app.tray_handle().get_item(&id);
            dbg!(&id);
            match id.as_str() {
                "open-settings" => {
                    let window = app.get_window("main").unwrap();

                    let _ = window.move_window(Position::TrayCenter);
                    let current_position = window.outer_position().unwrap();
                    let offset_position = PhysicalPosition {
                        x: current_position.x - 18,
                        y: current_position.y - 12,
                    };
                    let _ = window.set_position(tauri::Position::Physical(offset_position));
                    // let _ = window.move_window(Position::TrayCenter);

                    #[cfg(any(windows, target_os = "windows"))]
                    set_shadow(&window, true).unwrap();
                    window.show();
                }
                "capture-video" => {
                    region_video_capture(app)
                    // tauri::async_runtime::spawn(async move {
                    //     capture_video().await;
                    // });
                },
                "capture-screen" => region_selection_window(app),
                "capture-quick" => region_quick_capture(app),
                "quit" => app.exit(0),
                _ => {}
            }
        }
        _ => {}
    }
}

#[derive(Clone)]
struct AppState {
    recording: Arc<Mutex<bool>>,
}

fn main() {
    
    let sub_menu_capture = {
        let mut menu = SystemTrayMenu::new();
        menu = menu
            .add_item(CustomMenuItem::new("capture-video".to_string(),"Video clip",))
            .add_item(CustomMenuItem::new("capture-screen".to_string(), "Screenshot"))
            .add_item(CustomMenuItem::new("capture-quick".to_string(), "Quickshot"));
        SystemTraySubmenu::new("Capture", menu)
    };

    let tray_menu = SystemTrayMenu::new()
        .add_submenu(sub_menu_capture)
        .add_item(CustomMenuItem::new("open-settings".to_string(), "Settings"))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("quit".to_string(), "Quit"));

    let tray = SystemTray::new().with_menu(tray_menu);

    // Create a Mutex of hashmaps for containg hotkeys and their respective states
    // Spawn a thread with Hotkeys crate and make changes to hotkeys
    // Find a way to access the hashmap from the tuari thread

    let app_state = AppState {
                        recording: Arc::new(Mutex::new(false))
                    };
    tauri::Builder::default()
        .manage(app_state.clone())
        .setup(|app| {

            let default_settings = HashMap::from([
                ("fps".to_string(), 60.into()),
                ("crf".to_string(), 18.into()),
                ("output".to_string(), "../output".into()),
            ]);
            let settings = StoreBuilder::new(app.handle(), "settings.json".parse()?)
            .defaults(default_settings)
            .build();


           let app_handle = app.handle();
                   
            std::thread::spawn(move || {
                app_handle.plugin(tauri_plugin_store::Builder::default()
                    .stores([settings])
                    .freeze()
                    .build(),
                )
            });

            let region_select_window = tauri::WindowBuilder::new(
                app,
                "regionselectWindow",
                tauri::WindowUrl::App("regionselect.html".into())
            )
            .title("Screenclip - Region Capture")
            .always_on_top(true)
            .visible(false)
            .focused(false)
            .resizable(false)
            .decorations(false)
            .skip_taskbar(true)
            .transparent(true)
            .disable_file_drop_handler()
            .build()
            .unwrap();
            region_select_window.open_devtools();

            let excalidraw_window = tauri::WindowBuilder::new(
                app,
                "editWindow",
                tauri::WindowUrl::App("screenshot.html".into())
            )
            .title("Screenclip - Excalidraw")
            .always_on_top(true)
            .visible(false)
            .focused(false)
            .resizable(false)
            .decorations(false)
            .skip_taskbar(false)
            .transparent(false)
            .disable_file_drop_handler()
            .build()
            .unwrap();
          
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![video_capture])
        // .plugin(tauri_plugin_log::Builder::default().targets([
        //     LogTarget::LogDir,
        //     LogTarget::Stdout,
        //     LogTarget::Webview,
        // ]).build())
        .plugin(tauri_plugin_positioner::init())
        .system_tray(tray)
        .on_system_tray_event(tray_events)
        .on_window_event(|event| {
            if let tauri::WindowEvent::Resized(_) = event.event() {
                std::thread::sleep(std::time::Duration::from_nanos(1));
            }
            if let tauri::WindowEvent::Focused(false) = event.event() {
                // event.window().hide().unwrap();
            }
        })
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(move |app_handle, event|{
           match event {
            RunEvent::Ready => {
                let app_handle = app_handle.clone();
                let app_handle2 = app_handle.clone();
                let app_statei = app_state.clone();
                app_handle
                .global_shortcut_manager()
                .register("CommandOrControl+Shift+D", move || {
                    region_selection_window(&app_handle);
                    println!("FIRED");
                }); // Handle hotkey register error, else it will panic
                app_handle2                
                    .global_shortcut_manager()
                    .register("CommandOrControl+Shift+R", move || {
                    let mut a=app_statei.recording.lock().unwrap(); 
                    if *a {
                         *a = !*a;       
                    } else {
                        region_video_capture(&app_handle2);
                        *a=true;
                    }
                })
                .unwrap();
                print!("Ready and registered");
            }
            tauri::RunEvent::ExitRequested { api, .. } => {
                api.prevent_exit();
            }
            _ => {}
          }
        });

    print!("This is text");
}
