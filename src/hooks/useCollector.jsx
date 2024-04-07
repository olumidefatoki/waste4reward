import React, { useState } from "react";
import { login } from "../ds/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../feature/auth";
import { gatAllAggregator } from "../ds/aggregators";
import { gatAllCollector } from "../ds/collectors";
const useCollector = () => {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const gatAllCollectors = async (page = 1, size = 10) => {
    setLoading(true);
    const res = await gatAllCollector({ page, size });
    return JSON.parse(res);
  };
  return {
    loading,
    gatAllCollectors,
  };
};

export default useCollector;
