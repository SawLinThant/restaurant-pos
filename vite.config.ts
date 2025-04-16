import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0', 
  },
  build: {
     // This will ignore all eslint warnings/errors during build
     rollupOptions: {
      onwarn(warning, warn) {
        // Skip certain warnings
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return
        
        // Use default for everything else
        warn(warning)
      }
    }
  },
})
