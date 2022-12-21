// *** I don't think this file is used at all, but leaving in for deployment/presentation ***

// // === PACKAGE IMPORT ===
// import React from "react";
// import { Navigate, useParams } from "react-router-dom";
// import { useQuery } from "@apollo/client";
// import { Link } from "react-router-dom";

// // === FILE IMPORT ===
// import { QUERY_USER, QUERY_ME } from "../../utils/queries";
// import Auth from "../../utils/auth";

// // BandmatesList variable function that uses params, query and link
// const BandmatesList = ({ bandmateCount, username, bandmates }) => {
//   const { username: userParam } = useParams();
//   const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
//     variables: { username: userParam },
//   });
//   const user = data?.me || data?.user || {};

//   // navigate to personal profile page if username is the logged-in user's
//   if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
//     return <Navigate to="/profile" />;
//   }

//   // if loading...
//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   // If no bandmates...
//   if (!bandmates || !bandmates.length) {
//     return (
//       <p className="bg-dark text-light p-3">{username}, Add some Bandmates!</p>
//     );
//   }

//   // Dynamic JSX for global app
//   return (
//     <div>
//       <h5 className="mt-4">
//         {username}'s {bandmateCount}{" "}
//         {bandmateCount === 1 ? "Bandmate" : "Bandmates"}
//       </h5>
//       {bandmates.map((bandmate) => (
//         <button className="btn w-100 display-block mb-2" key={bandmate._id}>
//           <Link to={`/profile/${bandmate.username}`}>{bandmate.username}</Link>
//         </button>
//       ))}
//     </div>
//   );
// };

// // Export BandmatesList
// export default BandmatesList;
