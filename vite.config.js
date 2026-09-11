import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        page: resolve(__dirname, 'page.html'),
        tankContainment: resolve(__dirname, 'tank-containment-painting.html')
      }
    }
  }
});
