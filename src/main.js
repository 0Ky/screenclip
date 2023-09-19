const { invoke } = window.__TAURI__.tauri;
const { listen } = window.__TAURI__.event;


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



// window.addEventListener("DOMContentLoaded", () => {

 
// });
