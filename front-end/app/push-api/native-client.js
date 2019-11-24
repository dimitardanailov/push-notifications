import urlBase64ToUint8Array from './urlBase64ToUint8Array';

class NativeClient {
  constructor(swRegistration) {
    this.swRegistration = swRegistration;
    this.isSubscribed = false;

    this.pushButton = document.getElementById('js-push-btn');
  }

  initializeUI() {
    this.pushButton.addEventListener('click', () => {
      this.pushButton.disabled = true;

      if (this.isSubscribed) {
        this.unsubscribeUser();
      } else {
        this.subscribeUser();
      }
    });

    this.swRegistration.pushManager
      .getSubscription()
      .then(this.setInitialSubscriptionValue.bind(this));
  }

  setInitialSubscriptionValue(subscription) {
    this.isSubscribed = subscription !== null;

    this.updateSubscriptionOnServer(subscription);

    if (this.isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    this.updatePushBtn();
  }

  unsubscribeUser() {
    this.swRegistration.pushManager
      .getSubscription()
      .then(subscription => {
        if (subscription) return subscription;
      })
      .catch(e => {
        console.error('Error unsubscribing', e);
      })
      .then(() => {
        this.updateSubscriptionOnServer(null);

        console.log('User is unsubscribed');
        this.isSubscribed = false;

        this.updatePushBtn();
      });
  }

  subscribeUser() {
    this.swRegistration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.VAPID_PUBLIC_KEY
        ),
      })
      .then(subscription => {
        console.log('User is subscribed', subscription);

        this.updateSubscriptionOnServer(subscription);

        this.isSubscribed = true;

        this.updatePushBtn();
      })
      .catch(err => {
        if (Notification.permission === 'denied') {
          console.warn('Permission for notifications was denied');
        } else {
          console.error('Failed to subscribe the user: ', err);
        }

        this.updatePushBtn();
      });
  }

  updatePushBtn() {
    if (Notification.permission === 'denied') {
      this.pushButton.textContent = 'Push messaging blocked';
      this.pushButton.disabled = true;
      this.updateSubscriptionOnServer(null);
      return;
    }

    if (this.isSubscribed) {
      this.pushButton.textContent = 'Disable Push Messaging';
    } else {
      this.pushButton.textContent = 'Enable Push Messaging';
    }

    this.pushButton.disabled = false;
  }

  // eslint-disable-next-line class-methods-use-this
  updateSubscriptionOnServer(subscription) {
    // Here's where you would send the subscription to the application server
    const subscriptionJson = document.getElementById('js-subscription-json');
    const endpointURL = document.getElementById('js-endpoint-url');
    const subAndEndpoint = document.getElementById('js-endpoint-url');

    if (subscription) {
      subscriptionJson.textContent = JSON.stringify(subscription);
      endpointURL.textContent = subscription.endpoint;
      subAndEndpoint.style.display = 'block';
    } else {
      subAndEndpoint.style.display = 'none';
    }
  }
}

export default NativeClient;
