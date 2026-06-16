import { http } from "./http";

export async function listUsers(params) {
    const { data } = await http.get("/users", { params });
    return data;
}

export async function createUser(body) {
    const { data } = await http.post("/users", body);
    return data;
}

export async function updateUserRole(id, roleId) {
    const { data } = await http.patch(`/users/${id}/role`, { roleId });
    return data;
}

export async function updateUserPassword(id, newPassword) {
    const { data } = await http.patch(`/users/${id}/password`, { newPassword });
    return data;
}

export async function deleteUser(id) {
    const { data } = await http.delete(`/users/${id}`);
    return data;
}
