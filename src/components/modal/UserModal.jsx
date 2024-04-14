/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from "react";
import { PiUsers } from "react-icons/pi";
import InputText from "../input/InputText";
import InputSelect from "../input/InputSelect";
import { IoCloseOutline } from "react-icons/io5";
import { Form, Formik } from "formik";
import useUser from "../../hooks/useUser";
import toast from "react-hot-toast";
import { orange } from "@mui/material/colors";

export const UserModal = ({ model, closeModal, requestType }) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { createNewUser } = useUser();

  const [states, setStates] = useState([]);
  const [lga, setLga] = useState([]);

  const [userDetail, setUserDetail] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    userType: "",
    email: "",
  });

  const createUser = async () => {
    setLoading(true);
    try {
      if (requestType === "edit") {
        setLoading(true);
        const res = await createNewUser(userDetail);
        // console.log({ res });
      }
      setLoading(true);
      const res = await createNewUser(userDetail);
      // console.log({ res });
      if (res.errors) {
        toast.error(Object.values(res.errors)[0]);
        return;
      }
      toast.success("User created");
      closeModal();
    } catch (error) {
      toast.error(error.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div className="flex flex-col gap-y-2 w-[640px] bg-white p-4 h-max">
          <div className="flex justify-between">
            <PiUsers style={{ width: 26, height: 26 }} />
            <IoCloseOutline
              style={{ width: 26, height: 26, cursor: "pointer" }}
              onClick={() => closeModal()}
            />
          </div>
          <div className="">
            <h1 className="capitalize font-bold">
              {requestType === "edit" ? "Edit user" : "Create new user"}
            </h1>
            <p className="text-sm">Enter the details below</p>
          </div>
          <div className="flex justify-between">
            <InputText
              label={"First name"}
              placeholder={"Enter first name"}
              value={userDetail.firstName}
              handleChange={(e) =>
                setUserDetail({
                  ...userDetail,
                  firstName: e.target.value,
                })
              }
              css="w-full"
            />
            <InputText
              label={"Last name"}
              placeholder={"Enter last name"}
              value={userDetail.lastName}
              handleChange={(e) =>
                setUserDetail({
                  ...userDetail,
                  lastName: e.target.value,
                })
              }
              css="w-full"
            />
          </div>

          <div className="w-full">
            <InputText
              label={"Organisation"}
              placeholder={"Enter  organisation"}
              value={userDetail.organization}
              handleChange={(e) =>
                setUserDetail({
                  ...userDetail,
                  organization: e.target.value,
                })
              }
            />
          </div>
          <div className="w-full">
            <InputText
              label={"Email Address"}
              placeholder={"Enter email address"}
              value={userDetail.email}
              handleChange={(e) =>
                setUserDetail({
                  ...userDetail,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="w-full">
            <InputSelect
              label={"User type"}
              placeholder="Select user type"
              options={["Aggregator", "Partner"]}
              handleChange={(e) =>
                setUserDetail({
                  ...userDetail,
                  userType: e.target.value,
                })
              }
              css="w-full"
            />
          </div>

          <br />

          <div className="flex gap-2 justify-center">
            <button
              className="mx-auto px-2 w-full h-[40px] font-normal text-xs flex justify-center items-center gap-3 disabled:cursor-not-allowed border border-pfBlack md:w-272"
              onClick={() => closeModal()}
            >
              Cancel
            </button>
            <button
              onClick={() => createUser()}
              className="bg-green-700 text-white flex justify-center items-center h-[40px] w-full gap-2"
            >
              {requestType === "edit"
                ? "Save Changes"
                : loading
                ? "Creating..."
                : "Create User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
