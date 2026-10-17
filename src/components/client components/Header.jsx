import React, { useState } from "react";
import { Link } from "react-router-dom";
import ScreenWidth from "../../hooks/ScreenWidth";
import { Desktop, Mobile } from "./Navbar";
import logo from "../../assets/IMG_0760-removebg-preview.png";

function Header() {
  const screenWidth = ScreenWidth();
  const isDesktop = screenWidth > 768;
  return (
    <>
      <div className="top-section  w-full text-second ">
        <div className="font-['Open_sans'] max-sm:flex-col w-[85%] mx-auto font-semibold  h-10 items-center flex justify-between ">
          {" "}
          <div className="contact-info max-sm:flex-col flex gap-6 max-sm:gap-1 py-1 text-center ">
            <span className="">
              {" "}
              <i className="ri-phone-fill"></i>+91-933-401-2534
            </span>
            <span className="">
              <i className="ri-mail-fill"></i> excelindustriess@gmail.com
            </span>
          </div>
          <div className="social-info max-sm:hidden flex gap-3">
            <a
              href="https://www.instagram.com/excel_industriess?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="__blank"
            >
              <i className="ri-instagram-line text-2xl"></i>
            </a>
            <a href="https://www.facebook.com/excelind.patna" target="__blank">
              <i className="ri-facebook-box-line text-2xl"></i>
            </a>
            <a
              href="https://www.youtube.com/@excelindustries851"
              target="__blank"
            >
              <i className="ri-youtube-line text-2xl"></i>
            </a>
            <a
              href="https://whatsapp.com/channel/0029VbCWWkjLNSZvmBcu1a46"
              target="__blank"
            >
              <i className="ri-whatsapp-line text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
      {/* Header Started  */}
      <div className="header-section sticky z-10 top-0 flex w-full h-fit py-3  bg-white shadow-md ">
        <div className="w-[85%] flex mx-auto ">
          <div className="logo">
            <Link to="/">
              {" "}
              <img src={logo} className="w-[25%] max-sm:w-[50%]" alt="" />
            </Link>
          </div>
          {isDesktop ? <Desktop /> : <Mobile />}
        </div>
      </div>
    </>
  );
}

export default Header;
