# Kế hoạch thiết kế web trình chiếu 20/10

Oct 16, 2026 · @Sơn Lucky

## 1. Định hướng tổng thể

**Bối cảnh hiển thị:** web chạy toàn màn hình trên tivi 16:9 (thiết kế ở 1920×1080, co giãn được lên 4K). Laptop cắm HDMI vào tivi, MC hoặc người hỗ trợ bấm phím để chuyển màn. Khán giả nhìn từ 3–8m nên mọi thứ phải to, ít chữ, độ tương phản cao và không có thanh cuộn.

**Phong cách:** "thanh lịch, ấm áp" thay vì hồng sến. Nền tối màu rượu vang giúp chữ nổi bật, đỡ chói trên tivi và lên ảnh chụp đẹp hơn. Điểm nhấn là vàng ánh kim và hoa.

**Bảng màu đề xuất:**

- Nền chính: đỏ rượu vang đậm `#4A1426` chuyển dần sang `#2A0A16`
- Màu nhấn: vàng champagne `#E8C27A`
- Chữ: kem `#FFF4E8`
- Phụ: hồng phấn `#F2B8C6`, dùng cho hoa và chi tiết nhỏ

**Typography** (cả hai font đều hỗ trợ đầy đủ dấu tiếng Việt):

- Tiêu đề dùng **Playfair Display** (serif, sang trọng), cỡ 96–160px
- Nội dung dùng **Be Vietnam Pro**, cỡ tối thiểu 36px để đọc được từ xa

**Chuyển động:** cánh hoa rơi chậm và lấp lánh nhẹ ở nền, chạy liên tục để màn hình "sống" khi đứng yên lâu. Chuyển màn bằng hiệu ứng fade khoảng 0,8 giây. Tránh hiệu ứng nhanh hoặc nhấp nháy.

## 2. Danh sách màn hình (bám theo lịch trình)

| # | Màn hình | Nội dung chính | Đặc điểm |
| --- | --- | --- | --- |
| 1 | Welcome | "Chào mừng ngày Phụ nữ Việt Nam 20/10", logo công ty, đồng hồ thực | Hoa rơi, chạy lặp lâu không nhàm |
| 2 | Lời chào | "Kính chào quý vị", tên chương trình, 4–5 mục hoạt động | Danh sách hoạt động hiện dần |
| 3 | Lời chúc | Tên và chức danh lãnh đạo, một câu chúc trích dẫn lớn | Bố cục tối giản, ảnh lãnh đạo nếu có |
| 4 | Flowers for the Queens | Tiêu đề lớn, có thể chạy tên các đồng nghiệp nữ | Hoa nở dần, làm phông chụp ảnh tập thể đẹp |
| 5 | Quiz Đuổi hình bắt chữ | Hình câu đố, số câu (x/15), đồng hồ đếm ngược, nút hiện đáp án | Màn duy nhất có tương tác |
| 6 | Tea break | "Tea break & giao lưu", nhạc gợi ý, slideshow ảnh nếu có | Chế độ nền thư giãn |

## 3. Màn quiz (cần thiết kế kỹ nhất)

Mỗi câu có 3 trạng thái: hiện hình → đếm ngược (ví dụ 30 giây, đổi màu đỏ ở 5 giây cuối) → hiện đáp án kèm hiệu ứng. Có một màn kết thúc "Cảm ơn" sau câu 15.

Vì chơi cá nhân và trao quà ngay nên không cần bảng điểm. Hình câu đố chiếm khoảng 70% màn hình để ai cũng nhìn rõ.

## 4. Điều khiển

Không hiện nút trên màn hình tivi, chỉ điều khiển bằng bàn phím hoặc bút trình chiếu:

| Phím | Chức năng |
| --- | --- |
| `1`–`6` | Nhảy thẳng tới màn tương ứng |
| `←` / `→` | Chuyển màn, hoặc chuyển câu khi đang ở màn quiz |
| `Space` | Bắt đầu đếm ngược / hiện đáp án |
| `F` | Bật toàn màn hình |
| `H` | Mở bảng trợ giúp ẩn |

Bút trình chiếu thường gửi tín hiệu phím mũi tên nên dùng được luôn.

## 5. Kỹ thuật

Website là một file HTML duy nhất, chạy offline được (không phụ thuộc wifi hội trường), không có thanh cuộn và chạy tốt trên Chrome ở chế độ toàn màn hình.

## 6. Nội dung cần cung cấp

Trong lúc chờ, bản mockup sẽ dùng nội dung mẫu.

- [ ] Logo và tên công ty hoặc phòng ban
- [ ] Tên và chức danh lãnh đạo phát biểu
- [ ] Danh sách tên đồng nghiệp nữ (nếu muốn hiện ở màn 4)
- [ ] 15 hình câu đố kèm đáp án
- [ ] Độ phân giải tivi (Full HD hay 4K)

**Câu hỏi mở:** giữ tông đỏ rượu vang + vàng champagne, hay chuyển sang tông sáng (kem, hồng pastel)?
