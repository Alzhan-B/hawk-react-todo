import TodoList from "./TodoList"
import AddTodoForm from "./AddTodoForm";
import "./App.css";

function App() {
  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm />
      <TodoList />
    </>
  );
}

export default App;
