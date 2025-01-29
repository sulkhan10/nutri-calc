import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
      <div className="flex items-center max-w-sm w-full justify-center min-h-screen bg-[#E8F5E9]">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-500">404</h1>
          <p className="text-md mt-4">Oops! The page you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="mt-6 inline-block px-6 py-3 bg-[#1B5E20] text-white rounded-md hover:bg-[#2E7D32]"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  };
  
  export default NotFound;