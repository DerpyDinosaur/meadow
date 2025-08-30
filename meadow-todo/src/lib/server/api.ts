import type { AppType } from '@meadow/api';
import { hc } from 'hono/client';
const client = hc<typeof AppType>('http://localhost:3000');
export default client;