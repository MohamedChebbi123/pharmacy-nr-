import React, { useState, useEffect } from "react";

const BrowseMeds = () => {
  const [meds, setMeds] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchMeds();
  }, []);

  const fetchMeds = async (search = "") => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMeds(searchTerm);
  };

  const handleDelete = async (id) => {
    setIsProcessing(true);
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
    } finally {
      setIsProcessing(false);
    }
  };

  const handleIncreaseQuantity = async (id) => {
    setIsProcessing(true);
    try {
      const response = await fetch(`http://localhost:7000/browse/browsemeds/${id}/increase`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Failed to increase quantity");
      }

      setMeds((prevMeds) =>
        prevMeds.map((med) =>
          med.id === id ? { ...med, quantity: med.quantity + 1 } : med
        )
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 py-16 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Pharmacy Inventory</h1>
          <p className="text-xl text-blue-100 mb-8">
            Manage your medicine stock with our comprehensive inventory system
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative flex shadow-lg rounded-xl overflow-hidden">
              <input
                type="text"
                placeholder="Search medicines by name, company, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow p-4 pr-16 focus:outline-none text-gray-800"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full bg-blue-700 hover:bg-blue-800 text-white px-6 transition-all duration-300 flex items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-500 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Medicine Grid */}
            {meds.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {meds.map((med) => (
                  <div key={med.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    {/* Medicine Image */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-gray-50">
                      <img
                        src={med.image}
                        alt={med.meds_name}
                        className="w-full h-48 object-contain mx-auto"
                        onError={(e) => {
                          e.target.src = '/medicine-placeholder.png';
                          e.target.className = 'w-full h-48 object-cover mx-auto';
                        }}
                      />
                    </div>

                    {/* Medicine Details */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{med.meds_name}</h3>
                          <p className="text-sm text-blue-600 font-medium">{med.company}</p>
                        </div>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {med.type}
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 mb-1">{med.age}</p>
                      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{med.description}</p>

                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Stock</p>
                          <p className="font-bold text-gray-900">{med.quantity} units</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="text-xl font-bold text-blue-600">${med.price}</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleIncreaseQuantity(med.id)}
                          disabled={isProcessing}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition duration-300 flex items-center justify-center"
                        >
                          {isProcessing ? (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          )}
                          Increase
                        </button>

                        <button
                          onClick={() => handleDelete(med.id)}
                          disabled={isProcessing}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition duration-300 flex items-center justify-center"
                        >
                          {isProcessing ? (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          )}
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              !isLoading && (
                <div className="text-center py-20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No medicines found</h3>
                  <p className="mt-2 text-sm text-gray-500">Try adjusting your search query to find what you're looking for.</p>
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseMeds;