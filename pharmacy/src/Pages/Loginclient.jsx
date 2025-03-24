import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Loginclient = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:7000/loginclient/loginclient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          phone_number: phoneNumber, 
          password: password 
        }),
      });

      const data = await response.json();
      localStorage.setItem("clientid",data.id_client)
      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }
      console.log(data);

      

      // Redirect to protected route
      navigate("/browsemedscl");
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Client Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number:
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 rounded-md">
            <p className="text-sm text-red-600 text-center">{error}</p>
          </div>
        )}
        
        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button 
            onClick={() => navigate("/signupclient")}
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loginclient;