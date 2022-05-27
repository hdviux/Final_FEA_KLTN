import axios from "axios";
import authAPI from "../api/authAPI";
const axiosClient = axios.create({
  baseURL: "https://toyskidbackend.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});
axiosClient.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: JSON.parse(localStorage.getItem("accessToken")),
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  (response) => {
    response.headers.authorization = JSON.parse(
      localStorage.getItem("accessToken")
    );
    return response.data;
  },
  async (error) => {
    const { config, status } = error.response;
    if (status === 500) {
      const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
      const accessToken = await authAPI.refreshtoken({
        refreshToken: refreshToken,
      });
      if (accessToken) {
        localStorage.setItem("accessToken", JSON.stringify(accessToken));
        return axiosClient(config);
      }
    }
    return Promise.reject(error);
  }
);
export default axiosClient;
