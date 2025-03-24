import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'C://Users//moham//OneDrive//Bureau//pharmacy//pharmacy//src//assets//logo.jpg';

const Navbar = () => {
  return (
    <div className="bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Pharmacy Logo"
            className="h-12 w-auto mr-3" 
          />
          <span className="text-2xl font-bold text-green-600">Pharmacy</span> 
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-gray-700 hover:text-green-600 font-semibold transition duration-300"
            >
              Sign In
            </Link>
          </li>
          <li>
            <Link
              to="/aboutus"
              className="text-gray-700 hover:text-green-600 font-semibold transition duration-300"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/addmeds"
              className="text-gray-700 hover:text-green-600 font-semibold transition duration-300"
            >add meds
            </Link>
          </li>
          <li>
            <Link
              to="/browsemeds"
              className="text-gray-700 hover:text-green-600 font-semibold transition duration-300"
            >browse meds
            </Link>
          </li>
          {/* <li>
            <Link
              to="/signupadmin"
              className="text-gray-700 hover:text-green-600 font-semibold transition duration-300"
            >signupadmin
            </Link>
          </li> */}
          <li>
            <Link
              to="/loginasadmin"
              className="text-gray-700 hover:text-green-600 font-semibold transition duration-300"
            >login as admin
            </Link>
          </li>
          <li>
            <Link
              to="/signupclient"
              className="text-gray-700 hover:text-green-600 font-semibold transition duration-300"
            >sign up as client
            </Link>
          </li>
          <li>
            <Link
              to="/loginclient"
              className="text-gray-700 hover:text-green-600 font-semibold transition duration-300"
            >login client
            </Link>
          </li>
          <li>
            <Link
              to="/chatbotai"
              className="text-gray-700 hover:text-green-600 font-semibold transition duration-300"
            >chat bot 
            </Link>
          </li>
          <li>
            <Link
              to="/browsemedscl"
              className="text-gray-700 hover:text-green-600 font-semibold transition duration-300"
            >browsemedscl 
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;