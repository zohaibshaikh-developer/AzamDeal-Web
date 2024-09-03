import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { IoBagAddSharp, IoAdd, IoRemove } from "react-icons/io5";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Backdrop, Box, CircularProgress, Skeleton } from "@mui/material";
import { ScaleLoader } from "react-spinners";

const ProductCard = (props) => {
  const { items, addItem, updateItemQuantity, inCart } = useCart();

  let Navigate = useNavigate();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

  let productList = props.productList;

  const handleDetailPage = (el) => {
    setLoad(true);
    // localStorage.setItem("Product ID", el.id);
    Navigate(`/product-detail/${el.id}`);
  };

  const getAllCategories = () => {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch(process.env.REACT_APP_BASE_URL + "readall/categories", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const [activeLink, setActiveLink] = useState("");

  const handleGoToCategoryPage = (el) => {
    Navigate({
      pathname: "/category-page",
      search: createSearchParams({
        id: el.id,
        name: el.name,
      }).toString(),
    });
    setActiveLink(el.name);
  };

  return (
    <>
      <p className="text-xl lg:text-4xl font-serif font-semibold text-center w-full lg:w-2/1 mb-5">
        Categories
      </p>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-3 mt-2 lg:gap-3">
        {productList &&
          data.map((el, index) => {
            return (
              <div
                className="group box-border overflow-hidden flex rounded-md shadow-sm pe-0 flex-col items-center bg-white relative border"
                key={index}
              >
                <div
                  onClick={() => handleGoToCategoryPage(el)}
                  className="relative flex justify-center w-full cursor-pointer"
                >
                  <div className="flex justify-center">
                    <img
                      src={process.env.REACT_APP_MEDIA_BASE_URL + el.thumbnail}
                      style={{ maxHeight: 250, maxWidth: 250 }}
                      alt={el.product_name}
                      className="object-scale-down transition duration-150 ease-linear transform group-hover:scale-105 h-52 w-full px-4"
                    />
                  </div>
                </div>
                <div className="w-full px-3 lg:px-4 pb-4 overflow-hidden">
                  <div className="relative mb-1">
                    <h2 className="text-heading mb-0 block text-base text-center font-medium text-gray-900">
                      <span className="line-clamp-2">{el.name}</span>
                    </h2>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* <p className="text-xl lg:text-4xl mb-5 font-serif font-semibold mt-5 text-center w-full lg:w-2/1">
        Products
      </p>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-3 mt-5">
        {productList &&
          productList.map((el, index) => {
            return (
              <div
                className="group box-border overflow-hidden flex rounded-md shadow-sm pe-0 flex-col items-center bg-white relative border"
                key={index}
              >
                <div
                  onClick={() => handleDetailPage(el)}
                  className="relative flex justify-center w-full cursor-pointer"
                >
                  <img
                    src={process.env.REACT_APP_MEDIA_BASE_URL + el.product_base_image}
                    width={160}
                    height={130}
                    alt={el.product_name}
                    className="object-scale-down transition duration-150 ease-linear transform group-hover:scale-105 h-52 w-full"
                  />
                </div>
                <div className="w-full px-3 lg:px-4 pb-4 overflow-hidden">
                  <div className="relative mb-1">
                    <h2 className="text-heading mb-0 block text-sm font-medium text-gray-900">
                      <span className="line-clamp-2">{el.product_name}</span>
                    </h2>
                  </div>

                  <div className="flex justify-between items-center text-heading text-sm sm:text-base space-s-2 md:text-base lg:text-xs">
                    <div className="flex items-center gap-2">
                      <strike className="font-bold text-gray-400">
                        {"Rs." + el.var_mrp}
                      </strike>
                      <p className="text-[#008000] text-sm font-bold">
                        {"Rs." + el.var_price}/-
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs font-bold">
                    {Math.floor((el.var_price / el.var_mrp) * 100)}% off
                  </p>
                </div>
              </div>
            );
          })}
      </div> */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load}
      >
        <CircularProgress color="success" />
      </Backdrop>
    </> 
  );
};

export default ProductCard;
