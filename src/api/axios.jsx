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

export default api;
