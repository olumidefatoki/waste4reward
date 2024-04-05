import React from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";

const TopCard = ({
  title,
  subtitle,
  buttonTitle,
  Icon,
  setShowModal = () => {},
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-xl">{title}</h1>
        <p className="text-sm">{subtitle}</p>
      </div>
      <div className="flex gap-2">
        <button className="flex justify-center items-center h-[40px] w-[101px] border border-gray-300 gap-2">
          <IoCloudDownloadOutline /> Export
        </button>
        <button
          className="bg-green-700 text-white flex justify-center items-center h-[40px] w-[167px] gap-2"
          onClick={() => setShowModal()}
        >
          <Icon /> {buttonTitle}
        </button>
      </div>
    </div>
  );
};

export default TopCard;
