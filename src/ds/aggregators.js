import api from "../api/axios";
import fetcher from "../api/fetacher";

export const gatAllAggregator = async ({ page, size }) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const params = {
      page,
      size,
    };
    console.log({ params });
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
    console.log({ res });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
