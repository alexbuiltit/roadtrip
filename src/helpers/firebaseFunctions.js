import fire, { auth, provider } from "./fire";

export const signIn = callback => {
  auth.signInWithPopup(provider).then(result => {
    const user = result.user;
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      callback(user);
      __writeUserData(user.uid, user.displayName, user.email);
    }
  });
};
export const signOut = callback => {
  fire.auth().signOut();
  localStorage.removeItem("user");
  callback();
};

const __writeUserData = (userId, name, email) => {
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

export const createTrip = (title, userId, callback) => {
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

  getTripIds(userId, callback);
};

export const getTripById = id => {
  const ref = fire.database().ref("trips/" + id);
  return ref.once("value").then(snapshot => {
    return snapshot.val();
  });
};

export const getTripIds = (userId, callback) => {
  if (!userId) return null;
  const tripIDsArray = [];
  const ref = fire.database().ref("users/" + userId + "/trips");
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

export const getTrips = (IDs, callback) => {
  const tripsArray = [];
  let i = 1;
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

export const deleteTrip = key => {
  const tripRef = fire.database().ref("trips/");
  // const userRef = fire.database().ref("users/" + user.uid + "/trips");
  tripRef.child(key).remove();
  // userRef.child(key).remove();
  getTripIds(user, getTripIDsCallback);
};

export const joinTrip = key => {
  const tripRef = fire.database().ref("trips/" + key + "/users/" + user.uid);
  const userRef = fire.database().ref("users/" + user.uid + "/trips");

  tripRef.set(true);
  userRef.update({
    [key]: true
  });
};
