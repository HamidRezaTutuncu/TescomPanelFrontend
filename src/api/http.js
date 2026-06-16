import axios from "axios";
import { authStore } from "../auth/auth.store";

export const http = axios.create({
    baseURL: "/api", // ✅ proxy için şart
});

http.interceptors.request.use((config) => {
    const token = authStore.getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
