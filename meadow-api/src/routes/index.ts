import tasks from './tasks';

const routes = [
  tasks,
] as const;

export default routes;
export type AppType = typeof routes[number];