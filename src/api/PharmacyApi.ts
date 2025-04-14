import axios from "axios";

const FarmaNovaApi = axios.create({
  baseURL: "http://localhost:3000/apiFarmaNova/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default FarmaNovaApi;