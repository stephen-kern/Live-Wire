import React from "react";
import { Link } from "react-router-dom";

const ReviewList = ({ reviews, title }) => {
  if (!reviews.length) {
    return <h3>You have no Reviews yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {reviews &&
        reviews.map((review) => (
          <div key={review._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${review.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {review.username}
              </Link>{" "}
              left this review on {review.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/review/${review._id}`}>
                <p>{review.reviewText}</p>
                <p className="mb-0">
                  Comments: {review.commentCount} || Click to{" "}
                  {review.commentCount ? "see" : "start"} the discussion!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ReviewList;
