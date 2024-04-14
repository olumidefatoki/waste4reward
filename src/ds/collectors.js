import api from "../api/axios";
import fetcher from "../api/fetacher";

export const gatAllCollector = async ({
  page,
  size,
  nameOrEmailOrPhoneNumber,
  aggregatorId,
  state,
  location,
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
    if (!!state && state !== "All States") {
      params.state = state;
    }
    if (!!location && location !== "All LGAs") {
      params.location = location;
    }
    if (!!aggregatorId) {
      params.aggregatorId = aggregatorId;
    }
    const res = await fetcher(
      "/collector",
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

export const getCollectorDetail = async ({ id }) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const params = {
      id,
    };
    const res = await fetcher(
      `/collector/${params.id}`,
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

export const getAllCollectorList = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetcher(
      "/collector/list",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      true
    );
    // console.log({ res });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createCollector = async (data) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetcher("/collector", {
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

export const downloadCollector = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetcher(
      "/collector/download",
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
