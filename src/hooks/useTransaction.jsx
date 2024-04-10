import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getAllTransactions } from "../ds/transaction";

const useTransaction = () => {
  const [loading, setLoading] = useState();
  const [transactionCount, setTransactionCount] = useState();

  const getTransactions = async (page = 1, size = 10) => {
    setLoading(true);
    const res = await getAllTransactions({ page, size });
    return JSON.parse(res);
  };

  return {
    loading,
    getTransactions,
  };
};

export default useTransaction;
