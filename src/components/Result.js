import React from "react";
import { connect } from 'react-redux';
import queryString from 'query-string';
import Answers from "./Answers";

class Result extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalAnswerGiven: 0,
      totalCurrectAnswerGiven: 0,
      percentage: 0,
      showAllAnswers: false,
    }
  }

  componentDidMount = () => {
    const answersGiven = this.props.answersGiven;
    let totalCurrectAnswerGiven = 0;
    for (const q in answersGiven) {
      if (Object.hasOwnProperty.call(answersGiven, q)) {
        const element = answersGiven[q];
        if (element.correctAnswer === element.answerGiven) {
          totalCurrectAnswerGiven = totalCurrectAnswerGiven + 1;
        }
      }
    }

    const totalAnswerGiven = Object.keys(answersGiven).length;
    let percentage = (parseInt(totalCurrectAnswerGiven) / parseInt(totalAnswerGiven)) * 100;
    percentage = isNaN(percentage) ? 0 : percentage.toFixed(2);

    this.setState({
      totalAnswerGiven: totalAnswerGiven,
      totalCurrectAnswerGiven: totalCurrectAnswerGiven,
      percentage: percentage
    });

    // answer all questions
    // pass ?force in query
    let search = queryString.parse(this.props.location.search);
    this.force = typeof search.force !== 'undefined';
    this.allQuestionsAnswered = parseInt(this.props.totalQuestions) === parseInt(this.state.totalAnswerGiven);
    this.showResult = this.force || this.allQuestionsAnswered;

    // @todo
    this.showResult = true;
  }

  tryAgain = () => {
    // first clear answers given from store, then redirect
    this.props.history.push("/");
  };

  answers = () => {
    this.setState({ showAllAnswers: true });
  };

  render() {
    if (!this.showResult) {
      return (
        <div style={{ textAlign: 'center' }}>
          <p>
            <b>
              Please answer all questions to see the final results!
            </b>
          </p>
          <button
            className="btn btn-primary border-success align-items-center btn-success"
            type="button"
            onClick={this.tryAgain}
          >
            Try Again
              </button>
        </div>
      );
    }

    return (
      <div>
        <div>
          <div>
            <div style={{ textAlign: 'center' }}>
              <h1>Result:</h1>
              {this.state.totalCurrectAnswerGiven} of {this.state.totalAnswerGiven}
              <p>
                <b>{`${this.state.percentage}%`}</b>
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button
                className="btn btn-primary border-success align-items-center btn-success"
                type="button"
                onClick={this.answers}
              >
                Check your answer
              </button>
              &nbsp;&nbsp;
              <button
                className="btn btn-primary border-success align-items-center btn-success"
                type="button"
                onClick={this.tryAgain}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
        <hr />
        {this.state.showAllAnswers && <Answers />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    answersGiven: state.answersGiven,
    totalQuestions: state.totalQuestions
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Result);