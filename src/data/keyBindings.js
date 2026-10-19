// Bảng phím duy nhất — dùng để hiển thị trong bảng trợ giúp (phím H)
export const keyBindings = [
  { keys: ['→', 'PageDown'], action: 'Màn tiếp theo · ở game: giới thiệu → câu 1 → … (câu cuối → Tea break)' },
  { keys: ['←', 'PageUp'], action: 'Màn trước · ở game: câu trước (câu 1 → giới thiệu → Tặng hoa)' },
  { keys: ['Q'], action: 'Hiện / ẩn đáp án (màn game) · kèm tiếng ta-da' },
  { keys: ['G'], action: 'Hiện / ẩn gợi ý + lật chữ cái đầu mỗi từ (màn game)' },
  { keys: ['1 – 6'], action: 'Nhảy thẳng tới màn tương ứng' },
  { keys: ['F'], action: 'Dừng / tiếp tục nhạc nền' },
  { keys: ['P'], action: 'Chạy nhạc phát biểu (màn Lời chúc lãnh đạo)' },
  { keys: ['V'], action: 'Tiếng vỗ tay' },
  { keys: ['M'], action: 'Tắt / bật toàn bộ âm thanh' },
  { keys: ['T'], action: 'Bật / tắt toàn màn hình' },
  { keys: ['H'], action: 'Mở / đóng bảng trợ giúp này' },
  { keys: ['Esc'], action: 'Đóng trợ giúp · thoát toàn màn hình' },
]
