import React from 'react';
import ld from 'C://Users//moham//OneDrive//Bureau//pharmacy//pharmacy//src//assets//ld.jpeg';

const Landingpage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <div className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <img
          src={ld}
          alt="landingpage"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-75"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Welcome to Our Pharmacy
          </h1>
          <p className="text-xl md:text-3xl mb-8 animate-fade-in delay-500">
            Your Health, Our Priority
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 animate-fade-in delay-1000">
            Shop Now
          </button>
        </div>
      </div>

      
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                24/7 Availability
              </h3>
              <p className="text-gray-600">
                We are always here to serve you, day or night.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Expert Pharmacists
              </h3>
              <p className="text-gray-600">
                Our team is dedicated to providing the best care.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Affordable Prices
              </h3>
              <p className="text-gray-600">
                High-quality medications at competitive prices.
              </p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Need Help?</h2>
          <p className="text-xl md:text-2xl mb-8">
            Contact us for any inquiries or assistance.
          </p>
          <button className="bg-white text-green-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;