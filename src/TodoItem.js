import React, { useState } from "react";
import "./App.css";
import Checkbox from "@material-ui/core/Checkbox";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";

function TodoItem({
  todo: { id, TodoInputValue, isCompleted },
  HandleDelete,
  HandleCheck,
  HandleEdit,
}) {
  const [inputDisable, setInputDisabled] = useState(true);
  const [newInput, setNewInput] = useState(TodoInputValue);

  const HandleSubmit = (event) => {
    if (event.key === "Enter") {
      if (newInput.length > 0) {
        HandleEdit(id, newInput);
        setInputDisabled(true);
      }
    }
  };

  // ***********  After clicking edit button  *************
  const HandleChangeValue = () => {
    setInputDisabled(!inputDisable);
    setNewInput(TodoInputValue);
  };

  return (
    <div className={isCompleted ? "todo-block completed" : "todo-block"}>
      <div className="left-todo">
        <Checkbox
          checked={isCompleted}
          onChange={() => HandleCheck(id)}
          inputProps={{ "aria-label": "primary checkbox" }}
        />

        <input
          id={id}
          type="text"
          value={inputDisable ? TodoInputValue : newInput}
          onChange={(e) => setNewInput(e.target.value)}
          className={inputDisable ? "todo-name" : "todo-name active"}
          disabled={inputDisable}
          onKeyPress={HandleSubmit}
        />
      </div>

      <div className="right-todo">
        {isCompleted ? (
          ""
        ) : (
          <div className="edit-todo-container" onClick={HandleChangeValue}>
            <label htmlFor={id}>
              <EditIcon className="edittodo" />
            </label>
          </div>
        )}

        {inputDisable ? (
          <div
            className="clear-todo-container"
            onClick={() => HandleDelete(id)}
          >
            <ClearIcon className="cleartodo" />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default TodoItem;
