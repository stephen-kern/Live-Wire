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
// === Component Imports ===
import HeaderComponent from "./components/Header";
import FooterComponent from "./components/Footer";
// === Page Imports ===
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Compose from "./pages/Compose";
import Setlist from "./pages/Setlist";
import Mission from "./pages/Mission";
import SingleReview from "./pages/SingleReview";
import Profile from "./pages/Profile";
import Bandmates from "./pages/Bandmates";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
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
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
