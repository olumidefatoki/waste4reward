import React, { useState } from "react";
import { login } from "../ds/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../feature/auth";
import { gatAllAggregator } from "../ds/aggregators";
const useAggregator = () => {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const gatAllAggregators = async (page = 1, size = 10) => {
    setLoading(true);
    const res = await gatAllAggregator({ page, size });
    return JSON.parse(res);
  };
  return {
    loading,
    gatAllAggregators,
  };
};

export default useAggregator;
