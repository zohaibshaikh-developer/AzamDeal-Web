import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { BeatLoader, ScaleLoader } from "react-spinners";

const OrderSummaryCartItem = (props) => {
  const [cartItem, setCartItem] = useState();
  const [spinner, setSpinner] = useState(true);

  const [subTotal, setSubTotal] = useState();

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
        console.log(result);
        if (result.status === 200) {
          setSpinner(false);
        }
        setCartItem(result.data);
      })
      .catch((error) => console.log("error", error));
  };
  const totalPrice =
    cartItem &&
    cartItem.reduce((accumulator, el) => {
      return accumulator + parseInt(el.total_price);
    }, 0);

  useEffect(() => {
    setSubTotal(totalPrice);
  }, [GetAllCartItems]);

  useEffect(() => {
    GetAllCartItems();
  }, []);

  // Coupon Integration

  // Shipping Cost
  const [shippingCost, setShippingCost] = useState(40);

  // Validate Coupon
  const [coupon, setCoupon] = useState();
  const [couponDetails, setCouponDetails] = useState();

  // Alert
  const [alert, setAlert] = useState(false);

  // Message
  const [message, setMessage] = useState();
  const [searchCoupon, setSearchCoupon] = useState(false);

  const ValidateCoupon = async (e) => {
    e.preventDefault();
    setSearchCoupon(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      coupon_code: coupon,
      customer_id: localStorage.getItem("customer_id"),
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_BASE_URL + "validateCoupon",
      requestOptions
    )
      .then((response) => response.json())
      .then(async (result) => {
        console.log(result);
        setMessage(result.msg);
        if (result.status === 200) {
          //  await props.getAll(result.data);
          localStorage.setItem("CouponID", result.data.id);
          localStorage.setItem("CouponAmount", result.data.coupon_value);
          setAlert(true);
          setSearchCoupon(false);
        } else if (result.status === 404) {
          setAlert(true);
          setSearchCoupon(false);
        }
        setCouponDetails(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  setTimeout(() => {
    setAlert(false);
  }, 5000);

  return (
    <>
      <div className="md:w-full lg:w-2/5 lg:ml-10 xl:ml-14 md:ml-6 flex flex-col h-full md:sticky lg:sticky top-28 md:order-2 lg:order-2">
        <div className="border p-5 lg:px-8 lg:py-8 rounded-lg bg-white order-1 sm:order-2">
          <h2 className="font-semibold font-serif text-lg pb-4">
            Order Summary
          </h2>
          <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-64 bg-gray-50 block">
            {spinner && (
              <div className="max-h-64 flex justify-center">
                <ScaleLoader color="#36d7b7" className="mt-20 mb-20" />
              </div>
            )}
            {cartItem &&
              cartItem.map((el, index) => {
                return (
                  <div
                    className="group w-full h-auto flex justify-start items-center bg-white py-3 px-4 border-b hover:bg-gray-50 transition-all border-gray-100 relative last:border-b-0"
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
                          className="truncate text-sm font-medium text-gray-700 text-heading line-clamp-1"
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
                            ₹{el.item_price}.00
                          </span>
                        </div>

                        <button
                          // onClick={() => removeItem(item.id)}
                          className="hover:text-red-600 text-red-400 text-lg cursor-pointer"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="flex items-center mt-4 py-4 lg:py-4 text-sm w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
            <form className="w-full">
              {alert && (
                <span
                  className={`transition ease-in-out duration-300 px-4 py-3 leading-tight w-full rounded-t-md flex justify-between ${
                    message === "Coupon Not Available"
                      ? "bg-red-50"
                      : "bg-emerald-50 "
                  }`}
                >
                  <p
                    className={` ${
                      message === "Minimum Amount Required"
                        ? "text-red-500"
                        : "text-emerald-600 "
                    }`}
                  >
                    {message}
                  </p>
                  <span className="text-red-500 text-right">
                    {message === "Coupon Not Available"
                      ? ""
                      : couponDetails && "- ₹" + couponDetails.coupon_value}
                  </span>
                </span>
              )}
              <div className="flex flex-col sm:flex-row items-start justify-end">
                <input
                  type="text"
                  placeholder="Input your coupon code"
                  onChange={(e) => setCoupon(e.target.value)}
                  className="form-input py-2 px-3 md:px-4 w-full appearance-none transition ease-in-out border text-input text-sm rounded-md h-12 duration-200 bg-white border-gray-200 focus:ring-0 focus:outline-none focus:border-emerald-500 placeholder-gray-500 placeholder-opacity-75"
                />
                <button
                  onClick={ValidateCoupon}
                  className="md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border border-gray-200 rounded-md placeholder-white focus-visible:outline-none focus:outline-none px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 mt-3 sm:mt-0 sm:ml-3 md:mt-0 md:ml-3 lg:mt-0 lg:ml-3 hover:text-white hover:bg-emerald-500 h-12 text-sm lg:text-base w-full sm:w-auto"
                >
                  Apply
                  {searchCoupon && (
                    <span className="ml-2">
                      <BeatLoader color="#fff" size={7} />
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
            Subtotal
            <span className="ml-auto flex-shrink-0 text-gray-500 font-bold">
              {"₹" + subTotal}
            </span>
          </div>
          <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
            Shipping Cost
            <span className="ml-auto flex-shrink-0 text-grey-700 font-bold">
              {"₹" + shippingCost}
            </span>
          </div>
          <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
            Discount
            <span className="ml-auto flex-shrink-0 font-bold text-red-500">
              {couponDetails ? (
                "- ₹" + couponDetails.coupon_value
              ) : (
                <span>Not Applied</span>
              )}
            </span>
          </div>
          <div className="border-t mt-4">
            <div className="flex items-center font-bold font-sans justify-between pt-5 text-sm uppercase text-emerald-600">
              Total cost
              <span className="font-sans font-bold text-lg">
                ₹
                {couponDetails
                  ? subTotal + shippingCost - couponDetails.coupon_value
                  : subTotal + shippingCost}
                /-
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummaryCartItem;
