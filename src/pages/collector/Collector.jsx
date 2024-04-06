import React, { useRef, useState } from "react";
import TopCard from "../../components/card/TopCard";
import CustomTable from "../../components/table/CustomTable";
import { GoPlus } from "react-icons/go";
import DataCard from "../../components/card/DataCard";
import InputSelect from "../../components/input/InputSelect";
import InputSearch from "../../components/input/InputSearch";
import Character from "../../assets/images/Character.png";
import useOutsideClick from "../../hooks/useOutsideClick";
import Modal from "../../components/Modal";
import { CollectorModal } from "../../components/modal/CollectorModal";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import ViewDetail from "../../components/modal/ViewDetail";
import PaginationPane from "../../components/table/PaginationPane";
import { EditCollectorModal } from "../../components/editmodal/CollectorModal";

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

const detail = {
  "first Name": "Jehoshe",
  "last Name": "Baidera",
  "phone Number": "080331485238",
  "email Address": "Jehoshebaidera@gmail.com",
  address: "Wuse zone 3 Near Access bank Abuja, Nigeria",
  state: "Sagamu",
  lga: "amu",
  "year of incorporation": "14 January 2024",
  dateCreated: "14 January 2024",
};
const Collector = () => {
  const wrapperRef = useRef(null);
  const [showModal, setShowModal] = useOutsideClick(wrapperRef);
  const [viewDetail, setViewDetail] = useState(false);
  const [editDetail, setEditDetail] = useState(false);

  return (
    <div className="p-4">
      <div className="mb-10">
        <TopCard
          title={"Collectors"}
          subtitle={"List of collectors on the platform."}
          buttonTitle={"New Collector"}
          Icon={GoPlus}
          setShowModal={() => setShowModal(true)}
        />
      </div>
      <div className="mb-10">
        <DataCard
          css={"bg-[#FFFAEB]"}
          image={Character}
          title={"Total collectors"}
          subtitle={"4,086"}
          figure={"16 state"}
        />
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
            edit: <MdOutlineRemoveRedEye onClick={() => setViewDetail(true)} />,
            open: <FiEdit onClick={() => setEditDetail(true)} />,
          };
        })}
      />
      <PaginationPane />
      {showModal && (
        <Modal
          variant="default"
          refProp={wrapperRef}
          closeModal={() => setShowModal(false)}
        >
          <CollectorModal />
        </Modal>
      )}
      {editDetail && (
        <Modal
          variant="default"
          refProp={wrapperRef}
          closeModal={() => setEditDetail(false)}
        >
          <EditCollectorModal closeModal={() => setEditDetail(false)} />
        </Modal>
      )}
      {viewDetail && (
        <Modal
          variant="default"
          refProp={wrapperRef}
          closeModal={() => setViewDetail(false)}
        >
          <ViewDetail
            detail={detail}
            closeModal={() => setViewDetail(false)}
            title={"Collector Details"}
            subtitle={"Collector details below"}
            dateCreated={"14 January 2024"}
            editbutton={true}
          />
        </Modal>
      )}
    </div>
  );
};

export default Collector;
