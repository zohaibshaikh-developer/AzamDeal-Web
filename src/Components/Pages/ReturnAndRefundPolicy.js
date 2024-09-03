import React from "react";
import Layout from "../../Layout/Layout";
import PageHeader from "./PageHeader";
import { Box, CircularProgress, circularProgressClasses } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import Label from "./Form/Label";
import InputArea from "./Form/InputArea";
import { toast, ToastContainer } from "react-toastify";

const ReturnAndRefundPolicy = () => {
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
      <Layout title="Return and Refund Policy" description="Last updated: October 11, 2023">
        {apiLoader && (
          <div className="h-screen bg-white">
            <Box
              sx={{ flexGrow: 1 }}
              className="absolute top-[50%] left-[50%]"
            >
              <FacebookCircularProgress />
            </Box>
          </div>
        )}
        {apiLoader === true ? (
          <div className="h-screen bg-white" />
        ) : (
          <>
            <PageHeader title="Return and Refund Policy" />
            <div className="p-10">
              <p style={{fontWeight: 'bold', fontSize: '20px', marginBottom: '1%'}}>
                Thank you for shopping at AzamDeal.
              </p>

              <p style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>
                If, for any reason, You are not completely satisfied with a purchase We invite You to review our policy on refunds and returns.
              </p>

              <h2 style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>Interpretation and Definitions</h2>
              <h3 style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>Interpretation</h3>

              <p style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>
                The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
              </p>

              <h3 style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>Definitions</h3>
              <p style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>For the purposes of this Return and Refund Policy:</p>
              <ul style={{ listStyleType: 'disc', fontSize: '19px',fontWeight: 'bold',marginLeft: '1%', marginTop: '0.5%' }}>
                <li style={{marginBottom: '0.5%'}}>Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to AzamDeal, Ranipark, Jalgaon Jamod, 443402 Maharashtra, India.</li>
                <li style={{marginBottom: '0.5%'}}>Goods refer to the items offered for sale on the Service.</li>
                <li style={{marginBottom: '0.5%'}}>Orders mean a request by You to purchase Goods from Us.</li>
                <li style={{marginBottom: '0.5%'}}>Service refers to the Website.</li>
                <li style={{marginBottom: '0.5%'}}>Website refers to AzamDeal, accessible from <a href="https://azamdeal.com/" style={{color: 'blue'}}>https://azamdeal.com/</a></li>
                <li style={{marginBottom: '0.5%'}}>You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
              </ul>

              <h2 style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>Your Order Cancellation Rights</h2>
              <p style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>You are entitled to cancel Your Order within 7 days without giving any reason for doing so.</p>

              <p style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>
                The deadline for cancelling an Order is 7 days from the date on which You received the Goods or on which a third party you have appointed, who is not the carrier, takes possession of the product delivered.
              </p>

              <p style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>
                In order to exercise Your right of cancellation, You must inform Us of your decision by means of a clear statement. You can inform us of your decision by:
              </p>
              <ul style={{ listStyleType: 'disc', fontSize: '19px',fontWeight: 'bold',marginLeft: '1%', marginTop: '0.5%' }}>
                <li style={{marginBottom: '0.5%'}}>By visiting this page on our website: <a href="https://azamdeal.com/contact-us" style={{color: 'blue'}}>https://azamdeal.com/contact-us</a></li>
              </ul>

              <p style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>
                We will reimburse You no later than 14 days from the day on which We receive the returned Goods. We will use the same means of payment as You used for the Order, and You will not incur any fees for such reimbursement.
              </p>

              <h2 style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>Conditions for Returns</h2>
              <p style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>
                In order for the Goods to be eligible for a return, please make sure that:
              </p>
              <ul style={{ listStyleType: 'disc', fontSize: '19px',fontWeight: 'bold',marginLeft: '1%', marginTop: '0.5%' }}>
                <li style={{marginBottom: '0.5%'}}>The Goods were purchased in the last 7 days</li>
                <li style={{marginBottom: '0.5%'}}>The Goods are in the original packaging</li>
              </ul>

              <p style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>
                The following Goods cannot be returned:
              </p>
              <ul style={{ listStyleType: 'disc', fontSize: '19px',fontWeight: 'bold',marginLeft: '1%', marginTop: '0.5%' }}>
                <li style={{marginBottom: '0.5%'}}>The supply of Goods made to Your specifications or clearly personalized.</li>
                <li style={{marginBottom: '0.5%'}}>The supply of Goods which according to their nature are not suitable to be returned, deteriorate rapidly or where the date of expiry is over.</li>
                <li style={{marginBottom: '0.5%'}}>The supply of Goods which are not suitable for return due to health protection or hygiene reasons and were unsealed after delivery.</li>
                <li style={{marginBottom: '0.5%'}}>The supply of Goods which are, after delivery, according to their nature, inseparably mixed with other items.</li>
              </ul>

              <p style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>We reserve the right to refuse returns of any merchandise that does not meet the above return conditions in our sole discretion.</p>

              <p style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>
                Only regular priced Goods may be refunded. Unfortunately, Goods on sale cannot be refunded. This exclusion may not apply to You if it is not permitted by applicable law.
              </p>

              <h2 style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>Returning Goods</h2>
              <p style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>You are responsible for the cost and risk of returning the Goods to Us. You should send the Goods at the following address:</p>
              <p style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>Ranipark, Jalgaon Jamod, 443402 Maharashtra, India</p>

              <p style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>
                We cannot be held responsible for Goods damaged or lost in return shipment. Therefore, We recommend an insured and trackable mail service. We are unable to issue a refund without actual receipt of the Goods or proof of received return delivery.
              </p>

              <h2 style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>Gifts</h2>
              <p style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>
                If the Goods were marked as a gift when purchased and then shipped directly to you, You'll receive a gift credit for the value of your return. Once the returned product is received, a gift certificate will be mailed to You.
              </p>

              <p style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>
                If the Goods weren't marked as a gift when purchased, or the gift giver had the Order shipped to themselves to give it to You later, We will send the refund to the gift giver.
              </p>

              <h2 style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>Contact Us</h2>
              <p style={{fontWeight: 'bold', fontSize: '19px', marginBottom: '1%'}}>If you have any questions about our Returns and Refunds Policy, please contact us:</p>
              <ul style={{ listStyleType: 'disc', fontSize: '19px',fontWeight: 'bold',marginLeft: '1%', marginTop: '0.5%' }}>
                <li>By visiting this page on our website: <a href="https://azamdeal.com/contact-us" style={{color: 'blue'}}>https://azamdeal.com/contact-us</a></li>
              </ul>
            </div>
          </>
        )}
      </Layout>
    </div>
  );
};

export default ReturnAndRefundPolicy;
