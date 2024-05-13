import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve:{
    alias: {
      '@components': path.resolve(__dirname, './src/components')
    }
  }
})
