import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";
import Button from "./Button";
const IndividualTrip = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  a {
    font-size: 24px;
    color: #333;
  }
`;

const TripList = ({ trips, removeTrip }) => {
  if (!trips) return null;

  const tripItems = trips.map((trip, idx) => {
    return (
      <IndividualTrip key={idx}>
        <Link href="/t/[id]" as={`/t/${trip.id}`}>
          <a>{trip.details.title}</a>
        </Link>
        <Button action={() => removeTrip(trip.id)} label="Delete trip" />
      </IndividualTrip>
    );
  });
  return <div>{tripItems}</div>;
};

TripList.propTypes = {
  trips: PropTypes.array,

  removeTrip: PropTypes.func
};

export default TripList;
