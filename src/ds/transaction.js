import fetcher from "../api/fetacher";

export const getAllTransactions = async ({
  page,
  size,
  nameOrEmailOrPhoneNumber,
  state,
  aggregatorId,
  collectorId,
  startDate,
  endDate,
}) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const params = {
      page,
      size,
    };
    if (nameOrEmailOrPhoneNumber) {
      params.nameOrEmailOrPhoneNumber = nameOrEmailOrPhoneNumber;
    }
    if (state !== "All States") {
      params.state = state;
    }
    if (aggregatorId !== "All Aggregators") {
      params.aggregatorId = aggregatorId;
    }

    if (collectorId !== "All Collectors") {
      params.collectorId = collectorId;
    }
    if (startDate) {
      params.startDate = startDate;
    }
    if (endDate) {
      params.endDate = endDate;
    }

    const res = await fetcher(
      "/transaction",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      params,
      true
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const createTransaction = async (data) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetcher("/transaction", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const downloadTransaction = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetcher(
      "/transaction/download",
      {
        method: "GET",
        // responseType: "blob",
        headers: {
          // Accept: "application/pdf",
          Authorization: `Bearer ${accessToken}`,
        },
      },
      true
    );

    return res;
  } catch (error) {
    console.log("error");
    throw error;
  }
};
