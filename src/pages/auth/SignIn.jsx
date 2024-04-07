import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/gbflogo.png";
import { CiUser } from "react-icons/ci";
import { FaKey } from "react-icons/fa";
import { BsBoxArrowRight } from "react-icons/bs";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { signInSchema } from "../../utils/validationSchema/authSchema";
import useAuth from "../../hooks/useAuth";
import api from "../../api/axios";
import fetcher from "../../api/fetacher";

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const signIn = async (data) => {
    try {
      setLoading(true);
      const res = await loginUser(data);
      localStorage.setItem("accessToken", res.data.access_token);
      const { user } = res.data;
      // toast.success("successfully signed in", {
      //   className: "toast-success",
      // });
      switch (user.userType) {
        case "SUPER_ADMIN":
          navigate("/admin/dashboard");
          break;
        default:
          navigate("/dashboard");
      }
    } catch (error) {
      // toast.error(error.message || "something went wrong", {
      //   className: "toast-error",
      // });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex h-screen">
      <div className="flex flex-col items-center basis-3/12">
        <h3 className="text-center m-0 w-[100px]">
          <a href="https://waste4reward.org/#" className="logo logo-admin">
            <img
              src={Logo}
              height="100"
              alt="logo"
              className="my-3"
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </a>
        </h3>
        <div className="px-2 mt-2">
          <h4 className="text-xl font-bold mb-2 text-center">Welcome Back !</h4>
          <p className="text-muted text-center">
            Sign in to continue to Waste4Reward.
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={signInSchema}
            onSubmit={signIn}
          >
            {({ handleChange, errors, values }) => {
              return (
                <Form>
                  <div className="mb-3 w-full">
                    <label className="form-label" htmlFor="username">
                      Email
                    </label>
                    <div className="flex items-center border border-gray-300 h-30 bg-gray-50">
                      <span
                        className="w-[40px] block flex justify-center"
                        id="basic-addon1"
                      >
                        <CiUser />
                      </span>

                      <input
                        type="text"
                        className="p-2 w-full"
                        onChange={handleChange}
                        value={values.email}
                        id="email"
                        name="email"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>

                  <div className="mb-3 w-full">
                    <label className="form-label" htmlFor="userpassword">
                      Password
                    </label>
                    <div className="flex items-center border border-gray-300 h-30 bg-gray-50">
                      <span
                        className="w-[40px] block flex justify-center"
                        id="basic-addon2"
                      >
                        <FaKey />
                      </span>
                      <input
                        type="password"
                        className="p-2 w-full"
                        onChange={handleChange}
                        value={values.password}
                        id="password"
                        name="password"
                        placeholder="Enter password"
                      />
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="col-12 mt-2">
                      <button
                        className="bg-sky-500 flex justify-center items-center gap-2 text-center w-full text-white h-8"
                        type="submit"
                      >
                        Log In <BsBoxArrowRight />
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className="mt-4 text-center">
          <p className="mb-0">2024 © Growing Businesses Foundation</p>
        </div>
      </div>
      <div className="basis-9/12">
        <div className="h-screen  flex justify-center">
          <div className="bg-hero-pattern bg-cover bg-no-repeat w-full flex items-center justify-center">
            <div className="text-center text-white w-1/2">
              <h4 className="mt-3 text-white text-xl">
                Welcome To <span className="text-green-400">WASTE4REWARD</span>{" "}
              </h4>
              <h1 className="text-white text-5xl">Let's Get Started</h1>
              <p className="mt-3 text-sm w-[500px] mb-3">
                Join our mission to reduce plastic waste and earn rewards! Use
                our eco-friendly services and make a positive impact on the
                environment.
              </p>
              <div className="border w-[100px] mx-auto border-green-400"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
