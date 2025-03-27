import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/prototypes/',  // Adjust this if your prototype folder has a different name
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
