import axios from "axios";
import { Redirect } from "react-router-dom";
import * as constant from "../helper/constant";

export const axiosInstance = axios.create({
  baseURL: constant.HOSTNAME
});

const requestHandler = req => {
  req.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  return req;
};

axiosInstance.interceptors.request.use(req => requestHandler(req));
axiosInstance.interceptors.response.use(
  res => {
    return res;
  },
  function(error) {
    if (error.response.status === 401) {
      console.log("Unauthorized, logging out...");
      localStorage.clear();
    }
    return Promise.reject(error.response);
  }
);

export function sendFormData(data) {
  const instance = {
    // baseURL: "http://localhost:3001",
    method: "post",
    headers: {
      Authorization: "TOKEN"
    },
    data
  };
  return instance;
}
