// Ghép đường dẫn tài nguyên trong public/ với BASE_URL ('./') để chạy được cả qua file://
export function assetUrl(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
