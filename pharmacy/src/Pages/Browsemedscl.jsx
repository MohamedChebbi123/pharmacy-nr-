import React, { useState, useEffect } from 'react';

const Browsemedscl = () => {
  const [meds, setMeds] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    fetchMeds();
  }, []);

  const fetchMeds = async (search = "") => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:7000/browsemedscl/browsemeds?search=${encodeURIComponent(search)}`
      );

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

  const handleBuy = async (medId) => {
    setIsPurchasing(true);
    try {
      const response = await fetch("http://localhost:7000/loginclient/insertmedscl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_meds: medId,
          id_client: localStorage.getItem("clientid")
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process the purchase");
      }

      const result = await response.json();
      alert("Purchase successful!");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 py-16 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Pharmacy Marketplace</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover quality medicines and healthcare products from trusted providers
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative flex shadow-lg rounded-xl overflow-hidden">
              <input
                type="text"
                placeholder="Search medicines, brands, or categories..."
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
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {meds.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {meds.map((med) => (
                  <div key={med.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="p-1 bg-gradient-to-r from-blue-100 to-blue-50">
                      <img
                        src={med.image || '/medicine-placeholder.png'}
                        alt={med.meds_name}
                        className="w-full h-48 object-contain mx-auto p-4"
                        onError={(e) => {
                          e.target.src = '/medicine-placeholder.png';
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{med.meds_name}</h3>
                          <p className="text-sm text-blue-600 font-medium mb-2">{med.company}</p>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {med.type}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-4">{med.age}</p>
                      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{med.description}</p>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          <p className="text-sm text-gray-500">Available:</p>
                          <p className="font-bold text-gray-900">{med.quantity} units</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="text-xl font-bold text-blue-600">${med.price}</p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleBuy(med.id)}
                        disabled={isPurchasing}
                        className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
                      >
                        {isPurchasing ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Add to Cart
                          </>
                        )}
                      </button>
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
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Browsemedscl;
