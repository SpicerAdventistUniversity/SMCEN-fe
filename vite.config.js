// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '^/api': {
        target: 'https://smcen-be.onrender.com/',  // Backend URL
        changeOrigin: true,  // Ensures the request host matches the target
        rewrite: (path) => path.replace(/^\/api/, '/api'),  // Ensures '/api' is preserved in the path
      }
    }
  }
})
