import React, { useState } from "react";

const Addmeds = () => {
  const [meds_name , setMedsName] = useState("");
  const [company , setCompany] = useState("");
  const [age , setAge] = useState("");
  const [type , setType] = useState("");
  const [price , setPrice] = useState("");
  const [image , setImage] = useState("");
  const [description , setDescription]=useState("");
  const [quantity,setQuantity]=useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { meds_name, company, age, type, price,quantity, description, image };

    console.log("Submitting data:", formData); 

    try {
      const response = await fetch("http://localhost:7000/meds/addmeds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (response.ok) {
        alert("✅ Medication added successfully!");
        setMedsName("");
        setCompany("");
        setAge("");
        setType("");
        setPrice("");
        setImage("");
        setDescription("");
        setQuantity("");
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Medication</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={meds_name}
            onChange={(e) => setMedsName(e.target.value)}
            placeholder="Medication Name"
            required
            className="input-field"
          />
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company"
            required
            className="input-field"
          />
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
            required
            className="input-field"
          />
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Type"
            required
            className="input-field"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            required
            className="input-field"
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="quantity"
            required
            className="input-field"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="write a description"
            required
            className="input-field"
          />
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
            required
            className="input-field"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Add Medication
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addmeds;
