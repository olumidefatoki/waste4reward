import React, { useCallback, useEffect, useState } from "react";
import { login } from "../ds/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../feature/auth";
import {
  createAggregator,
  gatAllAggregator,
  getAllAggregatorList,
  getAggregatorDetail,
} from "../ds/aggregators";
import { getTopAggregators } from "../ds/resource";
const useAggregator = (query, selectedState, selectedLga, aggregatorId) => {
  const [loading, setLoading] = useState();
  const [aggregatorCount, setAggregatorCount] = useState();
  const dispatch = useDispatch();

  const gatAllAggregators = async (
    page = 1,
    size = 10,
    nameOrEmailOrPhoneNumber = query,
    state = selectedState,
    location = selectedLga
  ) => {
    setLoading(true);
    const res = await gatAllAggregator({
      page,
      size,
      nameOrEmailOrPhoneNumber,
      state,
      location,
    });

    setLoading(false);
    return JSON.parse(res);
  };

  const getSingleAggregator = async () => {
    setLoading(true);
    const res = await getAggregatorDetail({ id: aggregatorId });
    setLoading(false);
    return JSON.parse(res);
  };

  const gatAllAggregatorLists = useCallback(async () => {
    setLoading(true);
    const res = await getAllAggregatorList();
    // console.log({ res }, "hook");
    setAggregatorCount(res.data.length);
    return res;
  }, []);

  useEffect(() => {
    gatAllAggregatorLists();
  }, []);

  const createNewAggregator = async (data) => {
    const res = await createAggregator(data);
    return res;
  };

  return {
    loading,
    gatAllAggregators,
    getSingleAggregator,
    gatAllAggregatorLists,
    aggregatorCount,
    createNewAggregator,
  };
};

export default useAggregator;
