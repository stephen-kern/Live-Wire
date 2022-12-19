import React from "react";
import { useParams } from "react-router-dom";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_REVIEW } from "../utils/queries";

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
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="">
            {review.username}
          </span>{" "}
          Posted on {review.createdAt}
        </p>
        <div className="card-tags">
          <h4>Artist: {review.artist}</h4>
          <h4>Location: {review.location}</h4>
        </div>
        <div className="card-body">
          <p>{review.reviewText}</p>
        </div>
      </div>
      {review.comments.length > 0 && <CommentList comments={review.comments} />}

      {Auth.loggedIn() && <CommentForm reviewId={review._id} />}
    </div>
  );
};

export default SingleReview;

// What is problem
