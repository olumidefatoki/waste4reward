import React, { useState } from "react";
import { login } from "../ds/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../feature/auth";
import { gatAllAggregator } from "../ds/aggregators";
import {
  createCollector,
  gatAllCollector,
  getCollectorDetail,
} from "../ds/collectors";
const useCollector = (
  query,
  selectedState,
  selectedLga,
  aggId,
  collectorId
) => {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();

  const gatAllCollectors = async (
    page = 1,
    size = 10,
    nameOrEmailOrPhoneNumber = query,
    state = selectedState,
    location = selectedLga,
    aggregatorId = aggId
  ) => {
    setLoading(true);
    const res = await gatAllCollector({
      page,
      size,
      nameOrEmailOrPhoneNumber,
      state,
      location,
      aggregatorId,
    });
    setLoading(false);
    return JSON.parse(res);
  };

  const getSingleCollector = async () => {
    setLoading(true);
    const res = await getCollectorDetail({ id: collectorId });
    setLoading(false);
    return JSON.parse(res);
  };

  const createNewCollector = async (data) => {
    const res = await createCollector(data);
    return res;
  };
  return {
    loading,
    gatAllCollectors,
    getSingleCollector,
    createNewCollector,
  };
};

export default useCollector;
