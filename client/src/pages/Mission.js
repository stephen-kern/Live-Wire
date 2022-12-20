import React from "react";
import { Link } from "react-router-dom";
import StripeApp from "../components/Stripe";
import { FaGuitar, FaMicrophone } from "react-icons/fa";
import { GiGuitarBassHead, GiDrumKit, GiTrumpet } from "react-icons/gi";
import { CgPiano } from "react-icons/cg";

const Mission = () => {
  return (
    <div className="card col-10 m-4 p-2 flex-column justify-center RL-card">
      <h1 className="h2 mx-auto RL-h6">Live Wire</h1>
      <h4>
        Social media platform for music lovers! As a user you are able to sign
        up and create "Reviews" of your favorite tracks, records, artists,
        shows, and more. Add Bandmates, see others reviews, and engage in
        discussions!
      </h4>
      <div className="btn mx-auto justify-center mb-3 btn-shadow">
        <h6 className="text-center">Donate</h6>
        <StripeApp />
      </div>
      <p className="mx-auto">
        Please feel free to donate so our developers can work on making this
        application even better for all music lovers
      </p>
      <h6 className="mx-auto">Created By:</h6>
      <h3 className="flex-row justify-space-around">
        <Link to={`https://github.com/stephen-kern`}>
          <p className="mission-color">
            {" "}
            <FaGuitar /> Stephen{" "}
          </p>
        </Link>
        <Link to={"https://github.com/Vincenttoon"}>
          <p className="mission-color">
            {" "}
            <FaMicrophone /> Vincent{" "}
          </p>
        </Link>
        <Link to={"https://github.com/Rinaberger"}>
          <p className="mission-color">
            {" "}
            <CgPiano /> Scott{" "}
          </p>
        </Link>
        <Link to={"https://github.com/mamadou1991"}>
          <p className="mission-color">
            {" "}
            <GiDrumKit /> Mamadou{" "}
          </p>
        </Link>
      </h3>
    </div>
  );
};

export default Mission;
