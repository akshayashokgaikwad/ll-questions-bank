import React from 'react';

class QuestionMain extends React.Component {
  handleChange = ({ target }) => {
    this.props.data.setAnswer(target.value);
    this.forceUpdate();
  }

  render() {
    const question = this.props.data.question;
    const answersGiven = this.props.data.answersGiven;

    const optionChecked = answersGiven[question.q_number] === undefined ? 0 : answersGiven[question.q_number].answerGiven;
    return (
      <div className="question bg-white p-3 border-bottom">
        <div className="d-flex flex-row align-items-center question-title">
          <h3 className="text-danger">Q.</h3>
          <h5 className="mt-1 ml-2">
            {question.question}
          </h5>
        </div>
        {question.image !== null && (
          <div className="d-flex flex-row align-items-center question-title">
            <img src={`images/${question.image}`} alt="LL Parking" />
          </div>
        )}
        {[1, 2, 3].map((item, index) => (
          <div className="ans ml-2" key={`answer-${question.q_number}-${index}`}>
            <label className="radio">
              <input
                type="radio"
                name={`answer${question.q_number}`}
                value={item}
                onChange={this.handleChange}
                checked={item === optionChecked ? true : false}
              />
              <span>
                {question[`option${item}`]}
              </span>
            </label>
          </div>
        ))}
      </div>
    );
  };
}

export default QuestionMain;