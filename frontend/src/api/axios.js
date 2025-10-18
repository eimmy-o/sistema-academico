import axios from "axios";

const api = axios.create({
    // DESARROLLO LOCAL:
  baseURL: "http://127.0.0.1:8000/api/",
});

export default api;
 