import React, { useEffect, useRef, useState } from "react";
import CustomTable from "../../components/table/CustomTable";
import TopCard from "../../components/card/TopCard";
import { GoPlus } from "react-icons/go";
import DataCard from "../../components/card/DataCard";
import InputSelect from "../../components/input/InputSelect";
import InputSearch from "../../components/input/InputSearch";
import Character from "../../assets/images/Characters.png";
import Modal from "../../components/Modal";
import { AggregatorModal } from "../../components/modal/AggregatorModal";
import { EditAggregatorModal } from "../../components/editmodal/AggregatorModal";
import useOutsideClick from "../../hooks/useOutsideClick";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import ViewDetail from "../../components/modal/ViewDetail";
import PaginationTab from "../../components/table/PaginationTab";
import PaginationPane from "../../components/table/PaginationPane";
import useAggregator from "../../hooks/useAggregator";
import fetcher from "../../api/fetacher";
import { getLga, getState } from "../../ds/resource";

const headers = ["Company", "Email Address", "Phone Number", "State"];
const rows = [
  {
    company: "JDSL Recycling Limited",
    address: "Wuse zone 3 Near Access bank Abuja, Nigeria",
    email: "	Jehoshebaidera@gmail.com",
    phone_number: "080331485238",
    state: "Sagamu",
  },
  {
    company: "JDSL Recycling Limited",
    address: "Wuse zone 3 Near Access bank Abuja, Nigeria",
    email: "Jehoshebaidera@gmail.com",
    phone_number: "080331485238",
    state: "Sagamu",
  },
  {
    company: "JDSL Recycling Limited",
    address: "Wuse zone 3 Near Access bank Abuja, Nigeria",
    email: "Jehoshebaidera@gmail.com",
    phone_number: "080331485238",
    state: "Sagamu",
  },
  {
    company: "JDSL Recycling Limited",
    address: "Wuse zone 3 Near Access bank Abuja, Nigeria",
    email: "Jehoshebaidera@gmail.com",
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
const Aggregator = () => {
  const wrapperRef = useRef(null);
  const [showModal, setShowModal] = useOutsideClick(wrapperRef);
  const [orderBy, setOrderBy] = useState(0);
  const [order, setOrder] = useState(0);
  const [allChecked, setAllChecked] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [editDetail, setEditDetail] = useState(false);
  const { gatAllAggregators } = useAggregator();
  const [aggregators, setAggregators] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [states, setStates] = useState([]);
  const [lga, setLga] = useState([]);
  const limit = 10;

  useEffect(() => {
    const getAggregators = async () => {
      const res = await gatAllAggregators(page, limit);
      setTotalPages(res.data.totalPages);
      setAggregators(res.data?.content);
    };
    getAggregators();
  }, [page]);

  useEffect(() => {
    const getAllState = async () => {
      const res = await getState();
      setStates(res.data);
    };
    getAllState();
  }, []);
  useEffect(() => {
    const getAllLga = async () => {
      const res = await getLga();
      setLga(res.data);
    };
    getAllLga();
  }, []);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  return (
    <div className="p-4">
      <div className="mb-10">
        <TopCard
          title={"Aggregator"}
          subtitle={"List of aggregators on the platform."}
          buttonTitle={"New Aggregator"}
          Icon={GoPlus}
          setShowModal={() => setShowModal(true)}
        />
      </div>
      <div className="mb-10">
        <DataCard
          title={"Total aggregators"}
          subtitle={20}
          figure={"20 states"}
          image={Character}
          css={"bg-[#B9E6FE]"}
        />
      </div>
      <div className="mb-10 flex justify-between">
        <div className="flex gap-2">
          <InputSelect options={states.map((data) => data.name)} />
          <InputSelect options={lga.map((data) => data.name)} />
        </div>
        <div className="min-w-[160px]">
          <InputSearch placeholder={"search"} />
        </div>
      </div>
      <CustomTable
        headers={headers}
        rows={aggregators?.map((data, index) => {
          return {
            checkbox: <input type="checkbox" />,
            company: (
              <div className="flex flex-col">
                <p>{data.name}</p>
                <p>{data.address}</p>
              </div>
            ),
            email: data.email,
            phone_number: data.phoneNumber,
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
          <AggregatorModal closeModal={() => setShowModal(false)} />
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
            title={"Aggregator Details"}
            subtitle={"Aggregator details below"}
            dateCreated={"14 January 2024"}
            editbutton={true}
          />
        </Modal>
      )}
      {editDetail && (
        <Modal
          variant="default"
          refProp={wrapperRef}
          closeModal={() => setEditDetail(false)}
        >
          <EditAggregatorModal closeModal={() => setEditDetail(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Aggregator;
