// === PACKAGE IMPORTS ===
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { FaMicrophone, FaMapMarkerAlt } from "react-icons/fa";

// === FILE IMPORTS ===
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import { QUERY_REVIEW } from "../utils/queries";
import Auth from "../utils/auth";

// Single Review Page functionality and JSX
const SingleReview = (props) => {
  // Assign Id to individual Review _id
  const { id: reviewId } = useParams();
  // Query review and assign variable ID
  const { loading, data } = useQuery(QUERY_REVIEW, {
    variables: { id: reviewId },
  });
  // Assign review variable to data returned from Query
  const review = data?.review || {};

  // If Loading, display this
  if (loading) {
    return <div>Loading...</div>;
  }

  // Dynamically generated JSX returned
  return (
    <div className="mt-3">
      <div className="card mb-3 btn-shadow">
        <div className="flex-row justify-space-between card-header card-header-container pt-4">
          <h5>
            <Link
              to={`/profile/${review.username}`}
              style={{ fontWeight: 700 }}
              className="link-text-color"
            >
              {review.username}
            </Link>{" "}
          </h5>
          <p>Posted on {review.createdAt}</p>
        </div>
        <div className="card-tags flex-row justify-space-between m-2">
          <h4>
            <FaMicrophone /> Artist: {review.artist}
          </h4>
          <h4>
            <FaMapMarkerAlt /> Location: {review.location}
          </h4>
        </div>
        <div className="text-container mx-auto p-1">
          <p>{review.reviewText}</p>
        </div>
      </div>
      {Auth.loggedIn() && <CommentForm reviewId={review._id} />}

      {review.comments.length > 0 && <CommentList comments={review.comments} />}
    </div>
  );
};

// Export Single Review for Global App
export default SingleReview;
