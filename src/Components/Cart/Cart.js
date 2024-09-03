import React from "react";
import Layout from "../../Layout/Layout";
import Link from "next/link";
import { BsFillCartXFill, BsFillCheckCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import UnlogCart from "./UnlogCart";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  Backdrop,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

const Cart = () => {
  let Navigate = useNavigate();

  // Load
  const [load, setLoad] = useState(true);

  // Items Quantity
  const [totalQuantity, setTotalQuantity] = useState([]);

  const [cartItem, setCartItem] = useState([]);
  const [totalItem, setTotalItem] = useState();
  const [totalPrice, setTotalPrices] = useState();

  const GetAllCartItems = async () => {
    setLoad(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_BASE_URL +
        `getby_customer_id/${localStorage.getItem("customer_id")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setCartItem([...result.data]);
        setTotalQuantity(result.data[0].item_qty);
      })
      .catch((error) => console.log("error", error));
    setLoad(false);
  };

  const TotalPrice = cartItem.reduce((accumulator, el) => {
    return accumulator + parseInt(el.total_price);
  }, 0);
  const TotalItem = cartItem.reduce((accumulator, el) => {
    return accumulator + parseInt(el.item_qty);
  }, 0);

  useEffect(() => {
    setTotalPrices(TotalPrice);
    setTotalItem(TotalItem);
  }, [GetAllCartItems]);

  useEffect(() => {
    GetAllCartItems();
  }, []);

  const handleGoAddress = () => {
    setLoad(true);
    Navigate("/address");
  };

  const handleRemoveCartItems = async (id) => {
    console.log("ID =>", id);
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };
    console.log(id);
    await fetch(
      process.env.REACT_APP_BASE_URL + `DeleteCartItem/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          toast.success("Deleted successfully", {
            theme: "light",
            autoClose: "2000",
          });
        } else {
          toast.error("Something Went Wrong", {
            theme: "light",
            autoClose: "2000",
          });
        }
      })
      .catch((error) => console.log("error", error));

    await GetAllCartItems();
  };

  const [updatedQty, setUpdatedQty] = useState();

  const CartAddQuantity = async (el) => {
    let index = 0;
    // const values = [...cartItem];
    // values[index].item_qty = parseInt(el.item_qty) + 1;
    // setCartItem(values);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: el.id,
      item_qty: parseInt(el.item_qty) + 1,
    });
    console.log(raw);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(process.env.REACT_APP_BASE_URL + "updateQty", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result.status === 200) {
          setCartItem(result.data);
        } else {
          toast.error("Something Went Wrong", {
            theme: "light",
            autoClose: "2000",
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  const CartMinusQuantity = async (el) => {
    let index = 0;
    // const values = [...cartItem];
    // values[index].item_qty = el.item_qty - 1;
    // setCartItem(values);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: el.id,
      item_qty: el.item_qty - 1,
    });
    console.log(raw);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(process.env.REACT_APP_BASE_URL + "updateQty", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setCartItem(result.data);
        if (result.status === 200) {
        } else {
          toast.error("Something Went Wrong", {
            theme: "light",
            autoClose: "2000",
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleNavigateProductDetail = (el) => {
    localStorage.setItem("Product ID", el.product_id);
    Navigate("/product-detail");
  };

  return (
    <>
      {console.log(cartItem.length)}
      {load ? (
        <div className="h-screen bg-white"></div>
      ) : (
        <Layout>
          <div className="">
            {/* Mobile */}
            <div className="w-full  bg-gradient-to-l from-[#7ae57a]  to-[#008000] fixed z-30 bottom-16 rounded-2xl">
              <div className="block md:block lg:hidden p-10 bg-white h-64 rounded-t-2xl mt-[2px]">
                <BsFillCheckCircleFill className="text-sm text-[#008000]" />
                <span className="text-center text-sm text-[#008000]">
                  Your order is eligible for FREE Delivery. Select this option
                  at checkout. Details.
                </span>
                <p className="text-xl font-semibold mt-2">
                  Subtotal:{" "}
                  <span>
                    ({totalItem} {""} Items):{" "}
                    <span className="font-bold text-[#008000]">
                      ₹ {TotalPrice} /-
                    </span>
                  </span>
                </p>
                <input className="mt-1" type="checkbox" name="" id="" />
                <span className="mx-2 font-semibold text-sm">
                  This Order Contains a Gift.
                </span>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full p-2 bg-[#008000] text-white rounded-md font-semibold"
                    onClick={handleGoAddress}
                    disabled={cartItem.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
            {/* Mobile */}
            <div className="flex flex-col md:flex-col lg:flex-row p-1 md:p-10 lg:p-10">
              <div className="bg-white rounded-2xl w-full mb-5">
                <div className="p-10 font-bold text-3xl">Shopping Cart</div>
                <hr className="border-[1px] mx-5 border-[#008000]" />
                {cartItem.length > 0 ? (
                  cartItem.map((el, index) => {
                    return (
                      <div key={index}>
                        <div className="flex p-1 pb-5">
                          <div
                            className="ml-2 md:ml-5 lg:ml-5 mt-7 md:mt-4 lg:mt-4"
                            onClick={() => handleNavigateProductDetail(el)}
                          >
                            <img
                              src={
                                process.env.REACT_APP_MEDIA_BASE_URL +
                                el.products.product_base_image
                              }
                              alt="azamDeal"
                              className="object-scale-down h-[190px] w-[150px] md:h-[185px] lg:h-[170px] rounded"
                            />
                          </div>

                          {/* Second Flex */}
                          <div className="w-2/3  p-5">
                            <div className="font-bold text-lg">
                              <p>{el.products.product_name}</p>
                            </div>
                            <div className="font-semibold text-sm">
                              <p>{el.products.product_desc.slice(0, 100)}</p>
                            </div>
                            <div className="font-semibold text-sm">
                              {el.products.in_stock === 1 ? (
                                <p className="text-[#008000] font-bold">
                                  In Stock
                                </p>
                              ) : (
                                <p className="text-red-500">Out of Stock</p>
                              )}
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center font-bold text-sm mt-3">
                                <p className="mr-2 hidden md:block lg:block">
                                  Qty:{" "}
                                </p>
                                <div className="flex items-center border text-[#008000] border-emerald-200 rounded-md p-1">
                                  <button
                                    onClick={() => CartMinusQuantity(el)}
                                    disabled={el.item_qty === 1}
                                  >
                                    <AiOutlineMinus className="text-lg md:text-2xl lg:text-2xl font-semibold mx-2" />
                                  </button>
                                  <span className="text-center text-black px-5 border border-t-white border-b-white border-x-[#008000]">
                                    {parseInt(el.item_qty)}
                                  </span>
                                  <button onClick={() => CartAddQuantity(el)}>
                                    <AiOutlinePlus className="text-lg md:text-2xl lg:text-2xl font-semibold mx-2" />
                                  </button>
                                </div>
                              </div>
                              <div className="font-bold text-sm block md:hidden lg:hidden mt-2">
                                <p>
                                  <span className="text-[#008000] text-xl">
                                    ₹{el.item_price}
                                    .00
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div>
                              <button
                                className="p-2 w-full bg-red-500 md:bg-white lg:bg-white md:text-red-500 lg:text-red-500 outline md:outline-red-500 lg:outline-red-500 text-white font-semibold mt-2 rounded-md"
                                onClick={() => handleRemoveCartItems(el.id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                          {/* Third Flex */}
                          <div className="justify-end hidden md:block lg:block font-bold text-sm mt-2">
                            <p>
                              <span className="text-[#008000] text-xl">
                                ₹{el.item_price}.00
                              </span>
                            </p>
                          </div>
                        </div>
                        <hr className="border-[0.5px] border-gray-200 mx-5" />
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-white p-5 rounded-2xl w-full md:w-2/3 lg:w-2/3">
                    <div className="flex justify-around items-center">
                      <div>
                        <MdRemoveShoppingCart className="text-9xl text-gray-500 " />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-700">
                          <span className="font-bold">
                            No..! Items Available
                          </span>
                          <br /> Please Add items to carts...!
                        </p>
                        <div className="flex mt-5 justify-center"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="hidden md:hidden lg:block sticky top-28  p-10 bg-white ml-10 h-64 rounded-2xl shadow-xl">
                <BsFillCheckCircleFill className="text-sm text-[#008000]" />
                <span className="text-center text-sm text-[#008000]">
                  Your order is eligible for FREE Delivery. Select this option
                  at checkout. Details.
                </span>
                <p className="text-xl font-semibold mt-2">
                  SubTotal:{" "}
                  <span>
                    ({totalItem} {""} Items):{" "}
                    <span className="font-bold text-[#008000]">
                      {"₹" + totalPrice + "/-"}
                    </span>
                  </span>
                </p>
                <input className="mt-1" type="checkbox" name="" id="" />
                <span className="mx-2 font-semibold text-sm">
                  This Order Contains a Gift.
                </span>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full p-2 bg-[#008000] hover:bg-green-600 text-white rounded-md font-semibold"
                    onClick={handleGoAddress}
                    disabled={cartItem.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={load}
          >
            <CircularProgress color="success" />
          </Backdrop>
          <ToastContainer />
        </Layout>
      )}
    </>
  );
};

export default Cart;
