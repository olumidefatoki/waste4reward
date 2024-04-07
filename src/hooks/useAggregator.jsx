import React, { useCallback, useEffect, useState } from "react";
import { login } from "../ds/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../feature/auth";
import { gatAllAggregator, getAllAggregatorList } from "../ds/aggregators";
import { getTopAggregators } from "../ds/resource";
const useAggregator = () => {
  const [loading, setLoading] = useState();
  const [aggregatorCount, setAggregatorCount] = useState();
  const dispatch = useDispatch();
  const gatAllAggregators = async (page = 1, size = 10) => {
    setLoading(true);
    const res = await gatAllAggregator({ page, size });
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

  return {
    loading,
    gatAllAggregators,
    gatAllAggregatorLists,
    aggregatorCount,
  };
};

export default useAggregator;
