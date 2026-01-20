import webpush from 'web-push'
import { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY } from '$env/static/private'

const publicVapidKey = VAPID_PUBLIC_KEY
const privateVapidKey = VAPID_PRIVATE_KEY

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  publicVapidKey,
  privateVapidKey
)

export async function sendPushNotification(subscription: PushSubscription, payload: any) {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload))
  } catch (error) {
    console.error('Error sending push notification:', error)
  }
}

export { publicVapidKey }
