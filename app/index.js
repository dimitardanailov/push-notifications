if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    loadServiceWorker();

    // unregisterOldVersions();

    getNotificationPermissions();
  });
}

function loadServiceWorker() {
  navigator.serviceWorker
    .register("./service-worker.js")
    .then(registration => {
      console.log("SW registered: ", registration);
    })
    .catch(registrationError => {
      console.log("SW registration failed: ", registrationError);
    });
}

function unregisterOldVersions() {
  console.log("Unregister old service workers");
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (let registration of registrations) {
      registration.unregister().then(unregister => console.log(unregister));
    }
  });
}

function getNotificationPermissions() {
  if (!"Notification" in window) {
    // If the browser version is unsupported, remain silent.
    alert("Browser doesn't support push notifications ...");

    return;
  }

  Notification.requestPermission(status => {
    console.log("Notification permission status:", status);

    if (status === "granted") {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        console.log("reg", reg);
        if ("showNotification" in reg) {
          const { title, options } = getNotificationData();
          console.log("tag:", options.tag);
          reg.showNotification(title, options);
        }
      });
    }
  });
}

function getNotificationData() {
  const title = "New message from Dimitar";
  const options = {
    body: 'Dimitar: "Hello by Bulgaria!"',

    // ...prevent duplicate notifications
    tag: generateUniqueTag(),

    // Actions
    actions: [
      {
        action: "go",
        title: "You have a new message"
      },
      {
        action: "close",
        title: "No thank you"
      }
    ]
  };

  return {
    title,
    options
  };
}

function generateUniqueTag() {
  return "unique-string-" + new Date().toString();
}
