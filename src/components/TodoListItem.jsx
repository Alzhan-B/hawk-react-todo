import PropTypes from "prop-types";
import style from "./TodoListItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function TodoListItem({
  todo,
  onRemoveTodo,
  id,
  onToggleComplete,
}) {
  return (
    <li className={style.ListItem}>
      <input
        className="checkbox"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(id)}
      />
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.title}
      </span>
      <button onClick={() => onRemoveTodo(id)} className={style.removeButton}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </li>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
