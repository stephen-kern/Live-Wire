import React from "react";
import { Link } from "react-router-dom";

const BandmatesList = ({ bandmateCount, username, bandmates }) => {
  if (!bandmates || !bandmates.length) {
    return (
      <p className="bg-dark text-light p-3">{username}, Add some Bandmates!</p>
    );
  }

  return (
    <div>
      <h5>
        {username}'s {bandmateCount} {bandmateCount === 1 ? "Bandmate" : "Bandmates"}
      </h5>
      {bandmates.map((bandmates) => (
        <button className="btn w-100 display-block mb-2" key={bandmate._id}>
          <Link to={`/profile/${bandmates.username}`}>{bandmates.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default BandmatesList;