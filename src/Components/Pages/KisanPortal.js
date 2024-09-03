import React from "react";
import Layout from "../../Layout/Layout";
import PageHeader from "./PageHeader";
import { Box, CircularProgress, circularProgressClasses } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import Label from "./Form/Label";
import InputArea from "./Form/InputArea";
import { toast, ToastContainer } from "react-toastify";

const KisanPortal = () => {
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

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [Pin , setPin] = useState("");
  const [mobile, setMobile] = useState("");
  const [herbName, setHerbName] = useState("");

  // Error Hooks
  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [PinError, setPinError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [herbError, setHerbError] = useState("");

  const handleSubmit = () => {
    setNameError("");
    setAddressError("");
    setPinError("")
    setMobileError("");
    setHerbError("");
    if (name === "") {
      setNameError("please enter yourr name");
    } else if (address === "") {
      setAddressError("please enter yourr address");
    } else if (Pin === "") {
        setPinError("please enter yourr Pin");
    } else if (mobile === "") {
      setMobileError("please enter yourr mobile");
    } else if (herbName === "") {
      setHerbError("plaese enter at least 1 herb Name");
    } else {
      window.scrollTo(0, 0);
      setApiLoader(true);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        name: name,
        address: address,
        pincode:Pin,
        mobile_number: mobile,
        herbs_name: herbName,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://azamdeal.com/apk_api/azamDeals/public/index.php/api/kissan",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            toast.success("Message sent successfully", {
              theme: "light",
              autoClose: "2000",
            });
            setName("");
            setAddress("");
            setPin("");
            setMobile("");
            setHerbName("");
            setApiLoader(false);
          } else {
            toast.error("something went wrong", {
              theme: "light",
              autoClose: "2000",
            });
            setApiLoader(false);
          }
          setApiLoader(false);
        })
        .catch((error) => console.log("error", error));
    }
  };

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
            <PageHeader title="Kissan Portal" banner="url('/kisanbg.jpg')" />
            <div className="p-10">
              <div>
                <p className="text-xl text-center lg:text-3xl mb-2 font-serif font-semibold">
                  AZAMDEAL Kissan Portal{" "}
                  <span className="text-xl">(आज़मडील' किसान पोर्टल)</span>
                </p>
                <p className="font-semibold text-md md:text-xl lg:text-xl text-center">
                  'आज़मडील' किसान पोर्टल में आपका स्वागत है।
                </p>
                <p className="font-semibold text-sm md:text-md lg:text-md text-center">
                  यदि आप जड़ी बूटियां उगाने वाले किसान हैं, या जड़ी बूटियां
                  सप्लाई करते हैं, तो नीचे दिए गए फॉर्म को किसी भी भाषा में
                  भरें। हमारी ओर से आपको जल्द ही संपर्क होगा।
                </p>
              </div>
              <div className="mt-10 md:mt-16 lg:mt-20 px-2 md:px-14 gap-20 lg:px-20 flex flex-wrap justify-center items-center">
                <div>
                  <img
                    src="/kisan1.jpg"
                    alt=""
                    width={720}
                    height={820}
                    className="rounded-xl"
                  />
                </div>
                <div className="">
                  <p className="font-semibold text-gray-700 text-md">
                    Please Enter the form given below for any consultancy about
                    Herbs.
                  </p>
                  <p className="font-semibold text-gray-700 text-md">
                    कृपया किसी भी जड़ी बूटि के लिए नीचे दिया गया फॉर्म दर्ज
                    करें।
                  </p>
                  <form className="w-[350px] md:w-[500px] lg:w-[500px] space-y-4 mt-5">
                    <InputArea
                      label="Name (आपका नाम) :"
                      name="name"
                      placeholder="Enter your Name (कृपया अपना नाम लिखिए)"
                      className="w-full"
                      onChange={(e) => setName(e.target.value)}
                    />
                    {nameError && (
                      <div className="text-xs text-red-500 font-bold">
                        {nameError}
                      </div>
                    )}
                    <InputArea
                      label="Address (आपका पता) :"
                      name="name"
                      placeholder="Enter your Address (कृपया अपना पता लिखिए)"
                      className="w-full"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {addressError && (
                      <div className="text-xs text-red-500 font-bold">
                        {addressError}
                      </div>
                    )}
                     <InputArea
                      label="Pin Code (पिन कोड) :"
                      name="name"
                      placeholder="Enter your Pin code (कृपया अपना पिन कोड लिखिए)"
                      className="w-full"
                      onChange={(e) => setPin(e.target.value)}
                    />
                    {PinError && (
                      <div className="text-xs text-red-500 font-bold">
                        {PinError}
                      </div>
                    )}
                    <InputArea
                      label="Mobile No (आपका मोबाइल नंबर) :"
                      name="name"
                      placeholder="Enter your Mobile No (कृपया अपना मोबाइल नंबर लिखिए)"
                      className="w-full"
                      onChange={(e) => setMobile(e.target.value)}
                    />
                    {mobileError && (
                      <div className="text-xs text-red-500 font-bold">
                        {mobileError}
                      </div>
                    )}
                    <Label label="Herbs Name (आप कौनसी जड़ी बूटियां 'आज़मडील' को बेचना चाहते है) :" />
                    <textarea
                      name="name"
                      placeholder="Enter Herbs Name (कृपया अपना जड़ी बूटियों के नाम लिखिए)"
                      className="px-4 py-3 flex items-center w-full rounded appearance-none opacity-75 transition duration-300 ease-in-out text-sm focus:ring-0 bg-white border border-gray-300 focus:shadow-none focus:outline-none focus:border-gray-500 placeholder-body"
                      rows={3}
                      spellCheck="false"
                      autoComplete="off"
                      onChange={(e) => setHerbName(e.target.value)}
                    ></textarea>
                    {herbError && (
                      <div className="text-xs text-red-500 font-bold">
                        {herbError}
                      </div>
                    )}
                  </form>
                </div>
              </div>
              <div className="flex justify-center p-10">
                <button
                  data-variant="flat"
                  className="md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-base w-full sm:w-auto"
                  onClick={handleSubmit}
                >
                  Send Message
                </button>
              </div>
            </div>
          </>
        )}
      </Layout>
      <ToastContainer />
    </div>
  );
};

export default KisanPortal;
