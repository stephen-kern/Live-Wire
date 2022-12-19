import React from "react";
import ReviewList from "../components/ReviewList";

import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_REVIEWS, QUERY_ME_BASIC } from "../utils/queries";
import Mission from "./Mission";

const Setlist = () => {
  // logic here
  const { loading, data } = useQuery(QUERY_REVIEWS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const reviews = data?.reviews || [];

  const loggedIn = Auth.loggedIn();

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

export default Setlist;
