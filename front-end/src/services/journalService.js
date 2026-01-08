import api from "../utils/axios";

export const createEntry = (data) => api.post("/journal", data);
export const getEntries = () => api.get("/journal");
export const updateEntry = (id, data) => api.put(`/journal/${id}`, data);
export const deleteEntry = (id) => api.delete(`/journal/${id}`);
