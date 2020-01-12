import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const InputStyled = styled.input`
  padding: 20px;
  border: none;
`;

const AddContent = ({ saveContent, discardContent }) => {
  let dropdownRef = React.createRef();
  let contentRef = React.createRef();
  const submitContent = (type, content) => {
    saveContent(type, content);
  };

  return (
    <Section>
      <select ref={dropdownRef}>
        <option value="text">Plain text</option>
      </select>
      <InputStyled ref={contentRef} type="text" />
      <div>
        <button
          onClick={() =>
            submitContent(dropdownRef.current.value, contentRef.current.value)
          }
        >
          Save
        </button>
        <button onClick={() => discardContent()}>Cancel</button>
      </div>
    </Section>
  );
};

AddContent.propTypes = {
  saveContent: PropTypes.func,
  discardContent: PropTypes.func
};

export default AddContent;
