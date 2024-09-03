import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import AboutUs from "./Components/Pages/AboutUs";
import ContactUs from "./Components/Pages/ContactUs";
import ProductDetail from "./Components/Products/ProductDetail";
import UnlogCart from "./Components/Cart/UnlogCart";
import Cart from "./Components/Cart/Cart";
import Dashboard from "./Components/Dashboard/Dashboard";
import { useEffect, useState } from "react";
import UpdateProfile from "./Components/Dashboard/UpdateProfile";
import ShippingDetails from "./Components/Adress & Shipping/ShippingDetails";
import Payment from "./Components/Adress & Shipping/Payment";
import AddAddress from "./Components/Adress & Shipping/AddAddress";
import UpdateAddress from "./Components/Adress & Shipping/UpdateAddress";
import ForgotPassword from "./Components/Pages/ForgotPassword";
import VarifyOTP from "./Components/Pages/Form/VarifyOTP";
import ResetPassword from "./Components/Pages/ResetPassword";
import RecentOrders from "./Components/Dashboard/RecentOrders";
import UpdatePassword from "./Components/Dashboard/UpdatePassword";
import Success from "./Success";
import Offline from "./Offline";
import Search from "./Search/Search";
import { CartContext } from "./Context/CartContext";
import CategoryPage from "./Components/Category/CategoryPage";
import KisanPortal from "./Components/Pages/KisanPortal";
import PrivacyPolicy from './Components/Pages/PrivacyPolicy'
import ReturnAndRefundPolicy from './Components/Pages/ReturnAndRefundPolicy'
import ShippingPolicy from './Components/Pages/ShippingPolicy'

function App() {
  const [IsLogin, setIsLogin] = useState();
  useEffect(() => {
    setIsLogin(localStorage.getItem("isLogin"));
  }, []);
  
  

  // useEffect(() => {
  //   const getTotalCartItems = () => {
  //     var requestOptions = {
  //       method: "GET",
  //       redirect: "follow",
  //     };

  //     fetch(
  //       `https://team.flymingotech.in/azamDeals/public/api/countCartItems/${localStorage.getItem(
  //         "customer_id"
  //       )}`,
  //       requestOptions
  //     )
  //       .then((response) => response.json())
  //       .then((result) => {
  //         // console.log(result);
  //         setCart(result);
  //       })
  //       .catch(
  //         (error) => {}
  //         // console.log("error", error)
  //       );
  //   };
  // }, [])
  // useEffect(() => {
  //   window.localStorage.setItem("cart", JSON.stringify(cart));
  // }, [cart]);

  // const [cart, setCart] = useState({});
  return (
    <>
      <BrowserRouter basename="/">
        {/* <BrowserRouter> */} 
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/category-page" element={<CategoryPage />} />
          {/* Cart */}
          <Route path="/cart-page" element={<Cart />} />
          <Route path="/log-cart" element={<UnlogCart />} />

          {/* UserDashBoard */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recent-orders" element={<RecentOrders />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/update-password" element={<UpdatePassword />} />

          {/* Address and shipping Method */}
          <Route path="/address" element={<ShippingDetails />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/second-address" element={<AddAddress />} />
          <Route path="/update-address" element={<UpdateAddress />} />

          {/* Forget Password */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/vareify-otp" element={<VarifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Success Page */}
          <Route path="/success" element={<Success />} />

          {/* Offline */}
          <Route path="/offline" element={<Offline />} />

          {/* Search */}
          <Route path="/search" element={<Search />} />

          {/* Kisan Portal */}
          <Route path="/kisanPortal" element={<KisanPortal />} />

            {/* Privacy Policy */}
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />

             {/* Return Policy */}
             <Route path="/ReturnAndRefundPolicy" element={<ReturnAndRefundPolicy />} />

               {/* Shipping Policy */}
               <Route path="/ShippingPolicy" element={<ShippingPolicy />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
