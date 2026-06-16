import { http } from "./http";

export async function listSupportTickets(params) {
    const { data } = await http.get("/support-tickets", { params });
    return data;
}

export async function getSupportTicket(id) {
    const { data } = await http.get(`/support-tickets/${id}`);
    return data;
}

export async function createSupportTicket(body) {
    const { data } = await http.post("/support-tickets", body);
    return data;
}

export async function patchSupportTicket(id, body) {
    const { data } = await http.patch(`/support-tickets/${id}`, body);
    return data;
}

export async function updateSupportTicketStatus(id, status) {
    const { data } = await http.patch(`/support-tickets/${id}/status`, { status });
    return data;
}

export async function deleteSupportTicket(id) {
    const { data } = await http.delete(`/support-tickets/${id}`);
    return data;
}
