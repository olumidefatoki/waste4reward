import React from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import BottleWater from "../../assets/images/bottle-of-water.png";

const DataCard = ({
  title,
  subtitle,
  figure,
  image,
  css,
  icon,
  imageHeight,
}) => {
  return (
    <div
      className={`flex flex-col justify-center   ${
        css ? css : "w-full h-max"
      } rounded-md`}
    >
      <div className="flex justify-between items-center gap-2 pl-2 pt-4">
        <p>{title}</p>
        {icon ? (
          <MdOutlineArrowRightAlt className="pr-2" style={{ width: 24 }} />
        ) : (
          ""
        )}
      </div>
      <div className="flex justify-between items-end place-content-between h-full p-2">
        <div className="">
          <div className="flex gap-2">
            <p className="font-bold">{subtitle}</p>
          </div>
          {figure && <p>{figure}</p>}
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

export default DataCard;
