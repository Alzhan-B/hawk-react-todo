export default function AddTodoForm(props) {
    function handleAddTodo (event) {
        event.preventDefault()
        const todoTitle = event.target.title.value
        props.onAddTodo(todoTitle)
        console.log(todoTitle)
        event.target.reset()
    }
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title </label>
            <input type="text" id="todoTitle" name="title"></input>
            <button type="submit">Add</button>
        </form>
    )
}