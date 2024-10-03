import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const BASE_URL = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;

  // Reading data from airtable
  const fetchData = async () => {
    const options = {};
    options.method = "GET";
    options.headers = {
      Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
    };
    // const url = `https://api.airtable.com/v0/${
    //   import.meta.env.VITE_AIRTABLE_BASE_ID
    // }/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(BASE_URL, options);

      console.log(response);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      console.log(data);

      const todos = data.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.title,
        createdTime: todo.createdTime,
      }));

      setTodoList(todos);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

  // Creting new data in airtable - POST Method
  const addNewTodo = async (newTodo) => {
    const airtableData = {
      fields: {
        title: newTodo.title,
      },
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
      body: JSON.stringify(airtableData),
    };
    // const url = `https://api.airtable.com/v0/${
    //   import.meta.env.VITE_AIRTABLE_BASE_ID
    // }/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(BASE_URL, options);
      console.log(response);
      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      console.log("returned data: ", data);

      const updatedTodo = {
        id: data.id,
        title: data.fields.title,
        createdTime: data.createdTime,
      };

      setTodoList([...todoList, updatedTodo]);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Deleteing data from airtable - DELETE Method
  const removeTodo = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
    // const url = `https://api.airtable.com/v0/${
    //   import.meta.env.VITE_AIRTABLE_BASE_ID
    // }/${import.meta.env.VITE_TABLE_NAME}/${id}`;

    try {
      const response = await fetch(`${BASE_URL}/${id}`, options);

      console.log(response);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      // console.log("returned data: ", data);

      // const updatedTodo = {
      //   id: data.id,
      //   title: data.fields.title,
      //   createdTime: data.createdTime,
      // };

      setTodoList((prevTodoList) =>
        prevTodoList.filter((item) => item.id !== data.id)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // useEffect(() => {
  //   if (!isLoading) {
  //     localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  //   }
  // }, [todoList, isLoading]);

  function addTodo(newTodo) {
    addNewTodo(newTodo);
  }

  // function removeTodo(id) {
  //   const filteredTodo = todoList.filter((todo) => todo.id !== id);
  //   setTodoList(filteredTodo);
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Todo List</h1>
              <AddTodoForm onAddTodo={addTodo} />
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              )}
            </>
          }
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
