const { invoke } = window.__TAURI__.tauri;
const { listen } = window.__TAURI__.event;
const { open } = window.__TAURI__.dialog;
const { appDir } = window.__TAURI__.path;

var app = new Framework7({
    darkMode: 'auto',
    theme: 'ios',
    // App root element
    el: '#app',
    // App Name
    name: 'Screenclip',
    // Enable swipe panel
    panel: {
      swipe: true,  
    },
    colors: {
        bg: '#ff0000'
      },
    // Add default routes
    routes: [
      {
        path: '/about/',
        url: 'about.html',
      },
    ],
    // ... other parameters
});

var mainView = app.views.create('.view-main');


async function selectPath(path) {
  const selected = await open({
    directory: true,
    multiple: false,
    defaultPath: await appDir(),
  });
  if (Array.isArray(selected)) {
    // user selected multiple directories
  } else if (selected === null) {
    // user cancelled the selection
  } else {
    // user selected a single directory
    path.value = selected;
  }
}


// window.addEventListener("DOMContentLoaded", () => {

 
// });
