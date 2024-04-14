import axios from "axios";

const api = axios.create({
  baseURL: `https://waste-api-staging.shaktihub.org/api/v1`,
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //   },
});

api.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
api.defaults.headers.post["Content-Type"] = "application/json";

const httpClient = axios.create();
// sending request
httpClient.interceptors.request.use(
  async (config) => {
    const token = window.localStorage.getItem("token");
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      ContentType: "multipart/form-data",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response
httpClient.interceptors.response.use(
  function (response) {
    {
      /**console.log(response); */
    }
    return response;
  },
  async function (error) {
    console.log(error);
    if (error?.response?.status === 401) {
      console.log("401 error");
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);
export { api, httpClient };
