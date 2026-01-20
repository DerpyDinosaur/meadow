import { getTodos, addTodo, toggleTodo, deleteTodo, addSubscription, getSubscriptions } from '$lib/server/todos'
import { sendPushNotification } from '$lib/server/push'

export async function load() {
  return {
    todos: getTodos()
  }
}

export const actions = {
  add: async ({ request }) => {
    const data = await request.formData()
    const text = data.get('text') as string
    if (text) {
      const todo = addTodo(text)

      // Send push notifications to all subscribed devices
      const subscriptions = getSubscriptions()
      for (const sub of subscriptions) {
        await sendPushNotification(sub, {
          title: 'New Todo Added!',
          body: text,
          icon: '/icon-192.png',
          badge: '/badge-72.png'
        })
      }
    }
  },

  toggle: async ({ request }) => {
    const data = await request.formData()
    const id = parseInt(data.get('id') as string)
    toggleTodo(id)
  },

  delete: async ({ request }) => {
    const data = await request.formData()
    const id = parseInt(data.get('id') as string)
    deleteTodo(id)
  },

  subscribe: async ({ request }) => {
    const data = await request.json()
    addSubscription(data.subscription)
    return { success: true }
  }
}
