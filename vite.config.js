import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Chrome chặn <script type="module"> và thuộc tính crossorigin khi mở trang qua file://.
// Bản build dùng bundle IIFE + script defer để mở trực tiếp dist/index.html khi không có mạng.
function fileProtocolCompat() {
  return {
    name: 'file-protocol-compat',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html
          .replace(/<script type="module" crossorigin/g, '<script defer')
          .replace(/ crossorigin(?=[ >])/g, '')
      },
    },
  }
}

export default defineConfig({
  // Đường dẫn tương đối để tài nguyên chạy được qua file://
  base: './',
  plugins: [vue(), fileProtocolCompat()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    modulePreload: false,
    rollupOptions: {
      output: {
        format: 'iife',
      },
    },
  },
})
