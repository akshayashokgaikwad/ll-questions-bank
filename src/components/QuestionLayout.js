import React from 'react';
import QuestionHeader from './QuestionHeader';
import QuestionMain from './QuestionMain';
import QuestionFooter from './QuestionFooter';
import { connect } from 'react-redux';
import { setQuestion, setAnswer } from '../redux';

class QuestionLayout extends React.Component {
  componentDidMount = () => this.props.setQuestion(1);

  render() {
    return (
      <>
        <div className="container mt-5">
          <div className="d-flex justify-content-center row">
            <div className="col-md-10 col-lg-10">
              <div className="border">
                <QuestionHeader data={this.props} />
                <QuestionMain data={this.props} />
                <QuestionFooter data={this.props} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
}

const mapStateToProps = state => {
  return {
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
)(QuestionLayout);