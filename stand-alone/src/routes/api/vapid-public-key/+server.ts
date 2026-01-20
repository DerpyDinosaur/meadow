import { json } from '@sveltejs/kit'
import { publicVapidKey } from '$lib/server/push'

export function GET() {
  return json({ publicKey: publicVapidKey })
}
