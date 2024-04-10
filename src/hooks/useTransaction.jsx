import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getAllTransactions } from "../ds/transaction";

const useTransaction = (query, selectedState) => {
  const [loading, setLoading] = useState();
  const [transactionCount, setTransactionCount] = useState();

  const getTransactions = async (
    page = 1,
    size = 10,
    name = query,
    state = selectedState
  ) => {
    setLoading(true);
    const res = await getAllTransactions({ page, size, name, state });
    return JSON.parse(res);
  };

  return {
    loading,
    getTransactions,
  };
};

export default useTransaction;
