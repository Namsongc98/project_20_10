import { computed, ref } from 'vue'
import { quizQuestions } from '@/data/quizQuestions'

// State game dùng chung (singleton) để App.vue nhận phím và QuizSlide hiển thị; chỉ giữ trong bộ nhớ
// isIntro: đang ở màn giới thiệu trước câu 1
const isIntro = ref(true)
const questionIndex = ref(0)
const isAnswerVisible = ref(false)
const isHintVisible = ref(false)

export function useQuizGame() {
  const question = computed(() => quizQuestions[questionIndex.value])
  const total = quizQuestions.length

  function goToQuestion(index) {
    isIntro.value = false
    questionIndex.value = Math.min(Math.max(index, 0), total - 1)
    isAnswerVisible.value = false
    isHintVisible.value = false
  }

  function goToIntro() {
    goToQuestion(0)
    isIntro.value = true
  }

  // Thứ tự: giới thiệu → câu 1 → … → câu cuối.
  // Trả về false khi đã ở câu cuối/màn giới thiệu để App.vue chuyển sang màn kế/trước
  function nextQuestion() {
    if (isIntro.value) {
      goToQuestion(0)
      return true
    }
    if (questionIndex.value >= total - 1) return false
    goToQuestion(questionIndex.value + 1)
    return true
  }

  function prevQuestion() {
    if (isIntro.value) return false
    if (questionIndex.value <= 0) goToIntro()
    else goToQuestion(questionIndex.value - 1)
    return true
  }

  // Q/G không có tác dụng ở màn giới thiệu; trả về true nếu vừa hiện đáp án
  function toggleAnswer() {
    if (isIntro.value) return false
    isAnswerVisible.value = !isAnswerVisible.value
    return isAnswerVisible.value
  }

  function hideAnswer() {
    isAnswerVisible.value = false
    isHintVisible.value = false
  }

  // Phím G: hiện/ẩn gợi ý của câu hiện tại (câu không có gợi ý thì bỏ qua)
  function toggleHint() {
    if (isIntro.value || !question.value.hint) return
    isHintVisible.value = !isHintVisible.value
  }

  return {
    question,
    isIntro,
    questionIndex,
    total,
    isAnswerVisible,
    isHintVisible,
    goToQuestion,
    goToIntro,
    nextQuestion,
    prevQuestion,
    toggleAnswer,
    toggleHint,
    hideAnswer,
  }
}
