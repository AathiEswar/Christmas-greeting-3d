import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.woff2', '**/*.ttf', '**/*.otf', "**/fonts/*.json"],
  optimizeDeps: {
    exclude: ['three-stdlib/libs/lottie.js'],
  },
})
