import React, { useReducer } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import fire from "../fire";
import EditContent from "../components/EditContent";

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
    ref.update({
      isLocked: true,
      lockedBy: { id: currentUser.uid, name: currentUser.displayName }
    });
  };

  const unlockContent = key => {
    const ref = fire.database().ref("trips/" + tripId + "/content/" + key);
    ref.update({ isLocked: false, lockedBy: null });
  };

  const updateContent = (key, content) => {
    const ref = fire.database().ref("trips/" + tripId + "/content/" + key);
    ref.update({
      value: content,
      isLocked: false,
      lockedBy: null
    });
  };

  const deleteContent = key => {
    const ref = fire.database().ref("trips/" + tripId + "/content/" + key);
    ref.remove();
  };

  if (content.isLocked && content.lockedBy.id === currentUser.uid) {
    return (
      <EditContent
        content={content}
        contentKey={contentKey}
        update={updateContent}
        remove={deleteContent}
      />
    );
  }
  return (
    <Section>
      <p>{content.value}</p>
      {!content.isLocked && (
        <button onClick={() => lockContent(contentKey)}>Edit content</button>
      )}
      {content.isLocked && (
        <span>Currently being edited by {content.lockedBy.name}</span>
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
