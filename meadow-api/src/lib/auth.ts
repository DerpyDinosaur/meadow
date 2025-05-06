import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { account, session, user, verification } from "../db/auth-schema";

const sqlite = new Database('test.sqlite');
const db = drizzle({ client: sqlite });
 
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
        schema:{
            user,
            session,
            account,
            verification
        }
    }),
    trustedOrigins: ['http://localhost:5173'],
    emailAndPassword: {
        enabled: true
    },
});