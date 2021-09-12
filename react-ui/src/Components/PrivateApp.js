import "../App.css";
import Todo from "./Todo.js";
import Form from "./Form.js";
import React from "react";

class PrivateApp extends React.Component {
  constructor(props) {
    super(props);

    // initialise the state:
    this.state = {
      tasks: [],
      input: "",
    };

    // bind the functions to this
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  // the function for handling the submition of the form
  handleSubmit(event) {
    // the event gets passed in from when the button with type submit gets clicked
    // preventDefault prevents the automatic refreshing of the page and normal behaviour for a submit button
    event.preventDefault();

    // get the tasks that are currently in the state and use es6 deconstruction to make a new list with the added one
    let tasksUpdated = [...this.state.tasks, this.state.input];

    console.log(tasksUpdated);
    // clear the input box once the new task has been added and set the state for tasks to the new array
    this.setState({ tasks: [...tasksUpdated], input: "" });
  }

  // the function for handling the state of the input box
  handleChange(event) {
    // the onchange method from the input box passes this function the event (the change)

    // inputval gets the value from where the event came from (the input box)
    let inputVal = event.target.value;
    // console.log(inputVal);

    // set the new state of the input to the new value with extra letters which gets passed back down in the render method
    this.setState({ input: inputVal });
  }

  // handling the deletion of a task
  handleDelete(name) {
    // I just took the name of the task, I know this could cause issues if someone wants to do two tasks with the same name but thought it would do for now
    // I used the filter method to just get the tasks from the state that were not equal to the name of the one we were trying to delete.
    let updatedTasks = this.state.tasks.filter((task) => task !== name);

    // set the state to the new array without the deleted task
    this.setState({ tasks: updatedTasks });
  }

  render() {
    return (
      <div>
        <h1>Todo List</h1>
        {/* <Form addTask={addTask} /> */}
        <Form
          input={this.state.input}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />

        <h2>Tasks to do:</h2>
        <ul>
          {/* map through the tasks in the state and use the todo component to give them the necessary html for a list */}
          {this.state.tasks.map((task, index) => (
            <Todo name={task} key={index} handleDelete={this.handleDelete} />
          ))}
        </ul>
      </div>
    );
  }
}

export default PrivateApp;
