import React from "react";
import PropTypes from "prop-types";

const TripList = ({ title, trips, removeTrip }) => {
  if (!trips) return null;

  const tripItems = trips.map((trip, idx) => {
    return (
      <div key={idx}>
        {trip.id} - {trip.details.title}
        <button onClick={() => removeTrip(trip.id)}>Delete trip</button>
      </div>
    );
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
  title: PropTypes.string,
  removeTrip: PropTypes.func
};

export default TripList;
