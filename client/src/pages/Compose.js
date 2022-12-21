// === PACKAGE IMPORT
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Layout } from "antd";
import { FaMicrophone } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";

// === FILE IMPORT
import { POST_REVIEW } from "../utils/mutations";
import { QUERY_REVIEWS, QUERY_ME } from "../utils/queries";

// ANT Design created
const { Content } = Layout;

// Compose variable function to set state and create JSX
const Compose = () => {
  // Create state variables and set initial state
  const [formState, setFormState] = useState({
    artistText: "",
    locationText: "",
    reviewText: "",
  });
  const [characterCount, setCharacterCount] = useState(0);
  // Navigation variable set to redirect users based on actions
  const navigate = useNavigate();

  // Use mutation to post reviews
  const [postReview, { error }] = useMutation(POST_REVIEW, {
    update(cache, { data: { postReview } }) {
      try {
        // Query me
        const { me } = cache.readQuery({ query: QUERY_ME });
        // Write query and create new posts
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, reviews: [...me.reviews, postReview] } },
        });
      } catch (e) {
        console.warn("First review made by user");
      }

      // Query reviews to push data into all Reviews
      const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });
      cache.writeQuery({
        query: QUERY_REVIEWS,
        data: { reviews: [postReview, ...reviews] },
      });
    },
  });

  // Handle change for the inputs and accept new stae
  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "reviewText") {
      setCharacterCount(event.target.value.length);
    }
  };

  // Create new post using the state from inputs and reset to static state
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

    navigate("/");
  };

  // Dynamic JSX for global App
  return (
    <Content className="mt-4">
      <form
        className="justify-space-between-md align-stretch form-input card RL-card"
        onSubmit={handleFormSubmit}
      >
        <h3 className="text-center mb-4">Write a Review</h3>
        <div className="flex-row justify-space-around">
          <div>
            <FaMicrophone className="mr-2 mt-2" color="#04a777" />
            <input
              name="artistText"
              className="form-label btn-shadow"
              placeholder="What Artist?"
              value={formState.artistText}
              onChange={handleChange}
            />
          </div>

          <div>
            <FaMapMarkerAlt className="mr-2 mt-2" color="#04a777" />
            <input
              name="locationText"
              className="form-label btn-shadow"
              placeholder="Where at?"
              value={formState.locationText}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex-column">
          <textarea
            placeholder="..."
            value={formState.reviewText}
            className="form-input btn-shadow"
            name="reviewText"
            onChange={handleChange}
          ></textarea>
          <p
            className={`mt-0 ${
              characterCount === 1250 || error ? "text-error" : ""
            }`}
          >
            Character Count: {characterCount}/1250
            {error && <span className="ml-2">Something went wrong...</span>}
          </p>
        </div>
        <button className="btn col-12 col-md-3 btn-shadow" type="submit">
          Submit
        </button>
      </form>
    </Content>
  );
};

// Export Compose
export default Compose;
