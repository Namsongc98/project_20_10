# Kế hoạch xây dựng website sự kiện 20/10 — Blooming Together

> **Mục tiêu:** Xây dựng website trình chiếu sự kiện 20/10 cho công ty, thay thế bộ slide PowerPoint/Canva. Website phục vụ chương trình nội bộ, chạy trên laptop kết nối màn hình lớn/máy chiếu, không cần backend.

## 1. Tổng quan

- **Tên concept:** Blooming Together
- **Thông điệp:** Tôn vinh những người phụ nữ, lan tỏa sự trân trọng và niềm vui trong tập thể.
- **Phong cách:** Thanh lịch, ấm áp, hiện đại; hoa và cánh hoa cách điệu.
- **Màu sắc:** Hồng phấn, kem, vàng champagne, điểm nhấn đỏ rượu vang.
- **Công nghệ:** Vue 3, Vite, SCSS. Không dùng router; 6 màn được quản lý bằng state.
- **Phạm vi:** Frontend tĩnh; không API, database, đăng nhập hoặc backend.
- **Màn hình mục tiêu:** Stage cố định 1920×1080 (16:9), tự scale vừa mọi màn hình, có viền letterbox.
- **Nhận diện:** Logo và tên công ty dùng placeholder, dễ thay thế trước sự kiện.

## 2. Mục tiêu trải nghiệm

1. Tạo màn hình nền trang trọng và đẹp mắt cho toàn bộ chương trình.
2. Chuyển nhanh giữa các phân đoạn mà không phải cuộn trang.
3. MC điều khiển hoàn toàn bằng bàn phím/bút trình chiếu; không hiện nút trên màn hình.
4. Có mini game Đuổi hình bắt chữ với 15 câu hỏi mẫu, hiện đáp án từng chữ bằng animation. Không tính điểm.
5. Chạy được offline từ bản build; không phụ thuộc dịch vụ bên ngoài trong lúc diễn ra sự kiện.
6. Có hướng dẫn vận hành và phương án dự phòng khi có sự cố.

## 3. Lịch trình sự kiện hiển thị trên website

| Thời gian dự kiến | Phân đoạn | Nội dung |
|---|---|---|
| 00–05 phút | Đón khách và ổn định | Màn hình Welcome, nhạc nền do ban tổ chức chuẩn bị, ổn định chỗ ngồi và chụp ảnh |
| 05–10 phút | MC khai mạc | Giới thiệu ý nghĩa ngày 20/10 và chương trình |
| 10–17 phút | Đại diện lãnh đạo phát biểu | Lời chúc và ghi nhận đóng góp của đồng nghiệp nữ |
| 17–25 phút | Tặng hoa và chụp ảnh | Đồng nghiệp nam tặng hoa, gửi lời chúc và chụp ảnh tập thể |
| 25–30 phút | Mini game Đuổi hình bắt chữ | 15 câu hỏi; người giơ tay nhanh nhất được mời trả lời; trả lời đúng nhận quà; không tính giờ trả lời |
| 30–45 phút | Tea break và giao lưu | Dùng bánh, trà, cà phê, giao lưu và chụp ảnh |

**Lưu ý vận hành:** Thời lượng chỉ là dự kiến. Mini game không tính thời gian; MC chủ động nhịp chơi. Website không có đồng hồ đếm ngược/timer.

## 4. Cấu trúc màn hình

### 4.1. Welcome — Chào mừng

- Tiêu đề: **CHÀO MỪNG NGÀY PHỤ NỮ VIỆT NAM 20/10**
- Thông điệp: “Dành tặng những điều đẹp đẽ nhất cho những người phụ nữ tuyệt vời.”
- Placeholder tên công ty, logo và năm tổ chức.
- Hoa/cánh hoa chuyển động nhẹ; tránh animation gây mất tập trung.
- Có thể để màn hình chạy trước giờ bắt đầu.

### 4.2. MC khai mạc

- Tiêu đề: “Blooming Together”
- Nội dung ngắn về ý nghĩa chương trình.
- Không đưa toàn bộ lời dẫn MC lên màn hình; lời dẫn đầy đủ nằm trong tài liệu riêng nếu cần.

### 4.3. Lời chúc từ Ban lãnh đạo

- Tiêu đề: “Trân trọng những đóng góp — Gửi trao lời chúc”.
- Nền thanh lịch, ít chuyển động.
- Có vùng tùy chọn để thêm tên/chức danh người phát biểu.

### 4.4. Tặng hoa

- Tiêu đề: “Flowers for the Queens”.
- Thông điệp: “Cảm ơn những bông hoa đã làm nên sắc màu của tập thể chúng ta.”
- Giữ màn hình ổn định để mọi người chụp ảnh.

### 4.5. Mini game Đuổi hình bắt chữ

Bố cục từ trên xuống:

1. **Số câu hiện tại:** “Câu 01 / 15”.
2. **Khung câu đố (phía trên):** khung bo góc, nền hồng, hiển thị **hình ảnh hoặc video** của câu đố, lớn và dễ nhìn từ xa. Góc dưới phải có nhãn “Nhìn hình đoán chữ”.
   - Video: file cục bộ, tự phát, tắt tiếng, lặp lại, không hiện thanh điều khiển.
3. **Tiêu đề đáp án:** “ĐÁP ÁN CẦN TÌM (N CHỮ CÁI)”. N là số chữ cái, không tính khoảng trắng, được tính tự động từ đáp án.
4. **Dãy ô chữ (phía dưới):** mỗi ô vuông chứa đúng 1 chữ cái.
   - Ban đầu các ô để trống.
   - Các từ cách nhau bằng khoảng trống lớn hơn; một từ không bị tách sang hai dòng; tự xuống dòng và căn giữa khi đáp án dài.
   - Hỗ trợ chữ có dấu tiếng Việt (chuẩn hóa NFC, viết hoa, tách ký tự bằng `Array.from`).

**Hiện đáp án:**

- Nhấn `A` thì các chữ hiện **lần lượt từng ô từ trái sang phải** bằng animation (lật/nảy nhẹ). Mỗi ô cách nhau khoảng 100–150 ms, tổng thời gian không quá ~2 giây.
- Nhấn `A` lần nữa thì ẩn đáp án.
- Khi `prefers-reduced-motion` được bật thì hiện toàn bộ ngay lập tức.
- Đáp án chưa hiện thì không được render chữ vào DOM, tránh lộ qua tooltip/title.

**Quy tắc khác:**

- Không tính điểm, không bảng điểm, không chia đội.
- Không có timer, không tự động chuyển câu.
- Câu trả lời do MC xác nhận trực tiếp từ người chơi giơ tay; quà trao trực tiếp, website không ghi nhận.

### 4.6. Tea break và kết thúc

- Tiêu đề: “Tea, Treats & Togetherness”.
- Lời chúc: “Chúc chị em 20/10 luôn rạng rỡ và hạnh phúc!”
- Nền nhẹ nhàng, có thể giữ màn hình này trong thời gian giao lưu.

## 5. Mini game: quy tắc và luồng thao tác

### Quy tắc

1. Tổng cộng 15 câu hỏi.
2. MC lần lượt hiển thị từng câu.
3. Người chơi tự giơ tay; MC mời người giơ tay nhanh nhất trả lời trước.
4. Trả lời đúng: nhận quà trực tiếp; website không tính điểm.
5. Trả lời sai: MC có thể mời người tiếp theo.
6. Không có giới hạn thời gian trả lời.
7. MC nhấn `A` để hiện đáp án sau khi đã nhận câu trả lời hoặc khi cần chốt câu.
8. MC nhấn `→` để sang câu tiếp theo.

### Luồng điều hướng trong game

- Từ màn Tặng hoa nhấn `→` thì vào game ở **Câu 1**.
- Ở câu 1 nhấn `←` thì **quay về màn Tặng hoa**.
- Ở câu 15 nhấn `→` thì **chuyển sang màn Tea break**.
- Từ Tea break nhấn `←` thì quay lại **Câu 15**.
- `A` chỉ hiện/ẩn đáp án; `→` luôn sang câu tiếp, kể cả khi chưa hiện đáp án.
- Mỗi lần vào một câu, đáp án mặc định ở trạng thái ẩn.

### Trạng thái

- `currentSlideIndex`: màn hiện tại (0–5).
- `currentQuestionIndex`: câu hiện tại (0–14).
- `answerRevealed`: đáp án đang hiện hay ẩn.

Trạng thái chỉ giữ trong bộ nhớ, không lưu `localStorage`. Tải lại trang thì quay về màn Welcome; chấp nhận được vì game không tính điểm.

## 6. Phạm vi chức năng

### 6.1. Bắt buộc (MVP)

- Màn hình trình chiếu toàn màn hình theo từng phân đoạn.
- Điều hướng bằng bàn phím/bút trình chiếu; không hiển thị nút trên màn hình.
- Stage 1920×1080 scale vừa màn hình, có letterbox.
- Theme Blooming Together bằng SCSS variables.
- Placeholder logo/tên công ty.
- 15 câu hỏi mẫu (hình ảnh hoặc video), dãy ô chữ, hiện đáp án từng chữ bằng animation.
- Màn hình kết thúc/tea break.
- Kiểm tra độ tương phản, cỡ chữ khi chiếu.
- Hướng dẫn chạy local/build.

### 6.2. Điều khiển

Không hiện nút trên màn hình TV, chỉ điều khiển bằng bàn phím hoặc bút trình chiếu. Đây là bảng phím duy nhất:

| Phím | Chức năng |
| --- | --- |
| `→` / `PageDown` | Sang màn tiếp theo; ở màn game: sang câu tiếp theo (câu 15 → Tea break) |
| `←` / `PageUp` | Về màn trước; ở màn game: về câu trước (câu 1 → Tặng hoa) |
| `A` | Hiện / ẩn đáp án (chỉ ở màn game) |
| `1`–`6` | Nhảy thẳng tới màn tương ứng |
| `F` | Bật/tắt toàn màn hình |
| `Esc` | Thoát toàn màn hình (trình duyệt xử lý) |
| `H` | Mở/đóng bảng trợ giúp phím tắt |

`PageUp`/`PageDown` dùng cho bút trình chiếu, vì đa số bút gửi hai phím này thay vì phím mũi tên. Bảng trợ giúp `H` sẽ hiện trước khán giả, nên chỉ mở khi cần.

### 6.3. Ngoài phạm vi

- Backend, database, tài khoản người dùng.
- Tính điểm, bảng xếp hạng, ghi nhận người nhận quà.
- Timer/đồng hồ đếm ngược.
- Lưu trạng thái khi tải lại trang.
- Đồng bộ realtime giữa nhiều thiết bị.
- Người tham dự gửi câu trả lời từ điện thoại.
- Hệ thống đăng ký hoặc thương mại.
- Phân tích dữ liệu người tham gia.

## 7. Đề xuất cấu trúc thư mục

```text
october-20-event/
├── public/
│   ├── media/
│   │   ├── logo-placeholder.svg
│   │   └── quiz/              # ảnh/video câu đố
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── fonts/             # font tự host, hỗ trợ tiếng Việt
│   │   └── styles/
│   │       ├── _tokens.scss
│   │       ├── _base.scss
│   │       └── _animations.scss
│   ├── components/
│   │   ├── ScaledStage.vue    # stage 1920×1080 + scale + letterbox
│   │   ├── SlideFrame.vue
│   │   ├── QuizMedia.vue      # hiển thị ảnh hoặc video
│   │   ├── AnswerTiles.vue    # dãy ô chữ + animation hiện đáp án
│   │   └── KeyboardHelp.vue
│   ├── slides/
│   │   ├── WelcomeSlide.vue
│   │   ├── OpeningSlide.vue
│   │   ├── LeadershipSlide.vue
│   │   ├── FlowersSlide.vue
│   │   ├── QuizSlide.vue
│   │   └── TeaBreakSlide.vue
│   ├── data/
│   │   ├── event.js           # tên công ty, logo, năm, người phát biểu
│   │   └── quizQuestions.js
│   ├── composables/
│   │   ├── usePresentation.js
│   │   ├── useKeyboardControls.js
│   │   └── useQuizGame.js
│   ├── App.vue
│   └── main.js
├── .gitignore
├── index.html
├── vite.config.js             # base: './'
├── package.json
└── README.md
```

## 8. Thiết kế và quy chuẩn UI

### Bảng màu đề xuất

| Token | Giá trị | Mục đích |
|---|---|---|
| `--color-blush` | `#F4C7CF` | Hồng phấn |
| `--color-cream` | `#FFF8F0` | Nền kem |
| `--color-champagne` | `#D8B778` | Điểm nhấn vàng champagne |
| `--color-rose` | `#9B435A` | Đỏ hồng đậm cho tiêu đề |
| `--color-ink` | `#432B32` | Chữ chính |
| `--color-surface` | `#FFFFFF` | Bề mặt thẻ/nội dung |

### Quy tắc giao diện

- **Stage cố định 1920×1080:** toàn bộ nội dung thiết kế theo pixel của stage. Stage được `transform: scale()` theo `min(innerWidth/1920, innerHeight/1080)`, căn giữa, phần dư là viền letterbox màu nền. Chỉ cần kiểm bố cục một lần cho mọi độ phân giải (1366×768, 1280×800, 1920×1080…).
- Ưu tiên chữ lớn, độ tương phản tốt, tránh chữ nhỏ và đoạn văn dài.
- Dùng animation nhẹ, tắt hoặc giảm animation khi `prefers-reduced-motion` được bật; giới hạn số cánh hoa rơi để laptop yếu không giật.
- Không phụ thuộc tài nguyên từ URL bên ngoài; ảnh/video đặt trong `public/media/`, font tự host trong `src/assets/fonts/` (không dùng link Google Fonts).
- Không hiển thị nút/thanh điều khiển trên màn hình trình chiếu; ẩn con trỏ chuột khi không di chuyển.
- Dùng font có hỗ trợ tiếng Việt và kiểm tra hiển thị dấu trên máy chạy sự kiện.
- Không dùng hình nền quá rối phía sau nội dung chính.

## 9. Dữ liệu câu hỏi

Tạo file `src/data/quizQuestions.js` để quản lý 15 câu hỏi. Mỗi câu có cấu trúc tối thiểu:

```js
{
  id: 1,
  media: {
    type: "image",               // "image" | "video"
    src: "media/quiz/q01.png",   // đường dẫn tương đối, không bắt đầu bằng "/"
    alt: "Bông hoa + chiếc nhẫn"
  },
  answer: "HOA HẬU THÂN THIỆN"   // khoảng trắng phân tách từ; số chữ cái tính tự động
}
```

- Đường dẫn media ghép với `import.meta.env.BASE_URL` để chạy được cả khi mở bằng `file://`.
- Preload toàn bộ ảnh/video quiz khi mở app để chuyển câu không bị trễ.
- Dùng dữ liệu placeholder cho đến khi ban tổ chức duyệt câu đố chính thức.
- Đảm bảo đáp án tiếng Việt rõ ràng, không có nhiều cách hiểu ngoài ý muốn.
- Hình ảnh/video phải có quyền sử dụng phù hợp; ưu tiên tự thiết kế hoặc nguồn được phép dùng.
- Không chỉ lưu câu trả lời trong hình; đáp án cần có trong dữ liệu để hiện trên ô chữ.
- In sẵn một bản đáp án cho MC.

## 10. Kế hoạch triển khai theo giai đoạn

### Giai đoạn 1 — Khởi tạo

- Tạo project Vue 3 + Vite, cấu hình `base: './'` trong `vite.config.js`.
- Cấu hình SCSS, font tự host.
- Tạo tokens màu sắc, typography và reset cơ bản.
- Tạo `ScaledStage` 1920×1080 với scale + letterbox.
- Tạo dữ liệu sự kiện và câu hỏi mẫu.

**Tiêu chí hoàn thành:** chạy được `npm run dev`, stage hiển thị đúng tỷ lệ khi thay đổi kích thước cửa sổ.

### Giai đoạn 2 — Màn hình trình chiếu

- Xây dựng SlideFrame và các màn hình Welcome, MC, lãnh đạo, tặng hoa, mini game, tea break.
- Điều hướng bằng phím (`←`/`→`, `PageUp`/`PageDown`, `1`–`6`, `F`, `H`).
- Thêm chuyển cảnh nhẹ.
- Bổ sung placeholder logo/tên công ty.

**Tiêu chí hoàn thành:** có thể đi qua tất cả phân đoạn bằng bàn phím.

### Giai đoạn 3 — Game Đuổi hình bắt chữ

- Nạp 15 câu hỏi từ file dữ liệu.
- `QuizMedia`: hiển thị ảnh hoặc video (tự phát, tắt tiếng, lặp).
- `AnswerTiles`: dãy ô chữ theo số chữ cái, tách từ, xuống dòng hợp lý.
- Phím `A` hiện/ẩn đáp án, chữ hiện dần từng ô bằng animation.
- Điều hướng câu trước/tiếp theo; câu 1 `←` về Tặng hoa, câu 15 `→` sang Tea break.
- Không timer; không tự động chuyển câu; không tính điểm.
- Bảng trợ giúp phím tắt (`H`).

**Tiêu chí hoàn thành:** MC điều khiển được toàn bộ game bằng phím mà không cần sửa code trong lúc sự kiện.

### Giai đoạn 4 — Hoàn thiện hình ảnh

- Thêm minh họa hoa, nền và animation.
- Kiểm tra font tiếng Việt, độ tương phản, kích thước chữ.
- Tối ưu ảnh/video và kiểm tra trên độ phân giải máy chiếu dự kiến.
- Bổ sung trạng thái khi thiếu ảnh/video hoặc dữ liệu.

**Tiêu chí hoàn thành:** không có lỗi bố cục hoặc nội dung khó đọc khi trình chiếu.

### Giai đoạn 5 — Kiểm thử và bàn giao

- Chạy thử toàn bộ lịch trình.
- Kiểm tra phím tắt (cả bút trình chiếu thật), chuyển câu, hiện/ẩn đáp án, animation.
- Build production và mở `dist/index.html` trực tiếp khi không có mạng.
- Chuẩn bị hướng dẫn chạy và checklist trước giờ tổ chức.

**Tiêu chí hoàn thành:** build thành công, chạy offline từ bản build và MC nắm được thao tác.

## 11. Tiêu chí nghiệm thu

- [ ] Có đủ 6 phân đoạn đúng thứ tự chương trình.
- [ ] Tên công ty và logo có thể thay dễ dàng.
- [ ] Stage 1920×1080 scale đúng, có letterbox, không tràn nội dung ở mọi độ phân giải.
- [ ] Điều hướng được bằng bàn phím/bút trình chiếu; không có nút hiển thị trên màn hình.
- [ ] Có đủ 15 câu hỏi mẫu, hỗ trợ cả ảnh và video.
- [ ] Ô chữ đúng số chữ cái, hiển thị đúng chữ có dấu tiếng Việt.
- [ ] Phím `A` hiện/ẩn đáp án, chữ hiện dần từng ô bằng animation.
- [ ] Câu 1 `←` về Tặng hoa; câu 15 `→` sang Tea break.
- [ ] Không có timer, không tự chuyển câu, không tính điểm.
- [ ] Không có API/backend hoặc yêu cầu đăng nhập.
- [ ] Tài nguyên (ảnh, video, font) được đóng gói cục bộ.
- [ ] `npm run build` chạy thành công; mở được `dist/index.html` khi không có mạng.
- [ ] Có README hướng dẫn khởi chạy và vận hành sự kiện.

## 12. Chạy dự án

Các lệnh dự kiến sau khi khởi tạo project:

```bash
npm create vite@latest october-20-event -- --template vue
cd october-20-event
npm install
npm install -D sass
npm run dev
```

Khi hoàn tất:

```bash
npm run build
npm run preview   # hoặc mở trực tiếp dist/index.html (nhờ base: './')
```

Để chạy trong ngày tổ chức, nên mở bản production đã kiểm tra, kết nối máy chiếu trước, bật chế độ toàn màn hình và thử phím tắt. Nếu chạy không có internet, cần đảm bảo toàn bộ ảnh/video/font đều nằm trong project và đã được build.

## 13. Checklist trước sự kiện

- [ ] Thay placeholder bằng logo và tên công ty chính thức.
- [ ] Duyệt lời chúc, tên/chức danh người phát biểu.
- [ ] Thay câu hỏi mẫu bằng 15 câu đã duyệt, kiểm tra đáp án và số chữ cái.
- [ ] In bản đáp án cho MC; chuẩn bị quà.
- [ ] Kiểm tra laptop, cáp HDMI/USB-C, âm thanh và máy chiếu.
- [ ] Chạy thử phím tắt với đúng bút trình chiếu, trình duyệt và máy sẽ dùng.
- [ ] Tắt thông báo hệ điều hành, đóng ứng dụng không liên quan.
- [ ] Có bản dự phòng: ảnh nền tĩnh hoặc PDF/slide xuất sẵn.
- [ ] Người hỗ trợ MC biết cách chuyển màn, chuyển câu và hiện đáp án.

---

**Kết quả mong đợi:** Một website trình chiếu sự kiện 20/10 có giao diện Blooming Together nhất quán, điều khiển hoàn toàn bằng bàn phím/bút trình chiếu, mini game Đuổi hình bắt chữ 15 câu với khung ảnh/video và ô chữ hiện đáp án dần bằng animation, không cần backend và có thể vận hành ổn định trên máy tính kết nối máy chiếu.
