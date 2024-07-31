import TodoListItem from "./TodoListItem"
import PropTypes from "prop-types"

export default function TodoList({todoList, onRemoveTodo}) {
  return (
    <>
      <ul>
        {todoList.map(function (todoItem) {
          return (
            <TodoListItem key={todoItem.id} todo={todoItem} onRemoveTodo={onRemoveTodo} id={todoItem.id} />
          )
        })}
      </ul>
    </>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.array.isRequired,
  }.isRequired