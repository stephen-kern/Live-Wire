// === PACKAGE IMPORT ===
import React from "react";
import { Link } from "react-router-dom";
import { BsFillChatDotsFill } from "react-icons/bs";

// Comment List Dynamic JSX for Global App
const CommentList = ({ comments }) => {
  return (
    <div className="card mb-3 btn-shadow">
      <div className="card-header">
        <h6 className="CL-h6">
          <BsFillChatDotsFill /> Comments:
        </h6>
      </div>
      <div className="card-body">
        {comments &&
          comments.map((comment) => (
            <p className="pill mb-3 flex-column btn-shadow" key={comment._id}>
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

// Export CommentList
export default CommentList;
