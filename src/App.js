import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import Bootstrap JS (CSS is imported in index.js)
import "bootstrap/dist/css/bootstrap.min.css"; 

// Import Components
import Home from "./Home";
import WestRegistration from "./WestRegistration";
import EastRegistration from "./EastRegistration";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Home />} />
          
          {/* West Rayalaseema Form */}
          <Route path="/west-registration" element={<WestRegistration />} />
          
          {/* East Rayalaseema Form */}
          <Route path="/east-registration" element={<EastRegistration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;