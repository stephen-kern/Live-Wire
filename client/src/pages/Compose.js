import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { POST_REVIEW } from "../utils/mutations";
import { QUERY_REVIEW, QUERY_ME } from "../utils/queries";

const Compose = () => {
  const [formState, setFormState] = useState({
    artist: '',
    location: '',
    reviewText: '',
  });
  const { artist, location, reviewText } = formState;
  const [characterCount, setCharacterCount] = useState(0);

  const [postReview, { error }] = useMutation(POST_REVIEW, {
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

      const { reviews } = cache.readQuery({ query: QUERY_REVIEW });
      cache.writeQuery({
        query: QUERY_REVIEW,
        data: { reviews: [postReview, ...reviews] },
      });
    },
  });

  const handleTextChange = (event) => {
    if (event.target.value.length <= 1250) {
      setFormState(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await postReview({
        variables: { reviewText, artist, location }
      });

      setFormState("");
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
            <input className="artist-input" placeholder="Who's playing?" value={formState} onChange={handleTextChange} />
            <input className="location-input" placeholder="Where at?" value={formState} onChange={handleTextChange} />

          <textarea
            placeholder="Here's what I'm thinking"
            value={formState}
            className="form-input col-12 col-md-9"
            onChange={handleTextChange}
          ></textarea>
          <p
          className={`m-0 ${
            characterCount === 1250 || error ? "text-error" : ""
          }`}
        >
          Character Count: {characterCount}/1250
          {error && <span className="ml-2">Something went wrong...</span>}
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