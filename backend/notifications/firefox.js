import sendNotification from './index'

const pushSubscription = require('./push-notifications-json/firefox.json')
sendNotification(pushSubscription)