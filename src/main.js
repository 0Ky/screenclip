const { invoke } = window.__TAURI__.tauri;
const { listen } = window.__TAURI__.event;
const { open } = window.__TAURI__.dialog;
const { appDir } = window.__TAURI__.path;
import { Store } from "tauri-plugin-store-api";
import Framework7 from 'framework7/bundle';

console.log("--MAIN.JS RUN");


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
const crfEl = document.querySelector('#crf');
const outputEl = document.querySelector('#outputPath');
const fpsMin = 15;
const fpsMax = 120;

const store = new Store("settings.json");

const fpsStore = await store.get("fps");
const crfStore = await store.get("crf");
const outputStore = await store.get("output");

// load settings
console.log("Load FPS:", fpsStore);
fpsEl.valueAsNumber = fpsStore;

console.log("Load CRF:", crfStore);
app.range.setValue(crfEl, crfStore);

console.log("Load output:", outputStore);
outputEl.value = outputStore;



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
    console.log(typeof inputEl.value);
    await store.set("output", selected);
    await store.save();
  }
});

fpsEl.addEventListener('input', function() {
  console.dir('fps:input');
  if (isNaN(this.valueAsNumber)) {
      this.value = fpsMin;
      return;
  }
  if (parseInt(this.value) > fpsMax) {
      this.value = fpsMax;
  }
});

fpsEl.addEventListener('change', async function() {
  console.dir('fps:change');
  if (parseInt(this.value) < fpsMin) {
      this.value = fpsMin;
  }
  console.log("fps:",this.valueAsNumber);

  await store.set("fps", this.valueAsNumber);
  await store.save();
});

crfEl.addEventListener('range:change', async function() {
  const crf = app.range.getValue(this);
  console.log("crf:", crf);

  await store.set("crf", crf);
  await store.save();
});