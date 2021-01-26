import React from 'react';
import store from '../redux/store';

class QuestionFooter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nextDisabled: true,
      prevDisabled: true
    };
  }


  componentDidMount = () => {
    this.unsubscribe = store.subscribe(() => {
      const currentState = store.getState();

      let currentQuestionNumber = currentState.currentQuestionNumber;
      const answersGiven = currentState.answersGiven;

      const nextDisabled = !(currentQuestionNumber in answersGiven);
      const prevDisabled = (currentQuestionNumber === 1);

      this.setState({
        nextDisabled: nextDisabled,
        prevDisabled: prevDisabled
      });

      const qNumbers = currentState.qNumbers;
      currentQuestionNumber = currentQuestionNumber.toString();
      this.nextQuestionNumber = qNumbers[qNumbers.indexOf(currentQuestionNumber) + 1];
      this.prevQuestionNumber = qNumbers[qNumbers.indexOf(currentQuestionNumber) - 1];

      this.lastQuestion = currentQuestionNumber !== currentState.totalQuestions;
    });
  }

  componentWillUnmount = () => this.unsubscribe();

  previousQuestion = () => this.props.data.setQuestion(this.prevQuestionNumber);

  nextQuestion = () => this.props.data.setQuestion(this.nextQuestionNumber);

  showResult = () => this.props.data.history.push("/result");

  render() {
    return (
      <div className="d-flex flex-row justify-content-between align-items-center p-3 bg-white">
        <button
          className="btn btn-primary d-flex align-items-center btn-danger"
          type="button"
          onClick={this.previousQuestion}
          disabled={this.state.prevDisabled}
        >
          <i className="fa fa-angle-left mt-1 mr-1"></i>
          &nbsp;Previous
        </button>

        {this.lastQuestion ? (
          <button
            className="btn btn-primary border-success align-items-center btn-success"
            type="button"
            onClick={this.nextQuestion}
            disabled={this.state.nextDisabled}
          >
            Next
            <i className="fa fa-angle-right ml-2"></i>
          </button>
        ) : (
            <button
              className="btn btn-primary border-success align-items-center btn-success"
              type="button"
              onClick={this.showResult}
              disabled={this.state.nextDisabled}
            >
              Result
              <i className="fa fa-angle-right ml-2"></i>
            </button>
          )}

      </div>
    );
  };
}

export default QuestionFooter;