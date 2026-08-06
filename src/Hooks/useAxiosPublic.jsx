import axios from "axios";
import { API_URL } from "../config";

const axiosPublic = axios.create({
  baseURL: API_URL,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
