import React, { useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { AddProduct, ManageProduct } from "../../components/admin/Product";
import { AddCategory, ManageCategroy } from "../../components/admin/Category";
import {
  AddSubCategory,
  ManageSubCategroy,
} from "../../components/admin/SubCategory";
import QuoteManagement from "../../components/admin/QuoteManagement";

const DashBoard = () => {
  let [activeSection, setActiveSection] = useState('category-manage');

  const renderSection = () =>  {
    switch (activeSection) {
      default:
        return <ManageProduct/>
      case "product-manage":
        return <ManageProduct />;
      case "product-add":
        return <AddProduct />;
      case "category-manage":
        return <ManageCategroy />;
      case "category-add":
        return <AddCategory />;
      case "sub-category-manage":
        return <ManageSubCategroy />;
      case "sub-category-add":
        return <AddSubCategory />;
      case "quote":
        return <QuoteManagement />;
      
    }
  }
  return (
    <div className="w-full h-full">
      <header className="sticky top-0">
        <div className="flex justify-between items-center bg-white p-4 shadow-sm">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <button className="text-red-500">Logout</button>
        </div>
      </header>
      <div className="main flex ml-64">
        <AdminNavbar onChangeSection={setActiveSection} />
        <div className="w-full h-full">{renderSection()}</div>
      </div>
    </div>
  );
};

export default DashBoard;
