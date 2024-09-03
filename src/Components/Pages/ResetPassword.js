import { Backdrop, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { IoReturnDownBack } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  //
  const [searchParams] = useSearchParams();
  //
  //
  let Navigate = useNavigate();

  const [load, setLoad] = useState(false);
  const [pass, setPass] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [passNotMatch, setPassNotMatch] = useState(false);
  //
  //

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (pass === confirmPass) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        OTP: searchParams.get("OTPNumberForPasswordReset"),
        new_pass: confirmPass,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(
        process.env.REACT_APP_BASE_URL + "forgotPassword",
        requestOptions 
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            Navigate("/login");
          }
        })
        .catch((error) => console.log("error", error));
    } else {
      setPassNotMatch(true);
    }
  };

  const [passwordType, setPasswordType] = useState("password");
  const [ConfirmPasswordType, setConfirmPasswordType] = useState("password");

  const handleChangePasswordType = (e) => {
    e.preventDefault();
    setPass(e.target.value);
  };

  const handleChangeConfirmPasswordType = (e) => {
    e.preventDefault();
    setConfirmPass(e.target.value);
  };

  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const toggleConfirmPassword = (e) => {
    e.preventDefault();
    if (ConfirmPasswordType === "password") {
      setConfirmPasswordType("text");
      return;
    }
    setConfirmPasswordType("password");
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
      {/* {console.warn(searchParams.get("OTPNumberForPasswordReset"))} */}
      <section className="relative bg-[rgba(0,0,0,0.3)] min-h-screen flex items-center justify-center">
        {/* login container */}
        <div className="bg-[rgba(0,0,0,0.5)] h-screen md:h-auto lg:h-auto w-screen flex rounded-2xl shadow-lg max-w-3xl items-center p-5 md:p-0 lg:p-0">
          {/* form */}
          <div className="w-full md:w-1/2 px-8 md:px-12">
            <h2 className="font-bold text-2xl text-[#fff]">
              Enter Your New Password
            </h2>
            <p className="text-xs text-[#fff] capitalize">
              Both Password Must Be Similiar.
            </p>
            <form action="" className="flex flex-col gap-4 mt-10">
              <div className="relative mt-20 md:mt-0 lg:mt-0">
                <label
                  htmlFor=""
                  className="capitalize text-sm md:text-xs lg:text-xs font-bold text-[#fff] mb-4 ml-1"
                >
                  Password:
                </label>
                <input
                  className="p-2 mt-2 rounded-xl border w-full focus:outline-emerald-500"
                  type={passwordType}
                  value={pass || ""}
                  placeholder="password"
                  onChange={handleChangePasswordType}
                />
                {passNotMatch && (
                  <div className="text-red-500 font-semibold text-xs ml-1">
                    Password Do Not Match
                  </div>
                )}
                <button onClick={togglePassword}>
                  {passwordType === "password" ? (
                    <AiFillEye className="cursor-pointer text-xl mt-4 absolute top-1/2 right-3 -translate-y-1/2" />
                  ) : (
                    <BsFillEyeSlashFill className="cursor-pointer mt-4 text-lg absolute top-1/2 right-3 -translate-y-1/2" />
                  )}
                </button>
              </div>
              <div className="relative mt-">
                <label
                  htmlFor=""
                  className="capitalize text-sm md:text-xs lg:text-xs font-bold text-[#fff] mb-4 ml-1"
                >
                  confirm Password:
                </label>
                <input
                  className="p-2 mt-2 rounded-xl border w-full focus:outline-emerald-500"
                  type={ConfirmPasswordType}
                  value={confirmPass || ""}
                  placeholder="confirm password"
                  onChange={handleChangeConfirmPasswordType}
                />
                <button onClick={toggleConfirmPassword}>
                  {passwordType === "password" ? (
                    <AiFillEye className="cursor-pointer text-xl mt-4 absolute top-1/2 right-3 -translate-y-1/2" />
                  ) : (
                    <BsFillEyeSlashFill className="cursor-pointer mt-4 text-lg absolute top-1/2 right-3 -translate-y-1/2" />
                  )}
                </button>
                {passNotMatch && (
                  <div className="text-red-500 font-semibold text-xs ml-1">
                    Password Do Not Match
                  </div>
                )}
              </div>
              <button
                onClick={handleResetPassword}
                className="bg-emerald-500 rounded-xl mt-2 text-white py-2 hover:scale-105 duration-300"
              >
                Finish
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

export default ResetPassword;
