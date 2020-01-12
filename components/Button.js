import React from "react";
import PropTypes from "prop-types";

const Button = ({ action, label }) => {
  return <button onClick={() => action()}>{label}</button>;
};

Button.propTypes = {
  action: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default Button;
