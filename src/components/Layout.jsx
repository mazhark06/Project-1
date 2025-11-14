import React from "react";
import Home from "../pages/Home";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
