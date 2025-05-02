import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  base: "/front_5th_chapter2-3/",
  server: {
    proxy: {
      "/api": {
        target: "https://dummyjson.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
