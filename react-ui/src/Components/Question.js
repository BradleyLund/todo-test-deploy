import React from "react";
import TextField from "@material-ui/core/TextField";

class Question extends React.Component {
  render() {
    return (
      <div>
        <div>Question {this.props.questionCount} of 10</div>
        {/* question in a string which is in state which is passed to this component */}
        <div>{this.props.question}</div>

        {/* mui input box */}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="answerInput"
          id="answerInput"
          value={this.props.answerInput}
          onChange={this.props.handleInputChange}
        />
        <button
          className="button-66"
          onClick={() => this.props.handleSubmitAnswer(this.props.answerInput)}>
          Submit Answer
        </button>
      </div>
    );
  }
}

export default Question;
