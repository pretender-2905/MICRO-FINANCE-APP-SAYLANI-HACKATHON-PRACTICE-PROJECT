import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { AppRoutes } from "../constants/constant";

const MemberReports = () => {
  const { id } = useParams(); // familyMemberId
  const token = Cookies.get("token");

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    reportDate: "",
    testName: "",
    doctor: "",
    price: "",
    note: "",
    file: null,
  });

  // Debug logging
  useEffect(() => {
    console.log("Family Member ID:", id);
    console.log("Reports API URL:", `${AppRoutes.getAllReports}?familyMemberId=${id}`);
    console.log("Upload API URL:", AppRoutes.uploadReport);
  }, [id]);

  // ✅ Fixed: Fetch reports for this family member
  const getReports = async (familyMemberId) => {
    setLoading(true);
    try {
      console.log("Fetching from:", `${AppRoutes.getAllReports}?familyMemberId=${familyMemberId}`);
      
      const res = await axios.get(
        `${AppRoutes.getAllReports}?familyMemberId=${familyMemberId}`,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          } 
        }
      );
      
      console.log("Reports response:", res.data);
      setReports(res.data);
    } catch (err) {
      console.error("Error fetching reports:", err);
      console.error("Error details:", err.response?.data);
      alert(`Failed to fetch reports: ${err.response?.data?.message || err.message}`);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle form changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ✅ Fixed: Upload new report with better error handling
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.file) {
      alert("Please select a file");
      return;
    }

    if (!id) {
      alert("Family member ID is missing");
      return;
    }

    setUploading(true);

    const data = new FormData();
    data.append("familyMemberId", id);
    data.append("reportDate", form.reportDate);
    data.append("testName", form.testName);
    data.append("doctor", form.doctor || "");
    data.append("price", form.price || "");
    data.append("note", form.note || "");
    data.append("file", form.file);

    // Log FormData contents for debugging
    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      console.log("Uploading to:", AppRoutes.uploadReport);
      
      const response = await axios.post(AppRoutes.uploadReport, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type manually for FormData - let browser set it with boundary
        },
        timeout: 30000, // 30 second timeout
      });

      console.log("Upload response:", response.data);
      
      alert("Report uploaded successfully!");
      setForm({
        reportDate: "",
        testName: "",
        doctor: "",
        price: "",
        note: "",
        file: null,
      });
      
      // Refresh the file input
      document.querySelector('input[type="file"]').value = "";
      
      getReports(id); // refresh list
    } catch (err) {
      console.error("Upload error:", err);
      console.error("Error response:", err.response?.data);
      
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.msg || 
                          err.message || 
                          "File upload failed";
      
      alert(`Failed to upload report: ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getReports(id);
    }
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Reports for Family Member 🧾
      </h1>

      {/* Show loading state */}
      {loading && <p className="text-blue-600 mb-4">Loading reports...</p>}

      {/* Upload form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-8">
        <input
          type="date"
          name="reportDate"
          value={form.reportDate}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="testName"
          placeholder="Test Name"
          value={form.testName}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="doctor"
          placeholder="Doctor Name"
          value={form.doctor}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <textarea
          name="note"
          placeholder="Notes"
          value={form.note}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />
        <input
          type="file"
          name="file"
          accept="image/*,application/pdf"
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
          required
        />
        <button
          type="submit"
          disabled={uploading}
          className={`py-2 rounded col-span-2 ${
            uploading 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {uploading ? "Uploading..." : "Upload Report"}
        </button>
      </form>

      {/* Reports list */}
      <div>
        <h2 className="text-xl mb-3 font-semibold">Uploaded Reports</h2>
        {reports.length === 0 && !loading ? (
          <p>No reports yet.</p>
        ) : (
          <ul className="space-y-3">
            {reports.map((r) => (
              <li
                key={r._id}
                className="border p-3 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{r.testName}</p>
                  <p className="text-sm text-gray-500">
                    {r.reportDate?.slice(0, 10)} – {r.doctor || "N/A"}
                  </p>
                  {r.note && (
                    <p className="text-sm text-gray-600 mt-1">{r.note}</p>
                  )}
                </div>
                <a
                  href={r.cloudUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Report
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MemberReports;