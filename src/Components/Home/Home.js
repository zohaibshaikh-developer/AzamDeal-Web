import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import Banner from "../Banner/Banner";
import Carousal from "../Carousal/Carousal";
import CategoryBar from "../Category/CategoryBar";
import ProductCard from "../Products/ProductCard";
import Testimonials from "../Testimonial/Testimonials";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    getTotalCartItems();
  }, []);

  const [productList, setProductList] = useState([]);
  const [cardSkeleton, setCardSkeleton] = useState(true);

  const [CartItem, setCartItem] = useState();

  const getTotalCartItems = async() => {
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
        setCartItem(result.data);
      })
      .catch(
        (error) => {}
        // console.log("error", error)
      );
  };

  // const getAllProducts = () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   var raw = JSON.stringify({
  //     col_name: "product_name",
  //     order: "ASC",
  //     limit: "20",
  //   });

  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch(process.env.REACT_APP_BASE_URL + "getAllProducts", requestOptions)
  //     .then((response) => response.json())
  //   .then((result) => {
  //     // console.log(result);
  //     setProductList(result.data);
  //     setCardSkeleton(false);
  //   })
  //   .catch((error) => console.log("error", error));
  // setCardSkeleton(false);
  // };

  const getAllProducts = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://azamdeal.com/apk_api/azamDeals/public/index.php/api/getAllProducts", requestOptions)
      .then(response => response.json())
      .then((result) => {
        // console.log(result);
        setProductList(result.data);
        setCardSkeleton(false);
      })
      .catch((error) => console.log("error", error));
    setCardSkeleton(false);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const numCards = 20;

  return (
    <div id="scroll-top">
      <Layout CartItem={CartItem}>
        <>
          {/* <CategoryBar /> */}
          <div className="">
            <div className="bg-white">
              <div className="mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
                <div className="flex w-full">
                  <div className="flex-shrink-0 xl:pr-6 lg:block w-full">
                    <Carousal />
                  </div>
                </div>
                <div className="bg-green-200 px-10 py-6 rounded-lg mt-6 hidden lg:block">
                  <Banner />
                </div>
              </div>
            </div>
          </div>
          {/* Head Section */}

          {/* Products */}
          <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
            <div className="mb-10 flex justify-center">
              <div className="text-center w-full lg:w-2/5">
                <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                  Select Best Quality Herbs Picked from Jungles for your needs..
                </h2>
                <p className="text-base font-sans text-gray-600 leading-6">
                  See the large variety of Pure and Authentic herbs. No artificial colors or flavor & No use of chemicals in cleaning.
                </p>
                {/* <p className="text-xl lg:text-4xl mb-2 font-serif font-semibold mt-5">
                  Categories
                </p> */}

              </div>
            </div>
            <div className="flex">
              <div className="w-full">
                <div >
                  {cardSkeleton && (
                    <>
                      {[...Array(numCards)].map((_, index) => (
                        <div
                          className="group box-border overflow-hidden rounded-md shadow-sm bg-white relative border"
                          key={index}
                        >
                          <div className="p-3">
                            <Skeleton
                              sx={{ height: 190 }}
                              animation="wave"
                              variant="rectangular"
                              className="rounded-md"
                            />
                            <Skeleton
                              animation="wave"
                              height={15}
                              width="100%"
                              style={{ marginTop: 6 }}
                            />
                            <div className="flex items-center gap-5">
                              <Skeleton
                                animation="wave"
                                height={15}
                                width="30%"
                                style={{ marginTop: 6 }}
                              />
                              <Skeleton
                                animation="wave"
                                height={15}
                                width="30%"
                                style={{ marginTop: 6 }}
                              />
                            </div>
                            <div className="flex justify-between">
                              <Skeleton
                                animation="wave"
                                height={15}
                                width="30%"
                                style={{ marginTop: 8, marginBottom: 6 }}
                              />
                              <Skeleton
                                animation="wave"
                                width="12%"
                                height={50}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  <ProductCard
                    productList={productList}
                  />
                </div>
              </div>
            </div>
            {/* <div className="bg-white mt-20">
              <Testimonials />
            </div> */}
          </div>
        </>
      </Layout>
    </div>
  );
};

export default Home;
