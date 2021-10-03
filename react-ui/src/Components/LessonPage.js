import React from "react";
import Question from "./Question";
import axios from "axios";

// function to generate a question and answer depending on the difficulty level
// receive the difficultyLevel of the student and return a question and the correct answer

function generateQuestionAnswer(difficultyLevel) {
  if (difficultyLevel === 1) {
    // single digit addition
    let integer1 = Math.floor(Math.random() * 10) + 1;
    let integer2 = Math.floor(Math.random() * 10) + 1;
    let answer = integer1 + integer2;
    let question = `${integer1} + ${integer2}`;
    return { question: question, answer: answer };
  } else if (difficultyLevel === 2) {
    //   double digit addition
    let integer1 = Math.floor(Math.random() * 100) + 1;
    let integer2 = Math.floor(Math.random() * 100) + 1;
    let answer = integer1 + integer2;
    let question = `${integer1} + ${integer2}`;
    return { question: question, answer: answer };
  } else if (difficultyLevel === 3) {
    //   single digit multiplication
    let integer1 = Math.floor(Math.random() * 10) + 1;
    let integer2 = Math.floor(Math.random() * 10) + 1;
    let answer = integer1 * integer2;
    let question = `${integer1} x ${integer2}`;
    return { question: question, answer: answer };
  }
}

// declare the coutUpTimer variable so that when we clearinterval it is accessible by the handle submit answer function
var countUpTimer;

class LessonPage extends React.Component {
  constructor(props) {
    super(props);

    // initialise the state for the lesson
    this.state = {
      questionCount: 0,
      correctCount: 0,
      elapsedTime: 0,
      question: "",
      answer: null,
      answerInput: "",
    };

    // bind all the functions to this
    this.startTimer = this.startTimer.bind(this);
    this.countUp = this.countUp.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.postLessonResult = this.postLessonResult.bind(this);
  }

  handleInputChange(event) {
    this.setState({ answerInput: event.target.value });
  }

  // post function which is called as a callback after setState to make sure the correctCount is correct as setstate is asynchronous so
  // correctcount hasn't been updated by the time the data is posted

  postLessonResult() {
    let lessonDate = new Date();
    lessonDate = lessonDate.toISOString().split("T")[0];
    //   send the results to the DB
    axios
      .post("/submitlessonresults", {
        username: this.props.username,
        date: lessonDate,
        difficultyLevel: this.props.difficultyLevel,
        score: this.state.correctCount,
        totalTime: this.state.elapsedTime,
      })
      .then(
        (response) => {},
        (error) => {
          alert(error.response.data);
        }
      );
  }

  //   function to handle the next question when they submit an answer
  handleSubmitAnswer(answer) {
    // handle if it was the tenth question then submit the results to the DB and display the results for the kiddo
    if (this.state.questionCount === 10) {
      // send results to Db, display results for the quiz, I can display results in the UI
      // clear interval
      let intAnswer = parseInt(answer);

      if (intAnswer === this.state.answer) {
        // we need to make sure the state is updated before posting the data to the backend, so we use a callback function in setState, so that
        // the count is incremented, and once this has completed, the postLessonResult function posts the correct score to the backend
        // we don't need to do this for an incorrect last question
        this.setState({ correctCount: this.state.correctCount + 1 }, () =>
          this.postLessonResult()
        );
      } else {
        this.postLessonResult();
      }
      clearInterval(countUpTimer);
      this.setState({ questionCount: this.state.questionCount + 1 });
    } else {
      let intAnswer = parseInt(answer);
      if (intAnswer === this.state.answer) {
        this.setState({ correctCount: this.state.correctCount + 1 });
      }

      //   set up the next new random question and answer
      let questionAnswer = generateQuestionAnswer(this.props.difficultyLevel);
      this.setState({
        questionCount: this.state.questionCount + 1,
        question: questionAnswer.question,
        answer: questionAnswer.answer,
        answerInput: "",
      });
    }
  }

  //   function to handle the start of the quiz
  handleStart() {
    // start the clock
    this.startTimer();

    // change the first question by generating a question
    let questionAnswer = generateQuestionAnswer(this.props.difficultyLevel);

    this.setState({
      questionCount: this.state.questionCount + 1,
      question: questionAnswer.question,
      answer: questionAnswer.answer,
    });
  }

  // start the elapsed time clock
  startTimer() {
    // run the countup function which adds one to the elapsedtime and setinterval to run every second
    countUpTimer = setInterval(this.countUp, 1000);
  }

  // add 1 second to the clock after each second
  countUp() {
    this.setState(({ elapsedTime }) => ({ elapsedTime: elapsedTime + 1 }));
  }
  render() {
    return (
      <div id="lessonPageContainer">
        <h2 className="classAbout">
          Welcome to your next lesson {this.props.username}{" "}
        </h2>
        <div id="timeTaken">
          Total time:{" "}
          {new Date(this.state.elapsedTime * 1000).toISOString().substr(11, 8)}{" "}
          🕒
        </div>
        {this.state.questionCount === 0 ? (
          <div>
            <button className="button-66" onClick={this.handleStart}>
              Start Quiz
            </button>
          </div>
        ) : this.state.questionCount === 11 ? (
          <div>
            <h2 className="classAbout">
              Well Done! You got {this.state.correctCount} out of 10{" "}
            </h2>
            <a href="/home">
              <button className="button-66">Done</button>
            </a>
          </div>
        ) : (
          <Question
            questionCount={this.state.questionCount}
            handleSubmitAnswer={this.handleSubmitAnswer}
            question={this.state.question}
            answerInput={this.state.answerInput}
            handleInputChange={this.handleInputChange}
          />
        )}
      </div>
    );
  }
}

export default LessonPage;
