/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState, useEffect, forwardRef } from "react";
import { PiUsers } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";
import InputText from "../input/InputText";
import InputSelect from "../input/InputSelect";
import InputSelect2 from "../input/InputSelect2";
import SearchableDropdown from "../input/SearchableDropdown";
import { createCollectorSchema } from "../../utils/validationSchema/collectorSchema";
import useCollector from "../../hooks/useCollector";

import { getState, getLgaByState } from "../../ds/resource";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import toast, { Toaster } from "react-hot-toast";

export const CollectorModal = ({
  model,
  closeModal,
  requestType,
  aggregatorList,
  detail,
  id,
}) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { createNewCollector, updateExistingCollector } = useCollector();

  const [startDate, setStartDate] = useState();

  const [states, setStates] = useState([]);
  const [lga, setLga] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedStateId, setSelectedStateId] = useState(0);
  const [selectedLga, setSelectedLga] = useState("");

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

  //get state
  useEffect(() => {
    const getAllState = async () => {
      const res = await getState();
      const list = res.data.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setStates([...list]);
    };
    getAllState();
  }, []);

  useEffect(() => {
    if (selectedStateId) {
      const getLgaFromState = async () => {
        const res = await getLgaByState(selectedStateId);

        console.log(res);

        const list = res.data.map((item) => {
          return {
            label: item.name,
            value: item.name,
          };
        });
        setLga([...list]);
      };
      getLgaFromState();
    }
  }, [selectedStateId]);

  const [isLoading, setisLoading] = useState(false);
  // const [errorMsg, setErrorMsg] = useState("");
  // const [showToast, setShowToast] = useState(false);
  // const [showErrToast, setShowErrToast] = useState(false);

  const createCollector = async (data) => {
    // console.log(collectorDetail);
    setLoading(true);

    try {
      setLoading(true);
      const res = await createNewCollector(collectorDetail);
      if (res.errors) {
        toast.error(Object.values(res.errors)[0]);
        return;
      }
      toast.success("Collector created");
      closeModal();
    } catch (error) {
      toast.error(error.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const editCollector = async () => {
    const formdata = {
      id: id,
      address: collectorDetail.address,
      firstName: collectorDetail.firstName,
      lastName: collectorDetail.lastName,
      phoneNumber: collectorDetail.phoneNumber,
      email: collectorDetail.email,
      location: collectorDetail.location,
      state: collectorDetail.state,
      gender: collectorDetail.gender,
      dateOfBirth: collectorDetail.dateOfBirth,
      aggregatorId: collectorDetail.aggregatorId,
      disabilityStatus: collectorDetail.disabilityStatus,
    };

    try {
      setLoading(true);
      const res = await updateExistingCollector(formdata);
      console.log({ res });
      if (res.errors) {
        toast.error(Object.values(res.errors)[0]);
        return;
      }
      toast.success("Collector updated");
      closeModal();
    } catch (error) {
      toast.error(error.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="flex flex-col gap-2">
      <label>Date of birth</label>
      <div
        className="example-custom-input border border-gray-300 h-[44px] w-[280px] p-2 rounded-md"
        onClick={onClick}
        ref={ref}
      >
        <h3>
          {value
            ? value
            : requestType === "edit"
            ? detail.dateOfBirth
            : "Select date of birth"}
        </h3>
      </div>
    </div>
  ));

  return (
    <div style={{ height: "500px" }}>
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
          <p className="text-sm" onClick={() => console.log(detail)}>
            Enter the details below
          </p>
        </div>
        <div className="flex justify-between">
          <InputText
            label={"FirstName"}
            placeholder={
              requestType === "edit" ? detail.firstName : "Enter first name"
            }
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
            placeholder={
              requestType === "edit" ? detail.lastName : "Enter last name"
            }
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
            placeholder={
              requestType === "edit" ? detail.gender : "Select gender"
            }
            options={["Male", "Female"]}
            handleChange={(e) =>
              setCollectorDetail({
                ...collectorDetail,
                gender: e.target.value,
              })
            }
          />

          {/* date of birth */}
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setCollectorDetail({
                ...collectorDetail,
                dateOfBirth: moment(date).format("YYYY-MM-DD"),
              });
            }}
            customInput={<ExampleCustomInput />}
            showYearDropdown
            yearDropdownItemNumber={100}
            scrollableYearDropdown
          />
        </div>
        <div className="flex justify-between w-full">
          <InputText
            label={"Phone Number"}
            placeholder={
              requestType === "edit" ? detail.phoneNumber : "Enter phone number"
            }
            value={collectorDetail.phoneNumber}
            handleChange={(e) =>
              setCollectorDetail({
                ...collectorDetail,
                phoneNumber: e.target.value,
              })
            }
          />

          <div className="w-[45%]">
            <SearchableDropdown
              label={"Aggregator"}
              options={aggregatorList}
              placeholder={
                requestType === "edit" ? detail.aggregator : "Select aggregator"
              }
              handleChange={(e) =>
                setCollectorDetail({
                  ...collectorDetail,
                  aggregatorId: e.value,
                })
              }
            />
          </div>
        </div>
        <div className="flex justify-between w-full">
          <InputText
            label={"Email Address"}
            placeholder={
              requestType === "edit" ? detail.email : "Enter email address"
            }
            value={collectorDetail.email}
            handleChange={(e) =>
              setCollectorDetail({
                ...collectorDetail,
                email: e.target.value,
              })
            }
          />
          <InputSelect
            label={"Disability Status"}
            placeholder={
              requestType === "edit"
                ? detail.disabilityStatus
                : "Select disability status"
            }
            options={["Able", "Disabled"]}
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
            label={"Address"}
            placeholder={
              requestType === "edit" ? detail.address : "Enter address"
            }
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
          <div className="w-[46%]">
            <SearchableDropdown
              label={"State"}
              options={states}
              placeholder={
                requestType === "edit" ? detail.state : "Select state"
              }
              handleChange={(selectionOption) => {
                setSelectedState(selectionOption.label);
                setSelectedStateId(selectionOption.value);
                setCollectorDetail({
                  ...collectorDetail,
                  state: selectionOption.label,
                });
              }}
            />
          </div>
          <div className="w-[46%]">
            <SearchableDropdown
              label={"Lga"}
              options={lga}
              placeholder={
                requestType === "edit" ? detail.location : "Select LGA"
              }
              handleChange={(e) =>
                setCollectorDetail({
                  ...collectorDetail,
                  location: e.value,
                })
              }
            />
          </div>
        </div>

        <br />
        <div className="flex gap-2 justify-center">
          <button
            className="mx-auto px-2 w-full h-[40px] font-normal text-xs flex justify-center items-center gap-3 disabled:cursor-not-allowed border border-pfBlack md:w-272"
            onClick={() => closeModal()}
          >
            Cancel
          </button>

          {requestType === "edit" ? (
            <button
              onClick={() => editCollector()}
              className="bg-green-700 text-white flex justify-center items-center h-[40px] w-full gap-2"
            >
              {loading ? "Updating..." : "Save changes"}
            </button>
          ) : (
            <button
              onClick={() => createCollector()}
              className="bg-green-700 text-white flex justify-center items-center h-[40px] w-full gap-2"
            >
              {loading ? "Creating..." : "Create Collector"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
