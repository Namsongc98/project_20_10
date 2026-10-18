// Câu đố Đuổi hình bắt chữ — thứ tự trong mảng là thứ tự chơi; tổng số câu tính tự động.
// Câu 1: hoa hồng; câu 2–5: đức tính của phụ nữ; câu 6–12: thành ngữ, tục ngữ; câu 13–15 còn là dữ liệu MẪU (hình chỉ có số thứ tự).
// media.type: "image" | "video"; media.src: đường dẫn tương đối trong public/ (không bắt đầu bằng "/").
// answer: viết hoa, các từ cách nhau bằng khoảng trắng; số chữ cái được tính tự động.
export const quizQuestions = [
  { id: 1, media: { type: 'image', src: 'media/quiz/q01.svg', alt: 'Câu đố 1' }, answer: 'HOA HỒNG' },
  { id: 2, media: { type: 'image', src: 'media/quiz/q02.svg', alt: 'Câu đố 2' }, answer: 'CHÂN THÀNH' },
  { id: 3, media: { type: 'image', src: 'media/quiz/q03.svg', alt: 'Câu đố 3' }, answer: 'NHÂN HẬU' },
  { id: 4, media: { type: 'image', src: 'media/quiz/q04.svg', alt: 'Câu đố 4' }, answer: 'NHIỆT TÌNH' },
  { id: 5, media: { type: 'image', src: 'media/quiz/q05.svg', alt: 'Câu đố 5' }, answer: 'ĐẢM ĐANG' },
  { id: 6, media: { type: 'image', src: 'media/quiz/q06.svg', alt: 'Câu đố 6' }, answer: 'MỘT NẮNG HAI SƯƠNG' },
  { id: 7, media: { type: 'image', src: 'media/quiz/q07.svg', alt: 'Câu đố 7' }, answer: 'ĐẦU TẮT MẶT TỐI' },
  { id: 8, media: { type: 'image', src: 'media/quiz/q08.svg', alt: 'Câu đố 8' }, answer: 'CHÂN CỨNG ĐÁ MỀM' },
  { id: 9, media: { type: 'image', src: 'media/quiz/q09.svg', alt: 'Câu đố 9' }, answer: 'BA CHÌM BẢY NỔI' },
  { id: 10, media: { type: 'image', src: 'media/quiz/q10.svg', alt: 'Câu đố 10' }, answer: 'ĂN QUẢ NHỚ KẺ TRỒNG CÂY' },
  { id: 11, media: { type: 'image', src: 'media/quiz/q11.svg', alt: 'Câu đố 11' }, answer: 'SỢ VỢ SỐNG LÂU' },
  { id: 12, media: { type: 'image', src: 'media/quiz/q12.svg', alt: 'Câu đố 12' }, answer: 'TRE GIÀ MĂNG MỌC' },
  { id: 13, media: { type: 'image', src: 'media/quiz/q13.svg', alt: 'Câu đố 13' }, answer: 'XINH ĐẸP' },
  { id: 14, media: { type: 'image', src: 'media/quiz/q14.svg', alt: 'Câu đố 14' }, answer: 'GIA ĐÌNH' },
  { id: 15, media: { type: 'image', src: 'media/quiz/q15.svg', alt: 'Câu đố 15' }, answer: 'NỮ HOÀNG' },
]
