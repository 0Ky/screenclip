const { invoke } = window.__TAURI__.tauri;
const { listen } = window.__TAURI__.event;
const { open } = window.__TAURI__.dialog;
const { appDir } = window.__TAURI__.path;
import { Store } from "tauri-plugin-store-api";
import Framework7 from 'framework7/bundle';

const app = new Framework7({
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

const mainView = app.views.create('.view-main');

const fpsEl = document.querySelector('#fps');
const outputEl = document.querySelector('#outputPath');
const fpsMin = 15;
const fpsMax = 120;

outputEl.addEventListener('click', async function(event) {
  const inputEl = event.target;
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
    inputEl.value = selected;
  }
});

fpsEl.addEventListener('input', function() {
    if (isNaN(this.valueAsNumber)) {
        this.value = fpsMin;
        return;
    }
    if (parseInt(this.value) > fpsMax) {
        this.value = fpsMax;
    }
});

fpsEl.addEventListener('change', function() {
    console.dir('onchange');
    if (parseInt(this.value) < fpsMin) {
        this.value = fpsMin;
    }
});