import router from './routes'
import { hc } from 'hono/client'

// assign the client to a variable to calculate the type when compiling
const client = hc<typeof router>('')
export type Client = typeof client

export const meadow_api = (...args: Parameters<typeof hc>): Client => 
	hc<typeof router>(...args)