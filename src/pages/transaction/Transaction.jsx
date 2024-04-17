import React, { useRef, useState, useEffect, forwardRef } from "react";
import TopCard from "../../components/card/TopCard";
import CustomTable from "../../components/table/CustomTable";
import { GoPlus } from "react-icons/go";
import DataCard from "../../components/card/DataCard";
import InputSelect from "../../components/input/InputSelect";
import InputSelect2 from "../../components/input/InputSelect2";
import SearchableDropdown from "../../components/input/SearchableDropdown";
import InputSearch from "../../components/input/InputSearch";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import useTransaction from "../../hooks/useTransaction";
import { FiEdit } from "react-icons/fi";
import { getLgaByState, getState } from "../../ds/resource";
import useOutsideClick from "../../hooks/useOutsideClick";
import useResource from "../../hooks/useResource";
import { toMoney } from "../../utils/utils";
import Modal from "../../components/Modal";
import ViewDetail from "../../components/modal/ViewDetail";
import PaginationPane from "../../components/table/PaginationPane";
import { AggregatorModal } from "../../components/modal/AggregatorModal";
import { TransactionModal } from "../../components/modal/TransactionModal";
import useAggregator from "../../hooks/useAggregator";
import useCollector from "../../hooks/useCollector";

//date range
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const headers = [
  "Collector",
  "Aggregaor",
  "Price",
  "Quantity",
  "Amount",
  "State",
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
  // const [selectedStateId, setSelectedStateId] = useState(0);
  // const [selectedLga, setSelectedLga] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [states, setStates] = useState([]);

  const [aggregatorList, setAggregatorList] = useState([]);
  const [aggId, setAggId] = useState("");

  const [collectorList, setCollectorList] = useState([]);
  const [colId, setColId] = useState("");

  //for date range
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [formatStartDate, setFormatStartDate] = useState(null);
  const [formatEndDate, setFormatEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;

    console.log(start);
    setStartDate(start);
    setEndDate(end);

    {
      start
        ? setFormatStartDate(moment(start).format("YYYY-MM-DD"))
        : setFormatStartDate(null);
    }

    {
      end
        ? setFormatEndDate(moment(end).format("YYYY-MM-DD"))
        : setFormatEndDate(null);
    }
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="flex flex-col gap-2">
      <div
        className="example-custom-input border border-gray-300 h-[44px] w-[280px] p-2 rounded-md"
        onClick={onClick}
        ref={ref}
      >
        <h3>{value ? value : "Select date range"}</h3>
      </div>
    </div>
  ));

  const [lga, setLga] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useOutsideClick(wrapperRef);
  const [viewDetail, setViewDetail] = useOutsideClick(wrapperRef);
  const [editDetail, setEditDetail] = useOutsideClick(wrapperRef);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  const { gatAllAggregatorLists } = useAggregator();
  const { gatAllCollectorList } = useCollector();
  const { loading, getTransactions } = useTransaction(
    query,
    selectedState,
    aggId,
    colId,
    formatStartDate,
    formatEndDate
  );

  //fetch transactions
  const fetchTransactions = async () => {
    const res = await getTransactions(page, limit);
    setTotalPages(res?.data?.totalPages);
    setTransactions(res?.data?.content);
  };
  useEffect(() => {
    fetchTransactions();
  }, []);

  //get state
  useEffect(() => {
    const getAllState = async () => {
      const res = await getState();
      const list = res.data.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setStates([...list]);
    };
    getAllState();
  }, []);

  //get lists
  useEffect(() => {
    const getAggregatorsList = async () => {
      const res = await gatAllAggregatorLists();
      const list = res.data.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      // console.log(list);
      setAggregatorList([...list]);
      // console.log(res.data);
    };

    const getCollectorsList = async () => {
      const res = await gatAllCollectorList();
      const list = res.data.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      // console.log(list);
      setCollectorList([...list]);
      // console.log(res.data);
    };

    getAggregatorsList();
    getCollectorsList();
  }, []);

  return (
    <div className="p-4">
      <div className="mb-10">
        <TopCard
          title={"Transaction"}
          subtitle={"List of transactions on the platform."}
          buttonTitle={"New Transaction"}
          Icon={GoPlus}
          setShowModal={() => setShowModal(true)}
          exportType="transaction"
        />
      </div>
      {/* <div className="mb-10">
        <DataCard />
      </div> */}
      <div className="mb-10 flex justify-between">
        <div className="flex gap-2 w-[50%]">
          <div className="w-[30%]">
            <SearchableDropdown
              options={aggregatorList}
              placeholder="All Aggregators"
              handleChange={(e) => setAggId(e.value)}
            />
          </div>
          <div className="w-[30%]">
            <SearchableDropdown
              options={collectorList}
              placeholder="All Collectors"
              handleChange={(e) => setColId(e.value)}
            />
          </div>
          <div className="w-[30%]">
            <SearchableDropdown
              options={states}
              placeholder="All States"
              handleChange={(selectionOption) => {
                setSelectedState(selectionOption.label);
              }}
              css="w-[150px]"
            />
          </div>
        </div>
        <div className="flex gap-2">
          {/* date range*/}
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            customInput={<ExampleCustomInput />}
            showYearDropdown
            yearDropdownItemNumber={100}
            scrollableYearDropdown
            isClearable
          />

          {/* <InputSearch
            placeholder={"search"}
            inputValue={query}
            setInputValue={setQuery}
            css="w-[150px]"
          /> */}

          <button
            className="flex justify-center items-center h-[44px] w-[101px] border border-gray-300 gap-2 rounded-md"
            onClick={() => fetchTransactions()}
          >
            Apply
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <p className="text-center">Loading...</p>
        </div>
      ) : transactions?.length === 0 ? (
        <div className="flex justify-center">
          <p className="text-center">No data.</p>
        </div>
      ) : (
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
          <TransactionModal
            closeModal={() => setShowModal(false)}
            aggregatorList={aggregatorList}
            collectorList={collectorList}
          />
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
