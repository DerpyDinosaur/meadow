import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'test.sqlite',
  },
});