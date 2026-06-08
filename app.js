// Register the Service Worker (the background worker)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(reg => console.log('Service Worker Registered!', reg))
    .catch(err => console.error('Service Worker Registration Failed', err));
}

const enableBtn = document.getElementById('enable-btn');
const intervalSelect = document.getElementById('interval');

enableBtn.addEventListener('click', async () => {
    // Request permission from the user
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
        alert('Awesome! Notifications are enabled.');
        
        // Send the chosen timing interval to the background worker
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                action: 'startInterval',
                minutes: parseInt(intervalSelect.value)
            });
        }
    } else {
        alert('Permission denied. Please enable notifications in your browser settings.');
    }
});
