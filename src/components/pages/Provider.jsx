import React, { useEffect, useState } from "react";
import axios from "axios";

function ProviderVerification() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageAlt, setImageAlt] = useState("");

  const fetchPendingServices = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/admin/provider-services/pending",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setServices(response.data);
      setErrorMsg("");
    } catch (error) {
      setErrorMsg("Failed to fetch pending services. Please try again.");
      console.error("Error fetching pending services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (serviceId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/admin/provider-services/status/${serviceId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setServices((prev) => prev.filter((s) => s._id !== serviceId));
      setSelectedService(null);
    } catch (error) {
      setErrorMsg(`Failed to update status to ${status}. Please try again.`);
      console.error(`Failed to update status to ${status}:`, error);
    }
  };

  const openImageModal = (imageUrl, altText) => {
    setSelectedImage(imageUrl);
    setImageAlt(altText);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setImageAlt("");
  };

  useEffect(() => {
    fetchPendingServices();
  }, []);

  return (
    <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Provider Service Requests</h2>

      {loading && <p className="text-blue-600 text-lg">Loading services...</p>}
      {errorMsg && <p className="text-red-600 text-lg mb-4">{errorMsg}</p>}

      {!loading && services.length === 0 ? (
        <p className="text-gray-600 text-lg">No pending service requests.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-4 text-left font-semibold">Provider</th>
                <th className="p-4 text-left font-semibold">Service</th>
                <th className="p-4 text-left font-semibold">Category</th>
                <th className="p-4 text-left font-semibold">Price</th>
                <th className="p-4 text-left font-semibold">Location</th>
                <th className="p-4 text-left font-semibold">Status</th>
                <th className="p-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{service.providerId?.name || "N/A"}</td>
                  <td className="p-4">{service.serviceName}</td>
                  <td className="p-4">{service.category || "N/A"}</td>
                  <td className="p-4">₹{service.price}</td>
                  <td className="p-4">{service.location}</td>
                  <td className="p-4 capitalize">{service.status}</td>
                  <td className="p-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                      onClick={() => setSelectedService(service)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detailed View */}
      {selectedService && (
        <div className="mt-8 p-6 border rounded-lg bg-gray-50 shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-blue-700">
            Service Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p><strong>Provider:</strong> {selectedService.providerId?.name || "N/A"}</p>
            <p><strong>Service:</strong> {selectedService.serviceName}</p>
            <p><strong>Category:</strong> {selectedService.category || "N/A"}</p>
            <p><strong>Price:</strong> ₹{selectedService.price}</p>
            <p><strong>Location:</strong> {selectedService.location}</p>
            <p><strong>Contact:</strong> {selectedService.contact || "N/A"}</p>
            <p><strong>Aadhaar Number:</strong> {selectedService.aadhaarNumber || "N/A"}</p>
            <p><strong>License Number:</strong> {selectedService.licenseNumber || "N/A"}</p>
            <p><strong>Available Days:</strong> {selectedService.availableDays?.join(", ") || "N/A"}</p>
            <p><strong>GeoLocation:</strong> {selectedService.geoLocation?.coordinates?.join(", ") || "N/A"}</p>
            <p><strong>Status:</strong> {selectedService.status}</p>
          </div>

          <div className="my-6">
            <strong>Documents and Photos:</strong>
            <div className="flex gap-4 mt-2 flex-wrap">
              {selectedService.photos?.length > 0 ? (
                selectedService.photos.map((url, i) => (
                  <div
                    key={`photo-${i}`}
                    className="relative w-32 h-32 border border-gray-200 rounded-md p-2 bg-gray-50 cursor-pointer hover:scale-105 transition-transform duration-200"
                    onClick={() => openImageModal(url, `Photo ${i + 1}`)}
                  >
                    <img
                      src={url}
                      alt={`photo-${i}`}
                      className="w-full h-full object-cover rounded"
                    />
                    <div className="absolute bottom-1 left-1 text-xs text-gray-600">Photo {i + 1}</div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No photos available.</p>
              )}
              {selectedService.aadhaarFile && (
                <div
                  className="relative w-32 h-32 border border-gray-200 rounded-md p-2 bg-gray-50 cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={() => openImageModal(selectedService.aadhaarFile, "Aadhaar")}
                >
                  <img
                    src={selectedService.aadhaarFile}
                    alt="aadhaar"
                    className="w-full h-full object-cover rounded"
                  />
                  <div className="absolute bottom-1 left-1 text-xs text-gray-600">Aadhaar</div>
                </div>
              )}
              {selectedService.licenseFile && (
                <div
                  className="relative w-32 h-32 border border-gray-200 rounded-md p-2 bg-gray-50 cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={() => openImageModal(selectedService.licenseFile, "License")}
                >
                  <img
                    src={selectedService.licenseFile}
                    alt="license"
                    className="w-full h-full object-cover rounded"
                  />
                  <div className="absolute bottom-1 left-1 text-xs text-gray-600">License</div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition-colors duration-200"
              onClick={() => handleAction(selectedService._id, "approved")}
            >
              Approve
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md transition-colors duration-200"
              onClick={() => handleAction(selectedService._id, "rejected")}
            >
              Reject
            </button>
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-md transition-colors duration-200"
              onClick={() => setSelectedService(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Individual Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl w-full p-4">
            <img
              src={selectedImage}
              alt={imageAlt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-4 text-white text-sm bg-gray-800 bg-opacity-75 px-2 py-1 rounded">
              {imageAlt}
            </div>
            <button
              className="absolute top-2 right-2 bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-full transition-colors duration-200"
              onClick={closeImageModal}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProviderVerification;