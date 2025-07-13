import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../db";
import { account, session, user, verification } from "../db/auth-schema";
import { authSchema } from '../db/schema'
 
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
        schema:{
            authSchema.user,
            authSchema.session,
            authSchema.account,
            authSchema.verification
        }
    }),
    trustedOrigins: ['http://localhost:5173'],
    emailAndPassword: {
        enabled: true
    },
});