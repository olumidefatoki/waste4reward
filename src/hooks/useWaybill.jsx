import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { gatAllUser } from "../ds/user";
import { gatAllWaybill, createWaybill } from "../ds/waybill";

const useWaybill = (
  query,
  selectedState,
  aggId,
  colId,
  formatStartDate,
  formatEndDate
) => {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();

  const getAllWaybills = async (
    page = 1,
    size = 10,
    nameOrEmailOrPhoneNumber = query,
    state = selectedState,
    aggregatorId = aggId,
    collectorId = colId,
    startDate = formatStartDate,
    endDate = formatEndDate
  ) => {
    setLoading(true);
    const res = await gatAllWaybill({
      page,
      size,
      nameOrEmailOrPhoneNumber,
      state,
      aggregatorId,
      collectorId,
      startDate,
      endDate,
    });
    setLoading(false);
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
