import PropTypes from "prop-types"

export default function TodoListItem({todo}) {
    return (
        <li>{todo.title}</li> 
    )
}

TodoListItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired
}