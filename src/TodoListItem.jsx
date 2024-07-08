import PropTypes from "prop-types"

export default function TodoListItem(props) {
    return (
        <li>{props.todo.title}</li> 
    )
}

TodoListItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired
}