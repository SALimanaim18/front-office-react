// src/components/Button.js
import React from 'react';

const Button = ({ text, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full p-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
