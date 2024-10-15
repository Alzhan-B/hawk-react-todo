import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";

export default function TodoList({ todoList, onRemoveTodo, onToggleComplete }) {
  return (
    <>
      <ul>
        {todoList.map(function (todoItem) {
          return (
            <TodoListItem
              key={todoItem.id}
              todo={todoItem}
              onRemoveTodo={onRemoveTodo}
              onToggleComplete={onToggleComplete}
              id={todoItem.id}
            />
          );
        })}
      </ul>
    </>
  );
}

// TodoList.propTypes = {
//   todoList: PropTypes.array.isRequired,
//   onRemoveTodo: PropTypes.func.isRequired,
//   onToggleComplete: PropTypes.func.isRequired,
// }.isRequired;

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
}.isRequired;
