import React, { useEffect, useState } from "react";
import Avater from "../../assets/images/Avatar.png";
import useResource from "../../hooks/useResource";
import InputSelect from "../input/InputSelect";

const Header = () => {
  const [program, setProgram] = useState([]);
  const { getAllProgram } = useResource();
  useEffect(() => {
    const getPrograms = async () => {
      const res = await getAllProgram();
      setProgram(res.data);
    };
    getPrograms();
  }, []);
  return (
    <div className="w-full flex justify-between items-center h-[74px] border-b border-gray-300 p-2">
      <div className="">
        {/* <InputSelect options={program.map((data) => data.name)} /> */}
        <select className="w-[231px] bg-black text-white h-[44px] rounded-md p-2">
          {program.map((data, index) => {
            return (
              <option key={index} className="text-white">
                {data.name}
              </option>
            );
          })}
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
