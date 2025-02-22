import api from "../api/axios";
import fetcher from "../api/fetacher";

export const gatAllCollector = async ({ page, size }) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const params = {
      page,
      size,
    };
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
