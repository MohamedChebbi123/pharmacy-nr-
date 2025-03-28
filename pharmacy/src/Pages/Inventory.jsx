import React, { useEffect, useState } from "react";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      const clientId = localStorage.getItem("clientid"); 
      if (!clientId) {
        setError("Client ID not found. Please log in again.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:7000/loginclient/inventory/${clientId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch inventory.");
        }

        setInventory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Your Medication Inventory</h2>
          <p className="text-gray-600 mt-2">View all your purchased medications</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {inventory.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-1 bg-gradient-to-r from-blue-100 to-blue-50">
                  <img 
                    src={item.image} 
                    alt={item.meds_name} 
                    className="w-full h-48 object-contain mx-auto p-4"
                    onError={(e) => {
                      e.target.src = '/medicine-placeholder.png';
                      e.target.className = 'w-full h-48 object-cover mx-auto p-4';
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{item.meds_name}</h3>
                      <p className="text-sm text-blue-600 font-medium">{item.company}</p>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {item.type}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mb-1">{item.age}+</p>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{item.description}</p>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Quantity</p>
                      <p className="font-bold text-gray-900">{item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="text-xl font-bold text-blue-600">${item.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && inventory.length === 0 && !error && (
          <div className="text-center py-20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No medications found</h3>
            <p className="mt-2 text-sm text-gray-500">Your inventory is currently empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;