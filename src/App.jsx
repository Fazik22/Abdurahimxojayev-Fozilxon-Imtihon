import "./App.css";
import React from "react";
import Products from "./components/Products";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Cart from "./components/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./components/ProductPage";

function App() {

  return (
    <Router>
      <Header />
      <HeroSection />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
