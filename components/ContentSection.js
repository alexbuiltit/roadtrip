import React from "react";
import PropTypes from "prop-types";

const ContentSection = ({ key, content }) => {
  if (!key && !content && !content.value) return null;

  return (
    <div>
      <h1>{key}</h1>
      <p>{content.value}</p>
    </div>
  );
};

ContentSection.propTypes = {
  key: PropTypes.string,
  content: PropTypes.object
};

export default ContentSection;
