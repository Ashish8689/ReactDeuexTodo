import React, { useState } from "react";
import "./App.css";
import TodoItem from "./TodoItem";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

function App() {
  const [inputvalue, setinputvalue] = useState("");
  const [todos, settodos] = useState([]);

  // **************  Handle Submit for Input value  *******************

  const HandleSubmit = (e) => {
    e.preventDefault();
    // ********  For New Todos  ************

    if (inputvalue.length !== 0) {
      settodos([
        ...todos,
        {
          id: new Date(),
          value: inputvalue,
          status: false,
        },
      ]);

      setinputvalue("");
    } else {
      alert("Please enter details !!!");
    }
    // }
  };

  // ***************  Handle Delete Todo  ***********************

  const HandleDelete = (id) => {
    const filtertodo = todos.filter((todo) => todo.id !== id);
    settodos(filtertodo);
  };

  // ***************  Handle Check Todo  ***********************

  const HandleCheck = (id) => {
    const updatedtodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.status = !todo.status;
      }
      return todo;
    });
    settodos(updatedtodos);
  };

  // ***************  Handle Check Todo  ***********************

  const HandleEdit = (id, newinput) => {
    const updatedtodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.value = newinput;
      }
      return todo;
    });
    settodos(updatedtodos);
  };

  return (
    <div className="App">
      <div className="app-inner-container">
        {/* **************   Input Container start   ********************* */}
        <div className="input-box-container">
          <form onSubmit={HandleSubmit}>
            <div className="form-container">
              <input
                type="text"
                value={inputvalue}
                onChange={(e) => setinputvalue(e.target.value)}
                placeholder="Enter items to add ..."
              />

              <Button className="button" onClick={HandleSubmit}>
                <AddIcon className="addbutton" />
              </Button>
            </div>
          </form>
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

          {/* **************  Clear Entire Todo array  ********************/}

          {todos.length > 0 && (
            <Button className="clear-container" onClick={() => settodos([])}>
              <h2 className="clear">All Clear</h2>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
