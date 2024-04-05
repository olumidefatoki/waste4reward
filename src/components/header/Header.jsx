import React from "react";
import Avater from "../../assets/images/Avatar.png";

const Header = () => {
  return (
    <div className="w-full flex justify-between items-center h-[74px] p-2">
      <div className="w-40 h-7 ">
        <select className="w-full bg-black text-white h-full">
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
