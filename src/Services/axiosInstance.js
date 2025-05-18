import axios from "axios";

import AuthService from "./AuthService";


const instance = axios.create({
  baseURL: "https://semana08-web.onrender.com/api",
});

instance.interceptors.request.use(
  (config) => {
    const user = AuthService.getCurrentUser();
    if (user && user.accessToken) {
      config.headers["Authorization"] = `Bearer ${user.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
