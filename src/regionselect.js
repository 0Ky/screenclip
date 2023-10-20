const { invoke } = window.__TAURI__.tauri;
const { emit, listen } = window.__TAURI__.event;
const { appWindow } = window.__TAURI__.window;
const { LogicalPosition, LogicalSize } = window.__TAURI__.window;
import { Store } from "tauri-plugin-store-api";
console.log("--REGIONSELECT.JS RUN");
function beep() {
  var snd = new Audio(
    "data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="
  );
  snd.play();
}


(async () => {
  let cropper; // Declare cropper variable outside the event listener


  async function vidKeydownListener(event) {
    if (event.key === "Escape") {
      console.log("Escape key pressed!");
      cropper.destroy();
      document.querySelector("#screenshot").src = "";
      appWindow.hide();
    }

    if (event.key === "Enter" || (event.ctrlKey && event.key === "c")) {
      console.log("Videocap Enter key pressed!");

      const store = new Store("settings.json");
      const fpsStore = await store.get("fps");
      const crfStore = await store.get("crf");
      const outputStore = await store.get("output");

      console.log(outputStore,typeof outputStore);
      
      document.querySelectorAll(".cropper-point").forEach(el => el.classList.add("hide")); //hides points, they were visible when recording
      document.querySelector(".cropper-view-box").style.setProperty('outline', '1px dashed #e21f12', 'important');// changes color to red

      invoke('video_capture', {
        x : cropper.getData(true).x,
        y : cropper.getData(true).y,
        width : cropper.getData(true).width,
        height : cropper.getData(true).height,
        fps : fpsStore,
        crf: crfStore,
        output : outputStore
      });

      document.querySelector("[data-cropper-action='crop']").style.backgroundColor = "transparent";
      document.querySelector("#screenshot").src = "";
      document.querySelector('.cropper-container img').style.display = "none";
      document.querySelector('[alt="The image to preview"]').style.display = "none";

      document.querySelector('.cropper-bg').style.background = "transparent";
      appWindow.setIgnoreCursorEvents(true);
      event.preventDefault();
      // invokeRecord(); // exits region window
    }

  }

  const unlistenCaptureEnded = await listen("videoended", async (event) => {
    appWindow.setIgnoreCursorEvents(false);
    invokeRecord();
  });


  async function keydownListener(event) {
    if (event.key === "Escape") {
      console.log("Escape key pressed!");
      cropper.destroy();
      document.querySelector("#screenshot").src = "";
      appWindow.hide();
    }

    if (event.key === "Enter" || (event.ctrlKey && event.key === "c")) {
      console.log("Enter key pressed!");
      event.preventDefault();
      copyToClipboard();
    }

  }

  function dblclickListener(event, from) {
    if (from === "videocap") {
      console.log("Videocap DoubleClick key pressed!");
      event.preventDefault();
      // invoke('video_capture', {invokeMessage:{x:x, y:y, width:width, height:height}});
      invokeRecord(); // exits region window

    } else {
      console.log("DoubleClick key pressed!");
      event.preventDefault();
      copyToClipboard();
    }

  }

  async function invokeRecord() {
    console.log("invokeRecord Function run");

    cropper.destroy();
    document.querySelector("#screenshot").src = "";
    await appWindow.setPosition(new LogicalPosition(-1, 0));
    await appWindow.hide();
  }


  async function copyToClipboard() {
    // appWindow.setSkipTaskbar(true);
    console.log("copyToClipboard Function run");
    cropper.getCroppedCanvas().toBlob((blob) => {
      navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ]);
    });
    cropper.destroy();
    document.querySelector("#screenshot").src = "";
    await appWindow.setPosition(new LogicalPosition(-1, 0));
    // await appWindow.setFullscreen(false);
    // await new Promise(resolve => setTimeout(resolve, 1500));
    await appWindow.hide();
    // appWindow.minimize();
  }


  const unlistenVideocapture = await listen("videocapture", async (event) => {

    console.log("videocapture Emitted from backend!");
    // document.querySelector("#screenshot").src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    document.querySelector("#screenshot").src = `data:image/png;base64,${event.payload}`;
    const image = document.getElementById("screenshot");

    if (cropper) {
      console.log("Cropper Destroyed!");
      cropper.destroy();
    }

    cropper = new Cropper(image, {
      modal: true,
      guides: false,
      autoCrop: false,
      highlight: false,
      toggleDragModeOnDblclick: false,
      ready: async function () {
        console.log("videocapture - Cropper target image has been loaded and the cropper instance is ready");
        document.querySelector("[data-cropper-action='crop']").classList.add("cropper-modal");
        // document.querySelector("[data-cropper-action='crop']").style.backgroundColor = "transparent";
        // let keydownListenerWithContext = (e) => keydownListener(e, "videocap");
        // let dblclickListenerWithContext = (e) => dblclickListener(e, "videocap");

        document.removeEventListener("dblclick", dblclickListener);
        document.removeEventListener("keydown", keydownListener);

        document.removeEventListener("keydown", vidKeydownListener);
        document.addEventListener("keydown", vidKeydownListener);

        // add double click, add remove it from other unlistens.

        // document.removeEventListener("dblclick", dblclickListener);
        // document.addEventListener("dblclick", dblclickListener);

        // await appWindow.setSize(new LogicalSize(500, 500));
        await appWindow.setPosition(new LogicalPosition(0, 0));
        // await new Promise(resolve => setTimeout(resolve, 100));
        await appWindow.show();

        // appWindow.setSize(new LogicalSize(2560, 1440));
        await appWindow.setFocus();
      },
      cropend: function (event) {


        console.log("videocapture - Crop box stopped moving!");
        // console.log(event.detail.originalEvent.type);
        // if (event.detail.originalEvent.type === "pointerdown") {
        // document.querySelector("[data-cropper-action='crop']").classList.remove("cropper-modal")
        //   // copyToClipboard();
        // }
      },
      cropstart: function (event) {
        if (event.detail.action === "crop") {
          // copyToClipboard();
        }
      },
    });
  });


  const unlistenScreenshot = await listen("screenshot-data", async (event) => {
    console.log("Emitted from backend!");
    document.querySelector("#screenshot").src = `data:image/png;base64,${event.payload}`;
    const image = document.getElementById("screenshot");

    if (cropper) {
      console.log("Cropper Destroyed!");
      cropper.destroy();
    }

    cropper = new Cropper(image, {
      modal: true,
      guides: false,
      autoCrop: false,
      highlight: false,
      toggleDragModeOnDblclick: false,
      ready: async function () {
        console.log("Cropper target image has been loaded and the cropper instance is ready");
        document.querySelector("[data-cropper-action='crop']").classList.add("cropper-modal");

        document.removeEventListener("keydown", vidKeydownListener);

        document.removeEventListener("keydown", keydownListener);
        document.addEventListener("keydown", keydownListener);

        document.removeEventListener("dblclick", dblclickListener);
        document.addEventListener("dblclick", dblclickListener);

        await appWindow.setPosition(new LogicalPosition(0, 0));
        // await new Promise(resolve => setTimeout(resolve, 100));
        await appWindow.show();

        // appWindow.setSize(new LogicalSize(2560, 1440));
        await appWindow.setFocus();
      },
      cropend: function () {
        console.log("Crop box stopped moving!");
      },
    });
  });

  const unlistenQuickshot = await listen("quickshot-data", async (event) => {
    console.log("Emitted from backend!");
    document.querySelector("#screenshot").src = `data:image/png;base64,${event.payload}`;
    const image = document.getElementById("screenshot");

    if (cropper) {
      console.log("Cropper Destroyed!");
      cropper.destroy();
    }

    cropper = new Cropper(image, {
      modal: true,
      guides: false,
      autoCrop: false,
      highlight: false,
      toggleDragModeOnDblclick: false,
      ready: async function () {
        console.log("Cropper target image has been loaded and the cropper instance is ready");
        document.querySelector("[data-cropper-action='crop']").classList.add("cropper-modal");
        // Remove the keydown, dblclick, and mouseup listeners
        document.removeEventListener("keydown", vidKeydownListener);
        document.removeEventListener("keydown", keydownListener);
        document.removeEventListener("dblclick", dblclickListener);

        // appWindow.setFullscreen(true);

        await appWindow.setPosition(new LogicalPosition(0, 0));
        // await appWindow.setSize(new LogicalSize(2560, 1440));
        // await new Promise(resolve => setTimeout(resolve, 2000));
        await appWindow.show();
        await appWindow.setFocus();

      },
      cropend: function (event) {
        console.log("Cropper end!");
        if (event.detail.originalEvent.type === "pointerup") {
          copyToClipboard();
        }
      },
    });
  });


})();

