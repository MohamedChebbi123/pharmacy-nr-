import React, { useState } from 'react';

const Signupadmin = () => {
  const [name, setName] = useState("");
  const [family_name, setFamilyName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [profile_picture, setProfilePicture] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adminData = {
      name,
      family_name,
      phone_number,
      password,
      profile_picture,
    };

    try {
      const response = await fetch("http://localhost:7000/auth/signupadmin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div>
      <h1>Admin Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="family_name">Family Name:</label>
          <input
            type="text"
            id="family_name"
            value={family_name}
            onChange={(e) => setFamilyName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone_number">Phone Number:</label>
          <input
            type="tel"
            id="phone_number"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="profile_picture">Profile Picture URL:</label>
          <input
            type="text"
            id="profile_picture"
            value={profile_picture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signupadmin;