// === PACKAGE IMPORTS ===
import React from "react";
import ReviewList from "../components/ReviewList";
import { useQuery } from "@apollo/client";

// === FILE IMPORTS ===
import { QUERY_REVIEWS, QUERY_ME_BASIC } from "../utils/queries";
import Mission from "./Mission";
import Auth from "../utils/auth";

// Variable Function to create single page for SetList
const Setlist = () => {
  // Query Reviews and Basic Me info
  const { loading, data } = useQuery(QUERY_REVIEWS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  // Assign
  const reviews = data?.reviews || [];

  // Check User is logged in to change returned JSX
  const loggedIn = Auth.loggedIn();

  // Dynamically generated JSX that changes based if the user is logged in or not.
  return (
    <main>
      {Auth.loggedIn() ? (
        <div className="container">
          <div className="flex-row justify-center mt-3">
            <div className="w-75">
              {loading ? (
                <div>Loading...</div>
              ) : (
                <ReviewList
                  reviews={reviews}
                  title="Let's see what's playing right now!"
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-row justify-space-between">
          <div className="mission-cont">
            <Mission />
          </div>
          <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ReviewList
                reviews={reviews}
                title="Let's see what's playing right now!"
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
};

// Export Setlist for Global Application
export default Setlist;
