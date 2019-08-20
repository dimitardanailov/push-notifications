import sendNotification from './index'

const pushSubscription = require('./push-notifications-json/chrome.json')
sendNotification(pushSubscription)