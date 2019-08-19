require('dotenv').config()
const webPush = require('web-push')
const pushSubscription = require('./pushSubscription.json')

const options = {
	TTL: 60,
	vapidDetails: {
    subject: `mailto:${process.env.VAPID_EMAIL}`,
    publicKey: process.env.VAPID_PUBLIC_KEY,
    privateKey: process.env.VAPID_PRIVATE_KEY
  }
}

const date = new Date()
const payload = `Push notification: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

webPush.sendNotification(
  pushSubscription,
  payload,
  options
)

console.log(options)

