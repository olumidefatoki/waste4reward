import React from "react";
import Logo from "../../assets/images/gbflogo.png";
import { CiUser } from "react-icons/ci";
import { FaKey } from "react-icons/fa";
import { BsBoxArrowRight } from "react-icons/bs";

const SignIn = () => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col items-center basis-3/12">
        <h3 className="text-center m-0 w-[100px]">
          <a href="https://waste4reward.org/#" className="logo logo-admin">
            <img
              src={Logo}
              height="100"
              alt="logo"
              class="my-3"
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </a>
        </h3>
        <div class="px-2 mt-2">
          <h4 class="text-xl font-bold mb-2 text-center">Welcome Back !</h4>
          <p class="text-muted text-center">
            Sign in to continue to Waste4Reward.
          </p>

          <form
            className="form-horizontal my-4"
            action="https://waste4reward.org/dologin"
            method="POST"
          >
            <div class="mb-3">
              <label class="form-label" for="username">
                Username
              </label>
              <div class="flex items-center border border-gray-300 h-30 bg-gray-50">
                <span
                  className="w-[40px] block flex justify-center"
                  id="basic-addon1"
                >
                  <CiUser />
                </span>

                <input
                  type="text"
                  className="p-2 w-full"
                  id="username"
                  name="username"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div class="mb-3 ">
              <label class="form-label" for="userpassword">
                Password
              </label>
              <div class="flex items-center border border-gray-300 h-30 bg-gray-50">
                <span
                  className="w-[40px] block flex justify-center"
                  id="basic-addon2"
                >
                  <FaKey />
                </span>
                <input
                  type="password"
                  className="p-2 w-full"
                  id="userpassword"
                  name="password"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <div class="mb-2">
              <div class="col-12 mt-2">
                <button
                  class="bg-sky-500 flex justify-center items-center gap-2 text-center w-full text-white h-8"
                  type="submit"
                >
                  Log In <BsBoxArrowRight />
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="mt-4 text-center">
          {/* <h5 style="color:red"></h5> */}
          <p className="mb-0">2024 © Growing Businesses Foundation</p>
        </div>
      </div>
      <div className="basis-9/12">
        <div className="h-screen  flex justify-center">
          <div className="bg-hero-pattern bg-cover bg-no-repeat w-full flex items-center justify-center">
            <div className="text-center text-white w-1/2">
              <h4 className="mt-3 text-white text-xl">
                Welcome To <span class="text-green-400">WASTE4REWARD</span>{" "}
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
