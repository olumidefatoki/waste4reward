import api from "../api/axios";
import fetcher from "../api/fetacher";

export const getState = async (data, accessToken) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetcher("/state", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getLga = async (data, accessToken) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetcher("/lga", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getTypeOfPlastic = async (data, accessToken) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetcher("/typeOfPlastic", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getSourceOfPlastic = async (data, accessToken) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetcher("/sourceOfPlastic", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getTopAggregators = async (data, accessToken) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetcher("/dashboard/topFiveAggregator", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getTopCollectors = async (data, accessToken) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetcher("/dashboard/topFiveCollectorReport", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getTopState = async (data, accessToken) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetcher("/dashboard/topFiveStateReport", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getTopLocation = async (data, accessToken) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetcher("/dashboard/topFiveLocationReport", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
