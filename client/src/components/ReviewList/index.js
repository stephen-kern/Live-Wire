import React from "react";
import { Link } from "react-router-dom";
import { FaMicrophone, FaMapMarkerAlt } from "react-icons/fa";
import { BsFillChatDotsFill } from 'react-icons/bs';

const ReviewList = ({ reviews, title }) => {
  if (!reviews.length) {
    return <h4>Nobody's jamming yet.</h4>;
  }

  return (
    <div className="container justify-center">
      <h3>{title}</h3>
      {reviews &&
        reviews.map((review) => (
          <div key={review._id} className="card RL-card mb-3 mt-3">
            <div className="flex-row justify-space-between card-header card-header-container pt-4">
            <h5 className="RL-txt">
              <Link
                to={`/profile/${review.username}`}
                style={{ fontWeight: 700 }}
                className="link-text-color RL-user"
              >
                {review.username}
              </Link>{" "}
            </h5>
            <p>
            Posted on {review.createdAt}
            </p>
            </div>
            <div className="card-sub-head justify-space-between">
              <div className="flex-row justify-space-between m-1">
                <h6 className="ml-2 mt-2 RL-h6"><FaMicrophone /> Artist: {review.artist}</h6>
                <h6 className="ml-2 mt-2 RL-h6"><FaMapMarkerAlt /> Location: {review.location}</h6>
              </div>
              <div className="text-container mx-auto p-1">
                <p className="ml-2 mt-2">{review.reviewText}</p>
              </div>
            </div>
            <div>
              <Link to={`/review/${review._id}`}>
                <h6 className="text-dark ml-2 mt-3 RL-h6"><BsFillChatDotsFill /> Comments:</h6>
                <p className="ml-2 mt-2 text-dark">
                  {review.commentCount}{" "}
                  <span className="text-primary"> Click </span> to{" "}
                  {review.commentCount ? "see" : "start"} what's singing!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ReviewList;
