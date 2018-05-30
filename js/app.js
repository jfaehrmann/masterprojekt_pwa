// Ask for notification permission and log the result to the console
Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
});

// Display a simple notification with 
// notification body, icon and other stuff.
function displayNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(registration) {
      let options = {
        body: 'Here is a notification body!',
        icon: 'img/the-ring.jpg',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {action: 'explore', title: 'Explore this new world',
            icon: 'images/checkmark.png'},
          {action: 'close', title: 'Close notification',
            icon: 'images/xmark.png'},
        ]
      };
      registration.showNotification('Hello world!', options);
    });
  }
}

function subscribeUser() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function(registration) {

      registration.pushManager.subscribe({
        userVisibleOnly: true
      }).then(function(sub) {
        console.log('Endpoint URL: ', sub.endpoint);
      }).catch(function(e) {
        if (Notification.permission === 'denied') {
          console.warn('Permission for notifications was denied');
        } else {
          console.error('Unable to subscribe to push', e);
        }
      });
    })
  }
}