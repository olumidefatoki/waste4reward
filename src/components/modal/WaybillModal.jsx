/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from "react";
import { PiUsers } from "react-icons/pi";
import InputText from "../input/InputText";
import InputSelect from "../input/InputSelect";
import InputSelect2 from "../input/InputSelect2";
import { IoCloseOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import useWaybill from "../../hooks/useWaybill";
import InputFile from "../input/InputFile";
import { createWaybillSchema } from "../../utils/validationSchema/waybill";

export const WaybillModal = ({
  model,
  closeModal,
  requestType,
  aggregatorList,
  recyclerList,
}) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { createNewWaybill } = useWaybill();

  const [waybillDetail, setWaybillDetail] = useState({
    amount: "",
    quantity: "",
    aggregatorId: 0,
    recyclerId: 0,
    file: null,
  });

  const createWaybill = async () => {
    try {
      if (requestType === "edit") {
        setLoading(true);
        const res = await createNewWaybill();
        // console.log({ res });
      }
      setLoading(true);
      const res = await createNewWaybill(waybillDetail);
      if (res.errors) {
        toast.error(Object.values(res.errors)[0]);
        return;
      }
      toast.success("Waybill created");
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
            {requestType === "edit" ? "Edit Waybill" : "Create new Waybill"}
          </h1>
          <p className="text-sm">Enter the details below</p>
        </div>
        <div className="flex justify-between">
          <InputText
            label={"Amount"}
            placeholder={"Enter amount"}
            value={waybillDetail.amount}
            handleChange={(e) =>
              setWaybillDetail({
                ...waybillDetail,
                amount: e.target.value,
              })
            }
          />
          <InputText
            label={"Quantity"}
            placeholder={"Enter quantity"}
            value={waybillDetail.quantity}
            handleChange={(e) =>
              setWaybillDetail({
                ...waybillDetail,
                quantity: e.target.value,
              })
            }
          />
        </div>

        <div className="flex justify-between w-full">
          <InputSelect2
            label={"Aggregator"}
            placeholder="Select aggregator"
            options={aggregatorList}
            handleChange={(e) =>
              setWaybillDetail({
                ...waybillDetail,
                aggregatorId: e.target.value,
              })
            }
          />
          <InputSelect2
            label={"Recycler"}
            placeholder="Select recycler"
            options={recyclerList}
            handleChange={(e) =>
              setWaybillDetail({
                ...waybillDetail,
                recyclerId: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full">
          <InputFile
            label="File upload"
            handleChange={(e) =>
              setWaybillDetail({ ...waybillDetail, file: e.target.files[0] })
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
            onClick={() => createWaybill()}
            className="bg-green-700 text-white flex justify-center items-center h-[40px] w-full gap-2"
          >
            {requestType === "edit" ? "Save Changes" : "Create Waybill"}
          </button>
        </div>
      </div>
    </div>
  );
};
