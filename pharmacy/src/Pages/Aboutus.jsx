import React from 'react';

const Aboutus = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-16">
      {/* Hero Section */}
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-green-600 mb-6">
          About Us
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          We are dedicated to providing the best healthcare solutions to our community. Our mission is to make quality medications and expert advice accessible to everyone.
        </p>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600">
              At Pharmacy, we strive to ensure that every individual has access to affordable and high-quality medications. Our team of expert pharmacists is here to guide you every step of the way.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="https://via.placeholder.com/500x300" // Replace with your image
              alt="Our Mission"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-6 mt-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img
              src="https://via.placeholder.com/150" // Replace with team member image
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800">John Doe</h3>
            <p className="text-gray-600">Lead Pharmacist</p>
          </div>

          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img
              src="https://via.placeholder.com/150" // Replace with team member image
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800">Jane Smith</h3>
            <p className="text-gray-600">Customer Care Specialist</p>
          </div>

          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img
              src="https://via.placeholder.com/150" 
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800">Michael Brown</h3>
            <p className="text-gray-600">Pharmacy Technician</p>
          </div>
        </div>
      </div>

      
      <div className="bg-green-600 mt-16 py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white mb-8">
            Join us in our mission to provide the best healthcare solutions. Contact us today!
          </p>
          <button className="bg-white text-green-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;