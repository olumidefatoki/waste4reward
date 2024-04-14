import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { createTransaction, getAllTransactions } from "../ds/transaction";

const useTransaction = (
  query,
  selectedState,
  aggId,
  colId,
  formatStartDate,
  formatEndDate
) => {
  const [loading, setLoading] = useState();
  const [transactionCount, setTransactionCount] = useState();

  const getTransactions = async (
    page = 1,
    size = 10,
    nameOrEmailOrPhoneNumber = query,
    state = selectedState,
    aggregatorId = aggId,
    collectorId = colId,
    startDate = formatStartDate,
    endDate = formatEndDate
  ) => {
    setLoading(true);
    const res = await getAllTransactions({
      page,
      size,
      nameOrEmailOrPhoneNumber,
      state,
      aggregatorId,
      collectorId,
      startDate,
      endDate,
    });

    console.log(typeof startDate);
    setLoading(false);
    return JSON.parse(res);
  };

  const createNewTransaction = async (data) => {
    const res = await createTransaction(data);

    return res;
  };

  return {
    loading,
    getTransactions,
    createNewTransaction,
  };
};

export default useTransaction;
