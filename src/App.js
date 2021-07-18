import React, { useState } from "react";
import "./App.css";
import TodoItem from "./TodoItem";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false);
  const [selectedCheck, setSelectedCheck] = useState(false);
  const [singleCheck, setSingleCheck] = useState(false);
  const [singleEdit, setSingleEdit] = useState(false);

  // **************  Handle Submit for Input value  *******************

  const HandleSubmit = (event) => {
    if (inputValue.length === 0) {
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
    
    // *************  Checking if Single todo is checked or not  ****************
    const SearchSingleCheck = updatedTodos.find(todo => todo.isCompleted === true);
    if(SearchSingleCheck){
      setSingleCheck(true);
    }
    else{
      setSingleCheck(false);
    }

    // **********  Sortings as per isCompleted  ***********
    setTodos(updatedTodos.sort((x) => (x.isCompleted ? 1 : -1)));
  };

  // ***************  Handle Edit Todo  ***********************

  const HandleEdit = (id, newInput) => {
    setSingleEdit(true);
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
    setSelectedCheck(false);
    setError(false);
    setSingleCheck(false);
  };


  // ***************  Handle Selected Checkbox  *******************

  const HandleSelectedCheckbox = () =>{
    setSelectedCheck(!selectedCheck);
    const originalTodo = todos.slice();
    const updatedTodo = originalTodo.map(todo => {
       if(selectedCheck === false){
         todo.isCompleted = true;
       }
       else{
         todo.isCompleted = false;
         setSingleCheck(false);
       }
       return todo
      });

     setTodos(updatedTodo);
  }

  // **************** Handle Selected Clear  **********************

  const HandleSelectedClear = () =>{
    const originalTodo = todos.slice();
    const updatedTodo = originalTodo.filter(todo => todo.isCompleted !== true);
    setTodos(updatedTodo);
    setSelectedCheck(false);
    setInputValue("");
    setError(false);
    setSingleCheck(false);
  }


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
             disabled={selectedCheck || singleEdit}
           />
          </div>

          {error ? <p className="error">Please enter todo item*</p> : ""}
        </div>

        {/* *****************  Todos Container block  ***************** */}
        <div className="todo-container">

          {/* *************** Selected Clear Container  ******************** */}
          {singleCheck ? (
              <div className="selected-clear-container">
              <Checkbox
              className="selected-checkbox"
              checked={selectedCheck}
                onChange={HandleSelectedCheckbox}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              <div className="selected-clear-button-container" onClick={HandleSelectedClear}>
                <Button className="selected-clear-button">Clear Selected</Button>
              </div>
            </div>
          ) : " " }
         

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
