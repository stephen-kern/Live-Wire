import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegThumbsDown, FaHandRock } from 'react-icons/fa';

const ReviewList = ({ reviews, title }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);

    const [activeBtn, setActiveBtn] = useState('none');

    const handleLikeClick = () => {
        if (activeBtn === "none") {
          setLikeCount(likeCount + 1);
          setActiveBtn("like");
          return;
        }
     
        if (activeBtn === 'like'){
          setLikeCount(likeCount - 1);
          setActiveBtn("none");
          return;
        }
     
        if (activeBtn === "dislike") {
          setLikeCount(likeCount + 1);
          setDislikeCount(dislikeCount - 1);
          setActiveBtn("like");
        }
      };

      const handleDislikeClick = () => {
        if (activeBtn === "none") {
          setDislikeCount(dislikeCount + 1);
          setActiveBtn("dislike");
          return;
        }
       
        if (activeBtn === 'dislike'){
          setDislikeCount(dislikeCount - 1);
          setActiveBtn("none");
          return;
        }
     
        if (activeBtn === "like") {
          setDislikeCount(dislikeCount + 1);
          setLikeCount(likeCount - 1);
          setActiveBtn("dislike");
        }
      };

    if (!reviews.length) {
        return <h4>Nobody's jamming yet.</h4>
    }

    return (
        <div>
            <h3>{title}</h3>
            {reviews && 
                reviews.map(review => (
                    <div key={review._id} className="card mb-3">
                        <p className='card-header'>
                            <Link
                                to={`/profile/${review.username}`}
                                style={{ fontWeight: 700 }}
                                className="link-text-color"
                                >
                                    {review.username}
                                </Link>{' '}
                                Posted on {review.createdAt}
                        </p>
                        <div className='card-sub-head justify-space-between'>
                            <h4 className='mb-0'>
                                Artist: {review.artist}
                            </h4>
                            <h4 className='mb-0'>
                                Location: {review.location}
                            </h4>
                            <p className='mb-0'>
                                {review.reviewText}
                            </p>
                        </div>
                        <div className='like-container'>
                            <div className='btn-container'>
                                <button 
                                className={`btn ${activeBtn === "like" ? "like-active" : ""}`}
                                onClick={handleLikeClick}
                                >
                                    <span className='thumbs-up-here'><FaHandRock /></span>
                                    {likeCount}
                                </button>
                                <button 
                                className={`btn ${activeBtn === "dislike" ? "dislike-active" : ""}`}
                                onClick={handleDislikeClick}
                                >
                                    <span className='thumbs-down-here'><FaRegThumbsDown /></span>
                                    {dislikeCount}
                                </button>
                            </div>
                        </div>
                        <div className='card-body'>
                            <Link to={`/review/${review._id}`}>
                                <p className='mb-0'>
                                    Comments: {review.commentCount} || Click to{' '}
                                    {review.commentCount ? 'see' : 'start'} what's singing!
                                </p>
                            </Link>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default ReviewList;