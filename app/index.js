if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // unregisterOldVersions();

    // loadServiceWorker();

    getNotificationPermissions();
  });
}

function loadServiceWorker() {
  navigator.serviceWorker
    .register("/sw.js")
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
        const { title, options } = getNotificationData();
        console.log("tag:", options.tag);
        if ("showNotification" in reg) {
          reg.showNotification(title, options);
        } else {
          createNewNotificationMessage();
        }
      });
    }
  });
}

function createNewNotificationMessage() {
  const { title, options } = getNotificationData();
  const n = new Notification(title, options);

  n.onshow = function() {
    console.log("on show message ...");
  };

  // Remove the notification from Notification Center when clicked.
  n.onclick = function() {
    console.log(
      "Remove the notification from Notification Center when clicked."
    );
    this.close();
  };
  // Callback function when the notification is closed.
  n.onclose = function() {
    console.log("Notification closed");
  };
}

function getNotificationData() {
  const title = "New message from Dimitar";
  const options = {
    body: "Dimitar: I'm a developer",

    // ...prevent duplicate notifications
    tag: generateUniqueTag(),

    data: {
      // Lets us identity notification
      primaryKey: 1
    },

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
