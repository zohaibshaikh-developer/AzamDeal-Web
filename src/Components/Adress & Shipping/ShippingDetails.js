import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { TbMapPin } from "react-icons/tb";
import { MdDelete, MdPayment } from "react-icons/md";
import { IoIosCash } from "react-icons/io";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Address from "./Payment";
import OrderSummaryCartItem from "./OrderSummaryCartItem";
import { IoArrowForward, IoReturnUpBackOutline } from "react-icons/io5";
import { Backdrop, CircularProgress } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import InputArea from "../Pages/Form/InputArea";
import { RiContactsBookLine, RiEdit2Fill } from "react-icons/ri";
import Payment from "./Payment";
import { BiEditAlt } from "react-icons/bi";

const steps = ["Shipping Details", "Payment Details"];

const ShippingDetails = (props) => {
  // Navigate
  let Navigate = useNavigate();
  const [userAddress, setUserAddress] = useState([]);

  // Count Address
  const [totalAddress, setTotalAddress] = useState([]);

  // Address LAbel
  const [addressId, setAddressId] = useState();

  // Loader
  const [load, setLoad] = useState(true);

  // AddresError
  const [addressError, setAddressError] = useState(false);

  // Payment VAlue Storing Hook
  const [showAddress, setShowAddress] = useState(true);
  const [showPayment, setShowPayment] = useState(false);

  const getAllAddress = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_BASE_URL +
        `addressByCustomerId/${localStorage.getItem("customer_id")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.warn(result);
        setTotalAddress(result.data.length);
        setUserAddress(result.data);
      })
      .catch((error) => console.log("error", error));
    setLoad(false);
  };

  useEffect(() => {
    getAllAddress();
  }, []);

  const handleNext = () => {
    window.scrollTo(0, 0);
    if (addressId === undefined) {
      setAddressError("please select address");
    } else {
      setShowAddress(false);
      setShowPayment(true);
      localStorage.setItem("Address ID", addressId);
    }
  };

  const handleAddAnotherAddress = () => {
    Navigate("/second-address");
  };

  const handleDeleteAddress = async (id) => {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_BASE_URL + `deleteAddress/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    getAllAddress();
  };

  const handleUpdate = (el) => {
    console.warn(el);
    Navigate({
      pathname: "/update-address",
      search: createSearchParams({
        Data: JSON.stringify(el),
        id: el.id,
        label: el.label,
        fname: el.first_name,
        lname: el.last_name,
        mobile: el.mobile_number,
        email: el.email,
        address: el.address_line,
        city: el.city,
        state: el.state,
        country: el.country,
        pincode: el.pincode,
      }).toString(),
    });
  };

  return (
    <>
      {/* {console.log(userAddress[0].id)} */}
      {load ? (
        <div className="h-screen bg-white"></div>
      ) : (
        <Layout title="Checkout" description="this is checkout page">
          <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
            <div className="py-10 lg:py-12 px-0 2xl:max-w-screen-2xl w-full xl:max-w-screen-xl flex flex-col md:flex-row lg:flex-row">
              <div className="md:w-full lg:w-3/5 flex h-full flex-col order-2 sm:order-1 lg:order-1">
                {showAddress && (
                  <div className="mt-5 md:mt-0 md:col-span-2">
                    <Box sx={{ width: "100%" }}>
                      <Stepper activeStep={0} alternativeLabel>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Box>

                    {/* Show Address */}
                    {totalAddress > 0 ? (
                      <>
                        <div>
                          <div className="w-full mt-2">
                            <div className="flex justify-between items-center">
                              <h1 className="mb-5 font-semibold text-2xl flex items-center">
                                <span>
                                  <TbMapPin />
                                </span>
                                Select Address
                              </h1>
                              {totalAddress < 10 ? (
                                <div>
                                  <button
                                    onClick={handleAddAnotherAddress}
                                    className={` text-sm mr-2 hover:underline hover:text-emerald-500`}
                                  >
                                    Add another address
                                  </button>
                                </div>
                              ) : (
                                false
                              )}
                            </div>
                            <hr className="border border-emerald-500" />

                            <h3 className="font-semibold text-gray-700 p-3">
                              select your address
                            </h3>
                            {addressError && (
                              <div className="font-semibold text-red-500 capitalize p-3 border border-red-500 mb-5 rounded-md">
                                {addressError}
                              </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                              {userAddress &&
                                userAddress.map((el, index) => {
                                  return (
                                    <div key={index}>
                                      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex">
                                        <li className="w-full">
                                          <div className="p-2">
                                            <input
                                              id={el.id}
                                              type="radio"
                                              name="list-radio"
                                              defaultValue={el.id || ""}
                                              // defaultChecked={index === 0}
                                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                                              onChange={(e) =>
                                                setAddressId(e.target.value)
                                              }
                                            />
                                            <label
                                              htmlFor={el.id}
                                              className="py-3 ml-2 w-full"
                                            >
                                              <span className=" font-bold text-xl text-emerald-500">
                                                {el.label}
                                              </span>
                                              <div>
                                                <span className="">
                                                  Address :
                                                </span>{" "}
                                                <span className="text-gray-700 font-serif">
                                                  {el.address_line}
                                                </span>
                                              </div>
                                              <div className="">
                                                <span>
                                                  <span>City :</span>
                                                  <span className="text-gray-700 font-serif ml-1">
                                                    {el.city}
                                                  </span>
                                                  ,
                                                </span>
                                                <p className="">
                                                  <span>Country :</span>
                                                  <span className="text-gray-700 font-serif ml-1">
                                                    {el.country}
                                                  </span>
                                                  ,
                                                </p>
                                                <span className="">
                                                  <span>State :</span>
                                                  <span className="text-gray-700 font-serif ml-1">
                                                    {el.state}
                                                  </span>
                                                  ,
                                                </span>
                                                <span className="flex justify-between flex-row md:flex-col lg:flex-row ">
                                                  <span>
                                                    Pincode :
                                                    <span className="text-gray-700 font-serif ml-1">
                                                      {el.pincode},
                                                    </span>
                                                  </span>
                                                  <div className="flex items-center mt-0 md:mt-4 lg:mt-0">
                                                    <button
                                                      className="flex items-center mr-2 hover:text-emerald-500 hover:underline"
                                                      onClick={() =>
                                                        handleUpdate(el)
                                                      }
                                                    >
                                                      <RiEdit2Fill />
                                                      <span>Update</span>
                                                    </button>
                                                    <button
                                                      className="flex items-center hover:text-red-500 hover:underline"
                                                      onClick={() =>
                                                        handleDeleteAddress(
                                                          el.id
                                                        )
                                                      }
                                                    >
                                                      <MdDelete /> Delete
                                                    </button>
                                                  </div>
                                                </span>
                                              </div>
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  );
                                })}
                            </div>
                            <div
                              className={`grid grid-cols-6 gap-4 lg:gap-6  ${
                                addressError !== false
                                  ? "mt-10 md:mt-[250px] lg:mt-[250px]"
                                  : "mt-10 md:mt-[250px] lg:mt-[250px]"
                              } `}
                            >
                              <div className="col-span-6 sm:col-span-3">
                                <button
                                  // onClick={handleGoBack}
                                  // disabled={}
                                  type="submit"
                                  className="w-full bg-indigo-50 border border-indigo-100 rounded py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center font-serif"
                                >
                                  <span className="text-xl mr-2">
                                    <IoReturnUpBackOutline />
                                  </span>
                                  Continue Shopping
                                </button>
                              </div>
                              <div className="col-span-6 sm:col-span-3">
                                <button
                                  onClick={handleNext}
                                  // disabled={}
                                  type="submit"
                                  className="bg-green-600 hover:bg-emerald-600 border border-emerald-500 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
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
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="p-5">
                        <div className="bg-white rounded-md">
                          <li className="text-xl font-semibold list-disc p-5">
                            Your Addresses
                          </li>
                          <hr className="border border-emerald-500 mx-5" />
                          <p className="font-bold text-red-500 font-serif mx-5 text-sm mt-2">
                            {" "}
                            Note:
                            <span className="text-gray-900 font-semibold font-sans">
                              {" "}
                              You don't have any saved Address.
                            </span>
                          </p>
                          <div className="flex justify-center items-center mt-10">
                            <button
                              className="mb-10 text-[100px] text-gray-500 border-2 border-dashed flex justify-center w-72 rounded-md"
                              onClick={() => Navigate("/second-address")}
                            >
                              <div className="mb-10">
                                +{" "}
                                <figcaption className="text-xl p-0 m-0 underline hover:text-emerald-500">
                                  Add Address
                                </figcaption>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {showPayment && (
                  <div className="border rounded-lg bg-white">
                    <Payment ID={103} />
                  </div>
                )}
              </div>

              {/* Cart Integration */}
              <OrderSummaryCartItem />
            </div>
          </div>
        </Layout>
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load}
      >
        <CircularProgress color="success" />
      </Backdrop>
      <ToastContainer />
    </>
  );
};

export default ShippingDetails;
