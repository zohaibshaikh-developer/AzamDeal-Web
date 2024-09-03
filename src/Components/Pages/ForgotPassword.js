import { Backdrop, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { IoReturnDownBack } from "react-icons/io5";
import { createSearchParams, Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  let Navigate = useNavigate();

  const [load, setLoad] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [otpMsg, setOtpMsg] = useState();
  const [inputError, setInputError] = useState();
  const [EmailNotExistError, setEmailNotExistError] = useState();

  const handleGenerateOTP = async (e) => {
    e.preventDefault();
    setInputError("");
    if (email === "") {
      setInputError("This feild is required");
    } else {
      setLoad(true);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        email: email,
      });
      console.log(raw);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        process.env.REACT_APP_BASE_URL + "GenerateOtp",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            setOtpMsg("OTP has been sent successfully.");
            Navigate({
              pathname: "/vareify-otp",
              search: createSearchParams({
                Data: JSON.stringify(result),
                OTP: result.otp,
              }).toString(),
            });
            setLoad(false);
          } else if (result.status === 406) {
            setEmailNotExistError("Email not found, Enter Valid Email");
            setLoad(false);
          } else {
            setOtpMsg("Something went wrong");
            setLoad(false);
          }
        })
        .catch((error) => console.log("error", error));
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
      <section className="relative bg-[rgba(0,0,0,0.3)] min-h-screen flex items-center justify-center">
        {/* login container */}
        <div className="bg-[rgba(0,0,0,0.5)] h-screen md:h-auto lg:h-auto w-screen flex rounded-2xl shadow-lg max-w-3xl items-center p-5 md:p-0 lg:p-0">
          {/* form */}
          <div className="w-full md:w-1/2 px-8 md:px-12">
            <h2 className="font-bold text-2xl text-[#fff]">
              Forget Password?
            </h2>
            <p className="text-xs mt-4 text-[#fff] capitalize">
              Kindly Enter the details to generate OTP.
            </p>
            {otpMsg && (
              <div className="mt-2 rounded-md text-emerald-500 bg-emerald-50 border border-emerald-500 p-2 text-xs font-semibold">
                {otpMsg}
              </div>
            )}
            <form action="" className="flex flex-col gap-4 mt-10">
              {/* <input
                className="p-2 mt-8 rounded-xl border focus:outline-emerald-500"
                type="text"
                placeholder="Name"
                value={name}
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
              /> */}
              <div className="relative mt-20 md:mt-0 lg:mt-0">
                <label
                  htmlFor=""
                  className="text-sm font-bold text-[#fff] mb-4 ml-1"
                >
                  Enter Your Email:
                </label>
                <input
                  className="p-2 mt-2 rounded-xl border w-full focus:outline-emerald-500"
                  type="email"
                  name="Email"
                  value={email || ""}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* {console.log(name)} */}
                {inputError && (
                  <div className="text-xs ml-2 text-red-500 font-semibold mt-1">
                    {inputError}
                  </div>
                )}
                {EmailNotExistError && (
                  <div className="text-xs ml-2 text-red-500 font-semibold mt-1">
                    {EmailNotExistError}
                  </div>
                )}
              </div>
              <button
                onClick={handleGenerateOTP}
                className="bg-emerald-500 rounded-xl text-[#fff] py-2 hover:scale-105 duration-300"
              >
                Generate OTP
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
  );
};

export default ForgotPassword;
