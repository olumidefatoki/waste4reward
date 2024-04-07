import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { gatAllUser } from "../ds/user";
import { gatAllWaybill } from "../ds/waybill";
const useWaybill = () => {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const getAllWaybills = async (page = 1, size = 10) => {
    setLoading(true);
    const res = await gatAllWaybill({ page, size });
    return JSON.parse(res);
  };
  return {
    loading,
    getAllWaybills,
  };
};

export default useWaybill;
