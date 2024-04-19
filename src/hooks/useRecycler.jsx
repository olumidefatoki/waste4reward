import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  createRecycler,
  gatAllRecycler,
  getRecyclerDetail,
  updateRecycler,
} from "../ds/recycler";
const useRecycler = (query, selectedState, recyclerId) => {
  const [loading, setLoading] = useState();

  const gatAllRecyclers = async (
    page = 1,
    size = 10,
    nameOrEmailOrPhoneNumber = query,
    state = selectedState
  ) => {
    setLoading(true);
    const res = await gatAllRecycler({
      page,
      size,
      nameOrEmailOrPhoneNumber,
      state,
    });
    return JSON.parse(res);
  };

  const getSingleRecycler = async () => {
    setLoading(true);
    const res = await getRecyclerDetail({ id: recyclerId });
    setLoading(false);
    return JSON.parse(res);
  };

  const createNewRecycler = async (data) => {
    const res = await createRecycler(data);
    return res;
  };

  const updateExistingRecycler = async (data) => {
    const res = await updateRecycler(data);
    return res;
  };

  return {
    loading,
    gatAllRecyclers,
    getSingleRecycler,
    createNewRecycler,
    updateExistingRecycler,
  };
};

export default useRecycler;
