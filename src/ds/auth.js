import api from "../api/axios";
import fetcher from "../api/fetacher";

export const login = async (data) => {
  try {
    const res = await fetcher("/login", {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-store",
    });
    return res;
  } catch (error) {
    throw error;
  }
};
