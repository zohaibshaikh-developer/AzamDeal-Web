import React from "react";
import { GoDotFill } from "react-icons/go";

const ProductSideCard = (props) => {
  let data = props.bulletPoints;
  return (
    <div>
      {/* {console.log(data)} */}
      {data.length > 0
        ? data.map((el, index) => {
            return (
              <ul className="my-0" key={index}>
                <li className="flex items-center py-3">
                  <span className="text-xl text-gray-400 items-start mr-4">
                    {/* <GoDotFill /> */}
                  </span>
                  <p className="font-sans leading-5 text-sm text-gray-500">
                    {el}
                  </p>
                </li>
              </ul>
            );
          })
        : false}
    </div>
  );
};

export default ProductSideCard;
