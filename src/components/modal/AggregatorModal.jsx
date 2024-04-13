/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState, useEffect } from "react";
import { PiUsers } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";
import InputText from "../input/InputText";
import InputSelect from "../input/InputSelect";
// import { Form, Formik } from "formik";
import useAggregator from "../../hooks/useAggregator";
import { createAggregatorSchema } from "../../utils/validationSchema/aggregatorSchema";

import { getState, getLga } from "../../ds/resource";

export const AggregatorModal = ({ model, closeModal, requestType }) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { createNewAggregator } = useAggregator();

  const [states, setStates] = useState([]);
  const [lga, setLga] = useState([]);

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

  // const [isLoading, setisLoading] = useState(false);
  // const [errorMsg, setErrorMsg] = useState("");
  // const [showToast, setShowToast] = useState(false);
  // const [showErrToast, setShowErrToast] = useState(false);

  //   {
  //     "address": "{{$randomStreetAddress}}",
  //    "name": "{{$randomCompanyName}}",
  //    "phoneNumber": "{{phoneNumber}}",
  //    "email": "{{$randomEmail}}",
  //    "location": "BWARI",
  //    "state": "FCT",
  //    "yearOfIncorporation": "2024-01-01"

  // }

  const [aggregatorDetail, setAggregatorDetail] = useState({
    address: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    location: "",
    state: "",
    yearOfIncorporation: "",
  });

  const createAggregator = async () => {
    // console.log(aggregatorDetail);

    const formdata = {
      address: aggregatorDetail.location,
      name: `${aggregatorDetail.firstName} ${aggregatorDetail.lastName}`,
      phoneNumber: aggregatorDetail.phoneNumber,
      email: aggregatorDetail.phoneNumber,
      location: aggregatorDetail.location,
      state: aggregatorDetail.state,
      yearOfIncorporation: aggregatorDetail.yearOfIncorporation,
    };
    try {
      if (requestType === "edit") {
        setLoading(true);
        const res = await createNewAggregator();
        console.log({ res });
      }
      setLoading(true);
      const res = await createNewAggregator(formdata);
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
            {requestType === "edit"
              ? "Edit Aggregator"
              : "create new Aggregator"}
          </h1>
          <p className="text-sm">Enter the details below</p>
        </div>
        <div className="flex justify-between">
          <InputText
            label={"FirstName"}
            placeholder={"Enter first name"}
            value={aggregatorDetail.firstName}
            handleChange={(e) =>
              setAggregatorDetail({
                ...aggregatorDetail,
                firstName: e.target.value,
              })
            }
          />
          <InputText
            label={"LastName"}
            placeholder={"Enter last name"}
            value={aggregatorDetail.lastName}
            handleChange={(e) =>
              setAggregatorDetail({
                ...aggregatorDetail,
                lastName: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full">
          <InputText
            label={"Phone Number"}
            placeholder={"Enter phone number"}
            value={aggregatorDetail.phoneNumber}
            handleChange={(e) =>
              setAggregatorDetail({
                ...aggregatorDetail,
                phoneNumber: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full">
          <InputText
            label={"Email Address"}
            placeholder={"Enter email address"}
            value={aggregatorDetail.email}
            handleChange={(e) =>
              setAggregatorDetail({
                ...aggregatorDetail,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className="flex justify-between w-full">
          <InputSelect
            label={"State"}
            options={states.map((data) => data.name)}
            handleChange={(e) =>
              setAggregatorDetail({
                ...aggregatorDetail,
                state: e.target.value,
              })
            }
          />
          <InputSelect
            label={"Lga"}
            options={lga.map((data) => data.name)}
            handleChange={(e) =>
              setAggregatorDetail({
                ...aggregatorDetail,
                location: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full mb-10">
          <InputText
            label={"Year of Incorporation"}
            placeholder={"Enter year of incorporation"}
            value={aggregatorDetail.yearOfIncorporation}
            handleChange={(e) =>
              setAggregatorDetail({
                ...aggregatorDetail,
                yearOfIncorporation: e.target.value,
              })
            }
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
            type="submit"
            onClick={() => createAggregator()}
            className="bg-green-700 text-white flex justify-center items-center h-[40px] w-full gap-2"
          >
            {requestType === "edit" ? "Save Changes" : "Create Aggregator"}
          </button>
        </div>
      </div>
    </div>
  );
};
