/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from "react";
import { PiUsers } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";
import InputText from "../input/InputText";
import InputSelect from "../input/InputSelect";
import { Form, Formik } from "formik";
import { createCollectorSchema } from "../../utils/validationSchema/collectorSchema";
import useCollector from "../../hooks/useCollector";

export const CollectorModal = ({ model, closeModal, requestType }) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { createNewCollector } = useCollector();

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

  const createCollector = async (data) => {
    console.log({ data });
    try {
      if (requestType === "edit") {
        setLoading(true);
        const res = await createNewCollector(data);
        console.log({ res });
      }
      setLoading(true);
      const res = await createNewCollector(data);
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
      validationSchema={createCollectorSchema}
      onSubmit={createCollector}
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
                  ? "Edit Collector"
                  : "Create new Collector"}
              </h1>
              <p className="text-sm">Enter the details below</p>
            </div>
            <div className="flex justify-between">
              <InputText
                label={"FirstName"}
                handleChange={handleChange}
                value={values.firstName}
                name={"firstName"}
                placeholder={"Enter first name"}
              />
              <InputText
                label={"LastName"}
                handleChange={handleChange}
                value={values.lastName}
                name={"lastName"}
                placeholder={"Enter last name"}
              />
            </div>
            <div className="flex justify-between w-full">
              <InputSelect
                label={"Gender"}
                handleChange={handleChange}
                name={"gender"}
                value={values.gender}
                options={["Select gender", "male", "female"]}
              />
              <InputSelect
                label={"Disability Status"}
                handleChange={handleChange}
                name={"disabilityStatus"}
                value={values.disabilityStatus}
                options={["Select disability status", "able", "disable"]}
              />
            </div>
            <div className="w-full">
              <InputText
                label={"Phone Number"}
                handleChange={handleChange}
                value={values.phoneNumber}
                name={"phoneNumber"}
                placeholder={"Enter phone number"}
              />
            </div>
            <div className="w-full">
              <InputText
                label={"Email Adress"}
                handleChange={handleChange}
                value={values.email}
                name={"email"}
                placeholder={"Enter email address"}
              />
            </div>
            <div className="w-full">
              <InputText
                label={"Address"}
                handleChange={handleChange}
                value={values.address}
                name={"address"}
                placeholder={"Enter address"}
              />
            </div>
            <div className="flex justify-between w-full">
              <InputSelect
                label={"State"}
                handleChange={handleChange}
                name={"state"}
                value={values.state}
                options={["select state", "Abuja", "Lagos"]}
              />
              <InputSelect
                label={"Lga"}
                handleChange={handleChange}
                name={"location"}
                value={values.location}
                options={["select lgs", "Bwari"]}
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
                {requestType === "edit" ? "save changes" : "Create Collector"}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
