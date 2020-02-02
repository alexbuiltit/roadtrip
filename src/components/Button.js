import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.component.button.font.size};
  font-weight: ${props => props.theme.component.button.font.weight};
  line-height: ${props => props.theme.component.button.font.lineHeight};
  border-radius: ${props => props.theme.component.button.radius};
  padding: ${props => props.theme.component.button.padding};
  border: 2px solid ${props => props.theme.colors.primary};
  transition: all ease ${props => props.theme.transition.duration};
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.primary};
  }
`;

const Button = ({ action, label }) => {
  return <StyledButton onClick={() => action()}>{label}</StyledButton>;
};

Button.propTypes = {
  action: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default Button;
