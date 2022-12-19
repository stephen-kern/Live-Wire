import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { POST_REVIEW } from "../utils/mutations";
import { QUERY_REVIEWS, QUERY_ME } from "../utils/queries";
import { Layout } from "antd";

const { Content } = Layout;

const Compose = () => {
  const [formState, setFormState] = useState({
    artistText: "",
    locationText: "",
    reviewText: "",
  });

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
        console.warn("First review made by user");
      }

      const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });
      cache.writeQuery({
        query: QUERY_REVIEWS,
        data: { reviews: [postReview, ...reviews] },
      });
    },
  });

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "reviewText") {
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await postReview({
        variables: {
          artist: formState.artistText,
          location: formState.locationText,
          reviewText: formState.reviewText,
        },
      });
    } catch (e) {
      console.log(e);
    }
    // reset form and character count back to 0
    setFormState({
      artistText: "",
      locationText: "",
      reviewText: "",
    });
    setCharacterCount(0);
  };

  return (
        <Content className="mt-4">
          <form
            className="flex-row justify-center justify-space-between-md align-stretch"
            onSubmit={handleFormSubmit}
          >
            <div>
              <p>Artist</p>
            <input
              name="artistText"
              className="artist-input"
              placeholder="Who's playing?"
              value={formState.artistText}
              onChange={handleChange}
            />

            <input
              name="locationText"
              className="location-input"
              placeholder="Where at?"
              value={formState.locationText}
              onChange={handleChange}
            />
            </div>
            <textarea
              placeholder="Here's what I'm thinking"
              value={formState.reviewText}
              className="form-input col-12 col-md-9"
              name="reviewText"
              onChange={handleChange}
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
        </Content>
  );
};

export default Compose;