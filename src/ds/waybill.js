import api from "../api/axios";
import fetcher from "../api/fetacher";
import fileFetch from "../api/fileFetcher";

export const gatAllWaybill = async ({ page, size, name, state }) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const params = {
      page,
      size,
    };
    if (name) {
      params.name = name;
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
