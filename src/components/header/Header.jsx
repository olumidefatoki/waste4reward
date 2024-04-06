import React from "react";
import Avater from "../../assets/images/Avatar.png";

const Header = () => {
  return (
    <div className="w-full flex justify-between items-center h-[74px] border-b border-gray-300 p-2">
      <div className="">
        <select className="w-[231px] bg-black text-white h-[44px] rounded-md p-2">
          <option>Eci program</option>
        </select>
      </div>
      <div className="h-[40px] w-[40px] rounded-full">
        <img
          src={Avater}
          alt="profile"
          style={{ width: "100%", height: "auto", objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default Header;
