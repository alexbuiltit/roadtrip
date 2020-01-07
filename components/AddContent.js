import React from "react";
import PropTypes from "prop-types";

const AddContent = ({ saveContent }) => {
  let dropdownRef = React.createRef();
  let contentRef = React.createRef();
  const submitContent = (type, content) => {
    debugger;
    saveContent(type, content);
  };
  return (
    <div>
      <select ref={dropdownRef}>
        <option value="text">Plain text</option>
      </select>
      <input ref={contentRef} type="text" />
      <button
        onClick={() =>
          submitContent(dropdownRef.current.value, contentRef.current.value)
        }
      >
        Save
      </button>
    </div>
  );
};

AddContent.propTypes = {
  saveContent: PropTypes.func
};

export default AddContent;
