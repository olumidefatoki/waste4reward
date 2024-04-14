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
import useResource from "../../hooks/useResource";

const headers = ["Company", "Email Address", "Phone Number", "Location"];

const Aggregator = () => {
  const [query, setQuery] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedLga, setSelectedLga] = useState("");
  const { paReport } = useResource();
  const wrapperRef = useRef(null);
  const [showModal, setShowModal] = useOutsideClick(wrapperRef);
  const [viewDetail, setViewDetail] = useOutsideClick(wrapperRef);
  const [editDetail, setEditDetail] = useOutsideClick(wrapperRef);
  const [orderBy, setOrderBy] = useState(0);
  const [order, setOrder] = useState(0);
  const [allChecked, setAllChecked] = useState(false);
  const [aggregators, setAggregators] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [states, setStates] = useState([]);
  const [lga, setLga] = useState([]);

  const limit = 10;

  const [aggregatorId, setAggregatorId] = useState(1);
  const [aggregatorDetail, setAggregatorDetail] = useState({});

  const {
    loading,
    gatAllAggregators,
    getSingleAggregator,
    gatAllAggregatorLists,
  } = useAggregator(query, selectedState, selectedLga, aggregatorId);

  const getAggregator = async () => {
    const res = await getSingleAggregator(aggregatorId);
    // console.log(res.data);
    setAggregatorDetail(res.data);
  };

  const getAggregators = async () => {
    const res = await gatAllAggregators(page, limit);
    setTotalPages(res?.data?.totalPages);
    setAggregators(res?.data?.content);
  };

  useEffect(() => {
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

  // useEffect(() => {
  //   const getAggregatorsList = async () => {
  //     const res = await gatAllAggregatorLists();
  //     // setAggregatorList(res.data);
  //     console.log(res.data);
  //   };
  //   getAggregatorsList();
  // }, []);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleViewDetail = (id) => {
    setAggregatorId(id);
    setViewDetail(true);
  };

  const handleEditDetail = (id) => {
    setAggregatorId(id);
    setEditDetail(true);
  };

  useEffect(() => {
    getAggregator();
  }, [aggregatorId]);

  return (
    <div className="p-4">
      <div className="mb-10">
        <TopCard
          title={"Aggregator"}
          subtitle={"List of aggregators on the platform."}
          buttonTitle={"New Aggregator"}
          Icon={GoPlus}
          setShowModal={() => setShowModal(true)}
          exportType="aggregator"
        />
      </div>
      <div className="mb-10">
        <DataCard
          title={"Total aggregators"}
          subtitle={paReport.noOfAggregator || 0}
          figure={`${paReport.aggregatorState || 0} ${
            paReport.aggregatorState === 1 ? "state" : "states"
          }`}
          image={Character}
          css={"bg-[#B9E6FE]"}
        />
      </div>
      <div className="mb-10 flex justify-between">
        <div className="flex gap-2">
          <InputSelect
            options={states.map((data) => data.name)}
            placeholder="All States"
            handleChange={(e) => setSelectedState(e.target.value)}
          />
          <InputSelect
            options={lga.map((data) => data.name)}
            placeholder="All LGAs"
            handleChange={(e) => setSelectedLga(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <InputSearch
            placeholder={"search"}
            inputValue={query}
            setInputValue={setQuery}
          />

          <button
            className="flex justify-center items-center h-[44px] w-[101px] border border-gray-300 gap-2 rounded-md"
            onClick={() => getAggregators()}
          >
            Apply
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center">
          <p className="text-center">Loading...</p>
        </div>
      ) : aggregators?.length === 0 ? (
        <div className="flex justify-center">
          <p className="text-center">No data.</p>
        </div>
      ) : (
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
              location: data.location,
              edit: (
                <MdOutlineRemoveRedEye
                  onClick={() => handleViewDetail(data.id)}
                />
              ),
              open: <FiEdit onClick={() => handleEditDetail(data.id)} />,
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
            id={aggregatorId}
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
            detail={aggregatorDetail}
            closeModal={() => setViewDetail(false)}
            title={"Aggregator Details"}
            subtitle={"Aggregator details below"}
            loading={loading}
            editbutton={true}
            id={aggregatorId}
          />
        </Modal>
      )}
    </div>
  );
};

export default Aggregator;
