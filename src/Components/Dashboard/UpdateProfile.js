import { Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputArea from "../Pages/Form/InputArea";
import Dashboard from "./Dashboard";

const UpdateProfile = () => {
  let Navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  // Error Hooks
  const [nameError, setNameError] = useState();
  const [emailError, setEmailError] = useState();
  const [contactError, setContactError] = useState();

  // Load Hooks
  const [load, setLoad] = useState(true);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    setContactError("");
    // if (name === "") {
    //   setNameError("this feild is required");
    // } else if (contact === "") {
    //   setContactError("this feild is required");
    // } else if (email === "") {
    //   setEmailError("this feild is required");
    // } else {
    setLoad(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      email: email,
      contact: contact,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_BASE_URL +
        `UpdateProfile/${localStorage.getItem("customer_id")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          Navigate("/dashboard");
          setLoad(false);
        } else {
          setLoad(false);
        }
      })
      .catch((error) => console.log("error", error));
    // }
  };

  const [getCustomerData, setGetCustomerData] = useState([]);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      process.env.REACT_APP_BASE_URL +
        `customer_address/${localStorage.getItem("customer_id")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setGetCustomerData(result.data[0]);
        setContact(result.data[0]["contact"]);
        setName(result.data[0]["name"]);
        setEmail(result.data[0]["email"]);
        if (result.status === 200) {
          setLoad(false);
        } else {
          setLoad(false);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <>
      {load ? (
        <div className="bg-white h-screen w-screen"></div>
      ) : (
        <Dashboard
          title="Update-Profile"
          description="This is edit profile page"
        >
          {/* {console.log(getCustomerData)} */}
          <div className="max-w-screen-2xl">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h2 className="text-xl font-sans font-bold mb-5">
                    Update Profile
                  </h2>
                </div>
              </div>
            </div>
            <hr className="border border-emerald-500" />
            <form className="mx-20 mt-10">
              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="mt-10 sm:mt-0">
                  <div className="md:grid-cols-6 md:gap-6">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                      <div className="lg:mt-6 mt-4 bg-white">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3">
                            <InputArea
                              label="Full Name"
                              name="name"
                              type="text"
                              placeholder="Full Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                            {nameError && (
                              <div className="text-xs font-semibold text-red-500 ml-2">
                                {nameError}
                              </div>
                            )}
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <InputArea
                              label="Phone/Mobile"
                              name="phone"
                              type="tel"
                              placeholder="Your Mobile Number"
                              value={contact}
                              onChange={(e) => setContact(e.target.value)}
                            />
                            {contactError && (
                              <div className="text-xs font-semibold text-red-500 ml-2">
                                {contactError}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="w-full mt-2">
                          <InputArea
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="Your Email"
                            className="w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          {emailError && (
                            <div className="text-xs font-semibold text-red-500 ml-2">
                              {emailError}
                            </div>
                          )}
                        </div>
                        <div className="col-span-6 sm:col-span-3 mt-5 text-right">
                          <button
                            onClick={handleUpdateProfile}
                            type="submit"
                            className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
                          >
                            Update Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={load}
          >
            <CircularProgress color="success" />
          </Backdrop>
        </Dashboard>
      )}
    </>
  );
};

export default UpdateProfile;
