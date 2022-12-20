// === Package Imports ===
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Layout } from "antd";
// === Component Imports ===
import HeaderComponent from "./components/Header";
import FooterComponent from "./components/Footer";
//import Stripe
//import StripeApp from "./components/stripe";
// === Page Imports ===
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Compose from "./pages/Compose";
import Setlist from "./pages/Setlist";
import Mission from "./pages/Mission";
import SingleReview from "./pages/SingleReview";
import Profile from "./pages/Profile";
import Bandmates from "./pages/Bandmates";
import NoMatch from "./pages/NoMatch";

// create http link to connect to graphQl backend
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Set AuthLink to tokens for authorization of logged in users
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// create new Apollo client for application, confirm authorization and use http link. Update Cache
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Primary App to run webpage, Use Ant Design to assist in layout, call Routes and Components to populate single page application
function App() {
  return (
    // Call in Apollo provider and connect the client
    <ApolloProvider client={client}>
      <Layout className="app">
        <Router>
          <HeaderComponent />
          <div className="container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/compose" element={<Compose />} />
              <Route path="" element={<Setlist />} />
              <Route path="/mission" element={<Mission />} />
              <Route path="/profile">
                <Route path=":username" element={<Profile />} />
                <Route path="" element={<Profile />} />
              </Route>
              <Route path="/review/:id" element={<SingleReview />} />
              <Route
                path="/profile/bandmates/:username"
                element={<Bandmates />}
              />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
          <FooterComponent />
        </Router>
      </Layout>
    </ApolloProvider>
  );
}

// export Application
export default App;
