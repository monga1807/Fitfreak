import api from "../utils/axios";

export const saveToday = (data) => api.post("/fitness", data);
export const getToday = () => api.get("/fitness/today");
export const getAllLogs = () => api.get("/fitness");
