import { Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoArrowForward, IoReturnUpBackOutline } from "react-icons/io5";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "../../Layout/Layout";
import InputArea from "../Pages/Form/InputArea";

const UpdateAddress = () => {
  let Navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const [address, setAdress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [pincode, setPincode] = useState();
  const [label, setLabel] = useState();
  const [fName, setFName] = useState();
  const [lName, setLName] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();

  const [load, setLoad] = useState(false);

  const [addressError, setAddressError] = useState();
  const [cityError, setCityError] = useState();
  const [stateError, setStateError] = useState();
  const [countryError, setCountryError] = useState();
  const [pincodeError, setPinCodeError] = useState();
  const [fNameError, setfNameError] = useState();
  const [lNameError, setlNameError] = useState();
  const [mobileError, setMobileError] = useState();
  const [emailError, setEmailError] = useState();

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    setAddressError("");
    setCityError("");
    setStateError("");
    setCountryError("");
    setPinCodeError("");
    setfNameError("");
    setlNameError("");
    setMobileError("");
    setEmailError("");

    let msg = "this feild is required";
    if (pincode === "") {
      setPinCodeError(msg);
    } else if (address === "") {
      setAddressError(msg);
    } else if (city === "") {
      setCityError(msg);
    } else if (state === "") {
      setStateError(msg);
    } else if (country === "") {
      setCountryError(msg);
    } else if (fName === "") {
      setfNameError(msg);
    } else if (lName === "") {
      setlNameError(msg);
    } else if (mobile === "") {
      setMobileError(msg);
    } else if (email === "") {
      setEmailError(msg);
    } else {
      setLoad(true);
      const ID = searchParams.get("id");
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        address_line: address,
        city: city,
        state: state,
        country: country,
        pincode: pincode,
        label: label ? label : "Home",
        first_name: fName,
        last_name: lName,
        mobile_number: mobile,
        email: email,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(
        process.env.REACT_APP_BASE_URL + `updateAddress/${ID}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            Navigate("/address");
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div>
      {console.log(label)}
      <Layout>
        <div className="bg-slate-100 flex justify-center rounded-md">
          <div className="flex items-center m-10 p-5 font-bold text-2xl text-gray-800">
            <FaMapMarkerAlt />
            <span className="text-gray-800">Update Your address</span>
          </div>
        </div>
        <div className="mx-2 md:mx-20 lg:mx-72 m-10">
          <div>
            <form className="mt-10">
              <div className="form-group">
                <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                  01. Recievers Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  <div className="">
                    <InputArea
                      label="First Name"
                      name="firstName"
                      type="text"
                      placeholder="first name"
                      defaultValue={searchParams.get("fname")}
                      onChange={(e) => setFName(e.target.value)}
                      autoComplete="off"
                      className={`${
                        fNameError === "this feild is required"
                          ? "border-2 border-red-500 bg-red-50"
                          : ""
                      }
                      `}
                    />
                    {fNameError && (
                      <div className="text-xs text-red-500 font-semibold ml-2">
                        {fNameError}
                      </div>
                    )}
                  </div>

                  <div className="">
                    <InputArea
                      label="Last name"
                      name="lastName"
                      type="text"
                      placeholder="last name"
                      defaultValue={searchParams.get("lname")}
                      onChange={(e) => setLName(e.target.value)}
                      autoComplete="off"
                      className={`${
                        lNameError === "this feild is required"
                          ? "border-2 border-red-500 bg-red-50"
                          : ""
                      }`}
                    />
                    {lNameError && (
                      <div className="text-xs text-red-500 font-semibold ml-2">
                        {lNameError}
                      </div>
                    )}
                  </div>

                  <div className="">
                    <InputArea
                      label="Email address"
                      name="email"
                      type="email"
                      placeholder="youremail@gmail.com"
                      defaultValue={searchParams.get("email")}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="off"
                      className={`${
                        emailError === "this feild is required"
                          ? "border-2 border-red-500 bg-red-50"
                          : ""
                      }`}
                    />
                    {emailError && (
                      <div className="text-xs text-red-500 font-semibold ml-2">
                        {emailError}
                      </div>
                    )}
                  </div>

                  <div className="">
                    <InputArea
                      label="Phone number"
                      name="contact"
                      type="number"
                      placeholder="+062-123456789"
                      defaultValue={searchParams.get("mobile")}
                      onChange={(e) => setMobile(e.target.value)}
                      autoComplete="off"
                      className={`${
                        mobileError === "this feild is required"
                          ? "border-2 border-red-500 bg-red-50"
                          : ""
                      }`}
                    />
                    {mobileError && (
                      <div className="text-xs text-red-500 font-semibold ml-2">
                        {mobileError}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-group mt-12">
                <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                  02. Shipping Details
                </h2>

                <div className="col-span-6">
                  <InputArea
                    label="Street address"
                    name="address"
                    type="text"
                    placeholder="address"
                    defaultValue={searchParams.get("address")}
                    value={address}
                    onChange={(e) => setAdress(e.target.value)}
                    autoComplete="off"
                    className={`${
                      addressError === "this feild is required"
                        ? "border-2 border-red-500 bg-red-50"
                        : ""
                    }`}
                  />
                  {addressError && (
                    <div className="text-xs text-red-500 font-semibold ml-2">
                      {addressError}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-4">
                  <div>
                    <InputArea
                      label="City"
                      name="city"
                      type="text"
                      placeholder="Mumbai"
                      defaultValue={searchParams.get("city")}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      autoComplete="off"
                      className={`${
                        cityError === "this feild is required"
                          ? "border-2 border-red-500 bg-red-50"
                          : ""
                      }`}
                    />
                    {cityError && (
                      <div className="text-xs text-red-500 font-semibold ml-2">
                        {cityError}
                      </div>
                    )}
                  </div>
                  <div>
                    <InputArea
                      label="State"
                      name="country"
                      type="text"
                      placeholder="Maharashtra"
                      defaultValue={searchParams.get("state")}
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      autoComplete="off"
                      className={`${
                        stateError === "this feild is required"
                          ? "border-2 border-red-500 bg-red-50"
                          : ""
                      }`}
                    />
                    {stateError && (
                      <div className="text-xs text-red-500 font-semibold ml-2">
                        {stateError}
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-4">
                  <div>
                    <InputArea
                      label="Country"
                      name="country"
                      type="text"
                      placeholder="India"
                      defaultValue={searchParams.get("country")}
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      autoComplete="off"
                      className={`${
                        countryError === "this feild is required"
                          ? "border-2 border-red-500 bg-red-50"
                          : ""
                      }`}
                    />
                    {countryError && (
                      <div className="text-xs text-red-500 font-semibold ml-2">
                        {countryError}
                      </div>
                    )}
                  </div>
                  <div>
                    <InputArea
                      label="Pin Code"
                      name="zipCode"
                      type="text"
                      placeholder="123456"
                      maxLength={6}
                      defaultValue={searchParams.get("pincode")}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      autoComplete="off"
                      className={`${
                        pincodeError === "this feild is required"
                          ? "border-2 border-red-500 bg-red-50"
                          : ""
                      }`}
                    />
                    {pincodeError && (
                      <div className="text-xs text-red-500 font-semibold ml-2">
                        {pincodeError}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="form-group mt-12">
                <h2 className="font-semibold font-serif text-base text-gray-700">
                  03. Address Label
                </h2>
                <label
                  htmlFor="countries"
                  className="block text-gray-500 font-medium text-sm leading-none mt-5 mb-2"
                >
                  Select an option
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
                  onChange={(e) => setLabel(e.target.value)}
                  autoComplete="off"
                >
                  <option value="Home" defaultValue={searchParams.get("label")}>
                    Home
                  </option>
                  <option value="Office">Office</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="flex flex-col md:flex-row lg:flex-row justify-end mt-10">
                <div className="w-full md:w-60 lg:w-60">
                  <button
                    className="bg-indigo-50 border border-indigo-100 rounded py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center font-serif w-full"
                    onClick={() => Navigate("/address")}
                  >
                    <span className="text-xl mr-2">
                      <IoReturnUpBackOutline />
                    </span>
                    Continue Shopping
                  </button>
                </div>
                <div className="ml-0 mt-4 md:mt-0 lg:mt-0 md:ml-5 lg:ml-5 w-full md:w-52 lg:w-52">
                  <button
                    onClick={handleUpdateAddress}
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600 border border-emerald-500 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
                  >
                    <span className="flex justify-center text-center">
                      Confirm
                      <span className="text-xl ml-2">
                        <IoArrowForward />
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </form>
            <ToastContainer />
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={load}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default UpdateAddress;
