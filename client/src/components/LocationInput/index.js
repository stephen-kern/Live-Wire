import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { POST_REVIEW } from "../../utils/mutations";
import { QUERY_REVIEWS, QUERY_ME } from "../../utils/queries";

const LocationInput = () => {
    const [locationText, setLocation] = useState('');
    const { location } = locationText;

    const [postReviewLocation] = useMutation(POST_REVIEW, {
        update(cache, { data: { postReview } }) {
            try {
                const { me } = cache.readQuery({ query: QUERY_ME });
                cache.writeQuery({
                    query: QUERY_ME, 
                    data: { me: { ...me, reviews: [...me.reviews, postReview] } },
                });
            } catch (e) {
                console.warn('Why this warning')
            }
    
            const { reviewLocation } = cache.readQuery({ query: QUERY_REVIEWS });
            cache.writeQuery({
                query: QUERY_REVIEWS,
                data: { reviews: { location: [postReview, ...reviewLocation]}},
            });
        },
      });

    const handleLocationChange = (event) => {
        setLocation({ [event.target.name]: event.target.value});
      }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await postReviewLocation({
                variables: {
                    location
                }
            });

            setLocation('');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <input name="location-input-name" className="location-input" placeholder="Where at?" value={locationText} onChange={handleLocationChange} />
        </div>
    )
}

export default LocationInput;