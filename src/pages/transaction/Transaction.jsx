import React from "react";
import TopCard from "../../components/card/TopCard";
import CustomTable from "../../components/table/CustomTable";
import { GoPlus } from "react-icons/go";
import DataCard from "../../components/card/DataCard";
import InputSelect from "../../components/input/InputSelect";
import InputSearch from "../../components/input/InputSearch";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const headers = ["Company", "Email Address", "Phone Number", "State"];
const rows = [
  {
    company: "JDSL Recycling Limited",
    email: "	Jehoshebaidera@gmail.com",
    phone_number: "080331485238",
    state: "Sagamu",
  },
  {
    company: "JDSL Recycling Limited",
    email: "	Jehoshebaidera@gmail.com",
    phone_number: "080331485238",
    state: "Sagamu",
  },
  {
    company: "JDSL Recycling Limited",
    email: "	Jehoshebaidera@gmail.com",
    phone_number: "080331485238",
    state: "Sagamu",
  },
  {
    company: "JDSL Recycling Limited",
    email: "	Jehoshebaidera@gmail.com",
    phone_number: "080331485238",
    state: "Sagamu",
  },
];
const Transaction = () => {
  return (
    <div className="p-4">
      <div className="mb-10">
        <TopCard
          title={"Transaction"}
          subtitle={"List of transactions on the platform."}
          buttonTitle={"New Transaction"}
          Icon={GoPlus}
        />
      </div>
      <div className="mb-10">
        <DataCard />
      </div>
      <div className="mb-10 flex justify-between">
        <div className="flex gap-2">
          <InputSelect options={["state"]} />
          <InputSelect options={["lga"]} />
        </div>
        <div>
          <InputSearch placeholder={"search"} />
        </div>
      </div>
      <CustomTable
        headers={headers}
        rows={rows.map((data, index) => {
          return {
            checkbox: <input type="checkbox" />,
            company: (
              <div className="flex flex-col">
                <p>{data.company}</p>
                <p>{data.address}</p>
              </div>
            ),
            email: data.email,
            phone_number: data.phone_number,
            state: data.state,
            edit: <MdOutlineRemoveRedEye />,
            open: <FiEdit />,
          };
        })}
      />
    </div>
  );
};

export default Transaction;
