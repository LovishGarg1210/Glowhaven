import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    historyApiFallback: true, // ✅ This ensures fallback to index.html
  },
  plugins: [react(), tailwindcss(),],
 
})
