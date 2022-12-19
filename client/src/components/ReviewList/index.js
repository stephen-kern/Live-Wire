import React from "react";
import { Link } from "react-router-dom";

const ReviewList = ({ reviews, title }) => {
  if (!reviews.length) {
    return <h4>Nobody's jamming yet.</h4>;
  }

  return (
    <div className="container justify-center">
      <h3>{title}</h3>
      {reviews &&
        reviews.map((review) => (
          <div key={review._id} className="card mb-3 mt-3">
            <p className="card-header">
              <Link
                to={`/profile/${review.username}`}
                style={{ fontWeight: 700 }}
                className="link-text-color"
              >
                {review.username}
              </Link>{" "}
              Posted on {review.createdAt}
            </p>
            <div className="card-sub-head justify-space-between">
              <h6 className="ml-2 mt-2">Artist: {review.artist}</h6>
              <h6 className="ml-2 mt-2">Location: {review.location}</h6>
              <p className="ml-2 mt-2">{review.reviewText}</p>
            </div>
            <div>
              <Link to={`/review/${review._id}`}>
                <h6 className="text-dark ml-2 mt-3">
                    Comments:
                </h6>
                <p className="ml-2 mt-2 text-dark">
                  {review.commentCount} <span className="text-primary"> Click </span> to{" "}
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
