import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import Unocss from "unocss/vite";
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsDir: 'static',
    outDir: 'dist',
    // lib: {
    //   entry: '',
    //   formats: ['es']
    // }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [uni(), Unocss()],
});
