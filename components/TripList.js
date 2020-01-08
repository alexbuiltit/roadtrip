import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";

const IndividualTrip = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: #ccc;
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
        <button onClick={() => removeTrip(trip.id)}>Delete trip</button>
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
