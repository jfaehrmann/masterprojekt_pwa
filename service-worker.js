// set cache name for Cache API
let CACHE_NAME = 'sw-example-v1';

// set urls for the cache storage
let urlsToCache = [
  '/',
  '/index.html',
  '/css/app.css',
  '/js/app.js',
  '/img/lord-of-the-rings.jpg',
  '/img/the-ring.jpg'
];

// install event for the service worker
// with set up for the cache storage
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			console.log('[Service worker] Opened cache');
			return cache.addAll(urlsToCache);
		})
	);
});

// activate event for the service worker
self.addEventListener('activate', (event) => {
	console.log('[Service worker] Activation succesfull, Service Worker is running.')
});

// fetch event for cache storage
// action: response with full cache
// to make web app fully available offline
self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request)
		.then(function(response) {
			if (response) {
				return response;
			}
			return fetch(event.request);
		})
	);
});

// Doing some stuff on automatically notification close
// without user interaction
self.addEventListener('notificationclose', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});

// Doing some stuff on clicked notification close
// and clicked action
self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  var action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('https://jonasfaehrmann.com');
    notification.close();
  }
});

// Example of how to push with Service Worker
self.addEventListener('push', function(e) {
  var options = {
    body: 'This notification was generated from a push!',
    icon: 'images/example.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {action: 'explore', title: 'Explore this new world',
        icon: 'images/checkmark.png'},
      {action: 'close', title: 'Close',
        icon: 'images/xmark.png'},
    ]
  };
  e.waitUntil(
    self.registration.showNotification('Hello world!', options)
  );
});

