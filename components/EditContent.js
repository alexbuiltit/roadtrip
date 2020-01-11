import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: #7ecd86;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const InputStyled = styled.input`
  padding: 20px;
  border: none;
`;

const EditContent = ({ content, contentKey, update }) => {
  if (!content) return null;
  const [value, setValue] = useState();
  let dropdownRef = React.createRef();
  let contentRef = React.createRef();
  useEffect(() => {
    if (content.value) {
      setValue(content.value);
    }
  }, []);

  const handleClick = (key, content) => {
    update(key, content);
  };

  return (
    <Section>
      <select ref={dropdownRef}>
        <option value="text">Plain text</option>
      </select>
      <InputStyled
        ref={contentRef}
        type="text"
        defaultValue={value}
        onChange={e => setValue(e.target.value)}
      />
      <button onClick={() => handleClick(contentKey, value)}>Update</button>
    </Section>
  );
};

EditContent.propTypes = {
  content: PropTypes.object,
  contentKey: PropTypes.string,
  update: PropTypes.func
};

export default EditContent;
