# Screenclip

A lightweight system tray application built with the Tauri framework, utilizing Rust for backend operations and Vanilla JS for the frontend. The application leverages the DXGI Desktop Duplication API to provide low-latency, direct access to desktop frames, allowing users to video record selected areas of their screen similar to the snipping tool.

## 🌟 FEATURES
- High-Efficiency Captures: Utilizes DXGI Desktop Duplication API for high framerate recordings.

- Optimized for Windows: Crafted specifically for the Windows environment to ensure compatibility and high performance.

## 🛠️ TO DO:

- Incorporate low-level window configurations:

  1. Use `SetPropW()` from the Windows API to [prevent Shell's fullscreen auto-detection](https://github.com/tauri-apps/tauri/issues/7328#issuecomment-1632359368) and ensure taskbar z-order maintains its position even when the window occupies the entire screen.

  2. Use `SetWindowLongPtrA()` from the Windows API to add the `WS_EX_TOOLWINDOW` extended style to the Tauri window. This [prevents videos or streams from pausing](https://github.com/tauri-apps/tauri/issues/7401#issuecomment-1632395258) when a window covers the entire screen.

- Encode raw frames into H264 data.

- Mux the H264 data to mp4.

- Unspaghettify codebase

## 👷 BUILD INSTRUCTIONS
### Using MSYS2 environment
1. Install [NodeJS](https://nodejs.org/en/download).
2. Install Tauri [prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites) (C++ Build Tools, WebView2 and Rust).
3. Install [MSYS2 MinGW64](https://www.msys2.org/#installation).
4. Follow FFmpeg [build instructions](https://github.com/zmwangx/rust-ffmpeg/wiki/Notes-on-building#gnu-toolchain) for the GNU toolchain.
5. When you launch MinGW64, run `pacman -Syu` a few times to update, then run the command `export PATH="/c/Program Files/nodejs/:$PATH"` to add Node.js to the PATH environment variable.
6. Clone this repo: `git clone -b dev --recurse-submodules https://github.com/0Ky/screenclip.git` (must use dev branch and include submodules).
7. Once you're in the cloned folder run `npm install`, then `npm run tauri dev` to run in development mode or `npm run tauri build` to build in release mode.

## ⚠️ WARNING DISCLAIMER

This project is in an experimental and incomplete state, it comes with all the quirks you'd expect. This software is more unpredictable than a cat on a keyboard and it's provided "AS-IS", without the slightest assurance, guarantee, or pinky promise of any kind. Not even the implied warranty that it will work while you’re showcasing it to your boss or during that one crucial presentation.

Use this software or tool entirely at your own discretion and risk. Running or interacting with this program could have unforeseen and potentially adverse consequences, including but not limited to:

* Unexpected system siestas (aka crashes).

* Data could play a vanishing trick, rivaling Houdini’s best. 🎩✨

* An unplanned migration of your data to the digital Bermuda Triangle. And, while we're pushing the envelope, spontaneous combustion.

If you continue using this tool, it means you're brave, perhaps a tad adventurous, and that you fully embrace the digital rodeo ahead. Remember: Always back up your data, wear a virtual helmet, and keep a box of tissues handy. They'll be useful for wiping away tears, be it from laughter or the occasional cry over the code's... uniqueness.

May the tech odds be ever in your favor, knight of the binary realm!
