import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import fire from "../../fire";
import MainLayout from "../../components/MainLayout";
import AddContent from "../../components/AddContent";
import ContentSection from "../../components/ContentSection";

export default function Trip() {
  const [currentID, setCurrentID] = useState();
  const [user, setUser] = useState();
  const [tripContent, setTripContent] = useState();
  const [addNewContent, setAddNewContent] = useState();
  const router = useRouter();
  const submitContent = (type, content) => {
    if (currentID) {
      const ref = fire.database().ref("trips/" + currentID);
      let newContentKey = ref.push().key;
      ref.child("content/").update({
        [newContentKey]: {
          type: type,
          value: content
        }
      });
      setAddNewContent(false);
    }
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setCurrentID(router.query.id);
    const ref = fire.database().ref("trips/" + router.query.id);
    ref.on("value", function(snapshot) {
      setTripContent(snapshot.val());
    });
  }, []);

  useEffect(() => {
    if (tripContent) console.info(tripContent);
  }, [tripContent]);

  let tripContentSections =
    tripContent &&
    tripContent.content &&
    Object.keys(tripContent.content).map(contentKey => {
      // console.log(contentKey);
      // console.log(tripContent.content);
      // console.log(tripContent.content[contentKey]);
      // console.log(tripContent.content[contentKey].value);
      return (
        <ContentSection
          contentKey={contentKey}
          content={tripContent.content[contentKey]}
          tripId={currentID}
          currentUser={user}
        />
      );
    });
  return (
    <MainLayout>
      <h1>{tripContent && tripContent.details.title}</h1>
      <button onClick={() => setAddNewContent(true)}>
        Add content section
      </button>
      {tripContentSections}
      {addNewContent && <AddContent saveContent={submitContent} />}
    </MainLayout>
  );
}
