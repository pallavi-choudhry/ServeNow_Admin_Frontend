// src/pages/Admin/ProviderVerification.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function ProviderVerification() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchPendingServices = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/admin/provider-services/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(response.data);
    } catch (error) {
      setErrorMsg("Failed to fetch pending services.");
      console.error("Error fetching pending services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (serviceId, status) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      await axios.patch(
        `http://localhost:5000/api/admin/provider-services/status/${serviceId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setServices((prev) => prev.filter((s) => s._id !== serviceId));
    } catch (error) {
      console.error(`Failed to update status to ${status}:`, error);
    }
  };

  useEffect(() => {
    fetchPendingServices();
  }, []);

  return (
    <div className="mt-6 px-6">
      <h2 className="text-2xl font-bold mb-4">Provider Service Requests</h2>

      {loading && <p className="text-blue-600">Loading services...</p>}
      {errorMsg && <p className="text-red-600">{errorMsg}</p>}

      {!loading && services.length === 0 ? (
        <p className="text-gray-600">No pending service requests.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Provider</th>
                <th className="p-3 text-left">Service</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">License No.</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id} className="border-t">
                  <td className="p-3">{service.providerId?.name || "N/A"}</td>
                  <td className="p-3">{service.serviceName}</td>
                  <td className="p-3">{service.category || "N/A"}</td>
                  <td className="p-3">{service.price ? `₹${service.price}` : "N/A"}</td>
                  <td className="p-3">{service.location || "N/A"}</td>
                  <td className="p-3">{service.licenseNumber || "N/A"}</td>
                  <td className="p-3 font-semibold capitalize">{service.status}</td>
                  <td className="p-3">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleAction(service._id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => handleAction(service._id, "rejected")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProviderVerification;
