import TodoList from "./TodoList";
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
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async() => {
        
    const options = {
      method: 'GET',
      headers: {
        Authorization:`Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      }
    }
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`
    
    try {
      const response = await fetch(url, options);
    
      if (!response.ok) {
        const message = `Error: ${response.status}`
        throw new Error(message)
      }

      const data = await response.json()
      console.log(data)

      const todos = data.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.title
      }));
      
      setTodoList(todos);
    } catch (error) {
      console.log(error.message)
    }
    setIsLoading(false)
  }


  useEffect(() => {
    fetchData()
    // new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     const object = {
    //       data: {
    //         todoList: JSON.parse(localStorage.getItem("savedTodoList")) || [],
    //       },
    //     };
    //     resolve(object);
    //   }, 2000);
    // }).then((result) => {
    //   setTodoList(result.data.todoList);
    //   setIsLoading(false);
    // });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  function removeTodo(id) {
    const filteredTodo = todoList.filter((todo) => todo.id !== id);
    setTodoList(filteredTodo);
  }

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </>
  );
}

export default App;
