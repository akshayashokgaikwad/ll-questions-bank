import questionBanks from '../../questions.json';

let questions = {};
for (const key in questionBanks) {
  if (Object.hasOwnProperty.call(questionBanks, key)) {
    const q_number = questionBanks[key].q_number;
    questions[q_number] = questionBanks[key];
  }
}

let totalQuestions = Object.keys(questions).length;
let q_keys = Object.keys(questions);
q_keys.sort((a, b) => a - b); // For ascending sort
let q_numbers = Object.assign([], q_keys);
totalQuestions = q_keys.pop();


const initialState = {
  questions: questions,
  currentQuestionNumber: 1,
  question: {},
  answersGiven: {},
  totalQuestions: totalQuestions,
  qNumbers: q_numbers,
  totalCorrectAnswerGiven: 0,
  percentage: 0,
}

const questionReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_QUESTION': {
      let currentQuestionNumber = action.currentQuestionNumber;
      const question = questions[currentQuestionNumber];

      return {
        ...state,
        currentQuestionNumber: currentQuestionNumber,
        question: question
      }
    }

    case 'SET_ANSWER': {
      let answersGiven = state.answersGiven;
      answersGiven[state.question.q_number] = {
        correctAnswer: state.question.answer,
        answerGiven: parseInt(action.answer),
      }

      let totalCorrectAnswerGiven = state.totalCorrectAnswerGiven;
      if (parseInt(state.question.answer) === parseInt(action.answer)) {
        totalCorrectAnswerGiven = totalCorrectAnswerGiven + 1;
      }

      return {
        ...state,
        answersGiven: answersGiven,
        totalCorrectAnswerGiven: totalCorrectAnswerGiven,
      }
    }

    default: return state;
  }
}

export default questionReducers;