import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
  border-radius: 5px;
  padding: 10px 20px;
`;

const Button = ({ action, label }) => {
  return <StyledButton onClick={() => action()}>{label}</StyledButton>;
};

Button.propTypes = {
  action: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default Button;
