import fetcher from "../api/fetacher";

export const getAllTransactions = async ({ page, size, name, state }) => {
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
      "/transaction",
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

export const downloadTransaction = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetcher(
      "/transaction/download",
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
