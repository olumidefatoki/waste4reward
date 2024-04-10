import React, { useState } from "react";
import { login } from "../ds/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../feature/auth";
import { gatAllAggregator } from "../ds/aggregators";
import { createCollector, gatAllCollector } from "../ds/collectors";
const useCollector = (query, selectedState) => {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const gatAllCollectors = async (
    page = 1,
    size = 10,
    name = query,
    state = selectedState
  ) => {
    setLoading(true);
    const res = await gatAllCollector({ page, size, name, state });
    return JSON.parse(res);
  };
  const createNewCollector = async (data) => {
    const res = await createCollector(data);
    return res;
  };
  return {
    loading,
    gatAllCollectors,
    createNewCollector,
  };
};

export default useCollector;
