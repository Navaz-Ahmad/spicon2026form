import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./Assests/logo.PNG";

export default function Home() {
  const [region, setRegion] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!region) return alert("Please select a region");

    navigate(
      region === "West Rayalaseema"
        ? "/west-registration"
        : "/east-registration",
      { state: { region } }
    );
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="card p-5 shadow-lg text-center" style={{ maxWidth: "500px", width: "100%" }}>
        
        <img
          src={logo}
          alt="SPICON Logo"
          className="mb-4 mx-auto"
          style={{ width: "150px" }}
        />

        <h2 className="fw-bold mb-4">REGISTRATION FOR SPICON 2026</h2>

        <div className="mb-4 text-start">
          <label className="form-label fw-bold">Select Your Region</label>
          <select
            className="form-select form-select-lg"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">-- Choose Region --</option>
            <option value="West Rayalaseema">West Rayalaseema</option>
            <option value="East Rayalaseema">East Rayalaseema</option>
          </select>
        </div>

        <button 
          className="btn btn-primary btn-lg w-100"
          onClick={handleContinue}
          disabled={!region}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
