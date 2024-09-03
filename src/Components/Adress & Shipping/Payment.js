import React, { useState } from "react";
import { IoArrowForward, IoReturnUpBackOutline } from "react-icons/io5";
import InputArea from "../Pages/Form/InputArea";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  Backdrop,
  Box,
  CircularProgress,
  Step,
  stepClasses,
  StepLabel,
  Stepper,
} from "@mui/material";
import { MdPayment } from "react-icons/md";
import Layout from "../../Layout/Layout";
import { IoIosCash } from "react-icons/io";
import OrderSummaryCartItem from "./OrderSummaryCartItem";
import moment from 'moment';

const steps = ["Shipping Details", "Payment Details"];

const Payment = (props) => {
  let Navigate = useNavigate();

  // Loader
  const [load, setLoad] = useState(false);

  // Hooks
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [inputError, setInputError] = useState(null);

  // Order Generator Integration
  const handleGenerateOrder = async () => {
    let CID = await localStorage.getItem("customer_id");
    let AddressID = await localStorage.getItem("Address ID");
    let CouponID = await localStorage.getItem("CouponID");
    let CouponValue = await localStorage.getItem("CouponAmount");
    const formattedDate = moment(new Date()).format("MM/DD/YY");    // const msg = "this feild is required";
    // if (paymentMethod === null) {
    //   setInputError(msg);
    // } else {
    setLoad(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      customer_id: CID,
      address_id: AddressID ? AddressID : props.ID,
      coupon_id: CouponID,
      discount_amount: CouponValue,
      payment_mode: paymentMethod ? paymentMethod : "COD",
      payment_status: "Done",
      date: formattedDate,
    });
    console.log(raw);
    // console.log(raw);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_BASE_URL + "generateOrder",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          toast.success("Order Placed Successfull", {
            theme: "light",
            autoClose: "2000",
          });
          Navigate("/success");
          setLoad(false);
        } else {
          toast.error("Something Went Wrong", {
            theme: "light",
            autoClose: "2000",
          });
          setLoad(false);
        }
      })
      .catch((error) => console.log("error", error));
    // }
  };

  // Back Button
  const handleGoBack = () => {
    setLoad(true);
    Navigate(-1);
  };

  return (
    <>
      {console.log(paymentMethod)}
      {/* <Layout> */}
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="py-10 lg:py-12 px-0 2xl:max-w-screen-2xl w-full xl:max-w-screen-xl flex flex-col md:flex-row lg:flex-row">
          <div className="md:w-full lg:w-3/5 flex h-full flex-col order-2 sm:order-1 lg:order-1">
            <div className="md:col-span-2">
              <div>
                <Box sx={{ width: "100%" }}>
                  <Stepper activeStep={1} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
                <div>
                  <h1 className="mb-2 font-semibold text-2xl flex items-center">
                    <span className="mr-2">
                      <MdPayment />
                    </span>
                    Payment
                  </h1>
                  <hr className="border border-emerald-500" />

                  <h3 className="font-semibold text-gray-700 p-3">
                    Select Payment Method
                  </h3>
                  {/* {inputError && (
                    <div className="text-red-500 font-semibold">
                      {inputError}
                    </div>
                  )} */}
                  <div className="border border-gray-500 rounded-md">
                    <div className="flex items-center p-2">
                      <input
                        type="radio"
                        name="cod"
                        id="cod"
                        defaultValue="COD"
                        defaultChecked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <IoIosCash className="ml-5 text-lg" />
                      <label
                        htmlFor="cod"
                        className="ml-2 text-lg font-semibold w-full"
                      >
                        Cash on Delivery
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10 md:mt-[350px] lg:mt-[350px]">
                    <div className="col-span-6 sm:col-span-3">
                      <div>
                        <button
                          onClick={handleGoBack}
                          className="bg-indigo-50 border border-indigo-100 rounded py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center font-serif w-full"
                        >
                          <span className="text-xl mr-2">
                            <IoReturnUpBackOutline />
                          </span>
                          Continue Shopping
                        </button>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <button
                        onClick={handleGenerateOrder}
                        type="submit"
                        className="bg-emerald-500 hover:bg-emerald-600 border border-emerald-500 transition-all rounded py-3 text-center text-sm font-sans font-medium text-white flex justify-center w-full"
                      >
                        <span className="flex justify-center text-center">
                          Place Your Order
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Integration */}
          {/* <OrderSummaryCartItem /> */}
        </div>
      </div>
      {/* </Layout> */}
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

export default Payment;
