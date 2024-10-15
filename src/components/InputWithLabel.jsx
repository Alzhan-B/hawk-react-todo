import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

export function InputWithLabel(props) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor="todoTitle" className="label">
        {props.children}
      </label>
      <input
        value={props.todoTitle}
        onChange={props.handleTitleChange}
        type="text"
        id="todoTitle"
        name="title"
        ref={inputRef}
      ></input>
    </>
  );
}

InputWithLabel.propTypes = {
  todoTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
}.isRequired;
