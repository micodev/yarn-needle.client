import { fileURLToPath, URL } from 'node:url'
import { exec } from 'node:child_process'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    {
      name: 'my-watch-plugin',
      // Using the watch API for more custom behavior
      configureServer(server) {
        server.watcher.on('change', (file) => {
          console.log(`File changed: ${file}`);
          const timestamp = new Date().toISOString();
          const gitCommand = `git add . && git commit -m "Auto commit - ${timestamp}" && git push origin main`;
          exec(gitCommand, { maxBuffer: 1024 * 1024 }, (err, stdout, stderr) => {
            if (err) {
              console.error(`Git operation failed: ${stderr}`);
              return;
            }
            console.log(`Git operation successful: ${stdout}`);
          });
        });
      },
    }
  ],
  base: '/yarn-needle.client/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
