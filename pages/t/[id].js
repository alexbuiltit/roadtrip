import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import fire from "../../fire";
import Link from "next/link";
import MainLayout from "../../components/MainLayout";
export default function Trip() {
  const [tripContent, setTripContent] = useState();
  const router = useRouter();

  useEffect(() => {
    const ref = fire.database().ref("trips/" + router.query.id);
    ref.on("value", function(snapshot) {
      setTripContent(snapshot.val());
    });
  }, []);

  useEffect(() => {
    if (tripContent) console.info(tripContent);
  }, [tripContent]);

  return (
    <MainLayout>
      <h1>{tripContent && tripContent.details.title}</h1>
    </MainLayout>
  );
}
