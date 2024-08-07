import TodoList from "./TodoList"
import AddTodoForm from "./AddTodoForm";
import "./App.css";
import { useEffect, useState } from "react";

// function useSemiPersistentState() {
//   const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('savedTodoList')) || [])

//   useEffect(() => {localStorage.setItem('savedTodoList', JSON.stringify(todoList))}, [todoList])

//   return [todoList, setTodoList]
// }

function App() {
  // const [todoList, setTodoList] = useSemiPersistentState();
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('savedTodoList')) || [])

  useEffect(() => {localStorage.setItem('savedTodoList', JSON.stringify(todoList))}, [todoList])

  
  function addTodo (newTodo) {
    setTodoList([...todoList, newTodo])
  }

  function removeTodo(id) {
    const filteredTodo = todoList.filter((todo) => todo.id !== id )
    setTodoList(filteredTodo)
  }

  return ( 
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  );
}

export default App;
