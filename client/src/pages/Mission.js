import React from "react";
import StripeApp from "../components/Stripe";

const Mission = () => {

    return (
    <div className="card col-10 m-4 p-2 flex-column justify-center">
        <h1 className="h2 mx-auto">
      Live Wire
        </h1>
        <h4>
        Social media platform for music lovers! As a user you are
      able to sign up and create "Reviews" of your favorite tracks, records,
      artists, shows, and more. Add Bandmates, see others reviews, and engage in
      discussions!
        </h4>
        <button className="btn mx-auto justify-center">
          Donate
          <StripeApp/>
        </button>
        <p className="mx-auto">
          Please feel free to donate so our developers can work on making this application even better for all music lovers
        </p>
     </div>
    )
};

export default Mission;