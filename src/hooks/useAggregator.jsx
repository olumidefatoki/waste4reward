import React, { useCallback, useEffect, useState } from "react";
import { login } from "../ds/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../feature/auth";
import {
  createAggregator,
  gatAllAggregator,
  getAllAggregatorList,
} from "../ds/aggregators";
import { getTopAggregators } from "../ds/resource";
const useAggregator = (query, selectedState) => {
  const [loading, setLoading] = useState();
  const [aggregatorCount, setAggregatorCount] = useState();
  const dispatch = useDispatch();
  const gatAllAggregators = async (
    page = 1,
    size = 10,
    name = query,
    state = selectedState
  ) => {
    setLoading(true);
    const res = await gatAllAggregator({ page, size, name, state });
    return JSON.parse(res);
  };
  const gatAllAggregatorLists = useCallback(async () => {
    setLoading(true);
    const res = await getAllAggregatorList();
    console.log({ res }, "hook");
    setAggregatorCount(res.data.length);
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
    gatAllAggregatorLists,
    aggregatorCount,
    createNewAggregator,
  };
};

export default useAggregator;
