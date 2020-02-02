import React from "react";

import { UserConsumer } from "helpers/UserContext";
import styled from "styled-components";
import TripList from "components/TripList";
import MainLayout from "components/MainLayout";

import {
  // createTrip,
  // joinTrip,
  deleteTrip
  // getTripIds,
  // getTrips
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
  return (
    <MainLayout>
      <MainContent>
        <div className="row">
          <UserConsumer>
            {value => {
              return (
                <div>
                  {value && value.user && value.user.displayName}
                  {value && value.trips && (
                    <TripList trips={value.trips} removeTrip={deleteTrip} />
                  )}
                </div>
              );
            }}
          </UserConsumer>
        </div>
      </MainContent>
    </MainLayout>
  );
};

export default Index;
