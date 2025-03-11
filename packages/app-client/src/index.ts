import type { TodoRouteType } from '@meadow/api/routes'
import { hc } from 'hono/client'

const client = hc<TodoRouteType>("")