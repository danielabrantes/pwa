if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Delay registering until page load
    registerSW();
  });
}
// Register the Service Worker
async function registerSW() {
    try {
        const registration =await navigator.serviceWorker.register('/worker.js');
        if (registration.installing) {
            console.log("Service worker installing");
          } else if (registration.waiting) {
            console.log("Service worker installed");
          } else if (registration.active) {
            console.log("Service worker active");
          }
        //worker
        const worker = new Worker("/worker.js");
        worker.onmessage = e => {
        const message = e.data;
        console.log(`[From Worker]: ${message}`);
        const reply = setTimeout(() => worker.postMessage("Marco!"), 60000);
        };
        worker.postMessage("Marco!");
    }
    catch (e) {
    console.log('SW registration failed');
    }
}
