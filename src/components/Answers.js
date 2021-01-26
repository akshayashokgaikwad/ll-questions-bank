import React from "react";
import { connect } from 'react-redux';
import { setQuestion, setAnswer } from '../redux';
import '../css/answers.css';

class Answers extends React.Component {

  render() {
    const { questions, answersGiven } = this.props;

    return (
      <React.Fragment>
        <h2>LL Question Bank Answers</h2>
        {Object.keys(questions).map((qNumber, index) => {
          const question = questions[qNumber];
          const aswered = answersGiven[question.q_number] ? answersGiven[question.q_number]['answerGiven'] : false;

          return (
            <div className="question bg-white p-3 border-bottom" key={index}>
              <div className="d-flex flex-row align-items-center question-title">
                <h3 className="text-danger">Q{qNumber}.</h3>
                <h5 className="mt-1 ml-2">
                  {question.question}
                </h5>
              </div>
              {question.image !== null && (
                <div className="d-flex flex-row align-items-center question-title">
                  <img src={`images/${question.image}`} alt="LL Parking" />
                </div>
              )}
              <div className={`ans ml-2 ${question.answer === 1 && 'correctAnswer'} ${(aswered && aswered === 1) && 'yourCorrectAnswer'} ${(((aswered && aswered === 1)) && (aswered && aswered !== question.answer)) && 'yourIncorrectAnswer'}`}>
                <label className="radio">
                  <span>
                    {question.option1}
                  </span>

                  <span className="pull-right">
                    {(!(aswered && aswered === 1) && question.answer) === 1 && 'Correct answer'}
                    {aswered && aswered === 1 && 'Your answer'}
                  </span>
                </label>
              </div>

              <div className={`ans ml-2 ${question.answer === 2 && 'correctAnswer'} ${(aswered && aswered === 2) && 'yourCorrectAnswer'} ${(((aswered && aswered === 2)) && (aswered && aswered !== question.answer)) && 'yourIncorrectAnswer'}`}>
                <label className="radio">
                  <span>
                    {question.option2}
                  </span>

                  <span className="pull-right">
                    {(!(aswered && aswered === 2) && question.answer) === 2 && 'Correct answer'}
                    {aswered && aswered === 2 && 'Your answer'}
                  </span>
                </label>
              </div>

              <div className={`ans ml-2 ${question.answer === 3 && 'correctAnswer'} ${(aswered && aswered === 3) && 'yourCorrectAnswer'} ${(((aswered && aswered === 3)) && (aswered && aswered !== question.answer)) && 'yourIncorrectAnswer'}`}>
                <label className="radio">
                  <span>
                    {question.option3}
                  </span>

                  <span className="pull-right">
                    {(!(aswered && aswered === 3) && question.answer) === 3 && 'Correct answer'}
                    {aswered && aswered === 3 && 'Your answer'}
                  </span>
                </label>
              </div>

              {false && [1, 2, 3].map((item, index) => {
                const unAswered = !answersGiven[question.q_number];
                const yourCorrectAnswer = (!unAswered && (item === question.answer === answersGiven[question.q_number]['answerGiven'])) ? true : false;
                const yourIncorrectAnswer = (!unAswered && (question.answer !== answersGiven[question.q_number]['answerGiven'])) ? true : false;
                const correctAnswer = question.answer === item;
                const classes = `${correctAnswer ? 'correctAnswer' : ''} ${yourCorrectAnswer ? 'yourCorrectAnswer' : ''} ${yourIncorrectAnswer ? 'yourIncorrectAnswer' : ''} ${unAswered ? 'unAswered' : ''}`;

                return (
                  <div className={`ans ml-2 ${classes}`} key={`answer-${question.q_number}-${index}`}>
                    <label className="radio">
                      <span>
                        {question[`option${item}`]}
                      </span>

                      <span className="pull-right">
                        {correctAnswer && 'Correct answer'}
                      </span>
                    </label>
                  </div>
                );
              })}
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    questions: state.questions,
    currentQuestionNumber: state.currentQuestionNumber,
    question: state.question,
    answersGiven: state.answersGiven,
    totalQuestions: state.totalQuestions,
    qNumbers: state.qNumbers,
    totalCorrectAnswerGiven: state.totalCorrectAnswerGiven,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setQuestion: currentQuestionNumber => dispatch(setQuestion(currentQuestionNumber)),
    setAnswer: answer => dispatch(setAnswer(answer)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Answers);