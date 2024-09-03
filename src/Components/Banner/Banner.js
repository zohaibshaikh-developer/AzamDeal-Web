import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-xl">
            <span className="text-[#008000] font-bold">
            Pure, Authentic & Natural Herbs            
            </span>
          </h1>

          <div className="text-gray-500">
            See Our latest discounted products from here and get a special
            <Link to="#discount">
              <span className="text-[#008000] ml-1">discount product</span>
            </Link>
          </div>
        </div>
        <Link to="/components/Product/ProductDetail">
          <p className="text-sm font-serif font-medium px-6 py-2  bg-gradient-to-r from-[#008000] to-[#16b216] text-center rounded-full text-white hover:bg-emerald-500">
            Shop Now
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
