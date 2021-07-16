import React, { useState } from "react";
import "./App.css";
import TodoItem from "./TodoItem";
import Button from "@material-ui/core/Button";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false);

  // **************  Handle Submit for Input value  *******************

  const HandleSubmit = (event) => {
    if (inputValue.length == 0) {
      setError(true);
    } else {
      if (event.key === "Enter") {
        setTodos([
          {
            id: new Date().getTime(),
            TodoInputValue: inputValue,
            isCompleted: false,
          },
          ...todos,
        ]);
        setInputValue("");
      }
    }
  };

  // ***************  Handle Delete Todo  ***********************

  const HandleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // ***************  Handle Check Todo  ***********************

  const HandleCheck = (id) => {
    const originalTodo = todos.slice();
    const updatedTodos = originalTodo.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });

    // **********  Sortings as per isCompleted  ***********
    setTodos(updatedTodos.sort((x) => (x.isCompleted ? 1 : -1)));
  };

  // ***************  Handle Edit Todo  ***********************

  const HandleEdit = (id, newInput) => {
    const originalTodo = todos.slice();
    const updatedTodos = originalTodo.map((todo) => {
      if (todo.id === id) {
        todo.TodoInputValue = newInput;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // ***************  Handle All Clear Todo  ********************

  const HandleAllClear = () => {
    setTodos([]);
    setInputValue("");
    setError(false);
  };

  return (
    <div className="App">
      <div className="app-inner-container">
        {/* ************  Title container start  ***************** */}
        <div className="title-container">
          <h1 className="todo-title">TodoList</h1>
        </div>

        {/* **************   Input Container start   ********************* */}
        <div className="input-box-container">
          <div className="form-container">
            <input
              type="text"
              id="name"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setError(false);
              }}
              placeholder="Add your new Todo"
              onKeyPress={HandleSubmit}
              autoComplete="off"
            />
          </div>

          {error ? <p className="error">Please enter todo item*</p> : ""}
        </div>

        {/* *****************  Todos Container block  ***************** */}
        <div className="todo-container">
          {todos.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              index={index}
              HandleDelete={HandleDelete}
              HandleCheck={HandleCheck}
              HandleEdit={HandleEdit}
            />
          ))}
        </div>
        {/* ****** Todo container end ****** */}

        {/* **************  Clear Entire Todo array  ********************/}

        {todos.length > 0 && (
          <div className="clear-container" onClick={HandleAllClear}>
            <Button className="clear">All Clear</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
