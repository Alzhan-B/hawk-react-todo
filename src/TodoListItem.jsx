import PropTypes from "prop-types";

export default function TodoListItem({ todo, onRemoveTodo, id }) {
  return (
    <li>
      {todo.title} <button onClick={() => onRemoveTodo(id)}>Remove</button>
    </li>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    // id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
