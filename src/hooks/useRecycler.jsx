import React, { useState } from "react";
import { login } from "../ds/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../feature/auth";
import { gatAllAggregator } from "../ds/aggregators";
import { gatAllCollector } from "../ds/collectors";
import { gatAllRecycler } from "../ds/recycler";
const useRecycler = () => {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const gatAllRecyclers = async (page = 1, size = 10) => {
    setLoading(true);
    const res = await gatAllRecycler({ page, size });
    return JSON.parse(res);
  };
  return {
    loading,
    gatAllRecyclers,
  };
};

export default useRecycler;
