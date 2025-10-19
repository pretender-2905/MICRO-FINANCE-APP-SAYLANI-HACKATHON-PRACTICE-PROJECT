import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { AppRoutes } from "../constants/constant";

const MemberReports = () => {
  const { id } = useParams(); // familyMemberId
  const token = Cookies.get("token");
console.log("Family Member ID:", id);
console.log("Fetching reports from:", `${AppRoutes.getAllReports}?familyMemberId=${id}`);

  const [reports, setReports] = useState([]);
  const [form, setForm] = useState({
    reportDate: "",
    testName: "",
    doctor: "",
    price: "",
    note: "",
    file: null,
  });

  // ✅ Fixed: Fetch reports for this family member
  const getReports = async (familyMemberId) => {
    try {
      const res = await axios.get(
        `https://micro-finance-app-saylani-hackathon-practice-pro-production.up.railway.app/fileRoutes?familyMemberId=${familyMemberId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReports(res.data); // ✅ Fixed: Set actual response data
    } catch (err) {
      console.error("Error fetching reports:", err);
      setReports([]); // Set empty array on error
    }
  };

  // ✅ Handle form changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setForm({ ...form, file: files[0] });
    else setForm({ ...form, [name]: value });
  };

  // ✅ Upload new report
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.file) return alert("Please select a file");

    const data = new FormData();
    data.append("familyMemberId", id);
    data.append("reportDate", form.reportDate);
    data.append("testName", form.testName);
    data.append("doctor", form.doctor);
    data.append("price", form.price);
    data.append("note", form.note);
    data.append("file", form.file);

    try {
      await axios.post(AppRoutes.uploadReport, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Report uploaded successfully!");
      setForm({
        reportDate: "",
        testName: "",
        doctor: "",
        price: "",
        note: "",
        file: null,
      });
      getReports(id); // refresh list
    } catch (err) {
      console.error("Error uploading report:", err.response?.data || err.message);
      alert("Failed to upload report");
    }
  };

  useEffect(() => {
    if (id) getReports(id);
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Reports for Family Member 🧾
      </h1>

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
          className="bg-blue-600 text-white py-2 rounded col-span-2"
        >
          Upload Report
        </button>
      </form>

      {/* Reports list */}
      <div>
        <h2 className="text-xl mb-3 font-semibold">Uploaded Reports</h2>
        {reports.length === 0 ? (
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