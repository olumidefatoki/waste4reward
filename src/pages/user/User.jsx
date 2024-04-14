import React, { useEffect, useRef, useState } from "react";
import TopCard from "../../components/card/TopCard";
import CustomTable from "../../components/table/CustomTable";
import { GoPlus } from "react-icons/go";
import DataCard from "../../components/card/DataCard";
import InputSelect from "../../components/input/InputSelect";
import InputSearch from "../../components/input/InputSearch";
import Group from "../../assets/images/group.png";
import useOutsideClick from "../../hooks/useOutsideClick";
import Modal from "../../components/Modal";
import { UserModal } from "../../components/modal/UserModal";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import ViewDetail from "../../components/modal/ViewDetail";
import PaginationPane from "../../components/table/PaginationPane";
import { EditUserModal } from "../../components/editmodal/UserModal";
import useUser from "../../hooks/useUser";
import useResource from "../../hooks/useResource";

const headers = ["User", "Email Address", "Organization", "User type"];

const User = () => {
  const { paReport } = useResource();
  const [query, setQuery] = useState("");
  const [userId, setUserId] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const wrapperRef = useRef(null);
  const [showModal, setShowModal] = useOutsideClick(wrapperRef);
  const [viewDetail, setViewDetail] = useOutsideClick(wrapperRef);
  const [editDetail, setEditDetail] = useOutsideClick(wrapperRef);

  const { loading, gatAllUsers, getSingleUser } = useUser(query, userId);
  const { getAllStates, getAllLgas } = useResource();

  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const limit = 10;

  const getUser = async () => {
    const res = await getSingleUser(userId);
    // console.log(res.data);
    setUserDetail(res.data);
  };

  useEffect(() => {
    const getUsers = async () => {
      const res = await gatAllUsers(page, limit);
      setTotalPages(res?.data?.totalPages);
      setUsers(res?.data?.content);
    };
    getUsers();
  }, [page, query]);

  // const handleViewDetail = (id) => {
  //   setUserId(id);
  //   setViewDetail(true);
  // };

  // useEffect(() => {
  //   getUser();
  // }, [userId]);

  return (
    <div className="p-4">
      <div className="mb-10">
        <TopCard
          title={"User"}
          subtitle={"List of users on the platform."}
          buttonTitle={"New User"}
          Icon={GoPlus}
          setShowModal={() => setShowModal(true)}
        />
      </div>
      <div className="mb-10">
        <DataCard
          image={Group}
          title={"Total Users"}
          subtitle={paReport.noOfUser || 0}
          css={"border border-gray-300"}
        />
      </div>
      <div className="mb-10 flex justify-between">
        <div className="flex gap-2"></div>
        <div>
          <InputSearch
            placeholder={"search"}
            inputValue={query}
            setInputValue={setQuery}
          />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center">
          <p className="text-center">Loading...</p>
        </div>
      ) : users?.length === 0 ? (
        <div className="flex justify-center">
          <p className="text-center">No data.</p>
        </div>
      ) : (
        <CustomTable
          headers={headers}
          rows={users.map((data, index) => {
            return {
              checkbox: <input type="checkbox" />,
              name: (
                <div className="flex flex-col">
                  <p>{data.name}</p>
                </div>
              ),
              email: data.email,
              organizationName: data.organization,
              userType: data.userType,
              // edit: (
              //   <MdOutlineRemoveRedEye
              //     onClick={() => handleViewDetail(data.id)}
              //   />
              // ),
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
          <UserModal closeModal={() => setShowModal(false)} />
        </Modal>
      )}
      {editDetail && (
        <Modal
          variant="default"
          refProp={wrapperRef}
          closeModal={() => setEditDetail(false)}
        >
          <UserModal
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
            detail={userDetail}
            closeModal={() => setViewDetail(false)}
            title={"User Details"}
            subtitle={"User details below"}
            dateCreated={"14 January 2024"}
            editbutton={true}
          />
        </Modal>
      )}
    </div>
  );
};

export default User;
