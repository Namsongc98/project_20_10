# Một Ngày Dành Cho Phái Đẹp — Website sự kiện 20/10

Website trình chiếu cho chương trình 20/10 nội bộ (Vue 3 + Vite + SCSS). Đây là frontend tĩnh, chạy offline, không cần backend.

## Chạy

```bash
npm install      # chỉ cần khi có mạng, làm một lần
npm run dev      # phát triển
npm run build    # tạo bản production trong dist/
npm run preview  # xem bản build
```

Bản build dùng đường dẫn tương đối (`base: './'`), nên có thể mở trực tiếp `dist/index.html` mà không cần mạng.

## Thay nội dung

| Nội dung | File |
|---|---|
| Tên đơn vị (D5), tên công ty, logo, năm, lời chúc, người phát biểu | `src/data/event.js` |
| Danh sách chị em D5 + lời chúc (chữ chạy) | `src/data/staff.js` |
| Ảnh kỷ niệm (polaroid) | `src/data/memories.js` + `public/media/memories/` |
| Câu hỏi Đuổi hình bắt chữ (hiện 15 câu) | `src/data/quizQuestions.js` |
| Logo | `src/assets/image/logo-rikkeisoft-transparent.png` — PNG nền trong suốt; đổi file import trong `event.js` |
| Ảnh/video câu đố | `public/media/quiz/` |
| Màu sắc, cỡ chữ | `src/assets/styles/_tokens.scss` |

Mỗi câu đố có dạng:

```js
{ id: 1, media: { type: 'image', src: 'media/quiz/q01.png', alt: '...' }, answer: 'HOA HỒNG' }
```

- `type` là `'image'` hoặc `'video'` (video tự phát, tắt tiếng, lặp lại).
- `src` là đường dẫn tương đối trong `public/` và **không** bắt đầu bằng `/`.

## Bố cục

Toàn bộ nội dung được thiết kế trên một stage cố định 1920×1080, tự scale vừa mọi màn hình. Với màn hình khác tỉ lệ 16:9, nền và hoa trang trí tự giãn ra phủ kín màn hình, nội dung vẫn nằm giữa — không có viền đen.
