const { invoke } = window.__TAURI__.tauri;
const { listen } = window.__TAURI__.event;
const { appWindow } = window.__TAURI__.window;

(async () => {
  const unlisten = await listen("croppedImage", (event) => {
    //add focus as well
     appWindow.setFullscreen(true);
    appWindow.show();

    let img = new Image();
    img.onload = function () {
      let height = this.height;
      let width = this.width;
      // then you would use these dimensions in your Excalidraw component

      const App = () => {
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(ExcalidrawLib.Excalidraw, {
            theme: "light",
            isCollaborating: false,
            UIOptions: {
              canvasActions: {
                saveToActiveFile: false,
                toggleTheme: true,
                clearCanvas: false,
                changeViewBackgroundColor: true,
                loadScene: false,
              },
            },
            initialData: {
              elements: [
                {
                  type: "image",
                  width: width,
                  height: height,
                  locked: false,
                  fileId: "initial_image",
                  scale: [1, 1],
                },
              ],
              files: {
                initial_image: {
                  mimeType: "image/png",
                  id: "initial_image",
                  dataURL: event.payload.theMessage,
                  quality: 1,
                  exportPadding: 0
                },
              },
            },
            appState: {
              // viewBackgroundColor: "red",
            },
            scrollToContent: true
            
          })
        );
      };

      const excalidrawWrapper = document.getElementById("app");
      const root = ReactDOM.createRoot(excalidrawWrapper);
      root.render(React.createElement(App));
    };
    img.src = event.payload.theMessage;
  });
})();
