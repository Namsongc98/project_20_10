// Nhạc theo từng màn — key là id màn trong slides/index.js. File nằm trong public/media/music/.
// autoplay: true → tự chạy khi vào màn · false → chỉ chạy khi nhấn P.
// Hai màn cùng một file (welcome → opening) thì nhạc chạy tiếp, không phát lại từ đầu.
// Nhạc nền luôn lặp lại khi hết bài. volume: 0–1.
export const slideMusic = {
  welcome: { src: 'media/music/welcome.mp3', autoplay: true, volume: 0.6 },
  opening: { src: 'media/music/welcome.mp3', autoplay: true, volume: 0.6 },
  leadership: { src: 'media/music/phat-bieu.mp3', autoplay: false, volume: 0.4 },
  flowers: { src: 'media/music/session-flowers.mp3', autoplay: true, volume: 0.7 },
  quiz: { src: 'media/music/quiz.mp3', autoplay: true, volume: 0.35 },
  'tea-break': { src: 'media/music/tea-break.mp3', autoplay: true, volume: 0.5 },
}

// Âm thanh phát một lần (không lặp); trong lúc phát, nhạc nền tạm nhỏ lại
export const soundEffects = {
  taDa: { src: 'media/music/ta-da.mp3', volume: 0.9 },
  applause: { src: 'media/music/vo-tay.mp3', volume: 0.9 },
}
