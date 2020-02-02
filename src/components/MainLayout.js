import React, { useState, useEffect, createContext } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../theme";
import {
  signIn,
  signOut,
  getTripIds,
  getTrips
} from "helpers/firebaseFunctions";
import { UserProvider } from "helpers/UserContext";
import Header from "components/Header";

export const UserContext = createContext();

const MainLayout = props => {
  const [user, setUser] = useState();
  const [trips, setTrips] = useState([]);

  const getTripIDsCallback = results => {
    getTrips(results, getTripsCallback);
  };

  const getTripsCallback = results => {
    setTrips(results);
  };
  useEffect(() => {
    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser) {
      setUser(existingUser);
    }
  }, []);

  useEffect(() => {
    if (!user) setTrips();
  }, [user]);

  useEffect(() => {
    getTripIds(user && user.uid, getTripIDsCallback);
  }, [user]);
  return (
    <ThemeProvider theme={theme}>
      <UserProvider value={{ user: user, trips: trips }}>
        <Header
          user={user}
          handleSignIn={() => signIn(setUser)}
          handleSignOut={() => signOut(setUser)}
        />
        <main>{props.children}</main>
      </UserProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
