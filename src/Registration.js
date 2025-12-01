// SPICON 2026 — Dynamic Registration Form (FULL VERSION)
// Bootstrap 5 + React + Fully Dynamic Logic

import React, { useState } from "react";
import logo from "./Assests/logo.PNG";

export default function SPICONRegistration() {
  const initial = {
    email: "",
    title: "",
    fullName: "",
    surname: "",
    dtcAttended: "",
    dtcWhen: "",
    dtcWhere: "",
    mobile: "",
    district: "",
    iceuEgf: "",
    paymentMode: "",
    recommenderName: "",
    recommenderContact: "",
    groupType: "",
    gender: "",
    age: "",
    spouseAttending: "",
    spouseName: "",
    childBelow10Count: "0",
    childBelow10Names: "",
    child10to14Count: "0",
    child10to14Names: "",
    totalFamilyMembers: "",
    delegatesOther: "",
    amountPaid: "",
    paymentMode2: "",
    dateOfPayment: "",
    transactionId: "",
    arrivalDay: "",
    arrivalTime: "",
  };

  const [form, setForm] = useState(initial);
  const [screenshot, setScreenshot] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (!form.fullName || !form.mobile || !form.groupType || !form.amountPaid) {
      setMessage("Please fill all mandatory fields.");
      setMessageType("error");
      return;
    }

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (screenshot) fd.append("paymentScreenshot", screenshot);

    setLoading(true);

    try {
      const res = await fetch(
        "https://api.sjtechsol.com/api/cashier/registerCustomer",
        {
          method: "POST",
          body: fd,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      setMessage("Registration successful! You will be added to WhatsApp group soon.");
      setMessageType("success");

      setForm(initial);
      setScreenshot(null);
    } catch (err) {
      setMessage(err.message);
      setMessageType("error");
    }

    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container py-4">

      {/* SUCCESS / ERROR MESSAGE */}
      {message && (
        <div
          className={`alert text-center ${
            messageType === "success" ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}

      {/* SPICON HEADER SECTION */}
      <div className="text-center mb-4">
        <img
          src={logo}
          alt="SPICON Logo"
          style={{ width: "120px", marginBottom: "15px" }}
        />

       

        <h2 className="fw-bold mb-2">
          REGISTRATION FOR SPICON 2026 (West Rayalaseema)
        </h2>

        <p className="mb-1">
          <strong>Date:</strong> Jan 11–14, 2026
        </p>
        <p className="mb-1">
          <strong>Venue:</strong> Seventh-day Adventist High School,
        </p>
        <p className="mb-3">
          Duggannagaripalli, Vemula Mandal (Near Vempalli),<br />
          Kadapa District (Y.S.R. Dist.)
        </p>

        <hr />

        <h5 className="fw-bold mt-3">Who can attend?</h5>
        <ul className="text-start mx-auto" style={{ maxWidth: "800px" }}>
          <li>Students with Born-again experience, minimum D.T. Camp attendance, and recommendation by senior adviser/district staff.</li>
          <li>Graduates involving in student ministry with recommendation by EGF Secretary/APEGF staff.</li>
          <li>Only authenticated registrations will be added to the SPICON-2026 WR Delegates WhatsApp group.</li>
        </ul>

        <p className="fw-bold mt-2">This is a sign that your registration is confirmed.</p>

        <p className="mt-3">
          <strong>Last date for registration:</strong><br />
          Dec 20, 2025 – 12 PM
        </p>

        <p className="text-danger fw-bold">NOTE: Spot registrations will not be allowed under any circumstances.</p>

        <hr />

        <h5 className="fw-bold">Registration Details</h5>
        <ul className="text-start mx-auto" style={{ maxWidth: "800px" }}>
          <li>Students & Unemployed – ₹500</li>
          <li>Employed – ₹1300</li>
          <li>Families – ₹2500</li>
          <li>Children above 15 years – ₹500</li>
          <li>Volunteers – ₹250</li>
        </ul>

        <p className="fw-bold mt-3">For any queries, please contact:</p>

        <p>
          <strong>Bro. R. Sudhakar (Tadipatri)</strong><br />
          9866621304
        </p>

        <p className="mt-3">
          Yours in Christ,<br />
          <strong>Bro. Sudhakar</strong><br />
          Registrar
        </p>

        <hr className="mb-4" />
      </div>

      {/* FORM START */}
      <form className="row g-3" onSubmit={handleSubmit}>

        {/* EMAIL */}
        <div className="col-md-6">
          <label className="form-label">Email *</label>
          <input
            name="email"
            className="form-control"
            value={form.email}
            onChange={handle}
            required
          />
        </div>

        {/* TITLE */}
        <div className="col-md-6">
          <label className="form-label">Title (గౌరవ సంబోధన)</label>
          <select
            name="title"
            className="form-select"
            value={form.title}
            onChange={handle}
          >
            <option value="">Choose</option>
            <option>Mr</option>
            <option>Mrs</option>
            <option>Ms</option>
            <option>Pastor</option>
            <option>Dr</option>
          </select>
        </div>

        {/* FULL NAME */}
        <div className="col-md-6">
          <label className="form-label">Enter Full Name *</label>
          <input
            name="fullName"
            className="form-control"
            value={form.fullName}
            onChange={handle}
            required
          />
        </div>

        {/* SURNAME */}
        <div className="col-md-6">
          <label className="form-label">Surname *</label>
          <input
            name="surname"
            className="form-control"
            value={form.surname}
            onChange={handle}
            required
          />
        </div>

        {/* DTC ATTENDED */}
        <div className="col-md-6">
          <label className="form-label">Have you attended DTC? *</label>
          <select
            name="dtcAttended"
            className="form-select"
            value={form.dtcAttended}
            onChange={handle}
          >
            <option value="">Select</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        {/* CONDITIONAL BLOCK FOR DTC */}
        {form.dtcAttended === "Yes" && (
          <>
            <div className="col-md-6">
              <label className="form-label">When did you attend DTC? *</label>
              <input
                name="dtcWhen"
                className="form-control"
                value={form.dtcWhen}
                onChange={handle}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Where did you attend DTC? *</label>
              <input
                name="dtcWhere"
                className="form-control"
                value={form.dtcWhere}
                onChange={handle}
                required
              />
            </div>
          </>
        )}

        {/* MOBILE */}
        <div className="col-md-6">
          <label className="form-label">Mobile Number *</label>
          <input
            name="mobile"
            className="form-control"
            value={form.mobile}
            onChange={handle}
            required
          />
        </div>

        {/* DISTRICT */}
        <div className="col-md-6">
          <label className="form-label">District *</label>
          <select
            name="district"
            className="form-select"
            value={form.district}
            onChange={handle}
            required
          >
            <option value="">Select</option>
            <option>Anantapur</option>
            <option>Sri Sathya Sai</option>
            <option>YSR Kadapa</option>
            <option>Other</option>
          </select>
        </div>

        {/* ICEU / EGF */}
        <div className="col-md-6">
          <label className="form-label">Which ICEU / EGF do you belong to? *</label>
          <select
            name="iceuEgf"
            className="form-select"
            value={form.iceuEgf}
            onChange={handle}
            required
          >
            <option value="">Choose</option>
            <option>Anantapur East Zone</option>
            <option>Anantapur West Zone</option>
            <option>Anantapur JNTU Zone</option>
            <option>Atp West Zone</option>
            <option>Badvel</option>
            <option>Bukkarayasamudram</option>
            <option>Dharmavaram</option>
            <option>Gooty</option>
            <option>Guntakal</option>
            <option>Hindupur</option>
            <option>IIIT Idupulapaya</option>
            <option>Jammalamadugu</option>
            <option>Kadapa</option>
            <option>Kadiri</option>
            <option>Kalyandurg</option>
            <option>Kamalapuram</option>
            <option>Lepakshi</option>
            <option>Madakasira</option>
            <option>Mydukur</option>
            <option>Pamidi</option>
            <option>Penukonda</option>
            <option>Proddatur</option>
            <option>Pulivendula</option>
            <option>Puttaparthi</option>
            <option>Rayadurg</option>
            <option>Rolla</option>
            <option>Tadpatri</option>
            <option>Uravakonda</option>
            <option>Vempalli</option>
            <option>Yerraguntla</option>
            <option>Yogi Vemana University Campus</option>
            <option>Sri Krishnadevaraya University (SKU)</option>
            <option>Central University (CU)</option>
            <option>Other</option>
          </select>
        </div>

        {/* RECOMMENDATION */}
        <div className="col-md-6">
          <label className="form-label">Recommended By *</label>
          <select
            name="recommendedByRole"
            className="form-select"
            value={form.recommendedByRole}
            onChange={handle}
            required
          >
            <option value="">Choose</option>
            <option>EGF President</option>
            <option>EGF Secretary</option>
            <option>Senior Advisor</option>
            <option>Staff Worker</option>
            <option>District Coordinator</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Recommender Contact *</label>
          <input
            name="recommenderContact"
            className="form-control"
            value={form.recommenderContact}
            onChange={handle}
            required
          />
        </div>

        {/* GROUP TYPE */}
        <div className="col-md-6">
          <label className="form-label">Which group do you belong to? *</label>
          <select
            name="groupType"
            className="form-select"
            value={form.groupType}
            onChange={handle}
            required
          >
            <option value="">Select</option>
            <option>Family</option>
            <option>Single Graduate (Employed)</option>
            <option>Single Graduate (Unemployed)</option>
            <option>Graduates' children (15+)</option>
            <option>Students</option>
            <option>Volunteers</option>
          </select>
        </div>

        {/* FAMILY GROUP CONDITIONAL BLOCK */}
        {form.groupType === "Family" && (
          <>
            {/* GENDER */}
            <div className="col-md-6">
              <label className="form-label">Gender *</label>
              <select
                name="gender"
                className="form-select"
                value={form.gender}
                onChange={handle}
                required
              >
                <option>Male</option>
                <option>Female</option>
                <option>Both</option>
              </select>
            </div>

            {/* AGE */}
            <div className="col-md-6">
              <label className="form-label">Your Age *</label>
              <input
                name="age"
                className="form-control"
                value={form.age}
                onChange={handle}
                required
              />
            </div>

            {/* SPOUSE */}
            <div className="col-md-6">
              <label className="form-label">Is your spouse attending?</label>
              <select
                name="spouseAttending"
                className="form-select"
                value={form.spouseAttending}
                onChange={handle}
              >
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>

            {form.spouseAttending === "Yes" && (
              <div className="col-md-6">
                <label className="form-label">Spouse Name</label>
                <input
                  name="spouseName"
                  className="form-control"
                  value={form.spouseName}
                  onChange={handle}
                />
              </div>
            )}

            {/* CHILDREN BELOW 10 */}
            <div className="col-md-6">
              <label className="form-label">Children less than 10 (Count)</label>
              <input
                name="childBelow10Count"
                className="form-control"
                value={form.childBelow10Count}
                onChange={handle}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Names of children below 10</label>
              <input
                name="childBelow10Names"
                className="form-control"
                value={form.childBelow10Names}
                onChange={handle}
              />
            </div>

            {/* CHILDREN 10–14 */}
            <div className="col-md-6">
              <label className="form-label">Children 10–14 (Count)</label>
              <input
                name="child10to14Count"
                className="form-control"
                value={form.child10to14Count}
                onChange={handle}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Names of children 10–14</label>
              <input
                name="child10to14Names"
                className="form-control"
                value={form.child10to14Names}
                onChange={handle}
              />
            </div>

            {/* TOTAL FAMILY COUNT */}
            <div className="col-md-12">
              <label className="form-label">Total family members attending *</label>
              <input
                name="totalFamilyMembers"
                className="form-control"
                value={form.totalFamilyMembers}
                onChange={handle}
                required
              />
            </div>

            {/* OTHER DELEGATES */}
            <div className="col-md-12">
              <label className="form-label">Other delegates excluding family</label>
              <textarea
                name="delegatesOther"
                className="form-control"
                value={form.delegatesOther}
                onChange={handle}
              ></textarea>
            </div>
          </>
        )}

        {/* PAYMENT DETAILS */}
        <div className="col-md-6">
          <label className="form-label">Amount Paid *</label>
          <input
            name="amountPaid"
            className="form-control"
            value={form.amountPaid}
            onChange={handle}
            required
          />
        </div>
        {/* --- NEW ACCOUNT DETAILS SECTION ADDED HERE --- */}
        <div className="col-12 mt-4">
          <hr className="mb-3" />
          <h5 className="fw-bold mb-3">Account Details</h5>
          
          <div className="p-3" style={{ background: "#f8f9fa", borderRadius: "5px" }}>
            <p className="mb-2"><strong>Account Holder Name :</strong> Mr. Jagatap Jagan</p>
            <p className="mb-2"><strong>Account No :</strong> 44676705721</p>
            <p className="mb-2"><strong>IFSC Code :</strong> SBIN0012674</p>
            <p className="mb-2"><strong>UPI ID :</strong> - </p>
            <p className="mb-2"><strong>Phone pay/Google Pay Number :</strong> - </p>
            
          </div>

          <hr className="mt-4" />
        </div>
        {/* --- END OF NEW SECTION --- */}        66

        <div className="col-md-6">
          <label className="form-label">Mode of Payment *</label>
          <select
            name="paymentMode2"
            className="form-select"
            value={form.paymentMode2}
            onChange={handle}
          >
            <option>Net Banking</option>
            <option>Google Pay</option>
            <option>PhonePe</option>
            <option>Other</option>
          </select>
        </div>

        {/* DATE OF PAYMENT */}
        <div className="col-md-6">
          <label>Date of Payment *</label>
          <input
            type="date"
            name="dateOfPayment"
            className="form-control"
            value={form.dateOfPayment}
            onChange={handle}
            required
          />
        </div>

        {/* TRANSACTION ID */}
        <div className="col-md-6">
          <label>Transaction ID *</label>
          <input
            name="transactionId"
            className="form-control"
            value={form.transactionId}
            onChange={handle}
            required
          />
        </div>

        {/* SCREENSHOT UPLOAD */}
        <div className="col-md-12">
          <label>Upload Payment Screenshot *</label>
          <input
            type="file"
            className="form-control"
            required
            onChange={(e) => setScreenshot(e.target.files[0])}
          />
        </div>

        {/* ARRIVAL DAY */}
        <div className="col-md-6">
          <label>When will you reach venue?</label>
          <input
            name="arrivalDay"
            className="form-control"
            value={form.arrivalDay}
            onChange={handle}
          />
        </div>

        {/* ARRIVAL TIME */}
        <div className="col-md-6">
          <label>Arrival Time *</label>
          <select
            name="arrivalTime"
            className="form-select"
            value={form.arrivalTime}
            onChange={handle}
            required
          >
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="col-12 text-center">
          <button className="btn btn-primary px-5" disabled={loading}>
            {loading ? "Submitting..." : "Submit Registration"}
          </button>
        </div>
      </form>

      {/* FULL SCREEN LOADER */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255,255,255,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "4rem", height: "4rem" }}
          ></div>
        </div>
      )}
    </div>
  );
}