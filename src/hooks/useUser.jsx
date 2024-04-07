import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { gatAllUser } from "../ds/user";
const useUser = () => {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const gatAllUsers = async (page = 1, size = 10) => {
    setLoading(true);
    const res = await gatAllUser({ page, size });
    return JSON.parse(res);
  };
  return {
    loading,
    gatAllUsers,
  };
};

export default useUser;
