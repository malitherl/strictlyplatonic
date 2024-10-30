import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// for reference: https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './FE_testSetup.js', 
  }
})
