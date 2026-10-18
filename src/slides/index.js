import WelcomeSlide from './WelcomeSlide.vue'
import OpeningSlide from './OpeningSlide.vue'
import LeadershipSlide from './LeadershipSlide.vue'
import FlowersSlide from './FlowersSlide.vue'
import QuizSlide from './QuizSlide.vue'
import TeaBreakSlide from './TeaBreakSlide.vue'

// Thứ tự màn = thứ tự chương trình; phím 1–6 nhảy theo đúng thứ tự này
export const slides = [
  { id: 'welcome', label: 'Chào mừng', component: WelcomeSlide },
  { id: 'opening', label: 'MC khai mạc', component: OpeningSlide },
  { id: 'leadership', label: 'Lời chúc Ban lãnh đạo', component: LeadershipSlide },
  { id: 'flowers', label: 'Tặng hoa', component: FlowersSlide },
  { id: 'quiz', label: 'Đuổi hình bắt chữ', component: QuizSlide },
  { id: 'tea-break', label: 'Tea break', component: TeaBreakSlide },
]
