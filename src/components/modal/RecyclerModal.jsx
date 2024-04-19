/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState, useEffect } from "react";
import { PiUsers } from "react-icons/pi";
import InputText from "../input/InputText";
import InputSelect from "../input/InputSelect";
import { IoCloseOutline } from "react-icons/io5";
import SearchableDropdown from "../input/SearchableDropdown";
import useRecycler from "../../hooks/useRecycler";
import { getState, getLgaByState } from "../../ds/resource";
import toast from "react-hot-toast";
import { updateRecycler } from "../../ds/recycler";

export const RecyclerModal = ({
  model,
  closeModal,
  requestType,
  id,
  detail,
}) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { createNewRecycler } = useRecycler();

  const [states, setStates] = useState([]);
  const [lga, setLga] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedStateId, setSelectedStateId] = useState(0);

  const [recyclerDetail, setRecyclerDetail] = useState({
    name: "",
    contactPersonFirstName: "",
    contactPersonLastName: "",
    phoneNumber: "",
    address: "",
    state: "",
    email: "",
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

  const createRecycler = async () => {
    const formdata = {
      name: recyclerDetail.name,
      address: recyclerDetail.address,
      email: recyclerDetail.email,
      state: recyclerDetail.state,
      contactPersonFirstName: recyclerDetail.contactPersonFirstName,
      contactPersonLastName: recyclerDetail.contactPersonLastName,
      phoneNumber: recyclerDetail.phoneNumber,
    };

    try {
      setLoading(true);
      const res = await createNewRecycler(formdata);
      if (res.errors) {
        toast.error(Object.values(res.errors)[0]);
        return;
      }
      toast.success("Recycler created");
      closeModal();
    } catch (error) {
      toast.error(error.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const editRecycler = async () => {
    const formdata = {
      id: id,
      name: recyclerDetail.name,
      address: recyclerDetail.address,
      email: recyclerDetail.email,
      state: recyclerDetail.state,
    };

    try {
      setLoading(true);
      const res = await updateRecycler(formdata);
      // console.log({ res });

      if (res.errors) {
        toast.error(Object.values(res.errors)[0]);
        return;
      }
      toast.success("Recycler updated");
      closeModal();
    } catch (error) {
      toast.error(error.message || "something went wrong");
    } finally {
      setLoading(false);
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
            {requestType === "edit" ? "Edit Recycler" : "Create new Recycler"}
          </h1>
          <p className="text-sm" onClick={() => console.log(detail)}>
            Enter the details below
          </p>
        </div>
        <div className="w-full">
          <InputText
            label={"Name"}
            placeholder={requestType === "edit" ? detail.name : "Enter name"}
            value={recyclerDetail.name}
            handleChange={(e) =>
              setRecyclerDetail({
                ...recyclerDetail,
                name: e.target.value,
              })
            }
            css="w-full"
          />
        </div>

        <div className="flex justify-between">
          <InputText
            label={"Contact person first name"}
            placeholder={
              requestType === "edit"
                ? detail.contactPersonFirstName
                : "Enter first name"
            }
            value={recyclerDetail.contactPersonFirstName}
            handleChange={(e) =>
              setRecyclerDetail({
                ...recyclerDetail,
                contactPersonFirstName: e.target.value,
              })
            }
          />
          <InputText
            label={"Contact person last name"}
            placeholder={
              requestType === "edit"
                ? detail.contactPersonLastName
                : "Enter last name"
            }
            value={recyclerDetail.lastName}
            handleChange={(e) =>
              setRecyclerDetail({
                ...recyclerDetail,
                contactPersonLastName: e.target.value,
              })
            }
          />
        </div>

        <div className="flex justify-between">
          <InputText
            label={"Phone number"}
            placeholder={
              requestType === "edit" ? detail.phoneNumber : "Enter phone number"
            }
            value={recyclerDetail.phoneNumber}
            handleChange={(e) =>
              setRecyclerDetail({
                ...recyclerDetail,
                phoneNumber: e.target.value,
              })
            }
          />
          <InputText
            label={"Email address"}
            placeholder={
              requestType === "edit" ? detail.email : "Enter email address"
            }
            value={recyclerDetail.email}
            handleChange={(e) =>
              setRecyclerDetail({
                ...recyclerDetail,
                email: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full">
          <InputText
            label={"Address"}
            placeholder={
              requestType === "edit" ? detail.address : "Enter  address"
            }
            value={recyclerDetail.address}
            handleChange={(e) =>
              setRecyclerDetail({
                ...recyclerDetail,
                address: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full">
          <SearchableDropdown
            label={"State"}
            placeholder={requestType === "edit" ? detail.state : "Select state"}
            options={states}
            handleChange={(selectionOption) => {
              setSelectedState(selectionOption.label);
              setSelectedStateId(selectionOption.value);
              setRecyclerDetail({
                ...recyclerDetail,
                state: selectionOption.label,
              });
            }}
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

          {requestType === "edit" ? (
            <button
              onClick={() => editRecycler()}
              className="bg-green-700 text-white flex justify-center items-center h-[40px] w-full gap-2"
            >
              {loading ? "Updating..." : "Save changes"}
            </button>
          ) : (
            <button
              onClick={() => createRecycler()}
              className="bg-green-700 text-white flex justify-center items-center h-[40px] w-full gap-2"
            >
              {loading ? "Creating..." : "Create Recycler"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
