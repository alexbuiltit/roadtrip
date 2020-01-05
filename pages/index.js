import React, { useState, useEffect } from "react";
import fire, { auth, provider } from "../fire";
import TripList from "../components/TripList";
const Index = () => {
  const [user, setUser] = useState();
  const [activeUserTrips, setActiveUserTrips] = useState();
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

  const getTrips = ids => {
    let allTrips = [];
    ids.map(id => {
      const tripData = fire.database().ref("trips/" + id);
      tripData.on("value", function(snapshot) {
        let individualTrip = {
          id: snapshot.key,
          details: snapshot.child("details").val()
        };
        allTrips.push(individualTrip);
      });
    });
    setActiveUserTrips(allTrips);
  };

  useEffect(() => {
    if (user && user.uid) {
      const currentUsersTrips = fire
        .database()
        .ref("users/" + user.uid + "/trips");
      currentUsersTrips.on("value", function(snapshot) {
        let tripKeys = [];
        snapshot.forEach(function(childSnapshot) {
          tripKeys.push(childSnapshot.key);
        });
        getTrips(tripKeys);
      });
    } else {
      setActiveUserTrips();
    }
  }, [user]);

  return (
    <div>
      <div className="hero">
        <h1 className="title">
          Hello {user ? user.displayName : "roadtripper"}
        </h1>
        <div className="row">
          {user && <TripList trips={activeUserTrips} title="testing" />}
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
