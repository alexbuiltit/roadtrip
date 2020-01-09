import React, { useReducer } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import fire from "../fire";

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const ContentSection = ({ contentKey, content, tripId, currentUser }) => {
  if (!contentKey && !content && !content.value) return null;

  const lockContent = key => {
    const ref = fire.database().ref("trips/" + tripId + "/content/" + key);
    ref.update({ isLocked: true, lockedBy: currentUser.uid });
  };

  const unlockContent = key => {
    const ref = fire.database().ref("trips/" + tripId + "/content/" + key);
    ref.update({ isLocked: false, lockedby: null });
  };
  return (
    <Section>
      <p>{content.value}</p>
      {!content.isLocked && (
        <button onClick={() => lockContent(contentKey)}>Edit content</button>
      )}
      {content.isLocked && (
        <span>Currently being edited by {content.lockedBy}</span>
      )}
      {content.isLocked && content.lockedBy === currentUser.uid && (
        <button onClick={() => unlockContent(contentKey)}>Unlock</button>
      )}
    </Section>
  );
};

ContentSection.propTypes = {
  tripId: PropTypes.string,
  contentKey: PropTypes.string,
  content: PropTypes.object,
  currentUser: PropTypes.object
};

export default ContentSection;
