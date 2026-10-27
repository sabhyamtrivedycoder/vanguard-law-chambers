import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        practice: resolve(import.meta.dirname, 'practice-areas.html'),
        attorneys: resolve(import.meta.dirname, 'attorneys.html'),
        victories: resolve(import.meta.dirname, 'case-victories.html'),
        consultation: resolve(import.meta.dirname, 'consultation.html'),
        contact: resolve(import.meta.dirname, 'contact.html'),
        privacy: resolve(import.meta.dirname, 'privacy.html'),
        disclaimer: resolve(import.meta.dirname, 'disclaimer.html')
      }
    }
  }
});
