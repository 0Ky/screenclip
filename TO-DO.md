## 🛠️ TO DO

1. [ ] Incorporate low-level window configurations:

   1- Use `SetPropW()` from the Windows API to [prevent Shell's fullscreen auto-detection](https://github.com/tauri-apps/tauri/issues/7328#issuecomment-1632359368) and ensure taskbar z-order maintains its position even when the window occupies the entire screen.

   2- Use `SetWindowLongPtrA()` from the Windows API to add the `WS_EX_TOOLWINDOW` extended style to the Tauri window. This [prevents videos or streams from pausing](https://github.com/tauri-apps/tauri/issues/7401#issuecomment-1632395258) when a window covers the entire screen.

   3- Using [Windows API](https://github.com/tauri-apps/tauri/issues/3565) disable window opening/closing transitions for the region selection window. 

2. [X] Encode raw frames into H264 data.

3. [X] Mux the H264 data to mp4.

4. [ ] Unspaghettify codebase (code refactoring).

5. [ ] Optimize screen capture via DXGI Desktop Duplication API for performance (minimize frame skip).

6. [ ] Optimize frame encoding for performance (minimize unnecessary operations).

7. [ ] Implement backend integration to control encoder settings from front-end (CRF, Bitrate, Preset, Tune, Profile, and enable Fast Start for playback).

8. [ ] Implement audio capture.

9. [ ] For video capture force height and width region selection area to snap to even numbers (because YUV420 pixel format does not offer precise dimensions).
    
10. [ ] Implement persistent settings (utilize [tauri-plugin-store](https://github.com/tauri-apps/tauri-plugin-store) for persistent key value storage).

11. [ ] Implement customizable hotkeys (video capture Start/Stop, screenshot and quickshot).

12. [ ] Implement a recording controls that's always below the region selection area that provides the option to mute/unmute audio, button to select the entire screen and a record button.

13. [ ] Implement a recording widget that shows elapsed time and a button to stop recording (escape hotkey should also stop recording by default) 

14. [ ] While recording remove the crosshair at the center.

15. [ ] Implement an option to enable snapping video region selection area to common resolutions (144p, 240p, 360p).

16. [ ] Support hardware encoding NVEnc and AMF (Nvidia/AMD GPU encoding).

17. [ ] Implement an option to send image capture to Excalidraw before cropping for sketching.

18. [ ] Show height and width of selected area.

19. [ ] Implement backend integration to process and store the selected output path from the frontend file/directory picker dialog.
