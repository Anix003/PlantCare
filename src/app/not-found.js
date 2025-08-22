'use client'
import React from "react";
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="m-auto text-center justify-center">
        <h1 className="text-4xl font-bold font-[montserrat]">404 - Not Found</h1>
        <p className="mt-4 font-[heebo]">The page you are looking for does not exist.</p>
        <button 
        type="button" 
        className="flex mx-auto item-center mt-6 rounded bg-teal-600 px-4 py-2 text-white hover:scale-105 ease-in duration-150 hover:shadow-lg hover:bg-teal-500 font-[inter]" 
        onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 inline-block" />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
