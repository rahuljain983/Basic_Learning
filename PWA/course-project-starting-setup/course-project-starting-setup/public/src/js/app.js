// Navigator is simply browser
// in checks whether property exists in the object or not.
// Checking whether service worker exists in the browser.

// Service workers only works on the pages served by HTTPS (Secure browser) although localhost is an exception.

// register returns a promise.

var deferredPrompt;
if ('serviceWorker' in navigator) {
    // we can limit the scope of  SW by passing an extra second argument
    // navigator.serviceWorker.register('/sw.js' , {scope: '/help/'})
    navigator.serviceWorker.register('/sw.js')
    .then(() => {
        console.log('service worker Registered');
    });
}


window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    deferredPrompt = event;
    return false;
});



