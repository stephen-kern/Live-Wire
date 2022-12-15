// === Package Imports ===
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// === Component Imports ===
import Header from "./components/Header";
// === Page Imports ===
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Compose from './pages/Compose';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
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
      <ChakraProvider>
        <Router>
          <div>
            <Header />
            <div className="container">
              <Routes>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="compose" element={<Compose />} />
              </Routes>
            </div>
          </div>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
