import axios from "axios";
import { useSession } from "next-auth/react";
const baseURL = process.env.NEXT_PUBLIC_API_URL;


const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const {data:session} =useSession()
    const authToken = session?.accessToken;
    console.log("AuthToken:", authToken);

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const axiosAuth = axios.create({
  baseURL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

