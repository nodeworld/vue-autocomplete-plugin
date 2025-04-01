import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { libInjectCss } from 'vite-plugin-lib-inject-css';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), libInjectCss()],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'Autocomplete',
      // the proper extensions will be added
      fileName: 'vue-autocomplete-plugin',
      cssFileName: 'style',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        },
      },
    }
  },
})
