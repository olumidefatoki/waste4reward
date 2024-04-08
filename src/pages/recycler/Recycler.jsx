import React, { useEffect, useRef, useState } from "react";
import TopCard from "../../components/card/TopCard";
import CustomTable from "../../components/table/CustomTable";
import { GoPlus } from "react-icons/go";
import DataCard from "../../components/card/DataCard";
import InputSelect from "../../components/input/InputSelect";
import InputSearch from "../../components/input/InputSearch";
import rafiki from "../../assets/images/rafiki.png";
import useOutsideClick from "../../hooks/useOutsideClick";
import Modal from "../../components/Modal";
import { RecyclerModal } from "../../components/modal/RecyclerModal";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import ViewDetail from "../../components/modal/ViewDetail";
import PaginationPane from "../../components/table/PaginationPane";
import { EditRecyclerModal } from "../../components/editmodal/RecyclerModal";
import { getLga, getState } from "../../ds/resource";
import useRecycler from "../../hooks/useRecycler";
import useResource from "../../hooks/useResource";

const headers = ["recycler", "Email Address", "Address", "State", "Date"];

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
const Recycler = () => {
  const { paReport } = useResource();
  const wrapperRef = useRef(null);
  const [showModal, setShowModal] = useOutsideClick(wrapperRef);
  const [viewDetail, setViewDetail] = useOutsideClick(wrapperRef);
  const [editDetail, setEditDetail] = useOutsideClick(wrapperRef);
  const { gatAllRecyclers } = useRecycler();

  const [recyclers, setRecyclers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [states, setStates] = useState([]);
  const [lga, setLga] = useState([]);
  const limit = 10;

  useEffect(() => {
    const getRecyclers = async () => {
      const res = await gatAllRecyclers(page, limit);
      setTotalPages(res.data.totalPages);
      setRecyclers(res.data?.content);
    };
    getRecyclers();
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

  return (
    <div className="p-4">
      <div className="mb-10">
        <TopCard
          title={"Recycler"}
          subtitle={"List of recyclers on the platform."}
          buttonTitle={"New Recycler"}
          Icon={GoPlus}
          setShowModal={() => setShowModal(true)}
        />
      </div>
      <div className="mb-10">
        <DataCard
          image={rafiki}
          css={"border boder-gray-300"}
          title={"Total recycler"}
          subtitle={paReport.noOfRecycler || 0}
          figure={`${paReport.recyclerState || 0} ${
            paReport.recyclerState === 1 ? "state" : "states"
          }`}
        />
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
      {recyclers.length > 0 ? (
        <CustomTable
          headers={headers}
          rows={recyclers.map((data, index) => {
            return {
              checkbox: <input type="checkbox" />,
              recycler: (
                <div className="flex flex-col">
                  <p>{data.company}</p>
                  <p>{data.address}</p>
                </div>
              ),
              email: data.email,
              address: data.address,
              state: data.state,
              date: data.createdAt,
              edit: (
                <MdOutlineRemoveRedEye onClick={() => setViewDetail(true)} />
              ),
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
          <RecyclerModal closeModal={() => setShowModal(false)} />
        </Modal>
      )}
      {editDetail && (
        <Modal
          variant="default"
          refProp={wrapperRef}
          closeModal={() => setEditDetail(false)}
        >
          <RecyclerModal
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

export default Recycler;
