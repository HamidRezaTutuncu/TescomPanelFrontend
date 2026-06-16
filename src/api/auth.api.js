import { http } from "./http";

export async function login(email, password) {
    const { data } = await http.post("/auth/login", { email, password });
    return data;
}
