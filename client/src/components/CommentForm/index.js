import React, { useState } from "react";

import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from "../../utils/mutations";

const CommentForm = ({ reviewId }) => {
    const [commentBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleChange = (event) => {
        if (event.target.value.length <= 1250) {
            setBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addComment({
                variables: { commentBody, reviewId },
            });

            setBody('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <p className={`m-0 ${characterCount === 1250 || error ? 'text-error' : ''}`}
            >
                Character Count: {characterCount}/1250
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form className="flex-row justify-center justify-space-between-md align-stretch"
            onSubmit={handleFormSubmit}>
                <textarea
                placeholder="Leave a comment..."
                value={commentBody}
                className='form-input col-10 col-md-6 col-lg-10 mx-auto'
                onChange={handleChange}>
                </textarea>

                <button className="btn col-4 col-md-3 mb-3 mx-auto" type="submit">
                    Submit
                </button>
            </form>

            {error && <div>Something went wrong...</div>}
        </div>
    )
};

export default CommentForm;