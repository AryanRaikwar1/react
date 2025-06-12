// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/layout";
import Home from "./pages/Home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard/"
import Analytic from "./pages/dashboard/analytic"
import Budget from "./pages/dashboard/budget"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytic" element={<Analytic />} />
          <Route path="budget" element={<Budget />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
