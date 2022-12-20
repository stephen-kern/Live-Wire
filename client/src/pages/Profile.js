// === PACKAGE IMPORTS ===
import React, { useEffect, useState } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

// === FILE IMPORTS ===
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { ADD_BANDMATE } from "../utils/mutations";
import ReviewList from "../components/ReviewList";
import Auth from "../utils/auth";

// Variable function to create single page
const Profile = () => {
  // Setting state for add friend button
  const [stateIncluded, setStateIncluded] = useState(false);
  // Use Params for username
  const { username: userParam } = useParams();
  // Query User's and Me based off which profile page your on based on the variable
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  // Assign data to me based off query
  const { data: me } = useQuery(QUERY_ME);
  // Create Add bandmate variable using Mutation
  const [addBandmate] = useMutation(ADD_BANDMATE);
  // Create user variable based on if you are on a separate users page or your own
  const user = data?.me || data?.user || {};

  // Assign Navigate to direct users to a different page
  const navigate = useNavigate();

  // If Included in bandmates array, use this function to dynamically change page feature
  const isIncluded = (username, array) => {
    return array.some((user) => user.username === username);
  };

  // Use effect to change state of Add Bandmate Button
  useEffect(() => {
    if (me && user) {
      setStateIncluded(isIncluded(user.username, me.me.bandmates));
    }
    // eslint-disable-next-line
  }, []);

  // navigate to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  // If page is stuck loading...
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is not logged in...
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }

  // Handler to add Bandmates and redirect to profile
  const handleClick = async () => {
    try {
      await addBandmate({
        variables: { id: user._id },
      });
    } catch (e) {
      console.error(e);
    }

    navigate(`/profile`);
  };

  // Dynamically generated JSX for Global App
  return (
    <div>
      <div className="flex-row justify-space-between mt-3 mb-3">
        <h2 className="bg-dark text-secondary p-4 display-inline-block profile-title-container">
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>
        <div className="col-12 col-lg-4 mb-3 mt-3">
          <Link to={`/profile/bandmates/${user.username}`}>
            <h3 className="mx-auto RL-h6">Bandmates: {user.bandmateCount}</h3>
          </Link>
          {userParam && !stateIncluded ? (
            <button className="btn btn-shadow ml-auto" onClick={handleClick}>
              <FaPlusCircle /> Add Bandmate
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mx-auto col-lg-10">
          <ReviewList
            reviews={user.reviews}
            title={`${user.username} left these reviews`}
          />
        </div>
      </div>
    </div>
  );
};

// Export Profile for Global Application
export default Profile;
