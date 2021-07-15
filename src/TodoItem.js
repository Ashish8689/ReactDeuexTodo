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
  };

  // ***********  After clicking edit button  *************
  const HandleChangeValue = () => {
    setinputDisabled(!inputDisable);
    setnewinput(value);
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
            className={inputDisable ? "todo-name" : "todo-name active"}
            disabled={inputDisable}
          />
        </form>
      </div>

      <div className="right-todo">
        {status ? (
          ""
        ) : (
          <div className="edit-todo-container" onClick={HandleChangeValue}>
            <EditIcon className="edittodo" />
          </div>
        )}

        <div className="clear-todo-container">
          <ClearIcon className="cleartodo" onClick={() => HandleDelete(id)} />
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
