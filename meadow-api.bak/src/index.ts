import { Hono } from 'hono'
// Routes
import todo from './routes/todo'

type Bindings = {};

const app = new Hono<{ Bindings: Bindings }>()

const route = app
	.route('/todo', todo)
  
export default app
export type MeadowApiType = typeof route