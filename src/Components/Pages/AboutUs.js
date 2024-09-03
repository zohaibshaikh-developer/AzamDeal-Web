import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GiCancel } from "react-icons/gi";
import Layout from "../../Layout/Layout";
import PageHeader from "./PageHeader";
import { CircularProgress, circularProgressClasses } from "@mui/material";

const AboutUs = () => {
  const [open, setOpen] = useState(false);
  const Images = ["/certificate.jpg", "/certificate2.jpg", "/certificate3.jpg"];
  const [certificate, setCertificate] = useState(Images[0]);

  const [apiLoader, setApiLoader] = useState(true);
  function FacebookCircularProgress(props) {
    return (
      <Box sx={{ position: "relative" }}>
        <CircularProgress
          variant="determinate"
          sx={{
            color: (theme) =>
              theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
          }}
          size={40}
          thickness={4}
          {...props}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          sx={{
            color: (theme) =>
              theme.palette.mode === "light" ? "#008000" : "#008000",
            animationDuration: "550ms",
            position: "absolute",
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
            },
          }}
          size={40}
          thickness={4}
          {...props}
        />
      </Box>
    );
  }

  useEffect(() => {
    setTimeout(() => {
      setApiLoader(false);
    }, 2000);
  }, []);
  return (
    <div>
      <Layout title="About Us" description="This is about us page">
        {apiLoader && (
          <div className="h-screen bg-white">
            <Box sx={{ flexGrow: 1 }} className="absolute top-[50%] left-[50%]">
              <FacebookCircularProgress />
            </Box>
          </div>
        )}
        {apiLoader === true ? (
          <div className="h-screen bg-white" />
        ) : (
          <>
            <PageHeader title="About Us" banner="url('/about-us.jpg')" />
            <div className="bg-white">
              <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-4 sm:px-10">
                <div className="grid grid-flow-row lg:grid-cols-2 gap-4 lg:gap-16 items-center">
                  <div className="">
                    <h3 className="text-xl lg:text-3xl mb-2 font-serif font-semibold">
                      From Traditional 'Hikmat' to Online supply of Precious
                      Herbs..
                    </h3>
                    <div className="mt-3 text-base opacity-90 leading-7">
                      <p>
                        AZAMDEAL is an startup incubated in AZAM Campus Pune.
                        It's part of University of Pune's Start-up promotion
                        cell.
                      </p>
                      <p>
                        The sole purpose of AZAMDEAL is to provide precious
                        herbs to everyone. We collect these herbs from the top
                        of mountains of Kashmir to the Under-waters of
                        Kanyakumari..
                      </p>
                      <p>
                        Our identity is Our best quality and Unprocessed herbs
                        which can be verified everywhere.
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-2 xl:gap-6 mt-8">
                      <div className="p-8 bg-indigo-50 shadow-sm rounded-lg">
                        <span className="text-3xl block font-extrabold font-serif mb-4 text-gray-800">
                          4K
                        </span>
                        <h4 className="text-lg font-serif font-bold mb-1">
                          Listed Products
                        </h4>
                        <p className="mb-0 opacity-90 leading-7">
                          Our identity is Our best quality and Unprocessed herbs
                          which can be verified everywhere.
                        </p>
                      </div>
                      <div className="p-8 bg-indigo-50 shadow-sm rounded-lg">
                        <span className="text-3xl block font-extrabold font-serif mb-4 text-gray-800">
                          2K
                        </span>
                        <h4 className="text-lg font-serif font-bold mb-1">
                          Lovely Customer
                        </h4>
                        <p className="mb-0 opacity-90 leading-7">
                          Competently productize virtual models without
                          performance.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 lg:mt-0">
                    <img
                      width={920}
                      height={820}
                      src="/aboutbg.jpg"
                      alt="logo"
                      className="rounded-xl"
                    />
                  </div>
                </div>
                <div className="mt-10 lg:mt-16 text-base opacity-90 leading-7">
                  <h3 className="text-xl lg:text-3xl mb-2 font-serif font-semibold">
                    AZAMDEAL's Recognization.
                  </h3>
                </div>
                <div className="mt-10 lg:mt-12 grid grid-cols-1 md:flex md:flex-wrap md:justify-center items-center lg:flex lg:flex-wrap lg:justify-center gap-14">
                  {Images.map((el, index) => {
                    return (
                      <div
                        className="cursor-pointer"
                        key={index}
                        onClick={() => {
                          setCertificate(el);
                          setOpen(true);
                        }}
                      >
                        <img
                          src={el}
                          alt=""
                          className="w-full md:w-[300px] lg:w-[400px] rounded-lg border border-gray-700"
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="mt-10">
                  <div>
                    <li>
                      <a
                        href="https://m.timesofindia.com/entertainment/events/pune/innovative-project-by-management-students/amp_articleshow/74946024.cms"
                        className="font-semibold text-[#008000] hover:underline"
                      >
                        Azamdeal covered in Times of India
                      </a>
                    </li>
                  </div>
                  <hr className="border border-gray-700 px-40 mt-10" />
                  <div className="flex flex-wrap md:justify-center lg:justify-center items-center gap-60 mt-20">
                    <div className="flex flex-col gap-10">
                      <li className="font-semibold">
                        Azamdeal covered in Maharashtra Times news paper
                      </li>
                      <div className="flex justify-center">
                        <img src="/mahTimes.jpg" alt="" className="" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-10">
                      <li className="font-semibold">
                        Azamdeal covered in Lokmat News paper
                      </li>
                      <div className="flex justify-center">
                        <img src="/lokmat.jpg" alt="" className="w-80" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             
            </div>
          </>
        )}
      </Layout>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          className="absolute bg-white rounded-xl p-4 shadow-2xl w-[500px] h-[400px] lg:w-[1200px] md:w-[800px] md:h-[600px] lg:h-[600px] border-none"
        >
          <div
            className="absolute right-5 top-5 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <GiCancel size={30} />
          </div>
          <div className="flex justify-center">
            <img
              src={certificate}
              alt=""
              className="w-full md:w-[800px] lg:w-[750px] border-2 border-gray-700 rounded-xl"
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AboutUs;
