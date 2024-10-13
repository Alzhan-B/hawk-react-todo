import { useState } from "react" 
import PropTypes from "prop-types"
import { InputWithLabel } from "./InputWithLabel"

export default function AddTodoForm({onAddTodo}) {
    const [todoTitle, setTodoTitle] = useState("")

    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value   
        setTodoTitle(newTodoTitle) 
    }

    const handleAddTodo = (event) => {
        event.preventDefault()
        if (!todoTitle) return;
        onAddTodo({title: todoTitle, id: Date.now()})
        setTodoTitle("")
    }
    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel todoTitle={todoTitle} handleTitleChange={handleTitleChange}>
                Title
            </InputWithLabel>
            <button className="button-add" type="submit" disabled={!todoTitle}>Add</button>
        </form>
    )
}

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
    }.isRequired