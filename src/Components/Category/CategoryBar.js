import React, { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import CategorySidebarLG from "../Sidebar/CategorySidebarLG";

const CategoryBar = () => {
  let Navigate = useNavigate();

  const [data, setData] = useState([]);

  const getAllCategories = () => {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch(process.env.REACT_APP_BASE_URL + "readall/categories", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
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
    <div>
      <div className="hidden md:hidden lg:block bg-slate-200 px-3">
        <div className="flex justify-center items-center">
          <div className="flex flex-wrap gap-2 items-center justify-center p-1 text-sm text-[#008000] mt-1">
            {data &&
              data.map((el, index) => {
                return (
                  <div key={index}>
                    <div
                      className={`cursor-pointer font-semibold list-none text-center ml-2 text-xs border border-[#008000] rounded  hover:bg-[#008000] hover:text-white transition-all duration-500 ${
                        activeLink === el.name
                          ? "bg-[#008000] text-white"
                          : "bg-white text-[#008000]"
                      }`}
                      onClick={() => handleGoToCategoryPage(el)}
                    >
                      <p className="p-1">{el.name}</p>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* <div className="text-black absolute right-5">
            <CategorySidebarLG />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
