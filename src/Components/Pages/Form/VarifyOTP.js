import { Backdrop, CircularProgress } from "@mui/material";
import { parse } from "postcss";
import React, { useState } from "react";
import { IoReturnDownBack } from "react-icons/io5";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const VarifyOTP = () => {
  //
  //

  const [searchParams] = useSearchParams();
  let Navigate = useNavigate();
  //
  //

  const [load, setLoad] = useState(false);
  const [OTP, setOTP] = useState();
  const [wrongOtpMsg, setWrongOtpMsg] = useState();
  const [otpHit, setOtpHit] = useState(1);
  //
  //

  let data = JSON.parse(searchParams.get("Data"));
  let OTPNumber = searchParams.get("OTP");
  //
  //

  const handleGoTOPasswordResetPage = (e) => {
    e.preventDefault();
    setLoad(true);
    if (OTP === OTPNumber) {
      Navigate({
        pathname: "/reset-password",
        search: createSearchParams({
          OTPNumberForPasswordReset: data.otp,
        }).toString(),
      });
      setLoad(false);
    } else {
      setWrongOtpMsg("Invalid OTP");
      setOtpHit(otpHit + 1);
      setLoad(false);
    }
    if (otpHit === 3) {
      Navigate({
        pathname: "/login",
        search: createSearchParams({
          tooManyHit: "YES",
        }).toString(),
      });
    }
  };

  return (
    <div className="relative h-screen">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/login.mp4" type="video/mp4" />
      </video>
      {/* {console.log(data)} */}
      <div>
        <section className="relative bg-[rgba(0,0,0,0.3)] min-h-screen flex items-center justify-center">
          {/* login container */}
          <div className="bg-[rgba(0,0,0,0.5)] h-screen md:h-auto lg:h-auto w-screen flex rounded-2xl shadow-lg max-w-3xl items-center p-5 md:p-0 lg:p-0">
            {/* form */}
            <div className="w-full md:w-1/2 px-8 md:px-12">
              <h2 className="font-bold text-2xl text-[#fff]">Enter OTP</h2>
              <p className="text-xs mt-4 text-[#fff] capitalize">
                OTP has sent to your device. Kindly check your inbox and Enter
                OTP.
              </p>
              <form action="" className="flex flex-col gap-4 mt-10">
                <div className="relative mt-20 md:mt-0 lg:mt-0">
                  <label
                    htmlFor=""
                    className="text-sm font-bold text-[#fff] mb-4 ml-1"
                  >
                    Enter OTP:
                  </label>
                  <input
                    className="p-2 mt-2 rounded-xl border w-full focus:outline-emerald-500"
                    type="number"
                    value={OTP || ""}
                    placeholder="OTP"
                    onChange={(e) => setOTP(e.target.value)}
                  />
                  {wrongOtpMsg && (
                    <div className="text-xs ml-2 text-red-500 font-semibold mt-1">
                      {wrongOtpMsg}
                    </div>
                  )}
                </div>
                <button
                  onClick={handleGoTOPasswordResetPage}
                  className="bg-emerald-500 rounded-xl text-white py-2 hover:scale-105 duration-300"
                >
                  Next
                </button>
              </form>
              <button
                className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#008000]"
                onClick={() => Navigate(-1)}
              >
                <IoReturnDownBack className="mr-4" />
                Cancel
              </button>
              <div className="mt-72 md:mt-20 lg:mt-20 text-xs flex justify-between items-center text-[#008000]">
                <p className="text-white">Create a new account?</p>
                <button
                  className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
                  onClick={() => Navigate("/register")}
                >
                  Register
                </button>
              </div>
              <hr className="mt-2 border border-gray-400" />
            </div>
            {/* image */}
            <div className="hidden md:block lg:block w-1/2 p-2">
              <img className="rounded-2xl" src="/login-pic.jpeg" />
            </div>
          </div>
        </section>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={load}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  );
};

export default VarifyOTP;
