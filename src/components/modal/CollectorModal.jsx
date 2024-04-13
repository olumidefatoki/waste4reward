/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState, useEffect } from "react";
import { PiUsers } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";
import InputText from "../input/InputText";
import InputSelect from "../input/InputSelect";
import { Form, Formik } from "formik";
import { createCollectorSchema } from "../../utils/validationSchema/collectorSchema";
import useCollector from "../../hooks/useCollector";

import { getState, getLga } from "../../ds/resource";

export const CollectorModal = ({ model, closeModal, requestType }) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { createNewCollector } = useCollector();

  const [states, setStates] = useState([]);
  const [lga, setLga] = useState([]);

  const [collectorDetail, setCollectorDetail] = useState({
    address: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    location: "",
    state: "",
    gender: "",
    dateOfBirth: "",
    aggregatorId: null,
    disabilityStatus: "",
  });

  useEffect(() => {
    const getAllState = async () => {
      const res = await getState();
      setStates(res.data);
    };
    getAllState();
  }, []);
  useEffect(() => {
    const getAllLga = async () => {
      const res = await getLga();
      setLga(res.data);
    };
    getAllLga();
  }, []);

  const [isLoading, setisLoading] = useState(false);
  // const [errorMsg, setErrorMsg] = useState("");
  // const [showToast, setShowToast] = useState(false);
  // const [showErrToast, setShowErrToast] = useState(false);

  const createCollector = async (data) => {
    console.log(collectorDetail);
    setLoading(true);

    //   {
    //     "firstName": "{{$randomFirstName}}",
    //     "lastName": "{{$randomLastName}}",
    //      "address": "{{$randomStreetAddress}}",
    //     "phoneNumber": "{{phoneNumber}}",
    //     "email": "{{$randomEmail}}",
    //     "location": "BWARI",
    //     "state": "FCT",
    //     "gender": "male",
    //     "dateOfBirth": "2001-01-07",
    //     "aggregatorId": 3,
    //     "disabilityStatus": "Able"
    // }

    try {
      if (requestType === "edit") {
        setLoading(true);
        const res = await createNewCollector();
        console.log({ res });
      }
      setLoading(true);
      const res = await createNewCollector(collectorDetail);
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
            {requestType === "edit" ? "Edit Collector" : "Create new Collector"}
          </h1>
          <p className="text-sm">Enter the details below</p>
        </div>
        <div className="flex justify-between">
          <InputText
            label={"FirstName"}
            placeholder={"Enter first name"}
            value={collectorDetail.firstName}
            handleChange={(e) =>
              setCollectorDetail({
                ...collectorDetail,
                firstName: e.target.value,
              })
            }
          />
          <InputText
            label={"LastName"}
            placeholder={"Enter last name"}
            value={collectorDetail.lastName}
            handleChange={(e) =>
              setCollectorDetail({
                ...collectorDetail,
                lastName: e.target.value,
              })
            }
          />
        </div>
        <div className="flex justify-between w-full">
          <InputSelect
            label={"Gender"}
            options={["Select gender", "male", "female"]}
            handleChange={(e) =>
              setCollectorDetail({
                ...collectorDetail,
                gender: e.target.value,
              })
            }
          />
          <InputSelect
            label={"Disability Status"}
            options={["Select disability status", "able", "disable"]}
            handleChange={(e) =>
              setCollectorDetail({
                ...collectorDetail,
                disabilityStatus: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full">
          <InputText
            label={"Phone Number"}
            placeholder={"Enter phone number"}
            value={collectorDetail.phoneNumber}
            handleChange={(e) =>
              setCollectorDetail({
                ...collectorDetail,
                phoneNumber: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full">
          <InputText
            label={"Email Address"}
            placeholder={"Enter email address"}
            value={collectorDetail.email}
            handleChange={(e) =>
              setCollectorDetail({
                ...collectorDetail,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full">
          <InputText
            label={"Address"}
            placeholder={"Enter address"}
            value={collectorDetail.address}
            handleChange={(e) =>
              setCollectorDetail({
                ...collectorDetail,
                address: e.target.value,
              })
            }
          />
        </div>
        <div className="flex justify-between w-full">
          <InputSelect
            label={"State"}
            options={states.map((data) => data.name)}
            handleChange={(e) =>
              setCollectorDetail({
                ...collectorDetail,
                state: e.target.value,
              })
            }
          />
          <InputSelect
            label={"Lga"}
            options={lga.map((data) => data.name)}
            handleChange={(e) =>
              setCollectorDetail({
                ...collectorDetail,
                location: e.target.value,
              })
            }
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
            onClick={() => createCollector()}
            className="bg-green-700 text-white flex justify-center items-center h-[40px] w-full gap-2"
          >
            {requestType === "edit"
              ? "save changes"
              : loading
              ? "Saving..."
              : "Create Collector"}
          </button>
        </div>
      </div>
    </div>
  );
};
