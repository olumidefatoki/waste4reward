import api from "../api/axios";
import fetcher from "../api/fetacher";

export const gatAllAggregator = async ({ page, size }) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const params = {
      page,
      size,
    };
    const res = await fetcher(
      "/aggregator",
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
export const getAllAggregatorList = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetcher(
      "/aggregator/list",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      true
    );
    console.log({ res });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
