"use client";
import styles from "./signin.module.css";
import { register } from "@/assets/imagesrafce";
import React, { ChangeEvent, useState } from "react";
import { fetchSigninUser } from "../../api/login";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../context/loginContect";
// import { handleIsLoadingsignin } from "@/utils/btnHandler";/

import { handleResponsesigninMsg } from "../../utils/response";
import Image from "next/image";

export default function Signinpage() {
  const {
    signinUser,
    setSigninUser,
    isSuccess,
    setIsSuccess,
    isSuccessBg,
    setIsSuccessBg,
    // Error,
  } = useAuthContext();
  const { error } = signinUser;

  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // handle onchange in inpute field
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Remove response message when a user starts typing
    setIsSuccess(false);
    setIsSuccessBg("");
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    // Remove response message when a user starts typing
    setIsSuccess(false);
    setIsSuccessBg("");

    if (!formData.email || !formData.password) {
      setIsSuccess(true); // Display response

      // Display response error if any input field is empty
      handleResponsesigninMsg(
        setSigninUser,
        signinUser,
        "Field cannot be empty",
        setIsSuccessBg,
        styles.error__sign__response
      );
    } else {
      setIsSuccess(true); // Display response
      //  handleIsLoadingsignin(setSigninUser, signinUser, true); // Display loading state

      await fetchSigninUser(
        formData,
        router,
        setSigninUser,
        setIsSuccess,
        setIsSuccessBg
      );

      //  console.log(data);
    }
  };

  return (
    <section className={styles.signinsection}>
      <div className={styles.formContainer}>
        <div className={styles.leftWelcomediv}>
          <h1 className={styles.signinHeaders}>Welcome Back !</h1>
          <p className={styles.welcometext}>
            Enter your details to continue your journey with us
          </p>
          <Image className={styles.leftsvg} src={register} alt="" />
        </div>
        <div className={styles.rightWelcomediv}>
          <div className={styles.signindiv}>
            <h1 className={styles.signinHeaders}>
              Sign in to Storefront Admin
            </h1>

            <div>
              <p className={styles.signintext}>Or use your email</p>
            </div>
            <form
              onSubmit={handleSubmit}
              className={styles.signinformcontainer}
            >
              <div className={styles.inputdiv}>
                <img src="/mail.png" className={styles.inputicon} alt="" />
                <input
                  autoComplete="off"
                  id="logemail"
                  placeholder="Email"
                  name="email"
                  className={styles.inputfield}
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                />
              </div>

              <div className={styles.inputdiv}>
                <img src="/lock.png" className={styles.inputicon} alt="" />

                <input
                  name="password"
                  autoComplete="off"
                  id="logpass"
                  placeholder="Password"
                  className={styles.inputfield}
                  value={formData.password}
                  onChange={handleInputChange}
                  type="password"
                />
              </div>

              <p className={styles.signintext}>Forgot your password ?</p>
              <div className={styles.btndiv}>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className={styles.button}
                >
                  Sign in
                </button>
              </div>
              {/* <div
                style={{
                  width: "100%",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p
                  className={` ${
                    error || isSuccess
                      ? styles.show__sign__response
                      : styles.hide__sign__response
                  }`}
                >
                  {error}
                </p>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
