import TodoListItem from "./TodoListItem";

const todoList = [
    {
      title: "Start task",
      id: 1,
    },
    {
      title: "Review task",
      id: 2,
    },
    {
      title: "Complete task",
      id: 3,
    },
  ];

export default function TodoList() {
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
