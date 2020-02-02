import React, { useState, useEffect } from "react";
import fire from "helpers/fire";
import styled from "styled-components";
import TripList from "components/TripList";
import MainLayout from "components/MainLayout";
import Button from "components/Button";
import {
  handleSignIn,
  handleLogout,
  createTrip,
  joinTrip,
  deleteTrip,
  getTrips
} from "helpers/firebaseFunctions";

const MainContent = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 150px auto 0 auto;
  background: #fff;
  border-radius: 25px;
  padding: 25px;
  h1 {
    margin: 0 0 20px 0;
  }
`;

const Index = () => {
  const [user, setUser] = useState();
  const [tripIDs, setTripIDs] = useState();
  const [trips, setTrips] = useState([]);
  let textInput = React.createRef();
  let joinTripInput = React.createRef();

  useEffect(() => {
    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser) {
      setUser(existingUser);
    }
  }, []);

  const getTripIds = (user, callback) => {
    const tripIDsArray = [];
    const ref = fire.database().ref("users/" + user.uid + "/trips");
    ref.once("value").then(function(snapshot) {
      let i = 0;
      const snapshotLength = snapshot.numChildren();
      snapshot.forEach(function(childSnapshot) {
        tripIDsArray.push(childSnapshot.key);
        i++;
        if (i === snapshotLength) callback(tripIDsArray);
      });
    });
  };

  const getTripIDsCallback = results => {
    setTripIDs(results);
  };

  const getTripsCallback = results => {
    setTrips(results);
  };

  useEffect(() => {
    if (user && user.uid) {
      getTripIds(user, getTripIDsCallback);
    } else {
      setTrips();
      setTripIDs();
    }
  }, [user]);

  useEffect(() => {
    if (tripIDs) {
      getTrips(tripIDs, getTripsCallback);
    }
  }, [tripIDs]);

  return (
    <MainLayout>
      <MainContent>
        <h1 className="title">
          Hello {user ? user.displayName : "Roadtripper"}
        </h1>
        <div className="row">
          {user && trips && <TripList trips={trips} removeTrip={deleteTrip} />}
          {!user && (
            <Button
              action={() => handleSignIn(setUser)}
              label="Sign In using google"
            />
          )}
          {user && (
            <Button action={() => handleLogout(setUser)} label="Logout" />
          )}
          {user && (
            <div>
              <input type="text" ref={textInput} />
              <Button
                action={() =>
                  createTrip(
                    textInput.current.value,
                    user.uid,
                    getTripIDsCallback
                  )
                }
                label="Create trip"
              />
            </div>
          )}

          {user && (
            <div>
              <input type="text" ref={joinTripInput} />
              <Button
                action={() => joinTrip(joinTripInput.current.value)}
                label="Join trip"
              />
            </div>
          )}
        </div>
      </MainContent>
    </MainLayout>
  );
};

export default Index;
