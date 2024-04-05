import React from "react";
import { PiUsers } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";

const ViewDetail = ({ detail, closeModal }) => {
  return (
    <div className="flex flex-col gap-y-2 w-[640px] bg-white p-4 h-max">
      <div className="flex justify-between">
        <PiUsers style={{ width: 26, height: 26 }} />
        <IoCloseOutline
          style={{ width: 26, height: 26, cursor: "pointer" }}
          onClick={() => closeModal()}
        />
      </div>
      <div className="">
        <h1 className="capitalize font-bold">create new Aggregator</h1>
        <p className="text-sm">Enter the details below</p>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          {Object.keys(detail).map((data, index) => {
            return <p className="capitalize">{data}</p>;
          })}
        </div>
        <div className="flex flex-col gap-2">
          {Object.values(detail).map((data, index) => {
            return <p className="capitalize">{data}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewDetail;
