import React from "react";

function Form(props) {
  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("AuthToken");
    window.location.reload();
  };

  return (
    // all the functions which have the parent component as this get passed down to this component
    <form onSubmit={props.handleSubmit}>
      <h2>
        <label htmlFor="todoInput">What needs to be done?</label>
        <button type="button" onClick={handleLogout}>
          Log out
        </button>
      </h2>
      {/* onChange has the function from the parent component app.js which receives the event onchange of the input */}
      {/* the value of the input is received from the state. and handlechange function is bounded in the parent component and passed down */}
      <input
        type="text"
        id="todoInput"
        name="text"
        value={props.input}
        onChange={props.handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default Form;
