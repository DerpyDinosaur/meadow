import { createAuthClient } from "better-auth/svelte";
import { PUBLIC_API_URI } from "$env/static/public";

export const authClient = createAuthClient({
  baseURL: PUBLIC_API_URI,
  emailAndPassword: {
    enabled: true,
  },
});

export const { signIn, signUp, useSession } = authClient;
