import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Get the base path based on environment
const getBasePath = () => {
  // For Vercel deployment
  if (process.env.VERCEL === "1") {
    return "/";
  }
  // Default for other deployments
  return "/";
};

export default defineConfig({
  base: getBasePath(),
  plugins: [react(), tailwindcss()],
  server: {
    open: true,
    host: false,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
