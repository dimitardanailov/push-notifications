console.log("Service worker waking up!");

self.addEventListener("install", () => {
  console.log("Service Worker installed.");
});

self.addEventListener("activate", () => {
  console.log("Service Worker activating.");
});

self.addEventListener("notificationclick", event => {
  console.log("notificationclick ---");

  const notification = event.notification;
  const action = event.action;
  if (action === "close") {
    notification.close();
  } else {
    if (openWindowIsSupported()) {
      clients.openWindow("http://example.com");
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
  return "clients" in self && "openWindow" in self.clients;
}

/**
 * There is also a notificationclose event that is called if the user dismisses one of your notifications
 * (i.e. rather than clicking the notification, the user clicks the cross or swipes the notification away).
 *
 * This event is normally used for analytics to track user engagement with notifications.
 */
self.addEventListener("notificationclose", event => {
  console.log("notificationclose ---");

  const dismissedNotification = event.notification;
  const notificationCloseAnalytics = () => {
    console.log("close analytics function", dismissedNotification);
  };

  const promiseChain = notificationCloseAnalytics();

  event.waitUntil(promiseChain);
});

self.addEventListener("push", event => {
  console.log('push event', event)
  const title = event.data.text();

  event.waitUntil(
    self.registration.showNotification(title)
  )
});
