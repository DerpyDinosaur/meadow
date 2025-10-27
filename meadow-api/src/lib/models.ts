import z from "zod";

export const UNAUTHORIZED = z.object({
	message: z.literal("Unauthorized")
})