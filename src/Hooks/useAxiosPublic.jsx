import axios from "axios";

const axiosPublic = axios.create({
  baseURL:
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV === "production"
      ? "https://php-etco-server-side.vercel.app" // Production URL
      : "http://localhost:5000" // Local development URL
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
