import api from "../api/axios";
import fetcher from "../api/fetacher";

export const gatAllRecycler = async ({
  page,
  size,
  nameOrEmailOrPhoneNumber,
  state,
  location,
}) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const params = {
      page,
      size,
    };
    if (nameOrEmailOrPhoneNumber) {
      params.nameOrEmailOrPhoneNumber = nameOrEmailOrPhoneNumber;
    }
    if (!!state && state !== "All States") {
      params.state = state;
    }
    if (!!location && location !== "All LGAs") {
      params.location = location;
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

export const getRecyclerDetail = async ({ id }) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const params = {
      id,
    };
    const res = await fetcher(
      `/recycler/${params.id}`,
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

export const updateRecycler = async (data) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetcher("/recycler/update", {
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

export const downloadRecycler = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetcher(
      "/recycler/download",
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
