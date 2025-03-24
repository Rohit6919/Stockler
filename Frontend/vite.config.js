import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  server: {
    host: '0.0.0.0', // This will allow connections from any IP address on the local network
    port: 3000, // Set the port you want (you can change this if needed)
  },
})
