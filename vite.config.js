import { fileURLToPath, URL } from 'node:url'
import { exec } from 'node:child_process'
import { existsSync, unlinkSync } from 'node:fs'
import { join } from 'node:path'
import mkcert from 'vite-plugin-mkcert'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import process from 'process';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    mkcert(),
    vue(),
    vueJsx(),
    vueDevTools(),
    {
      name: 'my-watch-plugin',
      // Using the watch API for more custom behavior
      configureServer(server) {
        server.watcher.on('change', (file) => {
          console.log(`File changed: ${file}`);

          // Check and remove git lock if exists
          const gitLockPath = join(process.cwd(), '.git', 'index.lock');
          if (existsSync(gitLockPath)) {
            try {
              unlinkSync(gitLockPath);
              console.log('Removed existing git lock file');
            } catch (error) {
              console.error('Failed to remove git lock file:', error);
              return;
            }
          }

          const date = new Date();
          const formattedDate = date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
          // Get relative file path for cleaner commit message
          const relativePath = file.replace(process.cwd(), '').replace(/\\/g, '/');
          const gitCommand = `git add . && git commit -m "Modified ${relativePath} - ${formattedDate}" && git push origin main`;
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
