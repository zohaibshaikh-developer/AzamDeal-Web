import React, { useEffect, useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavbarTop = () => {
  let Navigate = useNavigate();
  const [isLogin, setisLogin] = useState();
  useEffect(() => {
    setisLogin(localStorage.getItem("isLogin"));
  }, [isLogin]);
  const handleLogout = () => {
    Navigate("/login");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("Token");
    localStorage.removeItem("customer_id");
  };

  return (
    <div>
      <div className="hidden lg:block bg-gray-100">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
          <div className="text-gray-700 py-2 font-sans text-xs font-medium border-b flex justify-between items-center">
            <span className="flex items-center">
              <FiPhoneCall className="mr-2" />
              {/* We are available 24/7, Need help? Call Us:{" "} */}
              For enquiry, Contact at {" "}   
              <a
                href="tel:+9922997390"
                className="font-bold text-[#008000] ml-1"
              >
                +9922997390
              </a>
               <p className="mr-1 ml-1">/</p>  
               <a href="mailto:info@azamdeal.com">
                info@azamdeal.com 
                </a>
            </span>

            <div className="lg:text-right flex items-center cursor-pointer">
              <Link to="/kisanPortal">
                <div className="font-medium hover:text-[#008000]">
                  Kissan Portal
                </div>
              </Link>
              <span className="mx-2">|</span>
              <Link to="/about-us">
                <div className="font-medium hover:text-[#008000]">About Us</div>
              </Link>
              <span className="mx-2">|</span>
              <Link to="/contact-us">
                <p
                  className="font-medium hover:text-[#008000]"
                  //   onClick={handleLoader}
                >
                  Contact Us
                </p>
              </Link>
              <span className="mx-2">|</span>
              <button
                onClick={() => Navigate("/dashboard")}
                className="font-medium hover:text-[#008000]"
              >
                My account
              </button>
              {/* <span className="mx-2">|</span>
              {isLogin === "Yes" ? (
                <Link
                  to="/login"
                  className="flex items-center font-medium hover:text-[#008000]"
                >
                  <span className="mr-1">
                    <BiLogOut />
                  </span>
                  <p onClick={handleLogout}>LogOut</p>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center font-medium hover:text-emerald-600"
                >
                  <span className="mr-1">
                    <FiUser />
                  </span>
                  <p>Login</p>
                </Link>
              )} */}
            </div>
          </div>
        </div>
      </div>
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal
        // open={showModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle} className="rounded-md border border-emerald-500">
          <div className="flex items-center text-2xl font-bold mb-8 ">
            <BiLogOut />
            <p className="ml-2">Logout</p>
          </div>
          <Typography className="mb-10 mt-2 font-semibold flex items-center">
            <AiFillInfoCircle />
            <p className="ml-2">Are You Sure You Want To Logout?</p>
          </Typography>

          <hr className="border border-gray-200" />
          <div className="flex justify-end mt-5">
            <button
              className="p-[5px] bg-emerald-500 rounded-md text-white mx-2"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className="p-[5px] bg-red-500 rounded-md text-white px-3"
              onClick={handleLogout}
            >
              OK!
            </button>
          </div>
        </Box>
      </Modal> */}
    </div>
  );
};

export default NavbarTop;
