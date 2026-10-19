import logo from '@/assets/image/logo-rikkeisoft-transparent.png'

const unitName = 'D5'
const companyName = 'RIKKEISOFT'

// Thông tin sự kiện — chương trình của đơn vị D5 trực thuộc Rikkeisoft
export const event = {
  unitName,
  companyName,
  // Nhãn hiển thị cạnh logo; để unitName rỗng thì chỉ hiện tên công ty
  brandLabel: [unitName, companyName].filter(Boolean).join(' · '),
  // Ảnh import qua Vite (đã có URL đầy đủ) — dùng thẳng, không qua assetUrl
  logo,
  year: 2026,
  // Chú thích dưới mỗi ảnh polaroid kỷ niệm (ảnh khai báo ở data/memories.js)
  memoriesCaption: 'Kỷ niệm 20/10/2025',
  // Nhãn đầu dải chữ chạy tên + lời chúc (danh sách ở data/staff.js)
  tickerLabel: 'Gửi chị em D5',
  concept: 'Một Ngày Dành Cho Phái Đẹp',

  welcome: {
    //   = khoảng trắng không ngắt dòng, giữ "PHỤ NỮ", "VIỆT NAM" trên cùng một dòng
    title: 'CHÀO MỪNG NGÀY PHỤ NỮ VIỆT NAM 20/10',
    message: 'Dành tặng những điều đẹp đẽ nhất cho những người phụ nữ tuyệt vời.',
  },

  opening: {
    title: 'Một Ngày Dành Cho Phái Đẹp',
    message:
      'Mỗi người phụ nữ là một bông hoa — cùng nhau, chúng ta làm nên một khu vườn rực rỡ.',
  },

  leadership: {
    title: 'Trân trọng những đóng góp — Gửi trao lời chúc',
    // Để trống nếu không muốn hiển thị tên/chức danh người phát biểu
    speakerName: '',
    speakerTitle: '',
  },

  flowers: {
    title: 'Flowers for the Queens',
    message: 'Cảm ơn những bông hoa đã làm nên sắc màu của tập thể chúng ta.',
  },

  quiz: {
    title: 'Đuổi hình bắt chữ',
    hintLabel: 'Nhìn hình đoán chữ',
    // Màn giới thiệu trước câu 1 — icon: 'eye' | 'hand' | 'gift' | 'bulb'
    intro: {
      rules: [
        { icon: 'eye', title: 'Nhìn hình', text: 'Mỗi câu là một bức hình ghép, ẩn một từ hoặc một câu thành ngữ.' },
        { icon: 'hand', title: 'Giơ tay nhanh', text: 'Ai giơ tay nhanh nhất sẽ giành quyền trả lời.' },
        { icon: 'gift', title: 'Đúng là có quà', text: 'Trả lời đúng nhận quà ngay. Sai thì nhường lượt người tiếp theo.' },
        { icon: 'bulb', title: 'Bí thì có gợi ý', text: 'MC sẽ mở gợi ý cùng chữ cái đầu của mỗi từ.' },
      ],
      topics: ['Đức tính người phụ nữ', 'Thành ngữ, tục ngữ', 'Tục ngữ qua góc nhìn IT'],
    },
  },

  teaBreak: {
    title: 'Tea, Treats & Togetherness',
    message: 'Chúc chị em 20/10 luôn rạng rỡ và hạnh phúc!',
  },
}
