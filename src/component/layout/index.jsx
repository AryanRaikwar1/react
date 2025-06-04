// src/component/Layout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen text-gray-900 bg-white">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">MyWebsite</h1>
          <nav className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Signup</Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet /> {/* This is where the nested routes render */}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4 border-t">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} MyWebsite. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
