import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../db";
import { account, session, user, verification } from "../db/schema/auth";
 
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