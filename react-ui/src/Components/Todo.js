import React from "react";

function Todo(props) {
  return (
    <li>
      <div>
        {/* the name is passed down from the parent and the handledelete function too */}
        <label>{props.name}</label>
        {/* the handle delete function gets the name of the task and deletes that from the list */}
        <button type="button" onClick={() => props.handleDelete(props.name)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default Todo;
