import React, { useCallback, useEffect, useState } from "react";
import { login } from "../ds/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../feature/auth";
import { gatAllAggregator } from "../ds/aggregators";
import {
  createCollector,
  gatAllCollector,
  getAllCollectorList,
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
  const [collectorCount, setCollectorCount] = useState();

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

  const gatAllCollectorList = useCallback(async () => {
    setLoading(true);
    const res = await getAllCollectorList();
    // console.log({ res }, "hook");
    setCollectorCount(res.data.length);
    return res;
  }, []);

  useEffect(() => {
    gatAllCollectorList();
  }, []);

  const createNewCollector = async (data) => {
    const res = await createCollector(data);
    return res;
  };
  return {
    loading,
    gatAllCollectors,
    gatAllCollectorList,
    getSingleCollector,
    createNewCollector,
  };
};

export default useCollector;
