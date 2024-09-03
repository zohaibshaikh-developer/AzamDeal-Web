import React, { useEffect } from "react";
import { useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { ImGoogle } from "react-icons/im";
import { AiFillEye } from "react-icons/ai";
import { BsFillEyeSlashFill } from "react-icons/bs";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Backdrop, CircularProgress } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { light } from "@mui/material/styles/createPalette";
import GoogleLogin from "react-google-login";

const Login = () => {
  //
  //

  let [searchParams] = useSearchParams();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [load, setLoad] = useState(false);

  // Error Hooks
  const [inputError, setInputError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [notVarified, setNotVarified] = useState("");

  let Navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const productData = {
    product_id: queryParams.get("product_id"),
    item_qty: queryParams.get("item_qty"),
    item_price: queryParams.get("item_price"),
    total_price: queryParams.get("total_price"),
    variation_id: queryParams.get("variation_id"),
  };

  const queryString = Object.keys(productData)
  .map((key) => key + "=" + productData[key])
  .join("&");

  console.log("Product Data From Category Page", productData);
  console.log(productData.product_id);
  console.log(productData.total_price);

  const handleLogin = async (e) => {
    setLoad(true);
    setInputError("");
    setEmailError("");
    e.preventDefault();

    if (email === "") {
      setInputError("Please fill all information");
      setLoad(false);
    }
    if (pass === "") {
      setInputError("Please fill all information");
      setLoad(false);
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: pass,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      // mode: "no-cors", // Add this line to make it a no-cors request
    };

    await fetch(process.env.REACT_APP_BASE_URL + "loginapi", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          if (productData.product_id == null) {
            localStorage.setItem("customer_id", result.Customer_id);
            localStorage.setItem("customerName", result.data.name);
            localStorage.setItem("Token", result.token);
            localStorage.setItem("isLogin", "Yes");
            Navigate("/");
          } 
          else 
          {
            localStorage.setItem("customer_id", result.Customer_id);
            localStorage.setItem("customerName", result.data.name);
            localStorage.setItem("Token", result.token);
            localStorage.setItem("isLogin", "Yes");

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
              product_id: productData.product_id,
              item_qty: productData.item_qty,
              item_price: productData.item_price,
              total_price: productData.total_price,
              c_id: result.Customer_id,
              variation_id: productData.variation_id,
            });
            // console.log(raw);

            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };

            fetch(process.env.REACT_APP_BASE_URL + "new_cart", requestOptions)
              .then((response) => response.json())
              .then((result) => {
                // console.log(result);
                if (result.status === 1) {
                  toast.success("Added Successfully", {
                    theme: "light",
                    autoClose: "5000",
                  });
                  setLoad(false);
                  Navigate("/");
                }
              })
              .catch((error) => {
                console.log("error", error);
              });
          }
        } else if (result.status === 401) {
          setPassError(result.message);
          setLoad(false);
        } else if (result.status === 404) {
          setEmailError(
            "please verify email, verification link has been sent to your given email address"
          );
          setLoad(false);
        } else if (result.data.is_verified !== 1) {
          setNotVarified(
            "Email not Verified! please verify your email address"
          );
        } else {
          setLoad(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleRegister = () => {
    setLoad(true);
    Navigate("/register?"+queryString);
  };

  let TooManyOTPRequest = searchParams.get("tooManyHit");
  if (TooManyOTPRequest === "YES") {
    toast.error("Too Many OTP Requests", {
      theme: "light",
      autoClose: "2000",
    });
  }

  // if (searchParams.get("Registered") === true) {
  //   toast.error("Registered Successfully", {
  //     theme: "light",
  //     autoClose: "2000",
  //   });
  // }

  const [passwordType, setPasswordType] = useState("password");

  const handleChangePasswordType = (e) => {
    e.preventDefault();
    setPass(e.target.value);
  };

  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  // const responseGoogle = (response) => {
  //   console.log(response);
  // };

  // const responseGoogleFailure = (response) => {
  //   console.log(response);
  // };

  // Home Button

  // let Navigate = useNavigate();

  return (
    <div className="relative h-screen">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-fill md:object-cover lg:object-cover"
      >
        <source src="/login.mp4" type="video/mp4" />
      </video>
      <div className="flex items-center justify-center h-screen">
        <section className="relative bg-[rgba(0,0,0,0.3)] w-full max-w-3xl rounded-2xl shadow-lg">
          {/* login container */}
          <div className="flex items-center justify-center">
            {/* form */}
            <div className="w-full md:w-1/2 px-8 md:px-12">
              <div
                className="flex justify-center cursor-pointer"
                onClick={() => Navigate("/")}
              >
                <img
                  src="/azamFav.jpg"
                  alt="/azamlogo.jpg"
                  className="w-40 rounded-lg"
                />
              </div>
              <h2 className="font-bold text-2xl text-[#fff] text-center">
                Login
              </h2>
              <p className="text-xs text-center text-[#fff] mt-4">
                If you are already a member, easily log in
              </p>
              {inputError && (
                <div className="text-xs mt-3 border p-3 rounded-md bg-red-50 border-red-500 text-red-500">
                  {inputError}
                </div>
              )}
              {emailError && (
                <div className="text-xs mt-3 border p-2 rounded-md bg-red-50 border-red-500 text-red-500">
                  {emailError}
                </div>
              )}
              {passError && (
                <div className="text-xs mt-3 border p-3 rounded-md bg-red-50 border-red-500 text-red-500">
                  {passError}
                </div>
              )}
              {notVarified && (
                <div className="text-xs mt-3 border p-3 rounded-md bg-red-50 border-red-500 text-red-500">
                  {notVarified}
                </div>
              )}
              <form className="flex flex-col gap-4">
                <input
                  className="p-2 mt-8 rounded-xl border focus:outline-emerald-500 text-xs"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="relative">
                  <input
                    className="p-2 rounded-xl border w-full focus:outline-emerald-500 text-xs"
                    type={passwordType}
                    name="password"
                    value={pass}
                    placeholder="Password"
                    onChange={handleChangePasswordType}
                  />
                  <button onClick={togglePassword}>
                    {passwordType === "password" ? (
                      <AiFillEye className="cursor-pointer text-xl absolute top-1/2 right-3 -translate-y-1/2" />
                    ) : (
                      <BsFillEyeSlashFill className="cursor-pointer text-lg absolute top-1/2 right-3 -translate-y-1/2" />
                    )}
                  </button>
                </div>
                <button
                  onClick={handleLogin}
                  className="bg-emerald-500 rounded-xl text-white py-2 hover:scale-105 duration-300"
                >
                  Login
                </button>
              </form>
              <div className="mt-5 hover:underline hover:text-emerald-500 text-xs border-b border-[#fff] py-4 text-[#fff]">
                <Link to="/forgot-password">Forgot your password?</Link>
              </div>
              <div className="mt-3 text-xs flex justify-between items-center text-[#008000]">
                <p className="text-white">Don't have an account?</p>
                <button
                  className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
            </div>
            {/* image */}
            {/* <div className="hidden md:block w-1/2 p-2"> */}
            {/* <img className="rounded-2xl" src="/login-pic.jpeg" /> */}
            {/* </div> */}
          </div>
        </section>
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer />
    </div>
  );
};

export default Login;
