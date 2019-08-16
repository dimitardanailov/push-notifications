async function getNotificationPermissions() {
	return new Promise((resolve, reject) => {
		if (!"Notification" in window) {
			// // If the browser version is unsupported, remain silent.
			reject("not-supported")
		}

		Notification.requestPermission(status => {
			if (status === "granted") {
				resolve(status)
			} else {
				reject(status)
			}
		})
	});
}

export default getNotificationPermissions