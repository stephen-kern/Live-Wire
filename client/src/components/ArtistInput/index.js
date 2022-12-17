import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { POST_REVIEW } from "../../utils/mutations";
import { QUERY_REVIEWS, QUERY_ME } from "../../utils/queries";

const ArtistInput = () => {
    const [artistText, setArtist] = useState('');
    const { artist } = artistText;

    const [postReviewArtist] = useMutation(POST_REVIEW, {
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
    
            const { reviewArtist } = cache.readQuery({ query: QUERY_REVIEWS });
            cache.writeQuery({
                query: QUERY_REVIEWS,
                data: { reviews: { location: [postReview, ...reviewArtist]}},
            });
        },
      });

    const handleArtistChange = (event) => {
        setArtist({ [event.target.name]: event.target.value});
      }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await postReviewArtist({
                variables: {
                    artist
                }
            });

            setArtist('');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <input name="artist-input-name" className="artist-input" placeholder="Who's playing?" value={artistText} onChange={handleArtistChange} />
        </div>
    )
}

export default ArtistInput;