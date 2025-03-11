import { Hono } from 'hono'
// Routes
import todo from './routes/todo'

type Bindings = {};

const app = new Hono<{ Bindings: Bindings }>()
  .route('/todo', todo)

export default app