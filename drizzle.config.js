import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./config/schema.js",
  dbCredentials:{
     url:"postgresql://neondb_owner:npg_KmAjnN3s6LkT@ep-broad-band-a8kmieqn-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"
  }
});
