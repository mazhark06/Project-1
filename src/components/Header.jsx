import React from "react";

function Header() {
  return (
    <div>
      <div className="top-section w-screen  bg-teal-400 ">
        <div className="font-['Open_sans'] w-[75%] mx-auto font-semibold  h-8 items-center flex justify-between ">
          {" "}
          <div className="contact-info flex gap-6 ">
            <span className="">
              {" "}
              <i className="ri-phone-fill"></i>+9199999999
            </span>
            <span className="">
              <i className="ri-mail-fill"></i> excelindustriess@gmail.com
            </span>
          </div>
          <div className="social-info flex gap-6">
            <a href="https://www.instagram.com" target="__blank">
              <i className="ri-instagram-line text-2xl"></i>
            </a>

            <a href="https://www.facebook.com" target="__blank">
              <i className="ri-facebook-line text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
