import React from "react";

const PageHeader = ({ title, banner }) => {
  return (
    <div>
      <div
        className="flex justify-center py-10 lg:py-28 bg-indigo-100 w-full bg-cover bg-no-repeat bg-bottom bg-page-header"
        style={{
          backgroundImage: banner,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="flex mx-auto w-full max-w-screen-2xl px-3 sm:px-10">
          <div className="w-full flex justify-center flex-col relative">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold font-serif text-center p-1 bg-white opacity-70">
              {title}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
