import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        signin: resolve(__dirname, 'src/signin.html'),
        signup: resolve(__dirname, 'src/signup.html'),
        home: resolve(__dirname, 'src/home.html'),
        profile: resolve(__dirname, 'src/profile.html'),
      },
    }
  },
});
