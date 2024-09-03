import React, { useEffect, useState } from "react";
import { createSearchParams, Link, useNavigate } from "react-router-dom";

const AllCatList = () => {
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
        console.log(result);
        setData(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllCategories();
  }, []);

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
    <div>
      <div className="flex flex-col gap-4 p-5">
        {data &&
          data.map((el, index) => {
            return (
              <div key={index} className="w-full cursor-pointer">
                <div onClick={() => handleGoToCategoryPage(el)}>
                  <p className="p-1 rounded-md text-sm font-bold hover:bg-[#008000] hover:text-white">
                    {el.name}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllCatList;
