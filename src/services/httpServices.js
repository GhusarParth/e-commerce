import axios from "axios";

let AxiosCreator;

export const nodeApiUrl = "http://192.168.0.81:5000";

if (typeof window !== "undefined") {
  AxiosCreator = axios.create({
    baseURL: nodeApiUrl,
    headers: {
      Authorization: localStorage?.getItem("accessToken") || "",
    },
  });

  AxiosCreator.interceptors.request.use((config) => {
    const configHeaders = config.headers;
    configHeaders.Authorization = localStorage?.getItem("accessToken") || "";
    return config;
  });

  AxiosCreator.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err?.response?.status === 401) {
        console.log("401 err : ", err);
        window.location.href = "/login";
      }

      throw err?.response;
    }
  );
}

export default AxiosCreator;
