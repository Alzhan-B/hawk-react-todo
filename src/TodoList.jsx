import TodoListItem from "./TodoListItem"
import PropTypes from "prop-types"

export default function TodoList({todoList}) {
  return (
    <>
      <ul>
        {todoList.map(function (todoItem) {
          return (
            <TodoListItem key={todoItem.id} todo={todoItem} />
          )
        })}
      </ul>
    </>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.array.isRequired,
  }.isRequired