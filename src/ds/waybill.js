import api from "../api/axios";
import fetcher from "../api/fetacher";
import fileFetch from "../api/fileFetcher";

export const gatAllWaybill = async ({
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
      "/waybill",
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

export const createWaybill = async (data) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fileFetch("/waybill", {
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

export const downloadWaybill = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetcher(
      "/waybill/download",
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
