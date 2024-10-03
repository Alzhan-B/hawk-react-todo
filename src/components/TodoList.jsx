import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";

export default function TodoList({ todoList, onRemoveTodo }) {
  return (
    <>
      <ul>
        {todoList.map(function (todoItem) {
          return (
            <TodoListItem
              key={todoItem.id}
              todo={todoItem}
              onRemoveTodo={onRemoveTodo}
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
// }.isRequired;

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};
