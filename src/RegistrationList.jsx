import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegistrationList() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  // 🔹 Helper: get final registration status for a row
  const getRegStatus = (item) => {
    // If we later store registrationStatus directly, use that
    if (item.registrationStatus) return item.registrationStatus;

    // Otherwise try to read it from last transaction
    const lastTxStatus =
      Array.isArray(item.transactions) && item.transactions.length > 0
        ? item.transactions[item.transactions.length - 1].status
        : undefined;

    return lastTxStatus || "pending";
  };

  useEffect(() => {
    const token = localStorage.getItem("registrarToken");
    if (!token) return navigate("/registrar-login");
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchList = async () => {
    try {
      const res = await fetch(
        "https://api.sjtechsol.com/api/cashier/registrations"
      );
      const result = await res.json();
      if (result.success) setRecords(result.data);
    } catch {
      toast.error("Failed to load registrations");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `https://api.sjtechsol.com/api/cashier/registrations/status/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (res.ok) {
        toast.success(`Updated to ${status.toUpperCase()}`);
        fetchList();
      } else toast.error("Action failed");
    } catch {
      toast.error("Server Error");
    }
  };

  // 🔍 Search + Filter
  const filteredRecords = records.filter((item) => {
    const currentStatus = getRegStatus(item);

    const searchMatch =
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase()) ||
      item.mobile?.includes(search) ||
      item.region?.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      filterStatus === "all" ? true : currentStatus === filterStatus;

    return searchMatch && statusMatch;
  });

  return (
    <div className="container-fluid mt-4">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Registration Approval List</h3>

        <button
          className="btn btn-danger fw-bold"
          onClick={() => {
            localStorage.removeItem("registrarToken");
            localStorage.removeItem("registrarData");
            toast.success("Logged out!");
            setTimeout(() => navigate("/"), 700);
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* Search + Filter */}
      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name, Email, Mobile, Region..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="declined">Declined</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              <th>Region</th>
              <th>Email</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Mobile</th>
              <th>Recommended Role</th>
              <th>Recommender Contact</th>
              <th>Status</th>
              <th style={{ width: "150px" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredRecords.length ? (
              filteredRecords.map((item, i) => {
                const currentStatus = getRegStatus(item);

                return (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>{item.region}</td>
                    <td>{item.email}</td>
                    <td>{item.name}</td>
                    <td>{item.gender || "-"}</td>
                    <td>{item.age}</td>
                    <td>{item.mobile}</td>
                    <td>{item.recommendedByRole}</td>
                    <td>{item.recommenderContact}</td>

                    {/* Status text */}
                    <td>
                      <span
                        className={
                          currentStatus === "approved"
                            ? "text-success fw-bold"
                            : currentStatus === "declined"
                            ? "text-danger fw-bold"
                            : "text-warning fw-bold"
                        }
                      >
                        {currentStatus}
                      </span>
                    </td>

                    {/* Action column */}
                    <td>
                      <div className="d-flex gap-2 justify-content-center">
                        {/* APPROVED → only tick */}
                        {currentStatus === "approved" && (
                          <button
                            className="btn btn-success rounded-circle"
                            style={{
                              width: "38px",
                              height: "38px",
                              fontSize: "20px",
                            }}
                            disabled
                          >
                            ✓
                          </button>
                        )}

                        {/* DECLINED → only cross */}
                        {currentStatus === "declined" && (
                          <button
                            className="btn btn-danger rounded-circle"
                            style={{
                              width: "38px",
                              height: "38px",
                              fontSize: "20px",
                            }}
                            disabled
                          >
                            ✕
                          </button>
                        )}

                        {/* PENDING → show Approve / Decline */}
                        {currentStatus === "pending" && (
                          <>
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() =>
                                updateStatus(item._id, "approved")
                              }
                            >
                              Approve
                            </button>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                updateStatus(item._id, "declined")
                              }
                            >
                              Decline
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="12" className="fw-bold text-danger">
                  No Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
