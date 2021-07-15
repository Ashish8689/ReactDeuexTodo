import React from "react";
import "./App.css";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";

function TodoItem({
  todo: { id, value, status },
  HandleDelete,
  HandleCheck,
  HandleEdit,
}) {
  return (
    <div className={status ? "todo-block completed" : "todo-block"}>
      <div className="left-todo">
        <input type="checkbox" onClick={() => HandleCheck(id)} />
        <h1 className="todo-name">{value}</h1>
      </div>

      <div className="right-todo">
        <div className="edit-todo-container" onClick={() => HandleEdit(id)}>
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
