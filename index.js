const title = "New message from Dimitar";
const options = {
  body: 'Dimitar: "Hello by Bulgaria!"',

  // ...prevent duplicate notifications
  tag: "unique string",

  // Actions
  actions: [
    {
      action: "go",
      title: "Go to the site"
    },
    {
      action: "close",
      title: "No thank you"
    }
  ]
};

if ("serviceWorker" in navigator) {
  console.log("Service worker is supported ...");

  navigator.serviceWorker
    .register("sw.js")
    .then(registration => {
      console.log("registration was added ...");
    })
    .catch(err => {
      // Registration failed :(
      console.error("Registration failed", err);
    });

  displayNotifications();

  unregisterOldVersions();
}

function unregisterOldVersions() {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (let registration of registrations) {
      registration.unregister().then(unregister => console.log(unregister));
    }
  });
}

function displayNotifications() {
  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      reg.showNotification("Hello world!");
    });
  }
}

/*
function notify() {
  console.log("Safari Notify .....");

  if (!"Notification" in window) {
    // If the browser version is unsupported, remain silent.
    alert("Browser doesn't support push notifications ...");

    return;
  }

  // Log current permission level
  console.log("Notification permission:", Notification.permission);

  // If the user has not been asked to grant or deny notifications
  // from this domain...
  if (Notification.permission === "default") {
    Notification.requestPermission(function() {
      // ...callback this function once a permission level has been set.
      notify();
    });
  }
  // If the user has granted permission for this domain to send notifications...
  else if (Notification.permission === "granted") {
    const title = "New message from Dimitar";
    const n = new Notification(title, {
      body: 'Dimitar: "Hello by Bulgaria!"',
      // ...prevent duplicate notifications
      tag: "unique string"
    });

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
  // If the user does not want notifications to come from this domain...
  else if (Notification.permission === "denied") {
    // ...remain silent.
    return;
  }
}

notify();
*/