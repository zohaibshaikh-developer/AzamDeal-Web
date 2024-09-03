import React from "react";
import { FiTruck } from "react-icons/fi";
import { FiPhoneCall } from "react-icons/fi";
import { FiCreditCard } from "react-icons/fi";
import { FiGift } from "react-icons/fi";

const FeaturedCard = () => {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 mx-auto">
        <div className=" border-r border-gray-200 py-1 flex items-center justify-center bg-white">
          <div className="mr-3">
            <FiTruck
              className="flex-shrink-0 h-4 w-4 text-emerald-600"
              aria-hidden="true"
            />
          </div>
          <div className="">
            <span className="block font-serif text-sm font-medium leading-5">
            Free Shipping for all orders above 500 rupees.            
            </span>
          </div>
        </div>
        <div className=" border-r border-gray-200 py-1 flex items-center justify-center bg-white">
          <div className="mr-3">
            <FiPhoneCall
              className="flex-shrink-0 h-4 w-4 text-emerald-600"
              aria-hidden="true"
            />
          </div>
          <div className="">
            <span className="block font-serif text-sm font-medium leading-5">
              Support 24/7 At Anytime
            </span>
          </div>
        </div>
        <div className=" border-r border-gray-200 py-1 flex items-center justify-center bg-white">
          <div className="mr-3">
            <FiCreditCard
              className="flex-shrink-0 h-4 w-4 text-emerald-600"
              aria-hidden="true"
            />
          </div>
          <div className="">
            <span className="block font-serif text-sm font-medium leading-5">
              Secure Payment Totally Safe
            </span>
          </div>
        </div>
        <div className=" border-r border-gray-200 py-1 flex items-center justify-center bg-white">
          <div className="mr-3">
            <FiGift
              className="flex-shrink-0 h-4 w-4 text-emerald-600"
              aria-hidden="true"
            />
          </div>
          <div className="">
            <span className="block font-serif text-sm font-medium leading-5">
            See the latest offers on Herbs
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
