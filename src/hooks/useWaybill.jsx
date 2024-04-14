import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { gatAllUser } from "../ds/user";
import { gatAllWaybill, createWaybill } from "../ds/waybill";
const useWaybill = (query, selectedState) => {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();

  const getAllWaybills = async (
    page = 1,
    size = 10,
    name = query,
    state = selectedState
  ) => {
    setLoading(true);
    const res = await gatAllWaybill({ page, size, name, state });
    return JSON.parse(res);
  };

  const createNewWaybill = async (data) => {
    const res = await createWaybill(data);

    return res;
  };

  return {
    loading,
    getAllWaybills,
    createNewWaybill,
  };
};

export default useWaybill;
