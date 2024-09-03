import { Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoBagAddSharp } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";

const RelatedProduct = (props) => {
  const Navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    // setLoad(true);
    getAllRelatedProducts(params.id);
  }, [props]);

  // const [load, setLoad] = useState(false);
  const [productList, setProductList] = useState([]);

  const getAllRelatedProducts = async (id) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_BASE_URL + `getbyCategory/${props.CatID}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // setLoad(false);
        // console.log(result);
        setProductList(result.data);
      })
      .catch((error) => {
        // console.log("error", error)
      });
  };

  useEffect(() => {
    getAllRelatedProducts();
  }, []);

  const handleDetailPage = (el) => {
    // setLoad(true);

    Navigate("/product-detail");
  };

  return (
    <div>
      {/* {console.log()} */}
      {/* {load && <div className="h-screen bg-white"></div>} */}
      <div className="pt-10 lg:pt-20 lg:pb-10" id={props.id}>
        <h3 className="leading-7 text-lg lg:text-xl mb-3 font-semibold font-serif hover:text-gray-600">
          Related Products
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-2 md:gap-3 lg:gap-3">
          {productList &&
            productList.slice(0, 10).map((el, index) => {
              return (
                <div
                  className="group box-border overflow-hidden flex rounded-md shadow-sm pe-0 flex-col items-center bg-white relative border"
                  key={index}
                  onClick={async () => {
                    // console.log("clicked");
                    // localStorage.setItem("Product ID", el.id);
                    // await props.onSelect();
                    window.scroll(0, 0);
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
                      className="object-scale-down transition duration-150 ease-linear transform group-hover:scale-105 h-52 w-full"
                    />
                  </div>
                  <div className="w-full px-3 lg:px-4 pb-4 overflow-hidden">
                    <div className="relative mb-1">
                      {/* <span className="text-gray-400 font-medium text-xs d-block mb-1">
                        {el.id}
                      </span> */}
                      <h2 className="text-heading mb-0 block text-sm font-medium text-gray-600">
                        <span className="line-clamp-2">{el.product_name}</span>
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
          {/* <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={load}
          >
            <CircularProgress color="success" />
          </Backdrop> */}
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
