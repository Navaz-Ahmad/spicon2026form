import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [records, setRecords] = useState([]);
  const [filterRegion, setFilterRegion] = useState("all");

  const navigate = useNavigate();

  // 🔐 Prevent unauthorized access
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/"); // Redirect to login if no token
    fetchPayments();
  }, []);

  // 🔥 LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    navigate("/"); // Redirect back to login
  };

  // 📥 Fetch Payment Data
  const fetchPayments = async () => {
    try {
      const res = await fetch("https://api.sjtechsol.com/api/cashier/list");
      const result = await res.json();

      if (result.success) {
        const unique = result.data.filter(
          (obj, index, self) => index === self.findIndex((t) => t.email === obj.email)
        );
        setRecords(unique);
      }
    } catch (err) {
      console.log("Error fetching list:", err);
    }
  };

  // Filter Based on Region Selection
  const filteredRecords = records.filter((item) => {
    if (filterRegion === "all") return true;
    return item.region?.toLowerCase().includes(filterRegion);
  });

  // 💰 Total Calculations
  const totalAmount = filteredRecords.reduce((sum, item) => sum + (Number(item.amountPaid) || 0), 0);

  const totalEast = records
    .filter(r => r.region?.toLowerCase().includes("east"))
    .reduce((sum, r) => sum + (Number(r.amountPaid) || 0), 0);

  const totalWest = records
    .filter(r => r.region?.toLowerCase().includes("west"))
    .reduce((sum, r) => sum + (Number(r.amountPaid) || 0), 0);

  return (
    <div className="container-fluid mt-4">

      {/* Header + Logout */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Admin Payment Dashboard</h2>
        <button className="btn btn-danger fw-bold px-4" onClick={handleLogout}>Logout</button>
      </div>

      {/* Filter + Totals Summary */}
      <div className="d-flex align-items-center justify-content-between mb-3">

        <select
          className="form-select w-25"
          onChange={(e) => setFilterRegion(e.target.value)}
        >
          <option value="all">All Regions</option>
          <option value="east">East Rayalaseema</option>
          <option value="west">West Rayalaseema</option>
        </select>

        <div className="fw-bold fs-5 d-flex gap-4">
          <span className="text-primary">Total East: ₹ {totalEast}</span>
          <span className="text-success">Total West: ₹ {totalWest}</span>
          <span className="text-warning">Displayed Total: ₹ {totalAmount}</span>
        </div>

      </div>

      {/* TABLE */}
      <div className="table-responsive" style={{ maxHeight: "80vh", overflowY: "scroll" }}>
        <table className="table table-bordered table-striped table-sm">
          <thead className="table-dark text-center">
            <tr>
              <th>S.No</th>
              <th>Region</th>
              <th>Email</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Mobile</th>
              <th>Recommended By Role</th>
              <th>Recommender Contact</th>
              <th>Amount Paid</th>
              <th>Payment Mode</th>
              <th>Date of Payment</th>
              <th>Transaction ID</th>
              <th>Payment Screenshot</th>
              <th>Balance Amount</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.region}</td>
                  <td>{item.email}</td>
                  <td>{item.name}</td>
                  <td>{item.gender}</td>
                  <td>{item.age}</td>
                  <td>{item.mobile}</td>
                  <td>{item.recommendedByRole}</td>
                  <td>{item.recommenderContact}</td>
                  <td>{item.amountPaid}</td>
                  <td>{item.paymentMode2}</td>
                  <td>{item.dateOfPayment}</td>
                  <td>{item.transactionId}</td>

                  <td>
                    {item.paymentScreenshot && (
                      <a href={item.paymentScreenshot} target="_blank" rel="noreferrer">
                        View
                      </a>
                    )}
                  </td>

                  <td>{item.transactions?.[0]?.totalAmount ?? 0}</td>
                  <td>
                    <span className={item.status === "paid" ? "text-success fw-bold" : "text-danger fw-bold"}>
                      {item.status}
                    </span>
                  </td>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="40" className="text-center text-danger">No Records Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
