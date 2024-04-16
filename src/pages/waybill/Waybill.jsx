import React, { useRef, useState, useEffect, forwardRef } from "react";
import TopCard from "../../components/card/TopCard";
import CustomTable from "../../components/table/CustomTable";
import { GoPlus } from "react-icons/go";
import DataCard from "../../components/card/DataCard";
import InputSelect from "../../components/input/InputSelect";
import InputSelect2 from "../../components/input/InputSelect2";
import InputSearch from "../../components/input/InputSearch";
import useOutsideClick from "../../hooks/useOutsideClick";
import Modal from "../../components/Modal";
import { WaybillModal } from "../../components/modal/WaybillModal";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import ViewDetail from "../../components/modal/ViewDetail";
import PaginationPane from "../../components/table/PaginationPane";
import { EditWaybillModal } from "../../components/editmodal/WaybillModal";
import SearchableDropdown from "../../components/input/SearchableDropdown";
import useAggregator from "../../hooks/useAggregator";
import useRecycler from "../../hooks/useRecycler";
import useWaybill from "../../hooks/useWaybill";
import useResource from "../../hooks/useResource";
import { getLga, getState } from "../../ds/resource";

//date range
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useCollector from "../../hooks/useCollector";

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
  const [query, setQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All States");
  const [showModal, setShowModal] = useOutsideClick(wrapperRef);
  const [viewDetail, setViewDetail] = useOutsideClick(wrapperRef);
  const [editDetail, setEditDetail] = useOutsideClick(wrapperRef);

  const [aggregatorList, setAggregatorList] = useState([]);
  const [aggId, setAggId] = useState("All Aggregators");

  const [collectorList, setCollectorList] = useState([]);
  const [colId, setColId] = useState("All Collectors");

  const { getAllStates, getAllLgas } = useResource();

  const [waybill, setWaybills] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [states, setStates] = useState([]);
  const [lga, setLga] = useState([]);
  const limit = 10;

  const [recyclerList, setRecyclerList] = useState([]);
  const [recycId, setRecycId] = useState("");

  const { gatAllAggregatorLists } = useAggregator();
  const { gatAllCollectorList } = useCollector();
  const { gatAllRecyclers } = useRecycler();

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

  const { loading, getAllWaybills, createNewWaybill } = useWaybill(
    query,
    selectedState,
    aggId,
    colId,
    formatStartDate,
    formatEndDate
  );

  //fetch waybill
  const getWaybills = async () => {
    const res = await getAllWaybills(page, limit);
    setTotalPages(res.data.totalPages);
    setWaybills(res.data?.content);
  };
  useEffect(() => {
    getWaybills();
  }, []);

  useEffect(() => {
    const getAllState = async () => {
      const res = await getState();
      const list = res.data.map((item) => {
        return {
          label: item.name,
          value: item.name,
        };
      });

      setStates([...list]);
    };
    getAllState();
  }, []);

  // useEffect(() => {
  //   const getAllLga = async () => {
  //     const res = await getLga();

  //     const list = res.data.map((item) => {
  //       return {
  //         label: item.name,
  //         value: item.name,
  //       };
  //     });
  //     setLga([...list]);
  //   };
  //   getAllLga();
  // }, []);

  //get lists
  useEffect(() => {
    const getAggregatorsList = async () => {
      const res = await gatAllAggregatorLists();
      const list = res?.data?.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });

      setAggregatorList([...list]);
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

    const getRecyclersList = async () => {
      const res = await gatAllRecyclers();
      const list = res?.data?.content?.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });

      setRecyclerList([...list]);
    };

    getAggregatorsList();
    getCollectorsList();
    getRecyclersList();
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
          exportType="waybill"
        />
      </div>
      <div className="mb-10">
        <DataCard />
      </div>
      <div className="mb-10 flex justify-between">
        <div className="flex gap-2">
          <SearchableDropdown
            options={aggregatorList}
            placeholder="All Aggregators"
            handleChange={(e) => setAggId(e.value)}
          />
          <SearchableDropdown
            options={collectorList}
            placeholder="All Collectors"
            handleChange={(e) => setColId(e.value)}
          />
          <SearchableDropdown
            options={states}
            placeholder="All States"
            handleChange={(e) => setSelectedState(e.value)}
            css="w-[150px]"
          />
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
            onClick={() => getWaybills()}
          >
            Apply
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center">
          <p className="text-center">Loading...</p>
        </div>
      ) : waybill?.length === 0 ? (
        <div className="flex justify-center">
          <p className="text-center">No data.</p>
        </div>
      ) : (
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
          <WaybillModal
            closeModal={() => setShowModal(false)}
            aggregatorList={aggregatorList}
            recyclerList={recyclerList}
          />
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
