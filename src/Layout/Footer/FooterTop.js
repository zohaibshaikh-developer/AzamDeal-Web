import React from "react";
import { Link } from "react-router-dom";

const FooterTop = () => {
  return (
    <div>
      <div
        id="downloadApp"
        className="bg-indigo-50 py-10 lg:py-5 bg-repeat bg-center overflow-hidden"
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2 md:gap-3 lg:gap-3 items-center">
            <div className="flex-grow hidden lg:flex md:flex md:justify-items-center lg:justify-start">
              <img
                src="/footerRight.png"
                alt="app download"
                width={600}
                height={450}
                className="block w-auto"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold font-serif mb-3">
              Get the most Authentic Herbs From AZAMDEAL Store              
              </h3>
              <p className="text-base opacity-90 leading-7">
              AZAMDEAL follows a natural Indian process of drying herbs under sunlight.
              </p>
              <div className="mt-8 flex justify-center">
                <Link to="/banner1.avif">
                  <p className="mx-2 mt-6" target="_blank" rel="noreferrer">
                    <img
                      width={170}
                      height={50}
                      className="mr-2 rounded"
                      src="/app/app-store.svg"
                      alt="app store"
                    />
                  </p>
                </Link>
                <Link to="/banner3.avif" className="ml-2">
                  <p target="_blank" rel="noreferrer">
                    <img
                      width={170}
                      height={50}
                      className="rounded mt-6"
                      src="/app/play-store.svg"
                      alt="app store"
                    />
                  </p>
                </Link>
              </div>
            </div>
            <div className="md:hidden lg:block">
              <div className="flex-grow hidden lg:flex md:flex lg:justify-end">
                <img
                  src="/footerLeft.png"
                  width={500}
                  height={394}
                  alt="app download"
                  className="block w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
