import axios, { AxiosRequestConfig } from "axios";

export const useAxios = () => {
  // creare istanza di axios
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("coworking-token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  });

  const sendRequest = async (config: AxiosRequestConfig) => {
    try {
      const { data } = await instance.request(config);
      return data;
    } catch (error) {
      return error;
    }
  };

  return { sendRequest };
};
