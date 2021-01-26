import React from 'react';

class QuestionHeader extends React.Component {
  render() {
    const currentQuestionNumber = this.props.data.currentQuestionNumber;
    const totalQuestions = this.props.data.totalQuestions;

    return (
      <div className="question bg-white p-3 border-bottom">
        <div className="d-flex flex-row justify-content-between align-items-center mcq">
          <h4>LL Question Banks</h4>
          <span>
            ({`${currentQuestionNumber} of ${totalQuestions}`})
          </span>
        </div>
      </div>
    );
  };
}

export default QuestionHeader;