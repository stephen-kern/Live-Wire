// === PACKAGE IMPORT ===
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

// === FILE IMPORT ===
import { QUERY_USER, QUERY_ME } from "../utils/queries";

// Bandmates variable function to query users and yourself, and create JSX
const Bandmates = () => {
  // Use params to assign query information based on username and who's page you are looking at
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  // Assign data to user for dynamic use
  const user = data?.me || data?.user || {};

  // If loading...
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not logged in...
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }

  // Dynamic JSX for Global App
  return (
    <div>
      <div>
        <h5 className="m-3">
          {user.username}'s {user.bandmateCount}{" "}
          {user.bandmateCount === 1 ? "Bandmate" : "Bandmates"}:
        </h5>
        <div className="flex-row col-12 justify-space-around">
          {user.bandmates.map((bandmate) => (
            <button
              className="btn w-35 display-block mb-2 btn-shadow"
              key={bandmate._id}
            >
              <Link to={`/profile/${bandmate.username}`}>
                {bandmate.username}
              </Link>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Export Bandmates
export default Bandmates;
