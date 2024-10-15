import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Learn from "./components/Learn";
import "./App.css";

const BASE_URL = `https://api.airtable.com/v0/${
  import.meta.env.VITE_AIRTABLE_BASE_ID
}/${import.meta.env.VITE_TABLE_NAME}`;

function sortAscending(objectA, objectB) {
  return objectA < objectB ? -1 : objectA > objectB ? 1 : 0;
}
function sortDescending(objectA, objectB) {
  return objectA < objectB ? 1 : objectA > objectB ? -1 : 0;
}
function sortByCreatedTimeAsc(objectA, objectB) {
  return new Date(objectA.createdTime) - new Date(objectB.createdTime);
}
function sortByCreatedTimeDesc(objectA, objectB) {
  return new Date(objectB.createdTime) - new Date(objectA.createdTime);
}

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const [sortCreatedTimeAsc, setSortCreatedTimeAsc] = useState(true);

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
    try {
      // Sorting by Aritable view order and field via sending a request
      // const query1 = "?view=Grid%20view";
      // const query2 = "&sort[0][field]=title";
      // const query3 = "&sort[0][direction]=asc";
      // const response = await fetch(BASE_URL+`${query1 + query2 + query3}`, options);

      const response = await fetch(BASE_URL, options);
      console.log(response);
      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      console.log("data: ", data);
      const todos = data.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.title,
        createdTime: todo.createdTime,
        completed: todo.fields.completed || false,
      }));

      // Sorting with JavaScript
      setTodoList(todos, sortAsc);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const addNewTodo = async (newTodo) => {
    const airtableData = {
      fields: {
        title: newTodo.title,
        completed: false,
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
        completed: data.fields.completed || false,
      };

      setTodoList([...todoList, updatedTodo]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleTodoCompletion = async (id) => {
    const todoToUpdate = todoList.find((todo) => todo.id === id);
    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
      body: JSON.stringify({ fields: { completed: updatedTodo.completed } }),
    };

    try {
      const response = await fetch(`${BASE_URL}/${id}`, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setTodoList((prevList) =>
        prevList.map((todo) =>
          todo.id === data.id
            ? { ...todo, completed: updatedTodo.completed }
            : todo
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeTodo = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    try {
      const response = await fetch(`${BASE_URL}/${id}`, options);
      console.log(response);
      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();

      setTodoList((prevTodoList) =>
        prevTodoList.filter((item) => item.id !== data.id)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function addTodo(newTodo) {
    addNewTodo(newTodo);
  }

  function sortTodosByTitle(todos) {
    return todos.sort((objectA, objectB) => {
      return sortAsc
        ? sortAscending(
            objectA.title.toLowerCase(),
            objectB.title.toLowerCase()
          )
        : sortDescending(
            objectA.title.toLowerCase(),
            objectB.title.toLowerCase()
          );
    });
  }

  function sortTodosByCreatedTime(todos) {
    return todos.sort((objectA, objectB) => {
      return sortCreatedTimeAsc
        ? sortByCreatedTimeAsc(objectA, objectB)
        : sortByCreatedTimeDesc(objectA, objectB);
    });
  }

  function handleSortToggleClick() {
    setSortAsc(!sortAsc);
    setTodoList((prevTodoList) => sortTodosByTitle(prevTodoList, !sortAsc));
  }

  function handleSortByCreatedTimeClick() {
    setSortCreatedTimeAsc(!sortCreatedTimeAsc);
    setTodoList((prevTodoList) => sortTodosByCreatedTime([...prevTodoList]));
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/todos"
          element={
            <>
              <h1>Todo List</h1>
              <div className="sort-button-containter">
                <button onClick={handleSortToggleClick} className="sort-button">
                  Sort by Title
                </button>
                <button
                  onClick={handleSortByCreatedTimeClick}
                  className="sort-button"
                >
                  Sort by Date
                </button>
              </div>

              <AddTodoForm onAddTodo={addTodo} />
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <TodoList
                  todoList={todoList}
                  onRemoveTodo={removeTodo}
                  onToggleComplete={toggleTodoCompletion}
                />
              )}
            </>
          }
        />
        <Route path="/learn" element={<Learn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
