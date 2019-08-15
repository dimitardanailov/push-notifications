console.log("Service worker waking up!");

self.addEventListener("install", function(event) {
  console.log('Service Worker installed.');
});

self.addEventListener("activate", function(event) {
  console.log("Service Worker activating.");
});

window.addEventListener('notificationclick', event => {
	console.log('notificationclick')

	const notification = event.notification
	const action = event.action
	if (action === 'close') {
		notification.close();
	} else {
		if (openWindowIsSupported()) {
			clients.openWindow('http://www.exapmple.com')
		}
	}
});

/**
 * OpenWindow is supported by:
 * - Google Chrome -> 40
 * - Firefox -> 45 * (Notes Service workers (and Push) have been disabled in the Firefox 45 & 52 Extended Support Releases (ESR).)
 * - Opera -> 38
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/Clients/openWindow
 */
function openWindowIsSupported() {
	return ('clients' in self && 'openWindow' in self.clients)
}


