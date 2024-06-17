import * as React from "react";
import "./App.css";

const todoList = [
  {
    title: "Start task",
    id: 1,
  },
  {
    title: "Review task",
    id: 2,
  },
  {
    title: "Complete task",
    id: 3,
  },
];

function App() {
  return (
    <>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(function (todoItem) {
          return <li key={todoItem.id}>{todoItem.title}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
