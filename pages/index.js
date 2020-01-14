import React, { useState, useEffect } from "react";
import fire, { auth, provider } from "../fire";
import styled from "styled-components";
import TripList from "../components/TripList";
import MainLayout from "../components/MainLayout";
import Button from "../components/Button";
import mainBackground from "../assets/img/landing-bg.png";

const BackgroundImage = styled.img`
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  object-fit: cover;
  width: 100%;
  height: 100vh;
`;

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

  useEffect(() => {
    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser) {
      setUser(existingUser);
    }
  }, []);
  let textInput = React.createRef();
  let joinTripInput = React.createRef();
  const handleSignIn = () => {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        writeUserData(user.uid, user.displayName, user.email);
      }
    });
  };
  const handleLogout = () => {
    fire.auth().signOut();
    localStorage.removeItem("user");
    setUser();
  };

  const writeUserData = (userId, name, email) => {
    const ref = fire.database().ref(`users/${userId}`);
    ref.once("value").then(function(snapshot) {
      if (snapshot.exists()) {
        return true;
      } else {
        fire
          .database()
          .ref("users/" + userId)
          .set({
            name: name,
            email: email
          });
      }
    });
  };

  const createTrip = (title, userId) => {
    let newTripKey = fire
      .database()
      .ref()
      .child("trips")
      .push().key;

    fire
      .database()
      .ref("trips/" + newTripKey)
      .set({
        details: {
          title: title
        },
        users: {
          [userId]: true
        }
      });

    fire
      .database()
      .ref("users/" + userId + "/trips")
      .update({
        [newTripKey]: true
      });

    getTripIds(user, getTripIDsCallback);
  };

  const getTripById = id => {
    const ref = fire.database().ref("trips/" + id);
    return ref.once("value").then(snapshot => {
      return snapshot.val();
    });
  };

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

  const getTrips = (IDs, callback) => {
    const tripsArray = [];
    let i = 0;
    const length = IDs.length;
    IDs.forEach(ID => {
      getTripById(ID).then(result => {
        if (result && result.details) {
          i++;
          const tripObject = { id: ID, details: result.details };
          tripsArray.push(tripObject);
        }
        if (i === length) {
          callback(tripsArray);
        }
      });
    });
  };

  const getTripsCallback = results => {
    setTrips(results);
  };

  const deleteTrip = key => {
    const tripRef = fire.database().ref("trips/");
    const userRef = fire.database().ref("users/" + user.uid + "/trips");
    tripRef.child(key).remove();
    userRef.child(key).remove();
    getTripIds(user, getTripIDsCallback);
  };

  const joinTrip = key => {
    const tripRef = fire.database().ref("trips/" + key + "/users/" + user.uid);
    const userRef = fire.database().ref("users/" + user.uid + "/trips");

    tripRef.set(true);
    userRef.update({
      [key]: true
    });
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
        <BackgroundImage src={mainBackground} />
        <h1 className="title">
          Hello {user ? user.displayName : "Roadtripper"}
        </h1>
        <div className="row">
          {user && trips && <TripList trips={trips} removeTrip={deleteTrip} />}
          {!user && (
            <Button
              action={() => handleSignIn()}
              label="Sign In using google"
            />
          )}
          {user && <Button action={() => handleLogout()} label="Logout" />}
          {user && (
            <div>
              <input type="text" ref={textInput} />
              <Button
                action={() => createTrip(textInput.current.value, user.uid)}
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
