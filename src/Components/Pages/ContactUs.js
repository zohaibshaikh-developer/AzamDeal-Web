import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Layout/Layout";
import PageHeader from "../Pages/PageHeader";
import InputArea from "./Form/InputArea";
import Label from "./Form/Label";
import { FiMail, FiMapPin, FiPhoneCall } from "react-icons/fi";
import { Box, CircularProgress, circularProgressClasses } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

const ContactUs = () => {
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Error Hooks
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactError, setContactError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [messageError, setMessageError] = useState("");

  const handleSubmit = (e) => {
    setNameError("");
    setEmailError("");
    setContactError("");
    setSubjectError("");
    setMessageError("");
    e.preventDefault();
    if (name === "") {
      setNameError("please enter your name");
    } else if (email === "") {
      setEmailError("please enter your email");
    } else if (contact === "") {
      setContactError("please enter your Mobile Number");
    } else if (subject === "") {
      setSubjectError("please write your subject");
    } else if (message === "") {
      setMessageError("please write your query");
    } else {
      setApiLoader(true);
      window.scrollTo(0, 0);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        name: name,
        email: email,
        contact: contact,
        subject: subject,
        message: message,
      });
      console.log(raw);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://azamdeal.com/apk_api/azamDeals/public/index.php/api/contact_us",
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
            setEmail("");
            setContact("");
            setSubject("");
            setMessage("");
            setApiLoader(false);
          } else {
            toast.error("something went wrong", {
              theme: "light",
              autoClose: "2000",
            });
            setApiLoader(false);
          }
        })
        .catch((error) => console.log("error", error));
      setApiLoader(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setApiLoader(false);
    }, 2000);
  }, []);

  return (
    <div>
      <Layout title="Contact Us" description="This is contact us page">
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
            <PageHeader title="Contact Us" banner="url('/contactUs.jpg')" />
            <div className="bg-white">
              <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-4 sm:px-10">
                {/* contact promo */}
                <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8 font-serif">
                  <div className="border p-10 rounded-lg text-center">
                    <span className="flex justify-center text-4xl text-emerald-500 mb-4">
                      <FiMail />
                    </span>
                    <h5 className="text-xl mb-2 font-bold">Email Us</h5>
                    <p className=" text-base opacity-90 leading-7">
                      <Link to="/" className="text-emerald-500">
                        info@azamdeal.com
                      </Link>{" "}
                      Enteractively grow empowered for process-centric total
                      linkage.
                    </p>
                  </div>
                  <div className="border p-10 rounded-lg text-center">
                    <span className="flex justify-center text-4xl text-emerald-500 mb-4">
                      <FiPhoneCall />
                    </span>
                    <h5 className="text-xl mb-2 font-bold">Call Us</h5>
                    <p className=" text-base opacity-90 leading-7">
                      <Link to="/" className="text-emerald-500">
                        +91 9922997390
                      </Link>{" "}
                      Distinctively disseminate focused solutions
                      clicks-and-mortar ministate.
                    </p>
                  </div>
                  <div className="border p-10 rounded-lg text-center">
                    <span className="flex justify-center text-4xl text-emerald-500 mb-4">
                      <FiMapPin />
                    </span>
                    <h5 className="text-xl mb-2 font-bold">Location</h5>
                    <p className=" text-base opacity-90 leading-7">
                      <Link to="/" className="text-emerald-500"></Link>{" "}
                      Ranipark, Jalgaon Jamod, 443402 Maharashtra , India
                    </p>
                  </div>
                </div>

                {/* contact form */}
                <div className="px-0 pt-24 mx-auto items-center flex flex-col md:flex-row w-full justify-between">
                  <div className="hidden md:w-full lg:w-5/12 lg:flex flex-col h-full">
                    <img
                      width={874}
                      height={874}
                      src="/contact-us.png"
                      alt="logo"
                      className="block w-auto"
                    />
                  </div>
                  <div className="px-0 pb-2 lg:w-5/12 flex flex-col md:flex-row">
                    <form
                      onSubmit={() => {}}
                      className="w-full mx-auto flex flex-col justify-center"
                    >
                      <div className="mb-12">
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold font-serif mb-3">
                          For any suppoort just send your query
                        </h3>
                        <p className="text-base opacity-90 leading-7">
                          Collaboratively promote client-focused convergence
                          vis-a-vis customer directed alignments via plagiarize
                          strategic users and standardized infrastructures.
                        </p>
                      </div>

                      <div className="flex flex-col space-y-5">
                        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0">
                          <div className="w-full md:w-1/2 ">
                            <InputArea
                              label="Your Name"
                              name="name"
                              type="text"
                              placeholder="Enter Your Name"
                              onChange={(e) => setName(e.target.value)}
                            />
                            {nameError && (
                              <div className="text-xs text-red-500 font-bold">
                                {nameError}
                              </div>
                            )}
                          </div>
                          <div className="w-full md:w-1/2 md:ml-2.5 lg:ml-5 mt-2 md:mt-0">
                            <InputArea
                              label="Your Email"
                              name="email"
                              type="email"
                              placeholder="Enter Your Email"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            {emailError && (
                              <div className="text-xs text-red-500 font-bold">
                                {emailError}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="relative">
                          <InputArea
                            label="Mobile Number"
                            name="mobileNumber"
                            type="text"
                            placeholder="Enter Your Mobile Number"
                            onChange={(e) => setContact(e.target.value)}
                          />
                        </div>
                        {contactError && (
                          <div className="text-xs text-red-500 font-bold">
                            {contactError}
                          </div>
                        )}
                        <div className="relative">
                          <InputArea
                            label="Subject"
                            name="subject"
                            type="text"
                            placeholder="Enter Your Subject"
                            onChange={(e) => setSubject(e.target.value)}
                          />
                          {subjectError && (
                            <div className="text-xs text-red-500 font-bold">
                              {subjectError}
                            </div>
                          )}
                        </div>
                        <div className="relative mb-4">
                          <Label label="Message" />
                          <textarea
                            name="message"
                            className="px-4 py-3 flex items-center w-full rounded appearance-none opacity-75 transition duration-300 ease-in-out text-sm focus:ring-0 bg-white border border-gray-300 focus:shadow-none focus:outline-none focus:border-gray-500 placeholder-body"
                            autoComplete="off"
                            spellCheck="false"
                            rows="4"
                            placeholder="Write your message here"
                            onChange={(e) => setMessage(e.target.value)}
                          ></textarea>
                          {messageError && (
                            <div className="text-xs text-red-500 font-bold">
                              {messageError}
                            </div>
                          )}
                        </div>
                        <div className="relative">
                          <button
                            data-variant="flat"
                            className="md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-base w-full sm:w-auto"
                            onClick={handleSubmit}
                          >
                            Send Message
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div>
                  <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-2 xl:gap-6 mt-8">
                    <div className="p-8 bg-indigo-50 shadow-sm rounded-lg">
                      <span className="list-disc text-xl block font-extrabold font-serif mb-1 text-gray-800 capitalize">
                        Azamdeal HO:
                      </span>
                      <hr className="border-[0.5px] border-gray-700" />
                      <p className="mt-4">
                        <span className="font-bold">AZAMDEAL,</span> Ranipark,
                        Jalgaon Jamod, District Buldhana,
                      </p>
                      <p>Maharashtra, India PIN: 443402, Contact: +91 9922997390</p>
                      <span className="list-disc text-xl mt-4 block font-extrabold font-serif mb-1 text-gray-800 capitalize">
                        Azamdeal Warehouses:
                      </span>
                      <hr className="border-[0.5px] border-gray-700" />
                      <p className="mt-4">
                        1) <span className="font-bold">AZAMDEAL,</span> BGR
                        Complex, Mumbai Nashik Road, Next to Shiv Sagar Hotel,
                      </p>
                      <p>Bhiwandi, Thane, Maharashtra, PIN: 421302, Contact: +91 9922997390</p>
                      <p className="">
                        2) <span className="font-bold">AZAMDEAL,</span> Building
                        H. Prathmesh Complex, Saravalli Village, Opp. Hotel
                        Vatika, Kalyan-Bhiwandi Junction,
                      </p>
                      <p>Taluka Bhiwandi, Thane Maharashtra PIN: 421302, Contact: +91 9922997390</p>
                    </div>
                    <div className="p-8 bg-indigo-50 shadow-sm rounded-lg">
                      <li className="text-xl block font-extrabold font-serif mb-1 text-gray-800 capitalize">
                        Product Outlets:
                      </li>
                      <hr className="border-[0.5px] border-gray-700" />
                      <p className="mt-4">
                        1) <span className="font-bold">AZAMDEAL,</span> Weekly
                        Market Road, Nawab Pura, Nandura,
                      </p>
                      <p>District Buldhana, Maharashtra, PIN: 443404, Contact: +91 9922997390</p>
                      <p className="">
                        2) <span className="font-bold">AZAMDEAL,</span> Akola
                        Road, Akoli Base, Barshi Takli,
                      </p>
                      <p>District Akola, Maharashtra, PIN: 444004, Contact: +91 9922997390</p>
                      <p className="">
                        3) <span className="font-bold">AZAMDEAL,</span> First
                        Floor, C wing Kul Utsav, Khadi Machine Chowk,
                      </p>
                      <p>Undri road, Kondhwa, Pune. PIN: 411048, Contact: +91 9922997390</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Layout>
      <ToastContainer />
    </div>
  );
};

export default ContactUs;
