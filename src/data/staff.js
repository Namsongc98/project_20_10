// Danh sách chị em D5 — chạy chữ ở màn Lời chúc lãnh đạo và Flowers for the Queens.
// Thứ tự được xáo ngẫu nhiên mỗi lần mở trang rồi chia đôi: nửa đầu cho màn lãnh đạo, nửa sau cho màn tặng hoa.
// Mỗi dòng là tên (chuỗi) hoặc { name, wish } nếu muốn lời chúc riêng cho người đó.
// Không ghi wish thì lời chúc được lấy lần lượt từ danh sách `wishes` bên dưới.
export const staff = [
  'Nguyễn Minh Hồng',
  'Trần Thùy Dương',
  'Hoàng Thị Lương',
  'Vũ Thanh Thuỳ',
  'Lương Thị Thắm',
  'Trần Thị Dung',
  'Nguyễn Thị Hồng',
  'Đoàn Thị Thương',
  'Nguyễn Thị Khánh Huyền',
  'Đỗ Thị Trà Mi',
  'Vũ Thị Thảo',
  'Nguyễn Thị Hồng Nhung',
  'Vũ Thị Uyên',
  'Đặng Thị Ngọc Linh',
  'Mai Thu Hương',
  'Âu Thị Đào',
  'Trần Thị Tính',
  'Phan Thị Cẩm Vân',
  'Phan Thị Minh Huyền',
  'Lê Thị Diệu Thảo',
  'Trịnh Thùy Linh',
  'Phạm Thị Giang',
  'Nguyễn Mai Phương',
  'Vũ Thị Phương Thảo',
  'Đinh Thị Vi Hoa',
  'Ngô Thị Thùy Linh',
  'Lê Nguyễn Khánh Linh',
  'Nguyễn Thị Phương Anh',
  'Vương Thị Diễm',
  'Chu Thị Thùy',
  'Nguyễn Thị Hoan',
  'Nguyễn Thu Phương',
  'Lưu Hiểu Khánh',
  'Phạm Hương Giang',
  // Danh sách gốc có 2 dòng "Phạm Hương Giang" — giữ cả hai; xoá một dòng nếu bị lặp nhầm
  'Phạm Hương Giang',
  'Đào Huyền Linh',
  'Trần Thị Thu Hiền',
  'Phùng Thị Hợi',
  'Chu Thị Điềm',
  'Chị Thu',
  'Cô Lý',
]

export const wishes = [
  'Luôn xinh đẹp, rạng rỡ và hạnh phúc',
  'Mãi tươi trẻ như những đóa hoa',
  'Công việc thuận lợi, cuộc sống ngập tràn niềm vui',
  'Luôn tự tin và tỏa sáng theo cách riêng',
  'Sức khỏe dồi dào, nụ cười luôn trên môi',
  'Một năm thật nhiều thành công và yêu thương',
  'Luôn được trân trọng và yêu thương',
  'Gia đình hạnh phúc, sự nghiệp thăng tiến',
  'Mỗi ngày đều là một ngày tuyệt vời',
  'Dịu dàng, bản lĩnh và luôn rực rỡ',
  'Vạn sự như ý, an yên mỗi ngày',
  'Giữ mãi ngọn lửa đam mê và niềm vui',
  'Tràn đầy năng lượng và may mắn',
  'Xinh đẹp hôm nay và mãi mãi',
  'Luôn là bông hoa đẹp nhất của D5',
]

// Ghép tên + lời chúc cho dải chữ chạy
const staffWishes = staff.map((entry, index) => {
  const person = typeof entry === 'string' ? { name: entry } : entry
  return { name: person.name.trim(), wish: person.wish ?? wishes[index % wishes.length] }
})

// Xáo trộn (Fisher–Yates) — mỗi lần mở/tải lại trang là một thứ tự mới
function shuffle(list) {
  const result = [...list]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// Chia đôi danh sách đã xáo cho 2 màn, không ai bị lặp giữa hai màn
const shuffled = shuffle(staffWishes)
const half = Math.ceil(shuffled.length / 2)
export const leadershipStaffWishes = shuffled.slice(0, half)
export const flowersStaffWishes = shuffled.slice(half)
