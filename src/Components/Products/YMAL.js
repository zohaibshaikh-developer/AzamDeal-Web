import { Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { IoBagAddSharp } from "react-icons/io5";
import { MdRemoveShoppingCart } from "react-icons/md";
import { Link, Navigate, useNavigate } from "react-router-dom";

const YMAL = (props) => {
  // Navigate

  let Navigate = useNavigate();

  const [cartItem, setCartItem] = useState();

  const GetAllCartItems = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      process.env.REACT_APP_BASE_URL +
        `getby_customer_id/${localStorage.getItem("customer_id")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.status === 200) {
          // setSpinner(false);
        }
        setCartItem(result.data);
      })
      .catch((error) => {
        // console.log("error", error)
      });
  };

  useEffect(() => {
    GetAllCartItems();
  }, [props]);

  const [productList, setProductList] = useState([]);
  // const [load, setLoad] = useState(false);

  const getAllProducts = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      col_name: "product_name",
      order: "ASC",
      limit: "5",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(process.env.REACT_APP_BASE_URL + "getAllProducts", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setProductList(result.data);
      })
      .catch((error) => {
        // console.log("error", error)
      });
  };

  const handleDetailPage = (el) => {
    // setLoad(true);
    // localStorage.setItem("Product ID", el.id);
    Navigate(`/product-detail/${el.id}`);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="mt-10">
      {/* {console.log(cartItem)} */}
      <div className="p-0 md:p-0 lg:p-4">
        <p className="font-sans font-bold text-2xl text-gray-700 mt-[-18px] mb-5">
          Visit your cart items
        </p>
        <hr className="border border-black" />
        <div className="flex-grow scrollbar-hide w-full max-h-64 bg-gray-50 mt-5 shadow-none md:shadow-lg lg:shadow-lg">
          {cartItem ? (
            cartItem.map((el, index) => {
              return (
                <div
                  className="group w-full h-auto flex justify-start items-center p-1 bg-white py-3 border-b hover:bg-gray-50 transition-all border-gray-100 relative last:border-b-0 rounded-md"
                  key={index}
                >
                  <div className="relative flex rounded-full border border-gray-100 shadow-sm overflow-hidden flex-shrink-0 cursor-pointer mr-4">
                    <img
                      key=""
                      src={
                        process.env.REACT_APP_MEDIA_BASE_URL +
                        el.products.product_base_image
                      }
                      width={40}
                      height={40}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col w-full overflow-hidden">
                    <Link href="/">
                      <p
                        // onClick={closeCartDrawer}
                        className="text-sm font-medium text-gray-700 text-heading line-clamp-1"
                      >
                        {el.products.product_name}
                      </p>
                    </Link>
                    <span className="text-xs text-gray-400 mb-1">
                      {el.products.product_desc.slice(0, 100)}
                    </span>
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-sm md:text-base text-heading leading-5">
                        <span className="text-emerald-500">
                          {"₹" + el.item_price}.00
                        </span>
                      </div>

                      <button
                        onClick={() => Navigate("/cart-page")}
                        className="hover:text-green-600 text-[#008000] text-lg cursor-pointer"
                      >
                        <BsFillArrowRightCircleFill />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white p-5 rounded-2xl w-full md:w-2/3 lg:w-2/3">
              <div className="flex justify-around items-center">
                <div>
                  <MdRemoveShoppingCart className="text-5xl text-gray-500 " />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-700">
                    <span className="font-bold">No..! Items Available</span>
                    <br /> Please Add items to carts...!
                  </p>
                  <div className="flex mt-5 justify-center"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Second Column */}
        <div className="p-1 md:p-4 lg:p-4 mt-10">
          <p className="font-sans font-bold text-2xl text-gray-700 mb-5">
            You May Also Like...
          </p>
          <hr className="border border-black" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 p-5">
            {productList &&
              productList.map((el, index) => {
                return (
                  <div
                    className="group box-border overflow-hidden flex rounded-md pe-0 flex-col items-center bg-white relative border"
                    key={index}
                  >
                    <div
                      onClick={() => handleDetailPage(el)}
                      className="relative flex justify-center w-full cursor-pointer"
                    >
                      <img
                        src={
                          process.env.REACT_APP_MEDIA_BASE_URL +
                          el.product_base_image
                        }
                        width={160}
                        height={130}
                        alt="Tea"
                        className="object-scale-down transition duration-150 ease-linear transform group-hover:scale-105 h-52 w-full"
                      />
                    </div>
                    <div className="w-full px-3 lg:px-4 pb-4 overflow-hidden">
                      <div className="relative mb-1">
                        {/* <span className="text-gray-400 font-medium text-xs d-block mb-1">
                          {el.id}
                        </span> */}
                        <h2 className="text-heading truncate mb-0 block text-sm font-medium text-gray-600">
                          <span className="line-clamp-2">
                            {el.product_name}
                          </span>
                        </h2>
                      </div>

                      <div className="flex justify-between items-center text-heading text-sm sm:text-base space-s-2 md:text-base lg:text-xl">
                        <div className="flex items-center gap-2">
                          <strike className="font-bold text-gray-400 text-xs">
                            {"₹" + el.var_mrp}
                          </strike>
                          <p className="text-[#008000] text-sm font-bold">
                            {"₹" + el.var_price}/-
                          </p>
                        </div>
                        {/* <Link to="/product-detail">
                          <button
                            aria-label="cart"
                            className="h-9 w-9 flex items-center justify-center border border-gray-200 rounded text-[#008000] hover:border-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
                          >
                            <span className="text-xl">
                              <IoBagAddSharp />
                            </span>
                          </button>
                        </Link> */}
                      </div>
                      <p className="text-gray-400 text-xs font-bold">
                        ({Math.floor((el.var_price / el.var_mrp) * 100)}% off)
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load}
      >
        <CircularProgress color="success" />
      </Backdrop> */}
    </div>
  );
};

export default YMAL;
