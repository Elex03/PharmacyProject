import axios from "axios";
import { API_URL } from "../components/config";

const FarmaNovaApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default FarmaNovaApi;
