import React from "react";
import CategoryBar from "../Components/Category/CategoryBar";
import FeaturedCard from "./Footer/FeaturedCard";
import Footer from "./Footer/Footer";
import FooterTop from "./Footer/FooterTop";
import MobileFooter from "./Footer/MobileFooter";
import Navbar from "./Navbar/Navbar";
import NavbarTop from "./Navbar/NavbarTop";

const Layout = ({ children, serachIntegration, SearchText, CartItem }) => {
  return (
    <div>
      {/* {console.log("Layout =>", props)} */}
      {/* <ToastContainer /> */}
      <div className="font-sans">
        <NavbarTop />
        <div className="sticky top-0 z-50">
          <Navbar CartItem={CartItem} />
        </div>
        {/* <CategoryBar /> */}
        <div className="bg-gray-50">{children}</div>
        <MobileFooter CartItem={CartItem} />
        <div className="w-full">
          <FooterTop />
          <div className="hidden relative lg:block mx-auto max-w-screen-2xl py-6 px-3 sm:px-10">
            <FeaturedCard />
          </div>
          <hr className="hr-line"></hr>
          <div className="border-t border-gray-100 w-full">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
