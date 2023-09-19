# Screenclip

Screenclip is an experimental video snipping tool for Windows. It uses DXGI Desktop Duplication API to capture videos from your screen with ease and efficiency.

# 🌟 Features
- High-Efficiency Captures: Utilizes DXGI Desktop Duplication API for high framerate recordings.

- Optimized for Windows: Crafted specifically for the Windows environment to ensure compatibility and high performance.

# 🛠️ TO DO:

- Incorporate low-level window configurations:

  1. Use `SetPropW()` from the Windows API to [prevent Shell's fullscreen auto-detection](https://github.com/tauri-apps/tauri/issues/7328#issuecomment-1632359368) and ensure taskbar z-order maintains its position even when the window occupies the entire screen.

  2. Use `SetWindowLongPtrA()` from the Windows API to add the `WS_EX_TOOLWINDOW` extended style to the Tauri window. This [prevents videos or streams from pausing](https://github.com/tauri-apps/tauri/issues/7401#issuecomment-1632395258) when a window covers the entire screen.

- Encode raw frames into H264 data.

- Mux the H264 data to mp4.

- Unspaghettify codebase

# ⚠️ WARNING DISCLAIMER

This project is in an experimental and incomplete state, it comes with all the quirks you'd expect. This software is more unpredictable than a cat on a keyboard and it's provided "AS-IS", without the slightest assurance, guarantee, or pinky promise of any kind. Not even the implied warranty that it will work while you’re showcasing it to your boss or during that one crucial presentation.

Use this software or tool entirely at your own discretion and risk. Running or interacting with this program could have unforeseen and potentially adverse consequences, including but not limited to:

* Unexpected system siestas (aka crashes).

* Data could play a vanishing trick, rivaling Houdini’s best. 🎩✨

* An unplanned migration of your data to the digital Bermuda Triangle. And, while we're pushing the envelope, spontaneous combustion.

If you continue using this tool, it means you're brave, perhaps a tad adventurous, and that you fully embrace the digital rodeo ahead. Remember: Always back up your data, wear a virtual helmet, and a box of tissues handy. They'll be useful for wiping away tears, be it from laughter or the occasional cry over the code's... uniqueness.

May the tech odds be ever in your favor, knight of the binary realm!