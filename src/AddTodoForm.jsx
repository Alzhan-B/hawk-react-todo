import { useState } from "react" 

export default function AddTodoForm({onAddTodo}) {
    const id = Date.now();
    const [todoTitle, setTodoTitle] = useState("")

    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value   
        setTodoTitle(newTodoTitle) 
    }

    const handleAddTodo = (event) => {
        event.preventDefault()
          onAddTodo({title: todoTitle, id: Date.now()})
          setTodoTitle(prevState => "")
    }
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title </label>
            <input value={todoTitle} onChange={handleTitleChange} type="text" id="todoTitle" name="title"></input>
            <button type="submit">Add</button>
        </form>
    )
}