import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./Assests/logo.PNG";

export default function Home() {
  const [region, setRegion] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!region) return alert("Please select a region");
    navigate(region === "West Rayalaseema" ? "/west-registration" : "/east-registration");
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">

      <div className="row w-100" style={{ maxWidth: "1200px" }}>

        {/* LEFT SECTION - LOGIN PORTAL */}
        <div className="col-md-6 mb-4">
          <div className="card p-5 shadow-lg text-center" style={{height:"100%"}}>
            
            <h2 className="fw-bold mb-2" style={{letterSpacing:"1px"}}>LOGIN PORTAL</h2>
            <p className="text-secondary mb-4">Select login type</p>

            <div className="row g-4">

              {/* Admin Login Tile */}
              <div className="col-6">
                <div 
                  className="login-box"
                  onClick={() => navigate("/admin-login")}
                >
                  <i className="bi bi-shield-lock-fill icon"></i>
                  <h5 className="fw-bold mt-2">Admin Login</h5>
                  <span>Manage Payments</span>
                </div>
              </div>

              {/* Registrar Login Tile */}
              <div className="col-6">
                <div 
                  className="login-box registrar"
                  onClick={() => navigate("/registrar-login")}
                >
                  <i className="bi bi-people-fill icon"></i>
                  <h5 className="fw-bold mt-2">Registrar Login</h5>
                  <span>Approve Registrations</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT SECTION - REGISTRATION */}
        <div className="col-md-6 mb-4">
          <div className="card p-5 shadow-lg text-center">

            <img src={logo} alt="logo" className="mb-4 mx-auto" style={{ width:"150px" }}/>

            <h2 className="fw-bold mb-3">REGISTRATION FOR SPICON 2026</h2>

            <label className="fw-bold text-start w-100">Select Your Region</label>
            <select
              className="form-select form-select-lg mt-2"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="">-- Choose Region --</option>
              <option value="West Rayalaseema">West Rayalaseema</option>
              <option value="East Rayalaseema">East Rayalaseema</option>
            </select>

            <button
              className="btn btn-primary btn-lg w-100 mt-4"
              disabled={!region}
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>

      </div>

      {/* BEAUTIFUL STYLING */}
     <style>{`
  .login-box {
    background: #f8faff;
    border-radius: 15px;
    padding: 30px;
    border: 2px solid transparent;
    cursor: pointer;
    transition: 0.3s;
    box-shadow: 0 3px 10px rgba(0,0,0,0.07);
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }
  .login-box:hover {
    transform: scale(1.05);
    border-color: #0d6efd;
    background: #eef6ff;
    box-shadow: 0 8px 22px rgba(0,0,0,0.15);
  }
  .icon {
    font-size: 48px;
    color: #0d6efd;
  }
  .registrar .icon {
    color: #198754;
  }
  .registrar:hover {
    border-color: #198754;
    background: #e8fff3;
  }

  /* 📱 Mobile Friendly */
  @media(max-width: 768px){
    .login-box{
      margin-bottom:15px;
      padding:25px;
    }
    .icon{
      font-size:42px;
    }
    .card{
      padding:30px !important;
    }
    .row.g-4 .col-6{
      width:100%;
    }
  }

  @media(max-width: 450px){
    h2 { font-size:22px; }
    .login-box span { font-size:14px; }
    .login-box h5 { font-size:18px; }
  }
`}</style>


    </div>
  );
}
