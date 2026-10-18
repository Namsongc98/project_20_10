import { computed, ref } from 'vue'
import { quizQuestions } from '@/data/quizQuestions'

// State game dùng chung (singleton) để App.vue nhận phím và QuizSlide hiển thị; chỉ giữ trong bộ nhớ
const questionIndex = ref(0)
const isAnswerVisible = ref(false)

export function useQuizGame() {
  const question = computed(() => quizQuestions[questionIndex.value])
  const total = quizQuestions.length

  function goToQuestion(index) {
    questionIndex.value = Math.min(Math.max(index, 0), total - 1)
    isAnswerVisible.value = false
  }

  // Trả về false khi đã ở câu cuối/đầu để App.vue chuyển sang màn kế/trước
  function nextQuestion() {
    if (questionIndex.value >= total - 1) return false
    goToQuestion(questionIndex.value + 1)
    return true
  }

  function prevQuestion() {
    if (questionIndex.value <= 0) return false
    goToQuestion(questionIndex.value - 1)
    return true
  }

  function toggleAnswer() {
    isAnswerVisible.value = !isAnswerVisible.value
  }

  function hideAnswer() {
    isAnswerVisible.value = false
  }

  return {
    question,
    questionIndex,
    total,
    isAnswerVisible,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    toggleAnswer,
    hideAnswer,
  }
}
