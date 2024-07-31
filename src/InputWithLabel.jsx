import PropTypes from "prop-types";

export function InputWithLabel(props) {
  return (
    <>
      <label htmlFor="todoTitle">{props.label} </label>
      <input
        value={props.todoTitle}
        onChange={props.handleTitleChange}
        type="text"
        id="todoTitle"
        name="title"
      ></input>
    </>
  );
}

InputWithLabel.propTypes = {
  todoTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
}.isRequired;
