import api from "../api/axios";
import fetcher from "../api/fetacher";

export const login = async (data) => {
  try {
    const res = await fetcher("/login", {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-store",
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
