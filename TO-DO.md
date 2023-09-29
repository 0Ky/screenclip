## 🛠️ TO DO

### **Fix:**
1. [ ] Incorporate low-level window configurations:

   1- Use `SetPropW()` from the Windows API to [prevent Shell's fullscreen auto-detection](https://github.com/tauri-apps/tauri/issues/7328#issuecomment-1632359368) and ensure taskbar z-order maintains its position even when the window occupies the entire screen.

   2- Use `SetWindowLongPtrA()` from the Windows API to add the `WS_EX_TOOLWINDOW` extended style to the Tauri window. This [prevents videos or streams from pausing](https://github.com/tauri-apps/tauri/issues/7401#issuecomment-1632395258) when a window covers the entire screen.

   3- Using [Windows API](https://github.com/tauri-apps/tauri/issues/3565) disable window opening/closing transitions for the region selection window.

2. [ ] While recording remove the crosshair at the center.
3. [ ] Handle errors properly (eg. hotkey register conflict)
4. [ ] For video capture force height and width region selection area to snap to even numbers (because YUV420 pixel format does not offer precise dimensions).
5. [ ] Implement default values for input fields in the settings, ensuring a seamless user experience for first-time users.

### **Feature:**
6. [X] Encode raw frames into H264 data.
7. [X] Mux the H264 data to mp4.
8. [ ] Implement audio capture.
9. [ ] Implement persistent settings (utilize [tauri-plugin-store](https://github.com/tauri-apps/tauri-plugin-store) for persistent key value storage).
10. [ ] Implement customizable hotkeys (video capture Start/Stop, screenshot and quickshot).
11. [ ] Implement a recording controls that's always below the region selection area that provides the option to mute/unmute audio, button to select the entire screen and a record button.
12. [ ] Implement a recording widget that shows elapsed time and a button to stop recording (escape hotkey should also stop recording by default) 
13. [ ] Implement an option to enable snapping video region selection area to common resolutions (144p, 240p, 360p).
14. [ ] Support hardware encoding NVEnc and AMF (Nvidia/AMD GPU encoding).
15. [ ] Implement an option to send image capture to Excalidraw before cropping for sketching.
16. [ ] Show height and width of selected area.
17. [ ] Implement backend integration to process and store the selected output path from the frontend file/directory picker dialog.
18. [ ] Implement backend integration to control encoder settings from front-end (CRF, Bitrate, Preset, Tune, Profile, and enable Fast Start for playback).

### **Performance:**
19. [ ] Optimize screen capture via DXGI Desktop Duplication API for performance (minimize frame skip).
20. [ ] Optimize frame encoding for performance (minimize unnecessary operations).

### **Chore:**
21. [ ] Unspaghettify codebase (code refactoring).

### **Refactor:**
22. [ ] Refactor thread spawning, ensuring complete async integration, addressing synchronization, errors, blocking, concurrency, and back-pressure.

### **Style:**
23. [ ] Improve the frontend UI design (HTML/JS/CSS)
24. [ ] Update the color scheme to support both light and dark modes, aligning with OS preferences and enhancing readability and contrast.
25. [ ] Redesign the navigation bar for a more intuitive user experience, emphasizing key features.
26. [ ] Reorganize the overall layout to prioritize user flow and ease of access to main features.
27. [ ] Streamline styles and UI components for consistency across all pages/modules.
28. [ ] Introduce new input fields as necessary, ensuring they're intuitive and user-friendly. Coordinate with backend for integration, and if corresponding functionality doesn't exist, implement it.
29. [ ] Implement interactive tooltips or helper guides for new input fields to assist users.
