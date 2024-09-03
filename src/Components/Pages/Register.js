import React, { useEffect } from "react";
import { createSearchParams, useNavigate, useLocation, } from "react-router-dom";
import { ImGoogle } from "react-icons/im";
import { AiFillEye } from "react-icons/ai";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Backdrop, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { click } from "@testing-library/user-event/dist/click";
import { BsFillEyeSlashFill } from "react-icons/bs";

const Login = () => {
  // Hooks
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState("1");

  // Error Hooks
  const [nError, setNError] = useState();
  const [eError, setEError] = useState();
  const [cError, setCError] = useState();
  const [pError, setPError] = useState();
  const [emailExist, setEmailExist] = useState();
  const [phoneExist, setPhoneExist] = useState();

  // Loader
  const [load, setLoad] = useState(false);

  // Navigate
  let Navigate = useNavigate();

  const [passLength, setPassLengthError] = useState();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const productDataRegi = {
    product_id: queryParams.get("product_id"),
    item_qty: queryParams.get("item_qty"),
    item_price: queryParams.get("item_price"),
    total_price: queryParams.get("total_price"),
    variation_id: queryParams.get("variation_id"),
  };

  const queryStringRegi = Object.keys(productDataRegi)
  .map((key) => key + "=" + productDataRegi[key])
  .join("&");

  console.log("Product Data From Register", productDataRegi);
  console.log(productDataRegi.product_id);
  console.log(productDataRegi.total_price);



  const handleRegister = (e) => {
    e.preventDefault();
    setNError("");
    setEError("");
    setCError("");
    setPError("");
    setEmailExist("");
    setPhoneExist("");
    setPassLengthError("");
    if (password.length < 8) {
      setPassLengthError("Password must have 8 characters");
    } else {
      if (name === "") {
        setNError("Enter Your Name");
      } else if (email === "") {
        setEError("This feild is required");
      } else if (contact === "") {
        setCError("This feild is required");
      } else if (password === "") {
        setPError("This feild is required");
      } else {
        setLoad(true);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          name: name,
          email: email,
          contact: contact,
          password: password,
          is_active: isActive,
        });
        {
          console.log(raw);
        }
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(process.env.REACT_APP_BASE_URL + "customerreg", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            if (result.status === 201) {
              Navigate("/login?" + queryStringRegi);
            } else if (result.status === 401) {
              setEmailExist("email already exists");
              setLoad(false);
            } else if (result.status === 402) {
              setPhoneExist("Phone Number already exists :(");
              setLoad(false);
            } else {
              toast.error("Something went wrong!", {
                theme: "light",
                autoClose: "2000",
              });
              console.log(result);
              setLoad(false);
            }
          })
          .catch((error) => console.log("error", error));
      }
    }
  };

  const [passwordType, setPasswordType] = useState("password");

  const handleChangePasswordType = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
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
        <div className="bg-[rgba(0,0,0,0.5)] h-screen md:h-auto lg:h-auto flex rounded-2xl shadow-lg max-w-3xl items-center p-5 md:p-0 lg:p-0">
          {/* form */}
          <div className="md:w-1/2 px-8 md:px-12">
            <h2 className=" flex justify-center font-bold text-2xl pt-5 text-[#fff] text-center">
              <div className="flex justify-center cursor-pointer"
                onClick={() => Navigate("/")}
              >
                <img src="/azamFav.jpg" alt="/azamlogo.jpg" className="w-40 rounded-lg" />
              </div>
            </h2>
            <p className="font-bold text-2xl text-[#fff] text-center">
              {" "}
              Register
            </p>
            <p className="text-xs mt-1 text-[#fff] text-center">
              If you are already a member, easily log in
            </p>
            <form action="" className="flex flex-col">
              <input
                className={`mt-8 p-2  rounded-xl border focus:outline-emerald-500 text-xs`}
                type="text"
                name="name"
                placeholder="Name"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nError && (
                <figcaption className="text-xs font-semibold text-red-500 ml-2">
                  {nError}
                </figcaption>
              )}
              <input
                className="mt-2 p-2 rounded-xl border focus:outline-emerald-500 text-xs"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="text-xs font-semibold text-red-500 ml-2">
                {eError}
              </div>
              <div className="text-xs font-semibold text-red-500 ml-2">
                {emailExist}
              </div>
              <input
                className="mt-2 p-2 rounded-xl border focus:outline-emerald-500 text-xs"
                type="number"
                maxLength="10"
                name="email"
                placeholder="Phone Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <div className="text-xs font-semibold text-red-500 ml-2">
                {cError}
              </div>
              <div className="text-xs font-semibold text-red-500 ml-2">
                {phoneExist}
              </div>
              <div className="relative">
                <input
                  className="mt-2 p-2 rounded-xl border w-full focus:outline-emerald-500 text-xs"
                  type={passwordType}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChangePasswordType}
                />
                <button onClick={togglePassword}>
                  {passwordType === "password" ? (
                    <AiFillEye className="cursor-pointer text-xl mt-1 absolute top-1/2 right-3 -translate-y-1/2" />
                  ) : (
                    <BsFillEyeSlashFill className="cursor-pointer mt-1 text-lg absolute top-1/2 right-3 -translate-y-1/2" />
                  )}
                </button>
                <div className="text-xs font-semibold text-red-500 ml-2">
                  {pError}
                </div>
                <input
                  type="hidden"
                  name=""
                  value="1"
                  onChange={(e) => setIsActive(e.target.value)}
                />
              </div>
              {passLength && (
                <p className="text-red-500 font-semibold text-xs ml-2">
                  {passLength}
                </p>
              )}
              <figcaption className="text-xs text-gray-400 ml-5 mt-1 duration-300 scale-110">
                Password must have 8 charachter & have special characters.
              </figcaption>
              <button
                onClick={handleRegister}
                className="bg-emerald-500 rounded-xl mt-5 text-white py-2 hover:scale-105 duration-300"
                id={"1"}
              >
                Register
              </button>
            </form>
            {/* <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>
            <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[red]">
              <ImGoogle className="mx-1" />
              Register with Google
            </button> */}
            <div>
              <p className="text-xs text-center mt-2 text-white">
                already have account.?{" "}
                <Link to="/login" className="underline text-emerald-500">
                  Login
                </Link>
              </p>
            </div>
          </div>
          {/* image */}
          <div className="hidden md:block lg:block w-1/2 p-2">
            <img className="rounded-2xl" src="/login-pic.jpeg" />
          </div>
        </div>
      </section>
      <ToastContainer position="top-center" className="mt-16" />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Login;
