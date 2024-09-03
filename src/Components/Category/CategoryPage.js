import {
  Backdrop,
  Box,
  CircularProgress,
  circularProgressClasses,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoBagAddSharp } from "react-icons/io5";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import Layout from "../../Layout/Layout";
import Banner from "../Banner/Banner";

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  // const [load, setLoad] = useState(true);
  const [productList, setProductList] = useState([]);
  const [categoryBanner, setCategoryBanner] = useState();
  const [spinner, setSpinner] = useState(true);

  let Navigate = useNavigate();

  let id = searchParams.get("id");

  useEffect(() => {
    getAllRelatedProducts();
  }, [id]);

  const getAllRelatedProducts = async () => {
    setApiLoader(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_BASE_URL + `getbyCategory/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setApiLoader(false);
        // console.log(result);
        if (result.status === 200) {
          setSpinner(false);
          setProductList(result.data);
          setCategoryBanner(result.cat_image);
        }
      })
      .catch((error) => console.log("error", error));
    setApiLoader(false);
    setSpinner(false);
  };

  useEffect(() => {
    getAllRelatedProducts();
    window.scroll(0, 0);
  }, []);

  //
  const [apiLoader, setApiLoader] = useState(true);
  function FacebookCircularProgress(props) {
    return (
      <Box sx={{ position: "relative" }}>
        <CircularProgress
          variant="determinate"
          sx={{
            color: (theme) =>
              theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
          }}
          size={40}
          thickness={4}
          {...props}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          sx={{
            color: (theme) =>
              theme.palette.mode === "light" ? "#008000" : "#008000",
            animationDuration: "550ms",
            position: "absolute",
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
            },
          }}
          size={40}
          thickness={4}
          {...props}
        />
      </Box>
    );
  }

  return (
    <>
      <Layout>
        {apiLoader && (
          <div className="h-screen bg-white">
            <Box
              sx={{ flexGrow: 1 }}
              className="flex justify-center items-center pt-64"
            >
              <FacebookCircularProgress />
            </Box>
          </div>
        )}
        {apiLoader === true ? (
          <div className="h-screen bg-white" />
        ) : (
          <div>
            <div className="p-1 md:p-5 lg:p-10">
              {/* {console.log()} */}
              {/* <div className="bg-green-200 px-10 py-6 rounded-lg mt-6 hidden lg:block">
                <Banner />
              </div> */}
              <div>
                <img
                  src={process.env.REACT_APP_MEDIA_BASE_URL + categoryBanner}
                  alt=""
                  className="w-full rounded-md md:rounded-tl-3xl md:rounded-br-3xl lg:rounded-tl-full lg:rounded-br-full h-80 object-cover"
                />
              </div>
              <div className="pt-8 lg:pt-10 lg:pb-10">
                <h3 className="leading-7 text-lg lg:text-xl mb-3 font-semibold font-serif hover:text-gray-600">
                  {searchParams.get("name")}
                </h3>
                <hr className="border " />
                {spinner && (
                  <div className="max-h-64 flex justify-center">
                    <ScaleLoader color="#36d7b7" className="mt-20 mb-20" />
                  </div>
                )}
                <div className="p-1 md:p-2 lg:p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                  {productList &&
                    productList.map((el, index) => {
                        return (
                        <div
                          className="group box-border overflow-hidden flex rounded-md shadow-sm pe-0 flex-col items-center bg-white relative"
                          key={index}
                          onClick={async () => {
                            // console.log("clicked");
                            // localStorage.setItem("Product ID", el.id);
                            // await props.onSelect();
                            Navigate(`/product-detail/${el.id}`);
                          }}
                        >
                          <div
                            // onClick={() => handleDetailPage(el)}
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
                              className="object-scale-down transition duration-150 ease-linear transform group-hover:scale-105 h-52 w-full hover:bg-transparent"
                            />
                          </div>
                          <div className="w-full px-3 lg:px-4 pb-4 overflow-hidden">
                            <div className="relative mb-1">
                              {/* <span className="text-gray-400 font-medium text-xs d-block mb-1">
                              {el.id}
                            </span> */}
                              <h2 className="text-heading mb-0 block text-sm font-medium text-gray-600">
                                <span className="line-clamp-2">
                                  {el.product_name}
                                </span>
                              </h2>
                            </div>
                            {/* <h1 className="text-sm font-medium text-gray-900">
                              {el.product_desc.slice(0, 50)}
                            </h1> */}
                            <div className="flex font-bold justify-between items-center text-heading text-sm sm:text-base space-s-2 md:text-base lg:text-xl">
                              <div className="flex items-center gap-2">
                                <strike className="font-bold text-xs text-gray-400">
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
                              ({Math.floor((el.var_price / el.var_mrp) * 100)}%
                              off)
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load}
      >
        <CircularProgress color="success" />
      </Backdrop> */}
    </>
  );
};

export default CategoryPage;
