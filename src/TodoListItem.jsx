import PropTypes from "prop-types";
import style from "./TodoListItem.module.css";

export default function TodoListItem({ todo, onRemoveTodo, id }) {
  return (
    <li className={style.ListItem}>
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
