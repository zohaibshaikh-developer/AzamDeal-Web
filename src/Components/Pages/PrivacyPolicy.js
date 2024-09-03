import React from "react";
import Layout from "../../Layout/Layout";
import PageHeader from "./PageHeader";
import { Box, CircularProgress, circularProgressClasses } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import Label from "./Form/Label";
import InputArea from "./Form/InputArea";
import { toast, ToastContainer } from "react-toastify";

const PrivacyPolicy = () => {
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
            <PageHeader title="Privacy Policy" />
            <div className="p-10">
              <div style={{marginBottom: '2%'}}>
              <p style={{fontWeight: 'bold', fontSize: '29px', fontFamily: 'serif', marginBottom: '0.5%'}}>Privacy Policy for AzamDeal</p>
              <span style={{fontWeight: 'bold', fontSize: '20px'}}>At AzamDeal, accessible from <a href="https://azamdeal.com/">https://azamdeal.com/</a>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by AzamDeal and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us. This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in AzamDeal. This policy is not applicable to any information collected offline or via channels other than this website.</span>
              </div>

              <div style={{marginBottom: '2%'}}>
              <p style={{fontWeight: 'bold', fontSize: '29px', fontFamily: 'serif', marginBottom: '0.5%'}}>Consent</p>
              <span style={{fontWeight: 'bold', fontSize: '20px'}}>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</span>
              </div>

              <div style={{marginBottom: '2%'}}>
              <p style={{fontWeight: 'bold', fontSize: '29px', fontFamily: 'serif', marginBottom: '0.5%'}}>Information we collect</p>
              <span style={{fontWeight: 'bold', fontSize: '20px'}}>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information. If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide. When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</span>
              </div>

              
              <div style={{marginBottom: '2%'}}>
              <p style={{fontWeight: 'bold', fontSize: '29px', fontFamily: 'serif', marginBottom: '0.5%'}}>How we use your information</p>
              <span style={{fontWeight: 'bold', fontSize: '20px'}}>We use the information we collect in various ways, including to:</span>
              <ul style={{ listStyleType: 'disc', fontSize: '19px',fontWeight: 'bold',marginLeft: '1%', marginTop: '0.5%' }}>
               <li>Provide, operate, and maintain our website</li>
               <li>Improve, personalize, and expand our website</li>
               <li>Understand and analyze how you use our website</li>
               <li>Develop new products, services, features, and functionality</li>
               <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
               <li>Send you emails</li>
               <li>Find and prevent fraud</li>
              </ul>
              </div>

              <div style={{marginBottom: '2%'}}>
              <p style={{fontWeight: 'bold', fontSize: '29px', fontFamily: 'serif', marginBottom: '0.5%'}}>Log Files</p>
              <span style={{fontWeight: 'bold', fontSize: '20px'}}>AzamDeal follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</span>
              </div>


              <div style={{marginBottom: '2%'}}>
              <p style={{fontWeight: 'bold', fontSize: '29px', fontFamily: 'serif', marginBottom: '0.5%'}}>Cookies and Web Beacons</p>
              <span style={{fontWeight: 'bold', fontSize: '20px'}}>Like any other website, AzamDeal uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</span>
              </div>

              <div style={{marginBottom: '2%'}}>
              <p style={{fontWeight: 'bold', fontSize: '29px', fontFamily: 'serif', marginBottom: '0.5%'}}>Advertising Partners Privacy Policies</p>
              <span style={{fontWeight: 'bold', fontSize: '20px'}}>You may consult this list to find the Privacy Policy for each of the advertising partners of AzamDeal. Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on AzamDeal, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit. Note that AzamDeal has no access to or control over these cookies that are used by third-party advertisers.</span>
              </div>

              <div style={{marginBottom: '2%'}}>
              <p style={{fontWeight: 'bold', fontSize: '29px', fontFamily: 'serif', marginBottom: '0.5%'}}>Third Party Privacy Policies</p>
              <span style={{fontWeight: 'bold', fontSize: '20px'}}>AzamDeal's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</span>
              </div>

              <div style={{marginBottom: '2%'}}>
              <p style={{fontWeight: 'bold', fontSize: '29px', fontFamily: 'serif', marginBottom: '0.5%'}}>CCPA Privacy Rights (Do Not Sell My Personal Information)</p>
              <span style={{fontWeight: 'bold', fontSize: '20px'}}>Under the CCPA, among other rights, California consumers have the right to: Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers. Request that a business delete any personal data about the consumer that a business has collected. Request that a business that sells a consumer's personal data, not sell the consumer's personal data. If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</span>
              </div>

              <div style={{marginBottom: '2%'}}>
              <p style={{fontWeight: 'bold', fontSize: '29px', fontFamily: 'serif', marginBottom: '0.5%'}}>GDPR Data Protection Rights</p>
              <span style={{fontWeight: 'bold', fontSize: '20px'}}>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following: The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service. The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete. The right to erasure – You have the right to request that we erase your personal data, under certain conditions. The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions. The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions. The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions. If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</span>
              </div>

              <div style={{marginBottom: '2%'}}>
              <p style={{fontWeight: 'bold', fontSize: '29px', fontFamily: 'serif', marginBottom: '0.5%'}}>Children's Information</p>
              <span style={{fontWeight: 'bold', fontSize: '20px'}}>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. AzamDeal does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</span>
              </div>


              <div style={{marginBottom: '2%'}}>
              <p style={{fontWeight: 'bold', fontSize: '29px', fontFamily: 'serif', marginBottom: '0.5%'}}>Changes to This Privacy Policy</p>
              <span style={{fontWeight: 'bold', fontSize: '20px'}}>We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page. Our Privacy Policy was created with the help of the Privacy Policy Generator.</span>
              </div>

              
              <div style={{marginBottom: '2%'}}>
              <p style={{fontWeight: 'bold', fontSize: '29px', fontFamily: 'serif', marginBottom: '0.5%'}}>Contact Us</p>
              <span style={{fontWeight: 'bold', fontSize: '20px'}}>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us. Generated using Privacy Policy Generator</span>
              </div>


            </div>
          </>
        )}
      </Layout>
      <ToastContainer />
    </div>
  );
};

export default PrivacyPolicy;
