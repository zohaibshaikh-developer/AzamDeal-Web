import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import {
  IoGridOutline,
  IoListOutline,
  IoLockOpenOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { FiCheck, FiRefreshCw, FiShoppingCart, FiTruck } from "react-icons/fi";

//internal import
import Layout from "../../Layout/Layout";
import Card from "./Card";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import RecentOrders from "./RecentOrders";
import { Backdrop, CircularProgress, Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
// import { userSidebar } from '@utils/data';
// import Card from '@component/order-card/Card';
// import { UserContext } from '@context/UserContext';
// import OrderServices from '@services/OrderServices';
// import RecentOrder from '@pages/user/recent-order';
// import { SidebarContext } from '@context/SidebarContext';
// import Loading from '@component/preloader/Loading';

const Dashboard = ({ children }) => {
  const Navigate = useNavigate();
  //   const {
  //     dispatch,
  //     state: { userInfo },
  //   } = useContext(UserContext);
  //   const { isLoading, setIsLoading, currentPage } = useContext(SidebarContext);

  //   const [data, setData] = useState({});
  //   const [error, setError] = useState('');
  //   const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     OrderServices.getOrderByUser({
  //       page: currentPage,
  //       limit: 8,
  //     })
  //       .then((res) => {
  //         setData(res);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //         setError(err.message);
  //       });
  //   }, [currentPage]);

  //   const handleLogOut = () => {
  //     dispatch({ type: 'USER_LOGOUT' });
  //     Cookies.remove('userInfo');
  //     Cookies.remove('couponInfo');
  //     Navigate('/');
  //   };

  //   useEffect(() => {
  //     setIsLoading(false);
  //     if (!userInfo) {
  //       Navigate('/');
  //     }
  //   }, [userInfo]);

  //   console.log('dashbaord');
  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("Token");
    localStorage.removeItem("customer_id");
    localStorage.removeItem("Product ID");
    localStorage.removeItem("CouponID");
    localStorage.removeItem("Address ID");
    Navigate("/");
  };

  const handleClickScroll = () => {
    const element = document.getElementById("section-1");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [skeletonLoader, setSkeletonLoader] = useState(true);
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   var requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };

  //   fetch(
  //     "https://team.flymingotech.in/azamDeals/public/api/customer_address/113",
  //     requestOptions
  //   )
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result);
  //       setData(result.data[0]);
  //       if (result.status === 200) {
  //         setSkeletonLoader(false);
  //       } else {
  //         setSkeletonLoader(false);
  //       }
  //     })
  //     .catch((error) => console.log("error", error));
  // }, []);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <Layout>
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
          <div className="py-10 lg:py-12 flex flex-col lg:flex-row w-full">
            <div className="flex-shrink-0 w-full lg:w-80 mr-7 lg:mr-10  xl:mr-10 ">
              <div className="bg-white p-4 sm:p-5 lg:p-8 rounded-md sticky top-32">
                <span className="p-2 my-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600">
                  <IoGridOutline
                    className="flex-shrink-0 h-4 w-4"
                    aria-hidden="true"
                  />
                  <Link to="/dashboard" onClick={() => setLoad(true)}>
                    <p className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-emerald-600 font-sans">
                      Dashboard
                    </p>
                  </Link>
                </span>
                <span className="p-2 my-2 flex items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600 font-sans">
                  <IoListOutline
                    className="flex-shrink-0 h-4 w-4"
                    aria-hidden="true"
                  />
                  <Link to="/recent-orders">
                    <p className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-emerald-600 font-sans">
                      My Orders
                    </p>
                  </Link>
                </span>
                <span className="p-2 my-2 flex items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600 font-sans">
                  <IoSettingsOutline
                    className="flex-shrink-0 h-4 w-4"
                    aria-hidden="true"
                  />
                  <Link to="/update-profile">
                    <p className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-emerald-600">
                      Update Profile
                    </p>
                  </Link>
                </span>
                <span className="p-2 my-2 flex items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600 font-sans">
                  <HiOutlineDocumentText
                    className="flex-shrink-0 h-4 w-4"
                    aria-hidden="true"
                  />
                  <Link to="/update-password">
                    <p className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-emerald-600">
                      Change Password
                    </p>
                  </Link>
                </span>
                <span className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600">
                  <span className="mr-2">
                    <IoLockOpenOutline />
                  </span>
                  <button
                    className="inline-flex items-center justify-between text-sm font-medium w-full hover:text-emerald-600 font-sans"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </span>
              </div>
            </div>
            <div className="w-full bg-white mt-4 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded-md overflow-hidden">
              <div className="overflow-hidden">
                <h2 className="flex justify-between items-center text-xl font-serif font-semibold mb-5">
                  <span></span>
                  {/* <button
                    onClick={() => Navigate("/update-profile")}
                    className="text-sm font-sans p-1 bg-emerald-500 rounded text-white hover:bg-emerald-600"
                  >
                    Update Profile
                  </button> */}
                </h2>
                {/* <hr className="border border-emerald-400" /> */}
                {/* <div className="p-10">
                  <div className="flex justify-center">
                    <div className="p-3 bg-emerald-200 rounded-full">
                      <FaUserAlt className="h-8 w-8 text-emerald-500 hover:text-emerald-700" />
                    </div>
                  </div>
                  {skeletonLoader && (
                    <Skeleton animation="wave" className="mt-4 text-center" />
                  )}
                  <figcaption className="text-center font-bold text-gray-700 mt-2">
                    {data && data["name"]}
                  </figcaption>
                  {skeletonLoader && (
                    <Skeleton animation="wave" className="text-center" />
                  )}
                  <figcaption className="text-center font-semibold text-gray-500">
                    {data && data["email"]}
                  </figcaption>
                  {skeletonLoader && (
                    <Skeleton animation="wave" className="text-center" />
                  )}
                  <figcaption className="text-center font-semibold text-gray-900">
                    {data && data["contact"]}
                  </figcaption>
                </div> */}
                {/* <hr className="border border-emerald-400" /> */}
                {/* <div className="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-4 mt-5">
                  <div onClick={handleClickScroll}>
                    <Card
                      title="Total Order"
                      Icon={FiShoppingCart}
                      quantity="144"
                      className="text-red-600  bg-red-200 font-sans"
                    />
                  </div>
                  <Card
                    title="Pending Order"
                    Icon={FiRefreshCw}
                    quantity="24"
                    className="text-orange-600 bg-orange-200 font-sans"
                  />
                  <Card
                    title="Processing Order"
                    Icon={FiTruck}
                    quantity="20"
                    className="text-indigo-600 bg-indigo-200 font-sans"
                  />
                  <Card
                    title="Complete Order"
                    Icon={FiCheck}
                    quantity="100"
                    className="text-emerald-600 bg-emerald-200 font-sans"
                  />
                </div> */}
                {/* <RecentOrders id="section-1" /> */}
              </div>
              {children}
            </div>
          </div>
        </div>
      </Layout>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load}
      >
        <CircularProgress color="success" />
      </Backdrop>
    </>
  );
};

export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });
