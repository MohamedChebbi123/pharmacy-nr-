import React, { useState } from "react";

const Addmeds = () => {
  const [meds_name, setMedsName] = useState("");
  const [company, setCompany] = useState("");
  const [age, setAge] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { meds_name, company, age, type, price, quantity, description, image };

    console.log("Submitting data:", formData);

    try {
      const response = await fetch("http://localhost:7000/addmeds/addmeds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (response.ok) {
        setSuccessMessage("✅ Medication added successfully!");
        setMedsName("");
        setCompany("");
        setAge("");
        setType("");
        setPrice("");
        setImage("");
        setDescription("");
        setQuantity("");

        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        console.error("❌ Failed to add medication:", data.error);
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Add Medication</h2>
        <p className="text-gray-600 text-center mb-6">Enter medication details below</p>
        
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Medication Name</label>
            <input
              type="text"
              value={meds_name}
              onChange={(e) => setMedsName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Age Group</label>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Type</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 min-h-[100px]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow-md"
          >
            Add Medication
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addmeds;