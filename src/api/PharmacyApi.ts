import axios from "axios";

const FarmaNovaApi = axios.create({
  baseURL: "https://farmanova-api.onrender.com/apiFarmaNova/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default FarmaNovaApi;