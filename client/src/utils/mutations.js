import { gql } from '@apollo/client';

export const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const POST_REVIEW = gql`
	mutation postReview(
		$artist: String!
		$location: String!
		$reviewText: String!
	) {
		postReview(artist: $artist, location: $location, reviewText: $reviewText) {
			_id
			reviewText
			createdAt
			location
			username
			artist
			commentCount
			comments {
				_id
			}
		}
	}
`;

// this one doesn't feel right
export const REMOVE_REVIEW = gql`
	mutation removeReview($reviewId: ID!) {
		removeReview(id: $id) {
			_id
		}
	}
`;

export const ADD_COMMENT = gql`
	mutation addComment($reviewId: ID!, $commentBody: String!) {
		addComment(reviewId: $reviewId, commentBody: $commentBody) {
			_id
			commentCount
			comments {
				_id
				commentBody
				createdAt
				username
			}
		}
	}
`;

export const ADD_BANDMATE = gql`
	mutation addBandmate($id: ID!) {
		addBandmate(bandmateId: $id) {
			_id
			username
			bandmateCount
			bandmates {
				_id
				username
			}
		}
	}
`;

export const REMOVE_BANDMATE = gql`
	mutation removeBandmate($bandmateId: ID!) {
		removeBandmate(bandmateId: $bandmateId) {
			_id
			username
			bandmates {
				_id
				username
			}
		}
	}
`;
