import React from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import InputSelect from "../input/InputSelect";

const DashCard = ({ title, subtitle, figure, image, css, imageHeight }) => {
  return (
    <div
      className={`flex flex-col justify-center w-[391px] min-h-[122px] ${css} rounded-md`}
    >
      <div className="flex justify-between items-center gap-2 pl-2 pt-4">
        <p>{title}</p>
        <MdOutlineArrowRightAlt className="pr-2" style={{ width: 24 }} />
      </div>
      <div className="flex justify-between items-end place-content-between h-full">
        <div className="p-3">
          <div className="flex gap-2">
            <p className="font-bold">{subtitle}</p>
            <p className="text-green-400">MT</p>
          </div>
          <p>{figure}</p>
        </div>
        <div className={`${imageHeight}`}>
          <img
            src={image}
            alt="bottle water"
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashCard;
