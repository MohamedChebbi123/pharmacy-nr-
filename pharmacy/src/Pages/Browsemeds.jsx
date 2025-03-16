import React, { useState, useEffect } from "react";

const BrowseMeds = () => {
  const [meds, setMeds] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMeds();
  }, []);

  const fetchMeds = async (search = "") => {
    try {
      const response = await fetch(`http://localhost:7000/browse/browsemeds?search=${encodeURIComponent(search)}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setMeds(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setMeds([]);
    }
  };

  const handleSearch = () => {
    fetchMeds(searchTerm);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:7000/browse/browsemeds/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete medication");
      }
      setMeds((prevMeds) => prevMeds.filter((med) => med.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="bg-blue-900 py-12 text-center shadow-md">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-white mb-4">Find Your Medicines</h1>
          <p className="text-lg text-blue-200 mb-6">
            Search for the best medicines and healthcare products from our trusted pharmacy.
          </p>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-l-lg p-3 w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        {error && <p className="text-red-600 text-center font-medium">Error: {error}</p>}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {meds.map((med) => (
            <li
              key={med.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
            >
              <div className="flex flex-col items-center space-y-4">
                <img
                  src={med.image}
                  alt={med.meds_name}
                  className="w-36 h-36 object-cover rounded-lg border-2 border-blue-200 shadow-md"
                />
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-blue-900">{med.meds_name}</h3>
                  <p className="text-gray-700 font-medium">{med.company}</p>
                  <p className="text-sm text-gray-500">{med.type} - {med.age}</p>
                  <p className="text-lg font-bold text-blue-600 mt-2">${med.price}</p>
                  <p className="text-sm text-gray-600 mt-2">{med.description}</p>
                  <p className="text-sm text-gray-600 mt-2">Quantity: {med.quantity}</p>

                  <button
                    onClick={() => handleDelete(med.id)}
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BrowseMeds;
