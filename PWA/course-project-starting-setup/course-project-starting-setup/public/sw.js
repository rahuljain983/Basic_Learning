self.addEventListener('install', (event) => {
    console.log('[Service worker] installing SW', event);
});

self.addEventListener('activate', (event) => {
    console.log('[Service worker] activating SW', event);
    return self.clients.claim();
});

// Life cycle events install and activate are triggered by the browser.

// Non-Life cycle events

self.addEventListener('fetch', (event) => {
    console.log('[Service worker] Fetching something...', event);
    // allows to overwrite the data that is sent back.
    event.respondWith(fetch(event.request));
});