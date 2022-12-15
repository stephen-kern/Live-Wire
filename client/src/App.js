// === Package Imports ===
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
// === Component Imports === 
import Header from "./components/Header";
// === Page Imports ===
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <ChakraProvider>
    <Router>
      <div>
        <Header />
          <div className="container">
            <Routes>
              <Route
              path="login"
              element={<Login />} 
              />
              <Route
              path="signup"
              element={<Signup />}
              />
            </Routes>
          </div>
      </div>
    </Router>
    </ChakraProvider>
  );
}

export default App;