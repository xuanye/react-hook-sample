import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    base: './',
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 405,
      open: true,
    },
    build: {
      assetsDir: './',
      sourcemap: command === 'serve',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-venders': ['react', 'react-dom'],
          },
        },
      },
    },
    test: {
      /* for example, use global to avoid globals imports (describe, test, expect):
        globals: true, */
      environment: 'happy-dom',
    },
  };
});