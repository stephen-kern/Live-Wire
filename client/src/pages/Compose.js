import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { POST_REVIEW } from "../utils/mutations";
import { QUERY_REVIEWS, QUERY_ME } from "../utils/queries";

const Compose = () => {
  const [reviewTextState, setTextState] = useState("");
  const [artistText, setArtist] = useState('');
  const [locationText, setLocation] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const { reviewText } = reviewTextState;
  const { artist } = artistText;
  const { location } = locationText;

  const [postReviewText] = useMutation(POST_REVIEW, {
    update(cache, { data: { postReview } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, reviews: [...me.reviews, postReview] } },
        });
      } catch (e) {
        console.warn("This is a warning!");
      }

      const { reviewText } = cache.readQuery({ query: QUERY_REVIEWS });
      cache.writeQuery({
        query: QUERY_REVIEWS,
        data: { reviews: {reviewText: [postReview, ...reviewText]} },
      });
    },
  });

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
            data: { reviews: { artist: [postReview, ...reviewArtist]}},
        });
    },
  });

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

  const handleTextChange = (event) => {
    if (event.target.value.length <= 1250) {
      setTextState(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleArtistChange = (event) => {
    setArtist(event.target.value);
  }

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await postReviewText({
        variables: { 
            reviewText
         }
      });

      await postReviewArtist({
        variables: {
            artist
        }
      });

      await postReviewLocation({
        variables: {
            location
        }
      });

      setTextState("");
      setArtist('');
      setLocation('');
      setCharacterCount(0);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main>
      <div>
        <form
          className="flex-row justify-center justify-space-between-md align-stretch"
          onSubmit={handleFormSubmit}
        >
            <input className="artist-input" placeholder="Who's playing?" value={artistText} onChange={handleArtistChange} />
            <input className="location-input" placeholder="Where at?" value={locationText} onChange={handleLocationChange} />

          <textarea
            placeholder="Here's what I'm thinking"
            value={reviewText}
            className="form-input col-12 col-md-9"
            onChange={handleTextChange}
          ></textarea>
          <p
          className={`m-0 ${
            characterCount === 1250
            //  || error ? "text-error" : ""
          }`}
        >
          Character Count: {characterCount}/1250
          {/* {error && <span className="ml-2">Something went wrong...</span>} */}
        </p>
          <button className="btn col-12 col-md-3" type="submit">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};


export default Compose