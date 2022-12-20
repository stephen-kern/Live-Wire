import React from "react";
import { useParams, Link } from "react-router-dom";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_REVIEW } from "../utils/queries";
import { FaMicrophone, FaMapMarkerAlt } from "react-icons/fa";

const SingleReview = (props) => {
  const { id: reviewId } = useParams();

  const { loading, data } = useQuery(QUERY_REVIEW, {
    variables: { id: reviewId },
  });

  const review = data?.review || {};

  if (loading) {
    return <div>Loading...</div>;
  }

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
          <h4><FaMicrophone /> Artist: {review.artist}</h4>
          <h4><FaMapMarkerAlt /> Location: {review.location}</h4>
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

export default SingleReview;

// What is problem
