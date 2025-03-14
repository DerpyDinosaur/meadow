import { z, ZodError } from 'zod';

const EnvSchema = z.object({
	ENVIRONMENT: z.string().default("development")
})

export type env = z.infer<typeof EnvSchema>;

let env: env;

try{
	env = EnvSchema.parse(Bun.env)
}catch (e) {
	const error = e as ZodError;
	console.error("Invalid ENV:");
	console.error(error.flatten().fieldErrors);
	process.exit(1)
}

export default env