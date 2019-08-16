async function getNotificationPermissions() {
  return new Promise(resolve => {
    // If the user has not been asked to grant or deny notifications
    if (Notification.permission === "default") {
      resolve("default");
    } else if (Notification.permission === "granted") {
      resolve("granted");
    }
    // If the user does not want notifications to come from this domain...
    else if (Notification.permission === "denied") {
      resolve("denied");
    }
  });
}

export default getNotificationPermissions;
