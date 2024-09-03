import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SidebarToggle from "../../Components/Sidebar/SidebarToggle";
import { FiHome, FiUser, FiShoppingCart, FiAlignLeft } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { Stack } from "@mui/system";
import { Skeleton } from "@mui/material";

const MobileFooter = (props) => {
  // Navigate
  let Navigate = useNavigate();

  const [isLogin, setIsLogin] = useState();
  const [customerData, setCustomerData] = useState([]);
  const [cartItem, setCartItem] = useState();

  // Load Hooks
  const [load, setLoad] = useState(false);

  // useEffect(() => {
  //   const getCustomerData = async () => {
  //     setLoad(true);
  //     var requestOptions = {
  //       method: "GET",
  //       redirect: "follow",
  //     };

  //     await fetch(
  //       process.env.REACT_APP_BASE_URL + `customer_address/${localStorage.getItem(
  //         "customer_id"
  //       )}`,
  //       requestOptions
  //     )
  //       .then((response) => response.json())
  //       .then((result) => {
  //         // console.log(result);
  //         setCustomerData(result.data);
  //       })
  //       .catch((error) => console.log("error", error));
  //     setLoad(false);
  //   };
  //   getCustomerData();
  // }, []);

  useEffect(() => {
    setIsLogin(localStorage.getItem("isLogin"));
  }, []);

  // Total Cart Count Item
  const getTotalCartItems = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_BASE_URL +
        `countCartItems/${localStorage.getItem("customer_id")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setCartItem(result);
      })
      .catch(
        (error) => {}
        // console.log("error", error)
      );
  };

  useEffect(() => {
    getTotalCartItems();
    if (isLogin !== "Yes") {
      setLoad(false);
    }
  }, [props.CartItem]);

  return (
    <>
      {/* {console.log(cartItem)} */}
      <div className="flex flex-col h-full justify-between align-middle bg-white rounded cursor-pointer overflow-y-scroll flex-grow scrollbar-hide w-full">
        {/* <CategoryDrawer className="w-6 h-6 drop-shadow-xl" /> */}
      </div>
      <div
        className="lg:hidden fixed z-30 bottom-0 flex items-center justify-between w-full h-16 px-3 sm:px-10"
        style={{
          backgroundImage: "url('/navbg.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div
          aria-label="Bar"
          className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
        >
          <span className="text-xl text-white">
            <SidebarToggle />
          </span>
        </div>
        <Link to="/">
          <p className="text-xl text-white" rel="noreferrer" aria-label="Home">
            {" "}
            <FiHome className="w-6 h-6 drop-shadow-xl" />
          </p>
        </Link>

        {isLogin === "Yes" ? (
          <Link to="/cart-page">
            <button
              aria-label="Total"
              onClick={() => Navigate("/cart-page")}
              className="relative px-5 text-white text-2xl font-bold"
            >
              <span className="absolute z-10 top-0 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-medium leading-none text-red-100 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                {cartItem === undefined ? "0" : cartItem.data}
              </span>
              <FiShoppingCart className="w-6 h-6 drop-shadow-xl" />
            </button>
          </Link>
        ) : (
          <Link to="/log-cart">
            <button
              aria-label="Total"
              className="relative px-5 text-white text-2xl font-bold"
            >
              {" "}
              <FiShoppingCart className="w-6 h-6 drop-shadow-xl" />
            </button>
          </Link>
        )}
        <button
          aria-label="User"
          type="button"
          className={`text-xl ${
            isLogin === "Yes"
              ? "text-emerald-500 bg-white rounded-full"
              : "text-white"
          }  indicator justify-center `}
          //   onClick={() => history.push("/components/Login/Login")}
        >
          {load && (
            <Stack className="mt-7 ">
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            </Stack>
          )}
          {isLogin === "Yes" ? (
            <Link to="/dashboard" className="capitalize font-bold text-2xl p-2">
              {localStorage.getItem("customerName").slice(0, 1)}
            </Link>
          ) : (
            <Link to="/login">
              <FiUser className="drop-shadow-xl text-2xl" />
            </Link>
          )}
        </button>
      </div>
    </>
  );
};

export default MobileFooter;
