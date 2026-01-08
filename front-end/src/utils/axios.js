import axios from "axios";

const api = axios.create({
    baseURL: "https://fitfreak-1bov.onrender.com/api",
});

export default api;
