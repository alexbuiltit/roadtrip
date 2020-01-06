import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const TripList = ({ title, trips, removeTrip }) => {
  if (!trips) return null;

  const tripItems = trips.map((trip, idx) => {
    return (
      <div key={idx}>
        <Link href="/t/[id]" as={`/t/${trip.id}`}>
          <a>{trip.details.title}</a>
        </Link>
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
