import React from 'react';
import { Link } from 'react-router-dom';

const ReviewList = ({ reviews, title }) => {
    if (!reviews.length) {
        return <h4>Nobody's jamming yet.</h4>
    }

    return (
        <div>
            <h3>{title}</h3>
            {reviews && 
                reviews.map(review => {
                    <div key={review.id} className="card mb-3">
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
                            <p className='mb-0'>
                                Artist: {review.artist}
                            </p>
                            <p className='mb-0'>
                                Location: {review.location}
                            </p>
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
                })}
        </div>
    );
};

export default ReviewList;