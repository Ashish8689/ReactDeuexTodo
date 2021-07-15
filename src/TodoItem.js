import React, { useState } from "react";
import "./App.css";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";

function TodoItem({
  todo: { id, value, status },
  HandleDelete,
  HandleCheck,
  HandleEdit,
}) {
  const [inputDisable, setinputDisabled] = useState(true);
  const [newinput, setnewinput] = useState(value);

  const HandleSubmit = (e) => {
    e.preventDefault();
    HandleEdit(id, newinput);
    setinputDisabled(true);
    // setnewinput(value);
    document.querySelector(".todo-name").style.background = "transparent";
  };

  // ***********  After clicking edit button  *************
  const HandleChangeValue = (e) => {
    if (status === true) {
      alert("Item is Completed");
    } else {
      setinputDisabled(!inputDisable);
      setnewinput(value);
      document.querySelector(".todo-name").style.background = "#dee1ec";
    }
  };

  return (
    <div className={status ? "todo-block completed" : "todo-block"}>
      <div className="left-todo">
        <form onSubmit={HandleSubmit}>
          <input type="checkbox" onClick={() => HandleCheck(id)} />
          <input
            type="text"
            value={inputDisable ? value : newinput}
            onChange={(e) => setnewinput(e.target.value)}
            className="todo-name"
            autoFocus="true"
            disabled={inputDisable}
          />
        </form>
        {/* <h1 className="todo-name">{value}</h1> */}
      </div>

      <div className="right-todo">
        <div className="edit-todo-container" onClick={HandleChangeValue}>
          <EditIcon className="edittodo" />
        </div>
        <div className="clear-todo-container">
          <ClearIcon className="cleartodo" onClick={() => HandleDelete(id)} />
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
