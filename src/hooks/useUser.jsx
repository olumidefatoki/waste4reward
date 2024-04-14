import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { gatAllUser, createUser, getUserDetail } from "../ds/user";
const useUser = (query, userId) => {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();

  const gatAllUsers = async (
    page = 1,
    size = 10,
    nameOrEmailOrPhoneNumber = query
  ) => {
    setLoading(true);
    const res = await gatAllUser({ page, size, nameOrEmailOrPhoneNumber });
    setLoading(false);
    return JSON.parse(res);
  };

  const getSingleUser = async () => {
    setLoading(true);
    const res = await getUserDetail({ id: userId });
    setLoading(false);
    return JSON.parse(res);
  };

  const createNewUser = async (data) => {
    const res = await createUser(data);
    return res;
  };

  return {
    loading,
    gatAllUsers,
    getSingleUser,
    createNewUser,
  };
};

export default useUser;
