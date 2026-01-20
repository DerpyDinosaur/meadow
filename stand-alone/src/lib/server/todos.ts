type Todo = {
  id: number
  text: string
  completed: boolean
}

let todos: Todo[] = [
  { id: 1, text: 'Learn Svelte 5', completed: false },
  { id: 2, text: 'Use SvelteKit', completed: false }
]
let nextId = 3

// Store push subscriptions
let subscriptions: PushSubscription[] = []

export function getTodos() {
  return todos
}

export function addTodo(text: string) {
  const todo = { id: nextId++, text, completed: false }
  todos.push(todo)
  return todo
}

export function toggleTodo(id: number) {
  const todo = todos.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
    return todo
  }
  return null
}

export function deleteTodo(id: number) {
  todos = todos.filter(t => t.id !== id)
  return { success: true }
}

export function addSubscription(subscription: PushSubscription) {
  subscriptions.push(subscription)
}

export function getSubscriptions() {
  return subscriptions
}
