<script lang="ts">
  import { enhance } from '$app/forms'
  import { onMount } from 'svelte'

  type Todo = {
    id: number
    text: string
    completed: boolean
  }

  let { data } = $props()
  let newTodo = $state('')
  let notificationsEnabled = $state(false)
  let showInstallPrompt = $state(false)
  let deferredPrompt: any = null

  onMount(async () => {
    // Check notification permission
    if ('Notification' in window) {
      notificationsEnabled = Notification.permission === 'granted'
    }

    // PWA install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt = e
      showInstallPrompt = true
    })
  })

  async function requestNotificationPermission() {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications')
      return
    }

    const permission = await Notification.requestPermission()

    if (permission === 'granted') {
      notificationsEnabled = true
      await subscribeUserToPush()
    }
  }

  async function subscribeUserToPush() {
    const registration = await navigator.serviceWorker.ready

    // Get VAPID public key
    const response = await fetch('/api/vapid-public-key')
    const { publicKey } = await response.json()

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey)
    })

    // Send subscription to server
    await fetch('?/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscription })
    })
  }

  function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  async function installPWA() {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      deferredPrompt = null
      showInstallPrompt = false
    }
  }
</script>

<div class="app">
  <h1>📝 Todo App</h1>

  {#if showInstallPrompt}
    <div class="install-banner">
      <p>Install this app on your device!</p>
      <button onclick={installPWA} class="install-btn">Install</button>
    </div>
  {/if}

  <div class="notifications-toggle">
    {#if notificationsEnabled}
      <span>🔔 Notifications enabled</span>
    {:else}
      <button onclick={requestNotificationPermission} class="notify-btn">
        Enable Notifications
      </button>
    {/if}
  </div>

  <form method="POST" action="?/add" use:enhance={() => {
    return async ({ update }) => {
      newTodo = ''
      await update()
    }
  }}>
    <input
      type="text"
      name="text"
      bind:value={newTodo}
      placeholder="Add a new todo..."
      required
    />
    <button type="submit">Add</button>
  </form>

  <ul>
    {#each data.todos as todo (todo.id)}
      <li class:completed={todo.completed}>
        <form method="POST" action="?/toggle" use:enhance>
          <input type="hidden" name="id" value={todo.id} />
          <input
            type="checkbox"
            checked={todo.completed}
            onchange={(e) => e.currentTarget.form?.requestSubmit()}
          />
        </form>

        <span>{todo.text}</span>

        <form method="POST" action="?/delete" use:enhance>
          <input type="hidden" name="id" value={todo.id} />
          <button type="submit">Delete</button>
        </form>
      </li>
    {/each}
  </ul>
</div>

<style>
  .app {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    font-family: system-ui, -apple-system, sans-serif;
  }

  h1 {
    color: #333;
    margin-bottom: 1.5rem;
  }

  .install-banner {
    background: #28a745;
    color: white;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .install-btn {
    background: white;
    color: #28a745;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  }

  .notifications-toggle {
    margin-bottom: 1rem;
  }

  .notify-btn {
    background: #ffc107;
    color: #333;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  }

  form {
    display: flex;
    gap: 0.5rem;
  }

  form:first-of-type {
    margin-bottom: 1.5rem;
  }

  input[type="text"] {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
  }

  button:hover {
    background: #0056b3;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }

  li.completed span {
    text-decoration: line-through;
    color: #888;
  }

  li span {
    flex: 1;
  }

  li button {
    background: #dc3545;
    padding: 0.25rem 0.75rem;
  }

  li button:hover {
    background: #c82333;
  }

  input[type="checkbox"] {
    cursor: pointer;
    width: 1.2rem;
    height: 1.2rem;
  }
</style>
