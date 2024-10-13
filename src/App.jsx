import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
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

// function sortByCreatedTimeDesc(objectA, objectB) {
//   return new Date(objectB.createdTime) - new Date(objectA.createdTime);
// }


function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const [sortCreatedTimeAsc, setSortCreatedTimeAsc] = useState(true);

  // Reading data from airtable
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
        completed: todo.fields.completed || false // newly added
      }));

      // Sorting with JavaScript
      // const sortedTodos = sortTodos(todos, sortAsc);
      // const sortedTodos = sortTodos(todos);
      // setTodoList(sortedTodos);
      setTodoList(todos)
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  // Creting new data in airtable - POST Method
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
        completed: data.fields.completed || false
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

  // function sortTodos(todos, sortAsc) {
  //   return todos.sort((objectA, objectB) => {
  //     if (sortAsc) {
  //       return sortAscending(
  //         objectA.title.toLowerCase(),
  //         objectB.title.toLowerCase()
  //       );
  //     } else {
  //       return sortDescending(
  //         objectA.title.toLowerCase(),
  //         objectB.title.toLowerCase()
  //       );
  //     }
  //   });
  // }

  function sortTodosByTitle(todos) {
    return todos.sort((objectA, objectB) => {
      return sortAsc
              ? sortAscending(objectA.title.toLowerCase(), objectB.title.toLowerCase())
              : sortDescending(objectA.title.toLowerCase(), objectB.title.toLowerCase());
    })
  }
  // function sortTodos(todos) {
  //   return todos.sort((objectA, objectB) => {
  //      return sortAsc
  //         ? sortAscending(objectA.title.toLowerCase(), objectB.title.toLowerCase())
  //         : sortDescending(objectA.title.toLowerCase(), objectB.title.toLowerCase());
  //   });
  // }

  function sortTodosByCreatedTime(todos) {
    return todos.sort((objectA, objectB) => {
      return sortCreatedTimeAsc
        ? sortByCreatedTimeAsc(objectA, objectB)
        : sortByCreatedTimeDesc(objectA, objectB);
    });
  }

  function handleSortToggleClick() {
    setSortAsc(!sortAsc);
    // setTodoList((prevTodoList) => sortTodosByTitle(prevTodoList, !sortAsc));
    setTodoList((prevTodoList) => sortTodosByTitle([...prevTodoList]));
  }

  function handleSortByCreatedTimeClick() {
    setSortCreatedTimeAsc(!sortCreatedTimeAsc);
    setTodoList((prevTodoList) => sortTodosByCreatedTime([...prevTodoList]));
  }

  return (
    <BrowserRouter>
    <h1>Todo List</h1>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="sort-button-containter">
                <button onClick={handleSortToggleClick} className="sort-button">
                  Sort by Title
                </button>
                <button onClick={handleSortByCreatedTimeClick} className="sort-button">
                  Sort by Time
                </button>
              </div>

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
