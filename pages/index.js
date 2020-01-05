import React, { useState, useEffect } from "react";
import fire, { auth, provider } from "../fire";
import TripList from "../components/TripList";
const Index = () => {
  const [user, setUser] = useState();
  const [tripIDs, setTripIDs] = useState();
  const [trips, setTrips] = useState([]);
  const handleSignIn = () => {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      if (user) {
        setUser(user);
        writeUserData(user.uid, user.displayName, user.email);
      }
    });
  };
  const handleLogout = () => {
    fire.auth().signOut();
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
          title: title,
          users: {
            [userId]: true
          }
        }
      });

    fire
      .database()
      .ref("users/" + userId + "/trips")
      .update({
        [newTripKey]: true
      });
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
    console.log(`ids: ${length}`);
    IDs.forEach(ID => {
      getTripById(ID).then(result => {
        i++;
        const tripObject = { id: ID, details: result.details };
        tripsArray.push(tripObject);
        if (i === length) {
          callback(tripsArray);
        }
      });
    });
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
    <div>
      <div className="hero">
        <h1 className="title">
          Hello {user ? user.displayName : "roadtripper"}
        </h1>
        <div className="row">
          {user && trips && <TripList trips={trips} title="testing" />}
          {!user && (
            <button onClick={() => handleSignIn()}>Sign In using google</button>
          )}
          {user && <button onClick={() => handleLogout()}>Logout</button>}
          {user && (
            <button onClick={() => createTrip("Trip Title", user.uid)}>
              Create trip
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
