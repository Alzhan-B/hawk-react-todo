import PropTypes from "prop-types";

export function InputWithLabel(props) {
  return (
    <>
      <label htmlFor="todoTitle">{props.children} </label>
      <input
        value={props.todoTitle}
        onChange={props.handleTitleChange}
        type="text"
        id="todoTitle"
        name="title"
        autoFocus
      ></input>
    </>
  );
}

InputWithLabel.propTypes = {
  todoTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
}.isRequired;
