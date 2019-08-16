/**
 * The API for getting permission is relatively simple, 
 * the downside is that the API recently changed from taking a callback to returning a Promise. 
 * The problem with this, is that we can't tell what version of 
 * the API is implemented by the current browser, so you have to implement both and handle both.
 */
function askPermission() {
  return new Promise((resolve, reject) => {
    const permissionResult = Notification.requestPermission(result => {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  }).then(permissionResult => {
    if (permissionResult !== "granted") {
      console.log("We weren't granted permission.");
    }
  });
}

export default askPermission;
