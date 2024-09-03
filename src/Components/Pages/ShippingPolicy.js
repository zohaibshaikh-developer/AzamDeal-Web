import React from "react";
import Layout from "../../Layout/Layout";
import PageHeader from "./PageHeader";
import { Box, CircularProgress, circularProgressClasses } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import Label from "./Form/Label";
import InputArea from "./Form/InputArea";
import { toast, ToastContainer } from "react-toastify";

const ShippingPolicy = () => {
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
      <Layout title="Shipping Policy" description="Last updated: October 11, 2023">
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
            <PageHeader title="Shipping Policy" />
            <div className="p-10">

              <div>
              <p style={{fontWeight: 'bold', fontSize: '30px', marginBottom: '1%',  fontFamily: 'serif'}}>
               Shipping Costs
              </p>

              <p style={{fontWeight: 'bold', fontSize: '20px', marginBottom: '1%'}}>
              Free shipping in entire India for order above 500 Rupees.
              </p>

              <p style={{fontWeight: 'bold', fontSize: '20px', marginBottom: '1%'}}>
              35 Rupees Shipping charges for order below 500 Rupees for entire India.
              </p>

              </div>

              <div style={{marginBottom: '2%'}}>
              <p style={{fontWeight: 'bold', fontSize: '29px', fontFamily: 'serif', marginBottom: '0.5%'}}>Order Processing</p>
              <ul style={{ listStyleType: 'disc', fontSize: '20px',fontWeight: 'bold',marginLeft: '1%', marginTop: '0.5%' }}>
               <li style={{marginBottom: '0.5%'}}>We lovingly get your orders ready within 2-3 business days, and we take a breather on weekends and holidays.</li>
               <li style={{marginBottom: '0.5%'}}>Once your order is successfully placed, you'll find a confirmation email with all the details in your inbox. If you can't find it, it might have slipped into your spam folder. Don't hesitate to get in touch with us if you need another confirmation.</li>
               <li style={{marginBottom: '0.5%'}}>If you spot anything that needs adjusting in your order, don't worry! Drop us a line straight away at <a href="mailto:info@azamdeal.com" style={{color: 'blue'}}>info@azamdeal.com</a>. Just remember, once your package is on its way, we're unable to make any changes.</li>
               <li style={{marginBottom: '0.5%'}}>Please take a moment to double-check the shipping address you've given us. We want your order to find its way to you without a hitch! If an error in the address prevents delivery, we'll refund your original order (excluding the shipping fee), and you can easily place your order again.</li>
              </ul>
              </div>

              <div>
              <p style={{fontWeight: 'bold', fontSize: '20px', marginBottom: '1%'}}>
              Please note: Sometimes, our shipping partners might experience delays that are out of our control. We truly appreciate your understanding and patience in such situations.
              </p>
              </div>
             
            </div>
          </>
        )}
      </Layout>
    </div>
  );
};

export default ShippingPolicy;
