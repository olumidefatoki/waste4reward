import api from "../api/axios";
import fetcher from "../api/fetacher";

export const gatAllWaybill = async ({ page, size }) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const params = {
      page,
      size,
    };
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
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
