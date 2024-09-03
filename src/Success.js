import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsBagCheckFill } from "react-icons/bs";
import Footer from "./Layout/Footer/Footer";
import Confetti from "react-confetti";
import Navbar from "./Layout/Navbar/Navbar";

const Success = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      process.env.REACT_APP_BASE_URL +  "customer_address/1",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div>
      <div className="sticky top-0 z-100">
        <Navbar />
      </div>
      <div className="success-wrapper">
        <div className="success">
          <Confetti />
          <p className="icon">
            <BsBagCheckFill />
          </p>
          <h2>Thank you for your order!</h2>
          <p className="email-msg">Check your email inbox for the receipt.</p>
          <p className="description">
            If you have any questions, please email
            <a className="email" href="mailto:order@example.com">
              order@example.com
            </a>
          </p>
          <Link to="/">
            <button
              type="button"
              width="300px"
              className="hover:bg-[#125112] bg-[#008000] p-2 text-white rounded-md font-semibold mt-5"
            >
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
      <div className="border-t-2 mt-10 md:mt-16 lg:mt-16">
        {/* <Footer /> */}
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-10 flex justify-center py-4">
          <h2 className="text-sm text-gray-500 font-semibold leading-6">
            Copyright 2022 @{" "}
            <Link to="https://themeforest.net/user/htmllover">
              <span
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#008000] font-bold"
              >
                AZAMDEAL
              </span>
            </Link>
            , All rights reserved.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Success;
