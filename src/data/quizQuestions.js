// Câu đố Đuổi hình bắt chữ — thứ tự trong mảng là thứ tự chơi; tổng số câu tính tự động.
// Câu 1: hoa hồng; câu 2–5: đức tính của phụ nữ; câu 6–15: thành ngữ, tục ngữ, gợi ý theo góc nhìn IT.
// media.type: "image" | "video"; media.src: đường dẫn tương đối trong public/ (không bắt đầu bằng "/").
// answer: viết hoa, các từ cách nhau bằng khoảng trắng; số chữ cái được tính tự động.
// hint: gợi ý hiện ở đáy màn khi MC nhấn G; bỏ trống thì phím G không hiện gì.
//   Cùng lúc đó, chữ cái đầu của mỗi từ trong đáp án được lật ra (vd. CHÂN THÀNH → C___ T____).
export const quizQuestions = [
  {
    id: 1,
    media: { type: 'image', src: 'media/quiz/q01.svg', alt: 'Câu đố 1' },
    answer: 'HOA HỒNG',
    hint: 'Biểu tượng của tình yêu, có gai nhưng rất thơm, quà quen thuộc mỗi dịp 20/10. Đáp án gồm 2 từ.',
  },
  {
    id: 2,
    media: { type: 'image', src: 'media/quiz/q02.svg', alt: 'Câu đố 2' },
    answer: 'CHÂN THÀNH',
    hint: 'Sống thật lòng, không giả tạo, không vụ lợi. Đáp án gồm 2 từ.',
  },
  {
    id: 3,
    media: { type: 'image', src: 'media/quiz/q03.svg', alt: 'Câu đố 3' },
    answer: 'NHÂN HẬU',
    hint: 'Là sự tốt bụng, đối xử rộng lượng, có tình có nghĩa với mọi người. Đáp án gồm 2 từ.',
  },
  {
    id: 4,
    media: { type: 'image', src: 'media/quiz/q04.svg', alt: 'Câu đố 4' },
    answer: 'NHIỆT TÌNH',
    hint: 'Hăng hái, sốt sắng, làm việc gì cũng dồn hết tâm huyết. Đáp án gồm 2 từ.',
  },
  {
    id: 5,
    media: { type: 'image', src: 'media/quiz/q05.svg', alt: 'Câu đố 5' },
    answer: 'ĐẢM ĐANG',
    hint: 'Giỏi giang, vén khéo, quán xuyến cả việc nhà lẫn việc cơ quan ("Giỏi việc nước, … việc nhà"). Đáp án gồm 2 từ.',
  },
  {
    id: 6,
    media: { type: 'image', src: 'media/quiz/q06.svg', alt: 'Câu đố 6' },
    answer: 'MỘT NẮNG HAI SƯƠNG',
    hint: 'Thành ngữ gồm 4 từ – như dân IT mùa release: đến công ty từ sáng sớm, về nhà khi đêm đã khuya, tần tảo chịu thương chịu khó.',
  },
  {
    id: 7,
    media: { type: 'image', src: 'media/quiz/q07.svg', alt: 'Câu đố 7' },
    answer: 'ĐẦU TẮT MẶT TỐI',
    hint: 'Thành ngữ gồm 4 từ – cảnh chạy deadline sát ngày go-live: task chồng task, meeting nối meeting, cả ngày không có lúc nghỉ ngơi.',
  },
  {
    id: 8,
    media: { type: 'image', src: 'media/quiz/q08.svg', alt: 'Câu đố 8' },
    answer: 'CHÂN CỨNG ĐÁ MỀM',
    hint: 'Thành ngữ gồm 4 từ – dự án khó đến đâu, khách hàng đổi yêu cầu bao lần, team vẫn vững vàng, bền bỉ vượt qua.',
  },
  {
    id: 9,
    media: { type: 'image', src: 'media/quiz/q09.svg', alt: 'Câu đố 9' },
    answer: 'BA CHÌM BẢY NỔI',
    hint: 'Thành ngữ gồm 4 từ, có hai con số – như số phận một dự án: lúc chạy mượt mà, lúc sập server, lên xuống thất thường.',
  },
  {
    id: 10,
    media: { type: 'image', src: 'media/quiz/q10.svg', alt: 'Câu đố 10' },
    answer: 'ĂN QUẢ NHỚ KẺ TRỒNG CÂY',
    hint: 'Tục ngữ gồm 7 từ – dùng thư viện mã nguồn mở hay kế thừa code của người đi trước thì đừng quên biết ơn tác giả.',
  },
  {
    id: 11,
    media: { type: 'image', src: 'media/quiz/q11.svg', alt: 'Câu đố 11' },
    answer: 'SỢ VỢ SỐNG LÂU',
    hint: 'Câu nói vui gồm 4 từ – ở nhà, bà xã chính là Product Owner: yêu cầu nào cũng "approve" ngay thì hạnh phúc và trường thọ.',
  },
  {
    id: 12,
    media: { type: 'image', src: 'media/quiz/q12.svg', alt: 'Câu đố 12' },
    answer: 'TRE GIÀ MĂNG MỌC',
    hint: 'Tục ngữ gồm 4 từ – senior dìu dắt, fresher tiếp bước: thế hệ lập trình viên sau nối tiếp thế hệ trước.',
  },
  {
    id: 13,
    media: { type: 'image', src: 'media/quiz/q13.svg', alt: 'Câu đố 13' },
    answer: 'CÓ CHÍ THÌ NÊN',
    hint: 'Tục ngữ khuyên kiên trì: dân IT cứ bền bỉ fix bug đến cùng, chương trình ắt sẽ chạy. Đáp án gồm 4 từ.',
  },
  {
    id: 14,
    media: { type: 'image', src: 'media/quiz/q14.svg', alt: 'Câu đố 14' },
    answer: 'TRĂM HAY KHÔNG BẰNG TAY QUEN',
    hint: 'Đọc cả núi tài liệu, xem cả ngàn tutorial vẫn thua việc ngày ngày tự mình gõ code. Tục ngữ gồm 6 từ.',
  },
  {
    id: 15,
    media: { type: 'image', src: 'media/quiz/q15.svg', alt: 'Câu đố 15' },
    answer: 'GÓP GIÓ THÀNH BÃO',
    hint: 'Tinh thần teamwork của dân IT: mỗi người một commit nhỏ, cộng lại sẽ tạo nên sản phẩm lớn. Tục ngữ gồm 4 từ.',
  },
]
