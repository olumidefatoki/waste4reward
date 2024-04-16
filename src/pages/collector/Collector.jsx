import React, { useEffect, useRef, useState } from "react";
import TopCard from "../../components/card/TopCard";
import CustomTable from "../../components/table/CustomTable";
import { GoPlus } from "react-icons/go";
import DataCard from "../../components/card/DataCard";
import InputSelect from "../../components/input/InputSelect";
import InputSelect2 from "../../components/input/InputSelect2";
import SearchableDropdown from "../../components/input/SearchableDropdown";
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
import { gatAllCollector } from "../../ds/collectors";
import { getLga, getState } from "../../ds/resource";
import useCollector from "../../hooks/useCollector";
import useAggregator from "../../hooks/useAggregator";
import useResource from "../../hooks/useResource";

const headers = [
  "Collector",
  "Aggregators",
  "Phone Number",
  "Age",
  "Disability",
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
const Collector = () => {
  const [query, setQuery] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedLga, setSelectedLga] = useState("");

  const { paReport } = useResource();
  const wrapperRef = useRef(null);
  const [showModal, setShowModal] = useOutsideClick(wrapperRef);
  const [viewDetail, setViewDetail] = useOutsideClick(wrapperRef);
  const [editDetail, setEditDetail] = useOutsideClick(wrapperRef);
  const [aggregatorList, setAggregatorList] = useState([]);
  const [aggId, setAggId] = useState("");
  const [collectors, setCollectors] = useState([]);
  const [collectorId, setCollectorId] = useState(1);
  const [collectorDetail, setCollectorDetail] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [states, setStates] = useState([]);
  const [lga, setLga] = useState([]);
  const limit = 10;

  const { gatAllAggregatorLists } = useAggregator();
  const { loading, gatAllCollectors, getSingleCollector } = useCollector(
    query,
    selectedState,
    selectedLga,
    aggId,
    collectorId
  );

  const getCollector = async () => {
    const res = await getSingleCollector(collectorId);
    console.log(res.data);
    setCollectorDetail(res.data);
  };

  const getCollectors = async () => {
    const res = await gatAllCollectors(page, limit);
    setTotalPages(res?.data?.totalPages);
    setCollectors(res?.data?.content);
  };

  useEffect(() => {
    getCollectors();
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

  useEffect(() => {
    const getAllLga = async () => {
      const res = await getLga();

      const list = res.data.map((item) => {
        return {
          label: item.name,
          value: item.name,
        };
      });
      setLga([...list]);
    };
    getAllLga();
  }, []);

  useEffect(() => {
    const getAggregatorsList = async () => {
      const res = await gatAllAggregatorLists();
      const list = res.data.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      console.log(list);
      setAggregatorList([...list]);
      // console.log(res.data);
    };
    getAggregatorsList();
  }, []);

  const handleViewDetail = (id) => {
    setCollectorId(id);
    setViewDetail(true);
  };

  useEffect(() => {
    getCollector();
  }, [collectorId]);

  return (
    <div className="p-4">
      <div className="mb-10">
        <TopCard
          title={"Collectors"}
          subtitle={"List of collectors on the platform."}
          buttonTitle={"New Collector"}
          Icon={GoPlus}
          setShowModal={() => setShowModal(true)}
          exportType="collector"
        />
      </div>
      <div className="mb-10">
        <DataCard
          css={"bg-[#FFFAEB]"}
          image={Character}
          title={"Total collectors"}
          subtitle={paReport.noOfCollector || 0}
          figure={`${paReport.collectorState || 0} ${
            paReport.collectorState === 1 ? "state" : "states"
          }`}
        />
      </div>
      <div className="mb-10 flex justify-between">
        <div className="flex gap-2">
          <SearchableDropdown
            options={aggregatorList}
            placeholder="Aggregators"
            handleChange={(e) => setAggId(e.value)}
          />
          <SearchableDropdown
            options={states}
            placeholder="All States"
            handleChange={(e) => setSelectedState(e.value)}
          />
          <SearchableDropdown
            options={lga}
            placeholder="All LGAs"
            handleChange={(e) => setSelectedLga(e.value)}
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
            onClick={() => getCollectors()}
          >
            Apply
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <p className="text-center">Loading...</p>
        </div>
      ) : collectors?.length === 0 ? (
        <div className="flex justify-center">
          <p className="text-center">No data.</p>
        </div>
      ) : (
        <CustomTable
          headers={headers}
          rows={collectors.map((data, index) => {
            return {
              checkbox: <input type="checkbox" />,
              collector: (
                <div className="flex flex-col">
                  <p>
                    {data.firstName} {data.lastName}
                  </p>
                </div>
              ),
              aggregator: data.aggregator,
              phone_number: data.phoneNumber,
              Age: data.age,
              disability: data.disabilityStatus,
              state: data.state,
              edit: (
                <MdOutlineRemoveRedEye
                  onClick={() => handleViewDetail(data.id)}
                />
              ),
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
          <CollectorModal
            closeModal={() => setShowModal(false)}
            aggregatorList={aggregatorList}
          />
        </Modal>
      )}
      {editDetail && (
        <Modal
          variant="default"
          refProp={wrapperRef}
          closeModal={() => setEditDetail(false)}
        >
          <CollectorModal
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
            detail={collectorDetail}
            closeModal={() => setViewDetail(false)}
            title={"Collector Details"}
            subtitle={"Collector details below"}
            loading={loading}
            editbutton={true}
            id={collectorId}
          />
        </Modal>
      )}
    </div>
  );
};

export default Collector;
