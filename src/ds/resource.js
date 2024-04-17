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
    return res;
  } catch (error) {
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
    return res;
  } catch (error) {
    throw error;
  }
};

export const getLgaByState = async (id) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const res = await fetcher(`/state/${id}/localgovernment`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  } catch (error) {
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
    return res;
  } catch (error) {
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
    return res;
  } catch (error) {
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
    return res;
  } catch (error) {
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
    return res;
  } catch (error) {
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
    return res;
  } catch (error) {
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
    return res;
  } catch (error) {
    throw error;
  }
};
export const getProgram = async (data, accessToken) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetcher("/program", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
export const getParticipantReport = async (data, accessToken) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetcher("/dashboard/participantReport", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
export const getPerformanceReport = async (data, accessToken) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetcher("/dashboard/performanceReport", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getPlasticCollectionReport = async (year) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const params = {
      year,
    };
    const res = await fetcher(
      "/dashboard/plasticCollectionReport",
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
export const getPlasticProcessedReport = async (year) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const params = {
      year,
    };
    const res = await fetcher(
      "/dashboard/plasticProcessedReport",
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
