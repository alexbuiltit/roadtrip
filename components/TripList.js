import React from "react";
import PropTypes from "prop-types";

const TripList = ({ title, trips }) => {
  if (!trips) return null;
  console.log(trips);
  const tripItems = trips.map((trip, idx) => {
    return <div key={idx}>{trip.details.title}</div>;
  });
  return (
    <div>
      <h1>{title}</h1>
      {tripItems}
    </div>
  );
};

TripList.propTypes = {
  trips: PropTypes.array,
  title: PropTypes.string
};

export default TripList;