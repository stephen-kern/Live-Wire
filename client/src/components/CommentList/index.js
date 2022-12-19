import React from "react";
import { Link } from "react-router-dom";

const CommentList = ({ comments }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <h6 className="">Comments:</h6>
      </div>
      <div className="card-body">
        {comments &&
          comments.map((comment) => (
            <p className="pill mb-3 flex-column" key={comment._id}>
              {comment.commentBody}{" "}
              <div className="flex-row justify-space-between m-1">
                <Link
                  to={`/profile/${comment.username}`}
                  style={{ fontWeight: 700 }}
                >
                  {comment.username}
                </Link>
                {comment.createdAt}
              </div>
            </p>
          ))}
      </div>
    </div>
  );
};

export default CommentList;
