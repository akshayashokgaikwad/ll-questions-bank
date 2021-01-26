const SET_QUESTION = 'SET_QUESTION';
const SET_ANSWER = 'SET_ANSWER';

export const setQuestion = currentQuestionNumber => {
  return {
    type: SET_QUESTION,
    currentQuestionNumber: currentQuestionNumber
  }
}

export const setAnswer = (answer) => {
  return {
    type: SET_ANSWER,
    answer: answer
  }
}
