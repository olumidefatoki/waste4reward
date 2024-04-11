import React from "react";
import { PiUsers } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";
import moment from "moment/moment";

const ViewDetail = ({
  detail,
  closeModal,
  loading,
  title,
  subtitle,
  editbutton,
  id,
}) => {
  return (
    <div className="flex flex-col gap-y-2 w-[640px] bg-white p-4 h-max h-[524px]">
      <div className="flex justify-between">
        <PiUsers style={{ width: 26, height: 26 }} />
        <IoCloseOutline
          style={{ width: 26, height: 26, cursor: "pointer" }}
          onClick={() => closeModal()}
        />
      </div>
      <div className="flex justify-between items-center mb-3">
        <div>
          <h1 className="capitalize font-bold">{title}</h1>
          {subtitle ? <p className="text-sm">{subtitle}</p> : ""}
        </div>
        {editbutton ? (
          <button className="w-max p-1 border border-gray-300">Edit</button>
        ) : (
          ""
        )}
      </div>
      {loading ? (
        <div className="flex justify-center">
          <h3>Loading details</h3>
        </div>
      ) : (
        <div className="flex gap-10">
          <div className="flex flex-col gap-2">
            {Object?.keys(detail)?.map((data, index) => {
              return <p className="capitalize">{data}</p>;
            })}
          </div>
          <div className="flex flex-col gap-2">
            {Object?.values(detail)?.map((data, index) => {
              if (!data) {
                return <p>---</p>;
              }
              return <p className="capitalize">{data}</p>;
            })}
          </div>
        </div>
      )}

      <div className="bg-[#EDFCF2] flex flex-col justify-center rounded-md h-[100px] w-[576px] pl-4">
        <p>Date Created</p>
        <p>{detail.createdAt ? detail.createdAt : "---"}</p>
      </div>
    </div>
  );
};

export default ViewDetail;
