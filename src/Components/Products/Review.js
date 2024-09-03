import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { MdDelete, MdDeleteOutline, MdRateReview } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
import { GoDotFill } from "react-icons/go";
import {
  Backdrop,
  Box,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

const Review = (props) => {
  const Navigate = useNavigate();

  const [reviewData, setReviewData] = useState([]);

  const [star, setstar] = useState();
  const [reviewText, setReviewText] = useState();
  const [singleReviewById, setSingleReviewById] = useState();
  // const [load, setLoad] = useState(false);

  const handleRating = (newRating) => {
    setstar(newRating);
  };

  useEffect(() => {
    getAllReviews();
  }, [props.productid]);

  const [IsLogin, setIsLogin] = useState();

  useEffect(() => {
    setIsLogin(localStorage.getItem("isLogin"));
  }, []);

  const handleAddReview = async () => {
    if (IsLogin !== "Yes") {
      Navigate("/login");
    } else {
      // setLoad(true);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        cus_id: localStorage.getItem("customer_id"),
        pro_id: props.productid,
        review_text: reviewText,
        review_star: star,
        review_status: 1,
        is_enable: 1,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(process.env.REACT_APP_BASE_URL + "review", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result);
          if (result.Status === 1) {
            toast.success("Review Added Successfully", {
              theme: "light",
              autoClose: "2000",
            });
            // setLoad(false);
            GetCustomersReview();
          } else {
            // setLoad(false);
          }
        })
        .catch((error) => {
          // console.log("error", error)
        });
    }
  };

  const getAllReviews = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      customer_id: localStorage.getItem("customer_id"),
      product_id: props.productid,
    });
    // console.log(raw);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_BASE_URL + "getEnableReview",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setReviewData(result.msg);
      })
      .catch((error) => {
        // console.log("error", error)
      });
  };

  const [myReview, setMyReview] = useState();

  const GetCustomersReview = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      customer_id: localStorage.getItem("customer_id"),
      product_id: props.productid,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(process.env.REACT_APP_BASE_URL + "getByCidPid", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setMyReview(result);
      })
      .catch((error) => {
        // console.log("error", error)
      });
  };

  useEffect(() => {
    getAllReviews();
    GetCustomersReview();
  }, []);

  const deleteMyReview = async (id) => {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_BASE_URL + `DeleteReview/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.status === 1) {
          toast.success("Deleted successfully", {
            theme: "light",
            autoClose: "2000",
          });
        } else {
          toast.error("Something Went wrong", {
            theme: "light",
            autoClose: "2000",
          });
        }
      })
      .catch((error) => {
        // console.log("error", error)
      });

    await GetCustomersReview();
  };
  const [UpdatedText, setUpdatedText] = useState();
  const [UpdatedStar, setUpdatedStar] = useState();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const UpdateMyReview = (el) => {
    setOpen(true);
  };

  const handleUpdateMyReview = async (id) => {
    // setLoad(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      cus_id: localStorage.getItem("customer_id"),
      pro_id: props.productid,
      review_text: UpdatedText ? UpdatedText : myReview.data.review_text,
      review_star: UpdatedStar ? UpdatedStar : myReview.data.review_star,
      review_status: 1,
      is_enable: 1,
    });
    // console.log(raw);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_BASE_URL + `ReviewUpdate//${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.status === 1) {
          toast.success("Updated Successfully!", {
            theme: "light",
            autoClose: "2000",
          });
          setOpen(false);
          // setLoad(false);
        } else {
          toast.error("Failed to update", {
            theme: "light",
            autoClose: "2000",
          });
          // setLoad(false);
        }
      })
      .catch((error) => {
        // console.log("error", error)
      });
    await GetCustomersReview();
  };

  const handleUpdatingRating = (newRating) => {
    setUpdatedStar(newRating);
  };

  return (
    <div>
      {/* {console.warn(myReview)} */}
      {myReview === undefined || myReview.status === 500 ? (
        <>
          <div className="mb-5 font-sans text-gray-700 font-bold text-xl md:text-2xl lg:text-2xl leading-tight">
            Review This Product
          </div>
          <hr className="hidden md:block lg:block mx-5 border border-black" />
          <div className="mt-2 md:mt-5 lg:mt-5 w-full  pr-0 md:pr-10 lg:pr-10">
            <span className="ml-1 md:ml-4 lg:ml-5 font-semibold flex gap-2 items-center mt-0 md:mt-2 lg:mt-2 underline text-[#008000] text-sm md:text-md lg:text-md">
              <GoDotFill /> Give Us Star :)
            </span>
            <div className="p-5 ml-5">
              <ReactStars
                count={5}
                onChange={handleRating}
                size={24}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />
            </div>

            <hr className="" />
            <div className="p-2">
              <span className="ml-1 md:ml-4 lg:ml-5 font-semibold flex gap-2 items-center mt-2 underline text-[#008000] text-sm md:text-md lg:text-md">
                <GoDotFill /> Write about this product :)
              </span>
              <textarea
                cols="30"
                rows="3"
                className="mt-2 w-full text-xs appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500"
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-end mr-4">
              <button
                className="p-3 hover:drop-shadow-xl rounded-lg text-white transition duration-500 ease-in-out hover:bg-green-800 mb-5 hover:text-white transform hover:-translate-y-1 hover:scale-110 bg-[#008000]"
                onClick={handleAddReview}
              >
                Add Review
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="border rounded-md mr-0 md:mr-10 lg:mr-10">
          <h1 className="font-sans font-bold text-gray-700 text-2xl md:text-3xl lg:text-3xl leading-tight flex justify-between items-center">
            <span className="p-2 ml-0 md:ml-5 lg:ml-5">My Review:</span>
            <span className="flex gap-2">
              <button>
                <BiEditAlt
                  className="text-[#008000] text-md"
                  onClick={() => UpdateMyReview(myReview.data)}
                />
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <>
                    <div className="mb-5 font-sans text-gray-700 font-bold text-xl md:text-3xl lg:text-3xl leading-tight">
                      Update Your Review
                    </div>
                    <hr className="hidden md:block lg:block mx-5 border border-black" />
                    <div className="mt-2 md:mt-5 lg:mt-5 w-full  pr-0 md:pr-10 lg:pr-10">
                      <span className="ml-1 md:ml-4 lg:ml-5 font-semibold flex gap-2 items-center mt-0 md:mt-2 lg:mt-2 underline text-[#008000] text-sm md:text-md lg:text-md">
                        <GoDotFill /> Give Us Star :)
                      </span>
                      <div className="p-5 ml-5">
                        <ReactStars
                          count={5}
                          onChange={handleUpdatingRating}
                          value={myReview.data.review_star}
                          size={24}
                          isHalf={true}
                          emptyIcon={<i className="far fa-star"></i>}
                          halfIcon={<i className="fa fa-star-half-alt"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          activeColor="#ffd700"
                        />
                      </div>

                      <hr className="" />
                      <div className="p-2">
                        <span className="ml-1 md:ml-4 lg:ml-5 font-semibold flex gap-2 items-center mt-2 underline text-[#008000] text-sm md:text-md lg:text-md">
                          <GoDotFill /> Write about this product :)
                        </span>
                        <textarea
                          cols="30"
                          rows="3"
                          className="mt-2 text-xs w-full appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500"
                          onChange={(e) => setUpdatedText(e.target.value)}
                          defaultValue={myReview.data.review_text}
                        ></textarea>
                      </div>
                      <div className="flex justify-end mr-4">
                        <button
                          className="p-3 hover:drop-shadow-xl rounded-lg text-white transition duration-500 ease-in-out hover:bg-green-400 mb-5 hover:text-white transform hover:-translate-y-1 hover:scale-110 bg-[#008000]"
                          onClick={() => handleUpdateMyReview(myReview.data.id)}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </>
                </Box>
              </Modal>
              <button>
                <MdDeleteOutline
                  className="text-red-500"
                  onClick={() => deleteMyReview(myReview.data.id)}
                />
              </button>
            </span>
          </h1>
          <hr />
          <div className="container p-3 mx-auto">
            <div className="mb-2 rounded-t-8xl rounded-b-5xl overflow-hidden p-0 md:p-5 lg:p-5">
              <div className="pb-3 md:pb-1 bg-white bg-opacity-40">
                <div className="flex flex-wrap items-center">
                  <div className="flex items-center gap-4">
                    <p className="p-2 w-[45px] h-[40px] md:h-auto lg:h-auto rounded-full bg-[#008000] text-white">
                      <span className="ml-1 md:ml-2 lg:ml-2 font-bold text-xl uppercase ">
                        {myReview && myReview.name.slice(0, 1)}
                      </span>
                    </p>
                    <h4 className="w-full md:w-auto text-xl font-heading font-medium">
                      {myReview && myReview.name}
                    </h4>
                  </div>
                  <div className="w-full md:w-px h-2 md:h-8 mx-8 bg-transparent md:bg-gray-200" />
                  <span className="mr-4 text-xl font-heading font-medium">
                    {/* {myReview && myReview.data.review_star} */}
                    {myReview && myReview.data.review_star}
                  </span>
                  <div className="inline-flex">
                    <ReactStars
                      count={5}
                      value={myReview && parseInt(myReview.data.review_star)}
                      // onChange={handleRating}
                      size={24}
                      edit={false}
                      isHalf={true}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#31a031"
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 overflow-hidden bg-white">
                <div className="flex flex-wrap">
                  <div className="w-full md:w-2/3 mb-2 lg:mb-3 md:mb-0">
                    <p className="max-w-2xl text-darkBlueGray-400 leading-loose">
                      {myReview && myReview.data.review_text}
                    </p>
                  </div>
                  <div className="w-full md:w-1/3 text-right">
                    <p className="text-sm text-gray-500 mb-2">
                      {myReview && myReview.time}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      <h1 className="mb-5 font-sans font-bold text-gray-700 text-xl md:text-2xl lg:text-2xl leading-tight flex items-center mt-5 md:mt-10 lg:mt-10">
        <span className="ml-0 md:ml-5 lg:ml-5">Reviews:</span>
        <p className="inline-block text-xl ml-1 font-heading font-medium hover:text-darkBlueGray-700 font-sans">
          ({reviewData && reviewData.length} reviews)
        </p>
      </h1>
      <hr className="mx-o md:mx-5 lg:mx-5 border border-black" />
      <section className="bg-blueGray-100 rounded-t-10xl overflow-hidden mt-5">
        <div className="container p mx-auto">
          {reviewData.length > 0 ? (
            reviewData.map((el, index) => {
              return (
                <div
                  className="mb-2 rounded-t-8xl rounded-b-5xl overflow-hidden p-0 md:p-5 lg:p-5"
                  key={index + 1}
                >
                  <div className="pb-3 md:pb-1 bg-white bg-opacity-40">
                    <div className="flex flex-wrap items-center">
                      <div className="flex items-center gap-4">
                        <p className="">
                          <span className="text-[#008000]">
                            <FaUserAlt />
                          </span>
                        </p>
                        <h4 className="w-full md:w-auto text-sm font-heading font-medium capitalize">
                          {el.Customer ? el.Customer : "customer"}
                        </h4>
                      </div>
                      <div className="w-full md:w-px h-2 md:h-8 mx-8 bg-transparent md:bg-gray-200" />
                      <span className="mr-4 text-sm sm:texxt-xs  font-heading font-medium">
                        {el.review_star}
                      </span>
                      <div className="inline-flex">
                        <ReactStars
                          count={5}
                          value={parseInt(el.review_star)}
                          // onChange={handleRating}
                          size={24}
                          edit={false}
                          isHalf={true}
                          emptyIcon={<i className="far fa-star"></i>}
                          halfIcon={<i className="fa fa-star-half-alt"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          activeColor="#31a031"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 overflow-hidden bg-white">
                    <div className="flex flex-wrap">
                      <div className="w-full md:w-2/3 mb-2 lg:mb-3 md:mb-0">
                        <p className="max-w-2xl text-darkBlueGray-400 leading-loose text-xs md:text-sm lg:text-sm">
                          {el.review_text}
                        </p>
                      </div>
                      <div className="w-full md:w-1/3 text-right">
                        <p className="text-xs text-gray-500 mb-2">
                          {el.time.slice(0, 9)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })
          ) : (
            <div className="p-10 ">
              <div className="flex items-center gap-4 justify-center">
                <MdRateReview className="text-3xl" />
                <p className="capitalize font-bold text-xl">
                  No Reviews for this Product
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <ToastContainer />
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load}
      >
        <CircularProgress color="success" />
      </Backdrop> */}
    </div>
  );
};

export default Review;
