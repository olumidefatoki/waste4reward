/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from "react";
import { PiUsers } from "react-icons/pi";
import InputText from "../input/InputText";
import InputSelect from "../input/InputSelect";
import { IoCloseOutline } from "react-icons/io5";
import { Form, Formik } from "formik";
import useRecycler from "../../hooks/useRecycler";
import { createRecyclerSchema } from "../../utils/validationSchema/recycler";

export const RecyclerModal = ({ model, closeModal, requestType }) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { createNewRecycler } = useRecycler();

  // const [isLoading, setisLoading] = useState(false);
  // const [errorMsg, setErrorMsg] = useState("");
  // const [showToast, setShowToast] = useState(false);
  // const [showErrToast, setShowErrToast] = useState(false);
  const initialValues = {
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: "",
    location: "",
    state: "",
    gender: "",
    dateOfBirth: "",
    aggregatorId: "",
    disabilityStatus: "",
  };

  const createRecycler = async (data) => {
    console.log({ data });
    try {
      if (requestType === "edit") {
        setLoading(true);
        const res = await createNewRecycler(data);
        console.log({ res });
      }
      setLoading(true);
      const res = await createNewRecycler(data);
      console.log({ res });
      // toast.success("successfully signed in", {
      //   className: "toast-success",
      // });
    } catch (error) {
      // toast.error(error.message || "something went wrong", {
      //   className: "toast-error",
      // });
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createRecyclerSchema}
      onSubmit={createRecycler}
    >
      {({ handleChange, errors, values, setFieldValue, handleSubmit }) => {
        console.log({ values });
        return (
          <Form className="flex flex-col gap-y-2 w-[640px] bg-white p-4 h-max">
            <div className="flex justify-between">
              <PiUsers style={{ width: 26, height: 26 }} />
              <IoCloseOutline
                style={{ width: 26, height: 26, cursor: "pointer" }}
                onClick={() => closeModal()}
              />
            </div>
            <div className="">
              <h1 className="capitalize font-bold">
                {requestType === "edit"
                  ? "Edit Recycler"
                  : "Create new Recycler"}
              </h1>
              <p className="text-sm">Enter the details below</p>
            </div>
            <div className="flex justify-between">
              <InputText label={"FirstName"} placeholder={"Enter first name"} />
              <InputText label={"LastName"} placeholder={"Enter last name"} />
            </div>
            <div className="w-full">
              <InputText
                label={"Phone Number"}
                placeholder={"Enter phone number"}
              />
            </div>
            <div className="w-full">
              <InputText
                label={"Email Adress"}
                placeholder={"Enter email address"}
              />
            </div>
            <div className="flex justify-between w-full">
              <InputSelect label={"State"} options={["select state"]} />
              <InputSelect label={"Lga"} options={["select lgs"]} />
            </div>
            <div className="w-full mb-10">
              <InputText
                label={"Year of Incorporation"}
                placeholder={"Enter year of incorporation"}
              />
            </div>
            <div className="flex gap-2 justify-center">
              <button
                className="mx-auto px-2 w-full h-[40px] font-normal text-xs flex justify-center items-center gap-3 disabled:cursor-not-allowed border border-pfBlack md:w-272"
                onClick={() => closeModal()}
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmit()}
                className="bg-green-700 text-white flex justify-center items-center h-[40px] w-full gap-2"
              >
                {requestType === "edit" ? "Save Changes" : "Create Recycler"}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
