import PropTypes from "prop-types"

export default function TodoListItem(props) {
    return (
        <li>{props.todo.title}</li> 
    )
}

TodoListItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
}