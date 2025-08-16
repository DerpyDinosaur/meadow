import { createAuthClient } from "better-auth/svelte"

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
    emailAndPassword: {
        enabled: true,
    }
})

export const { signIn, signUp, useSession } = authClient;