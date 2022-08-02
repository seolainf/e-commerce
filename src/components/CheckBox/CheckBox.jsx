import React from "react";
import PropTypes from "prop-types";
import { useRef } from "react";
import "./checkbox.scss";

const CheckBox = (props) => {
  const inputRef = useRef(null);
  const onChange = () => {
    if (props.onChange) {
      props.onChange(inputRef.current);
    }
  };
  return (
    <label htmlFor={props.title} className="filter">
      <input
        type="checkbox"
        name=""
        id={props.title}
        ref={inputRef}
        onChange={onChange}
        checked={props.checked}
      />
      <span>{props.title}</span>
    </label>
  );
};

CheckBox.propTypes = {
  title: PropTypes.string,
};

export default CheckBox;
