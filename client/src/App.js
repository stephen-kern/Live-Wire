// === Package Imports ===
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
// === Component Imports === 
import Header from "./components/Header";

function App() {
  return (
    <ChakraProvider>
    <Router>
      <div>
        <Header />
      </div>
    </Router>
    </ChakraProvider>
  );
}

export default App;
