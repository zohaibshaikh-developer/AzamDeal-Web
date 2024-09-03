import { Backdrop, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import InputArea from "../Pages/Form/InputArea";
import Dashboard from "./Dashboard";

const UpdatePassword = () => {
  let Navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error Hooks
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passNotMatchError, SetPassNotMatchError] = useState("");

  // Load Hooks
  const [load, setLoad] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoad(true);
    setCurrentPasswordError("");
    setConfirmPasswordError("");
    setNewPasswordError("");
    SetPassNotMatchError("");
    let msg = "this fild is required";
    if (currentPassword === "") {
      setCurrentPasswordError(msg);
      setLoad(false);
    } else if (newPassword === "") {
      setNewPasswordError(msg);
      setLoad(false);
    } else if (confirmPassword === "") {
      setConfirmPasswordError(msg);
      setLoad(false);
    } else if (newPassword !== confirmPassword) {
      SetPassNotMatchError("password does not match");
      setLoad(false);
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        c_id: localStorage.getItem("customer_id"),
        password: currentPassword,
        new_pass: confirmPassword,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(
        process.env.REACT_APP_BASE_URL + "updatepassword",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            toast.success("Passwords updated successfully", {
              theme: "light",
              autoClose: "2000",
            });
            setLoad(false);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            Navigate("/dashboard");
          } else {
            setLoad(false);
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <div>
      <Dashboard
        title="Update-Password"
        description="This is password update page"
      >
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h2 className="text-xl font-sans font-bold mb-5">
                  Change Password
                </h2>
              </div>
            </div>
          </div>
          {/*  */}
          <hr className="border border-emerald-500" />

          <div className="mx-20 mt-10">
            <InputArea
              className="mt-2"
              label="Enter Current Password"
              name="password"
              type="password"
              placeholder="current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            {currentPasswordError && (
              <div className="text-xs font-semibold text-red-500 ml-1">
                {currentPasswordError}
              </div>
            )}
          </div>
          <div className="grid grid-cols-6 gap-6 mt-5 mx-20">
            <div className="col-span-6 sm:col-span-3">
              <InputArea
                label="Password"
                name="name"
                type="password"
                placeholder="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {newPasswordError && (
                <div className="text-xs font-semibold text-red-500 ml-1">
                  {newPasswordError}
                </div>
              )}
              {passNotMatchError && (
                <div className="text-xs font-semibold text-red-500 ml-1">
                  {passNotMatchError}
                </div>
              )}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <InputArea
                label="Confirm Password"
                name="phone"
                type="password"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmPasswordError && (
                <div className="text-xs font-semibold text-red-500 ml-1">
                  {confirmPasswordError}
                </div>
              )}
              {passNotMatchError && (
                <div className="text-xs font-semibold text-red-500 ml-1">
                  {passNotMatchError}
                </div>
              )}
            </div>
          </div>
          <div className="col-span-6 sm:col-span-3 mt-5 text-right">
            <button
              onClick={handleChangePassword}
              type="submit"
              className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
            >
              Change Password
            </button>
          </div>
        </div>
      </Dashboard>
      <ToastContainer />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load}
      >
        <CircularProgress color="success" />
      </Backdrop>
    </div>
  );
};

export default UpdatePassword;
