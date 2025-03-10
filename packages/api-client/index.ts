import { hc } from "hono/client";
import type { TodoType } from '@meadow/api'

const client = hc<TodoType>("");