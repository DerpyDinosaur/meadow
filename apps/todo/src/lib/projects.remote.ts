import { query } from "$app/server";
import client from "./hono-client";

export const getTodos = query(async () => {
  const res = await client.api.todos.$get();

  if (!res.ok) {
    console.error("Oops!")
  }

  const data = await res.json();
  return data.todos;
})
