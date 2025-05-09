import React from 'react';

export function Card({ children, className = '' }) {
  return <div className={`bg-white shadow-md rounded ${className}`}>{children}</div>;
}

export function CardHeader({ children }) {
  return <div className="border-b p-4">{children}</div>;
}

export function CardTitle({ children }) {
  return <h2 className="text-xl font-bold">{children}</h2>;
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={`border-t p-4 ${className}`}>{children}</div>;
}

export function CardDescription({ children }) {
  return <p className="text-sm text-gray-500">{children}</p>;
}
