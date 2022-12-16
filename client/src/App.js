// === Package Imports ===
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
// === Component Imports === 
import Header from "./components/Header";
import Footer from "./components/Footer";
// import Profile from "./pages/Profile";


function App() {
  return (
    <ChakraProvider>
    <Router>
      <div>
        <Header />
        <div>

        </div>
        <Footer />
      </div>
      
    </Router>
    </ChakraProvider>
  );
}

export default App;
