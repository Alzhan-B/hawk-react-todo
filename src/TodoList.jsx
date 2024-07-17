import TodoListItem from "./TodoListItem";

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
