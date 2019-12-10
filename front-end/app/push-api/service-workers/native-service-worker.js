import NativeClient from '../NativeClient';

function loadNativeClient(swReg) {
  console.log('[Native:] Service Worker is registered', swReg);

  const client = new NativeClient(swReg);
  client.initializeUI();
}

function serviceWorkerError(e) {
  console.error('Service Worker Error', e);
}

async function loadNativePushNotificationServiceWorker(location) {
  navigator.serviceWorker
    .register(location)
    .then(loadNativeClient)
    .catch(serviceWorkerError);
}

export default loadNativePushNotificationServiceWorker;
