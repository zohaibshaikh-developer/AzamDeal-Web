import React, { useEffect, useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { IoMdArrowDropright } from "react-icons/io";
import "./Sidebar.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import { createSearchParams, useNavigate } from "react-router-dom";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Sidebar = () => {
  let Navigate = useNavigate();

  const [getVar, setGetVar] = useState([]);

  useEffect(() => {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch(
      process.env.REACT_APP_BASE_URL + "readall/categories",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setGetVar(result.data);
        if (result.status === 200) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  let [loading, setLoading] = useState(true);

  const handleGoToCategoryPage = (el) => {
    Navigate({
      pathname: "/category-page", 
      search: createSearchParams({
        id: el.id,
        name: el.name,
      }).toString(),
    });
  };

  return (
    <div className="body">
      {/* {console.log(getVar)} */}
      <div>
        <div className="text-lg text-black p-5">
          <div className="flex items-center justify-between font-extrabold font-sans text-start text-2xl  pb-3 text-emerald-500">
            <p className="">Azam Deal</p>
            <button className="text-gray-500">
              <GiCancel />
            </button>
          </div>
          <hr className="border border-gray-500" />
          <div>
            <h1 className="flex items-center font-extrabold text-xl text-gray-500 mt-1 p-1">
              <BiCategoryAlt />
              <span className="ml-2 p-2">Categories</span>
            </h1>
            {/* <hr /> */}
            {getVar &&
              getVar.map((el, index) => {
                return (
                  <div key={index}>
                    <div
                      className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                      onClick={() => handleGoToCategoryPage(el)}
                    >
                      <div>
                        <li className="font-semibold text-sm text-black list-disc hover:text-[#008000]">
                          {el.name}
                        </li>
                      </div>
                      <div>
                        <IoMdArrowDropright />
                      </div>
                    </div>
                    {/* <hr /> */}
                  </div>
                );
              })}

            <div className="flex justify-center p-5 mt-20">
              <ScaleLoader
                color="#008000"
                loading={loading}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
