import React, { useState } from "react";

const AdminNavbar = ({ onChangeSection }) => {

  const toggleMenu = (menu) => {
    setExpandMenu((prev) => (prev == menu ? null : menu));
  };

  const [expandMenu, setExpandMenu] = useState(true);
  return (
    <div className="fixed left-0 top-15 w-64">
      <nav className="w-full text-white h-screen bg-slate-900">
        <ul className="flex flex-col justify-start text-2xl">
          <li className="bg-slate-900 px-4 py-1  cursor-pointer">
            <div
              className={` hover:bg-slate-800 duration-200`}
              onClick={() => toggleMenu("product")}
            >
              Product
            </div>
            <div
              className={`transition-all overflow-y-hidden duration-400 ease-in-out ${
                expandMenu == "product"
                  ? "max-h-30 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <ul className="text-lg pl-6">
                <li
                  className="hover:bg-slate-800 py-0.5"
                  onClick={() => onChangeSection("product-manage")}
                >
                  Manage Product
                </li>
                <li
                  className="hover:bg-slate-800 py-0.5"
                  onClick={() => onChangeSection("product-add")}
                >
                  Add Product
                </li>
              </ul>
            </div>
          </li>

          <li className="bg-slate-900 px-4 py-1  cursor-pointer">
            <div
              className={` hover:bg-slate-800 duration-200`}
              onClick={() => toggleMenu("category")}
            >
              Category
            </div>
            <div
              className={`transition-all overflow-y-hidden duration-400 ease-in-out ${
                expandMenu == "category"
                  ? "max-h-30 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <ul className="text-lg pl-6">
                <li
                  className="hover:bg-slate-800 py-0.5"
                  onClick={() => onChangeSection("category-manage")}
                >
                  Manage Category
                </li>
                <li
                  className="hover:bg-slate-800 py-0.5"
                  onClick={() => onChangeSection("category-add")}
                >
                  Add Category
                </li>
              </ul>
            </div>
          </li>

           <li className="bg-slate-900 px-4 py-1  cursor-pointer">
            <div
              className={` hover:bg-slate-800 duration-800`}
              onClick={() => toggleMenu("sub-category")}
            >
              Sub-Category
            </div>
            <div
              className={`transition-all overflow-y-hidden duration-400 ease-in-out ${
                expandMenu == "sub-category"
                  ? "max-h-30 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <ul className="text-lg pl-6">
                <li
                  className="hover:bg-slate-800 py-0.5"
                  onClick={() => onChangeSection("sub-category-manage")}
                >
                  Manage Sub-Category
                </li>
                <li
                  className="hover:bg-slate-800 py-0.5"
                  onClick={() => onChangeSection("sub-category-add")}
                >
                  Add Sub-Category
                </li>
              </ul>
            </div>
          </li>
          <li onClick={() => onChangeSection("quote")} className="bg-slate-900 px-4 py-1 hover:bg-slate-800 cursor-pointer">
            Quote Management
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminNavbar;
