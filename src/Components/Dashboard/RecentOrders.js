import { Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import Dashboard from "./Dashboard";

const RecentOrders = (props) => {
  const [getData, setGetData] = useState([]);
  const [load, setLoad] = useState(true);

  const GetOrderHistory = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_BASE_URL +
        `DetailByCustomerId/${localStorage.getItem("customer_id")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setGetData(result.data);
        if (result.status === 200) {
          setLoad(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    GetOrderHistory();
  }, []);

  return (
    <>
      <Dashboard title="Your-Orders" description="This is edit order's page">
        {load ? (
          <div className="h-screen bg-white"></div>
        ) : (
          <>
            <div id={props.id} />
            <h2 className="text-xl font-serif font-semibold mb-5">
              Recent Orders
            </h2>

            {getData
              ? getData.map((el, index) => {
                  return (
                    <div
                      className="bg-white border-b border-gray-400 mt-2"
                      key={index}
                    >
                      <div className="flex">
                        <div className="m-1 border">
                          {/* {el.item_price} */}
                          <img
                            src={
                              process.env.REACT_APP_MEDIA_BASE_URL +
                              el.products.product_base_image
                            }
                            alt=""
                            className="w-32 h-36 rounded-md"
                          />
                        </div>
                        <div className="ml-2 w-2/3">
                          <span className="font-bold text-lg text-gray-700">
                            {el.products.product_name}
                          </span>
                          <p className={`font-medium text-md text-gray-700`}>
                            <span className="font-bold">Order ID:</span>
                            {el.order_id}
                          </p>
                          <div className="font-bold">
                            Price:
                            <span className="ml-1 font-medium text-emerald-500">
                              {"₹" + el.item_price}
                            </span>
                          </div>
                          <div className="font-bold">
                            Ordered Quantity:
                            <span
                              className={`font-medium text-md text-gray-700 ml-1`}
                            >
                              {el.item_qty + " psc."}
                            </span>
                          </div>
                          <div className="font-bold">
                            Total Price:
                            <span
                              className={`font-medium text-md text-emerald-500 ml-1`}
                            >
                              {"₹" + el.total_items_price}
                            </span>
                          </div>
                          <div className="cursor-pointer flex items-end font-medium underline text-md text-emerald-500">
                            <span>View Order Details</span>
                            <BsArrowRight className="ml-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : "No Order"}
          </>
        )}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={load}
        >
          <CircularProgress color="success" />
        </Backdrop>
      </Dashboard>
    </>
  );
};

export default RecentOrders;
