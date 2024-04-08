import React, { useState } from "react";
import { login } from "../ds/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../feature/auth";
import { gatAllAggregator } from "../ds/aggregators";
import { gatAllCollector } from "../ds/collectors";
import { createRecycler, gatAllRecycler } from "../ds/recycler";
const useRecycler = () => {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const gatAllRecyclers = async (page = 1, size = 10) => {
    setLoading(true);
    const res = await gatAllRecycler({ page, size });
    return JSON.parse(res);
  };
  const createNewRecycler = async (data) => {
    const res = await createRecycler(data);
    return res;
  };

  return {
    loading,
    gatAllRecyclers,
    createNewRecycler,
  };
};

export default useRecycler;
