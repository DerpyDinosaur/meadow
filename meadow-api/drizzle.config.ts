import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'test.sqlite',
  },
});