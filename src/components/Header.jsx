import React from "react";
import logo from "../assets/IMG_0760-removebg-preview.png";
function Header() {
  return (
    <div>
      <div className="top-section  w-screen  bg-teal-400 ">
        <div className="font-['Open_sans'] max-sm:flex-col w-[85%] mx-auto font-semibold  h-fit items-center flex justify-between ">
          {" "}
          <div className="contact-info max-sm:flex-col flex gap-6 max-sm:gap-1 py-1 text-center ">
            <span className="">
              {" "}
              <i className="ri-phone-fill"></i>+91-916-251-1155
            </span>
            <span className="">
              <i className="ri-mail-fill"></i> excelindustriess@gmail.com
            </span>
          </div>
          <div className="social-info flex gap-2">
            <a href="https://www.instagram.com/excel_industriess?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="__blank">
              <i className="ri-instagram-line text-2xl"></i>
            </a>

            <a href="https://www.facebook.com/excelind.patna" target="__blank">
              <i className="ri-facebook-line text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
      {/* Header Started  */}
      <div className="header-section  flex w-screen h-fit py-3  bg-white shadow-md ">
        <div className="w-[85%] mx-auto ">
        <div className="logo">
          <img src={logo} className="w-[15%] max-sm:w-[50%]" alt="" />
        </div>
        <div className="navbar ">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
