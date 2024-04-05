import React from "react";
import TopCard from "../../components/card/TopCard";
import CustomTable from "../../components/table/CustomTable";
import { GoPlus } from "react-icons/go";
import DataCard from "../../components/card/DataCard";
import InputSelect from "../../components/input/InputSelect";
import InputSearch from "../../components/input/InputSearch";

const headers = ["hello", "who", "location", "tyu"];
const rows = ["we", "are", "here", "hut"];
const index = () => {
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
      <CustomTable headers={headers} rows={rows} />
    </div>
  );
};

export default index;
