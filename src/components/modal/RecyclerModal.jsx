/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState, useEffect } from "react";
import { PiUsers } from "react-icons/pi";
import InputText from "../input/InputText";
import InputSelect from "../input/InputSelect";
import { IoCloseOutline } from "react-icons/io5";
import { Form, Formik } from "formik";
import useRecycler from "../../hooks/useRecycler";
import { getState, getLga } from "../../ds/resource";
import toast from "react-hot-toast";
export const RecyclerModal = ({ model, closeModal, requestType }) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { createNewRecycler } = useRecycler();

  const [states, setStates] = useState([]);
  const [lga, setLga] = useState([]);

  const [recyclerDetail, setRecyclerDetail] = useState({
    name: "",
    address: "",
    state: "",
    email: "",
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

  const createRecycler = async () => {
    const formdata = {
      name: recyclerDetail.name,
      address: recyclerDetail.address,
      email: recyclerDetail.email,
      state: recyclerDetail.state,
    };

    try {
      if (requestType === "edit") {
        setLoading(true);
        const res = await createNewRecycler(formdata);
        // console.log({ res });
      }
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
          <p className="text-sm">Enter the details below</p>
        </div>
        <div className="w-full">
          <InputText
            label={"Name"}
            placeholder={"Enter name"}
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

        <div className="w-full">
          <InputText
            label={"Address"}
            placeholder={"Enter  address"}
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
          <InputText
            label={"Email Address"}
            placeholder={"Enter email address"}
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
          <InputSelect
            label={"State"}
            placeholder="Select state"
            options={states.map((data) => data.name)}
            handleChange={(e) =>
              setRecyclerDetail({
                ...recyclerDetail,
                state: e.target.value,
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
            onClick={() => createRecycler()}
            className="bg-green-700 text-white flex justify-center items-center h-[40px] w-full gap-2"
          >
            {requestType === "edit"
              ? "Save Changes"
              : loading
              ? "Creating..."
              : "Create Recycler"}
          </button>
        </div>
      </div>
    </div>
  );
};
