# Screenclip

[![Visitors Count](https://img.shields.io/endpoint?url=https://hits.dwyl.com/0ky/screenclip.json?color=green&label=visitors)](#)
[![Contributors Count](https://img.shields.io/github/contributors/0ky/screenclip?color=green)](#)
[![GitHub issues](https://img.shields.io/github/issues/0ky/screenclip?color=green)](#)

A lightweight system tray application built with the Tauri framework, utilizing Rust for backend operations and Vanilla JS for the frontend. The application leverages the DXGI Desktop Duplication API to provide low-latency, direct access to desktop frames, allowing users to video record selected areas of their screen similar to the snipping tool.

## 🌟 FEATURES
- High-Efficiency Captures: Utilizes DXGI Desktop Duplication API for high framerate recordings.

- Optimized for Windows: Crafted specifically for the Windows environment to ensure minimal latency and high performance captures.

## 🛠️ TO-DO

*\* The [TO-DO](https://github.com/0Ky/screenclip/blob/dev/TO-DO.md) list can be found in the main branch \**

## 👷 BUILD INSTRUCTIONS
### Using MSYS2 environment on Windows
1. Install [NodeJS](https://nodejs.org/en/download).
2. Install Tauri [prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites) (C++ Build Tools, WebView2 and Rust).
3. Install [MSYS2 MinGW64](https://www.msys2.org/#installation).
4. Update all packages in MinGW64, run `pacman -Syu` a couple of times.
4. In MinGW64 install [Git](https://www.msys2.org/docs/git/) `pacman -S git`.
5. In MinGW64 install Rust compiler `pacman -S mingw-w64-x86_64-rust`.
4. Follow FFmpeg [build instructions](https://github.com/zmwangx/rust-ffmpeg/wiki/Notes-on-building#gnu-toolchain) for the GNU toolchain.
5. Add `export PATH="/c/Program Files/nodejs/:$PATH"` to the end of `.bashrc` file in your home directory of MinGW64.
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
