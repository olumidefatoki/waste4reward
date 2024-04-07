import React, { useEffect, useRef, useState } from "react";
import TopCard from "../../components/card/TopCard";
import CustomTable from "../../components/table/CustomTable";
import { GoPlus } from "react-icons/go";
import DataCard from "../../components/card/DataCard";
import InputSelect from "../../components/input/InputSelect";
import InputSearch from "../../components/input/InputSearch";
import useOutsideClick from "../../hooks/useOutsideClick";
import Modal from "../../components/Modal";
import { WaybillModal } from "../../components/modal/WaybillModal";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import ViewDetail from "../../components/modal/ViewDetail";
import PaginationPane from "../../components/table/PaginationPane";
import { EditWaybillModal } from "../../components/editmodal/WaybillModal";
import useWaybill from "../../hooks/useWaybill";
import useResource from "../../hooks/useResource";

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
const Waybill = () => {
  const wrapperRef = useRef(null);
  const [showModal, setShowModal] = useOutsideClick(wrapperRef);
  const [viewDetail, setViewDetail] = useState(false);
  const [editDetail, setEditDetail] = useState(false);

  const { getAllWaybills } = useWaybill();
  const { getAllStates, getAllLgas } = useResource();

  const [waybill, setWaybills] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [states, setStates] = useState([]);
  const [lga, setLga] = useState([]);
  const limit = 10;

  useEffect(() => {
    const getWaybills = async () => {
      const res = await getAllWaybills(page, limit);
      console.log({ res });
      setTotalPages(res.data.totalPages);
      setWaybills(res.data?.content);
    };
    getWaybills();
  }, [page]);

  useEffect(() => {
    const getAllState = async () => {
      const res = await getAllStates();
      console.log({ res }, "state");
      setStates(res.data);
    };
    getAllState();
  }, []);
  useEffect(() => {
    const getAllLga = async () => {
      const res = await getAllLgas();
      console.log({ res }, "lga");
      setLga(res.data);
    };
    getAllLga();
  }, []);

  return (
    <div className="p-4">
      <div className="mb-10">
        <TopCard
          title={"Waybill"}
          subtitle={"List of waybill on the platform."}
          buttonTitle={"New Waybill"}
          Icon={GoPlus}
          setShowModal={() => setShowModal(true)}
        />
      </div>
      <div className="mb-10">
        <DataCard />
      </div>
      <div className="mb-10 flex justify-between">
        <div className="flex gap-2">
          <InputSelect options={states.map((data) => data.name)} />
          <InputSelect options={lga.map((data) => data.name)} />
        </div>
        <div>
          <InputSearch placeholder={"search"} />
        </div>
      </div>
      <CustomTable
        headers={headers}
        rows={waybill.map((data, index) => {
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
      <PaginationPane
        currentPage={page}
        totalPages={totalPages}
        nextPage={() => setPage((prev) => prev + 1)}
        prevPage={() => setPage((prev) => (prev > 0 ? prev - 1 : prev))}
      />
      {showModal && (
        <Modal
          variant="default"
          refProp={wrapperRef}
          closeModal={() => setShowModal(false)}
        >
          <WaybillModal />
        </Modal>
      )}
      {editDetail && (
        <Modal
          variant="default"
          refProp={wrapperRef}
          closeModal={() => setEditDetail(false)}
        >
          <EditWaybillModal closeModal={() => setEditDetail(false)} />
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
            title={"Waybill Details"}
            // subtitle={"Aggregator details below"}
            // dateCreated={"14 January 2024"}
          />
        </Modal>
      )}
    </div>
  );
};

export default Waybill;
