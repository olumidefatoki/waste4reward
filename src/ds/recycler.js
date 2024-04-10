import api from "../api/axios";
import fetcher from "../api/fetacher";

export const gatAllRecycler = async ({ page, size, name, state }) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const params = {
      page,
      size,
    };
    if (name) {
      params.name = name;
    }
    if (state !== "Select State") {
      params.state = state;
    }
    const res = await fetcher(
      "/recycler",
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
export const createRecycler = async (data) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetcher("/recycler", {
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
