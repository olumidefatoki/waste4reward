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

const headers = [
  "Recycler",
  "Aggregators",
  "Quantity",
  "Amount",
  "Attachment",
  "Date",
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
  const [viewDetail, setViewDetail] = useOutsideClick(wrapperRef);
  const [editDetail, setEditDetail] = useOutsideClick(wrapperRef);

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
      setTotalPages(res.data.totalPages);
      setWaybills(res.data?.content);
    };
    getWaybills();
  }, [page]);

  useEffect(() => {
    const getAllState = async () => {
      const res = await getAllStates();
      setStates(res.data);
    };
    getAllState();
  }, []);
  useEffect(() => {
    const getAllLga = async () => {
      const res = await getAllLgas();
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
            recycler: data.recycler,
            aggregator: data.aggregator,
            quantity: data.quantity,
            amount: data.amount,
            attachment: data.attachment1,
            date: data.createdAt,
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
          <WaybillModal closeModal={() => setShowModal(false)} />
        </Modal>
      )}
      {editDetail && (
        <Modal
          variant="default"
          refProp={wrapperRef}
          closeModal={() => setEditDetail(false)}
        >
          <WaybillModal
            closeModal={() => setEditDetail(false)}
            requestType={"edit"}
          />
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

export default Waybill;
