// src/services/habitService.js
import api from "../utils/axios";

export const createHabit = (data) => api.post("/habits", data);
export const getHabits = () => api.get("/habits");
export const checkHabitToday = (habitId) => api.post(`/habits/${habitId}/check`);
export const getStreak = (habitId) => api.get(`/habits/${habitId}/streak`);
export const getChecks = (params = {}) => api.get("/habits/checks", { params }); // params: { from, to }
