import React from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

import BandmatesList from "../components/BandmatesList";

const Bandmates = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

   // navigate to personal profile page if username is the logged-in user's
   if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div>
      <h5>
        {user.username}'s {user.bandmateCount} {user.bandmateCount === 1 ? "Bandmate" : "Bandmates"}
      </h5>
      {user.bandmates.map((bandmate) => (
        <button className="btn w-100 display-block mb-2" key={bandmate._id}>
          <Link to={`/profile/${bandmate.username}`}>{bandmate.username}</Link>
        </button>
      ))}
    </div>
    </div>
  );
};

export default Bandmates;
