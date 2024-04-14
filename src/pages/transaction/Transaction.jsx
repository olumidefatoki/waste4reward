import React, { useEffect, useRef, useState } from "react";
import TopCard from "../../components/card/TopCard";
import CustomTable from "../../components/table/CustomTable";
import { GoPlus } from "react-icons/go";
import DataCard from "../../components/card/DataCard";
import InputSelect from "../../components/input/InputSelect";
import InputSearch from "../../components/input/InputSearch";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import useTransaction from "../../hooks/useTransaction";
import { FiEdit } from "react-icons/fi";
import { getLga, getState } from "../../ds/resource";
import useOutsideClick from "../../hooks/useOutsideClick";
import useResource from "../../hooks/useResource";
import { toMoney } from "../../utils/utils";
import Modal from "../../components/Modal";
import ViewDetail from "../../components/modal/ViewDetail";

import { AggregatorModal } from "../../components/modal/AggregatorModal";
import PaginationPane from "../../components/table/PaginationPane";

const headers = [
  "Collector",
  "Aggregaor",
  "Price",
  "Quantity",
  "Amount",
  "State",
];
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

const Transaction = () => {
  const wrapperRef = useRef(null);
  const [query, setQuery] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [states, setStates] = useState([]);
  const [lga, setLga] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useOutsideClick(wrapperRef);
  const [viewDetail, setViewDetail] = useOutsideClick(wrapperRef);
  const [editDetail, setEditDetail] = useOutsideClick(wrapperRef);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  const { getTransactions } = useTransaction(query, selectedState);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await getTransactions(page, limit);
      setTotalPages(res.data.totalPages);
      setTransactions(res.data?.content);
    };
    fetchTransactions();
  }, [page, query, selectedState]);

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

  return (
    <div className="p-4">
      <div className="mb-10">
        <TopCard
          title={"Transaction"}
          subtitle={"List of transactions on the platform."}
          buttonTitle={"New Transaction"}
          Icon={GoPlus}
          exportType="transaction"
        />
      </div>
      <div className="mb-10">
        <DataCard />
      </div>
      <div className="mb-10 flex justify-between">
        <div className="flex gap-2">
          <InputSelect
            options={states.map((data) => data.name)}
            placeholder="Select State"
            handleChange={(e) => setSelectedState(e.target.value)}
          />
          <InputSelect options={lga.map((data) => data.name)} />
        </div>
        <div>
          <InputSearch
            placeholder={"search"}
            inputValue={query}
            setInputValue={setQuery}
          />
        </div>
      </div>

      {transactions.length > 0 ? (
        <CustomTable
          headers={headers}
          rows={transactions?.map((data, index) => {
            return {
              checkbox: <input type="checkbox" />,
              aggregator: data.aggregator,
              collector: data.collector,
              price: "NGN " + toMoney(data.price),

              quantity: data.quantity,
              amount: "NGN " + toMoney(data.amount),
              state: data.state,
              edit: <MdOutlineRemoveRedEye />,
              open: <FiEdit onClick={() => setEditDetail(true)} />,
            };
          })}
        />
      ) : (
        <div className="flex justify-center">
          <p className="text-center">Loading...</p>
        </div>
      )}

      <PaginationPane
        currentPage={page > 1 ? page : 1}
        totalPages={totalPages || 1}
        nextPage={() => setPage((prev) => (prev >= totalPages ? 1 : prev + 1))}
        prevPage={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
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
      {editDetail && (
        <Modal
          variant="default"
          refProp={wrapperRef}
          closeModal={() => setEditDetail(false)}
        >
          <AggregatorModal
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

export default Transaction;
