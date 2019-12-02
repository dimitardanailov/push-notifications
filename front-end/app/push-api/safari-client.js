class SafariPushNotificationClient {
  constructor(websitePushId) {
    this.websitePushId = websitePushId;
  }

  getPermissionData() {
    return window.safari.pushNotification.permission(this.websitePushId);
  }

  checkRemotePermission(permissionData) {
    const checkRemotePermission = params => {
      console.log('Callback checkRemotePermission:', params);
    };

    const data = {
      token: 'my_token',
    };

    if (permissionData.permission === 'default') {
      console.log('permissionData.permission', permissionData.permission);

      window.safari.pushNotification.requestPermission(
        // The web service URL.
        'https://push-notifications-ddanailov.web.app',

        // The web service URL.
        this.websitePushId,

        // Data that you choose to send to your server to help you identify the user.
        data,

        // The callback function.
        checkRemotePermission
      );
    } else if (permissionData.permission === 'denied') {
      // The user said no.
    } else if (permissionData.permission === 'granted') {
      // The web service URL is a valid push provider, and the user said yes.
      // permissionData.deviceToken is now available to use.
      console.log('deviceToken ----', permissionData.deviceToken);
    }
  }
}

export default SafariPushNotificationClient;
