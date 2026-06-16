import { http } from "./http";

/**
 * GET /api/service-requests?limit=20&offset=0&status=...&brandLike=...&companyLike=...
 */
export async function listServiceRequests(params) {
    const normalized = { ...(params || {}) };

    // ✅ listAll varsa stringe çevir (backend uyumu için)
    if (typeof normalized.listAll === "boolean") {
        normalized.listAll = normalized.listAll ? "true" : "false";
    }

    const { data } = await http.get("/service-requests", {
        params: normalized,
        headers: { "Cache-Control": "no-cache" },
    });

    return data;
}


/**
 * GET /api/service-requests/:id
 */
export async function getServiceRequest(id) {
    const { data } = await http.get(`/service-requests/${id}`, {
        headers: { "Cache-Control": "no-cache" }, // ✅ 304 sorununu azaltır
    });
    return data;
}

/**
 * POST /api/service-requests
 */
export async function createServiceRequest(body) {
    const { data } = await http.post("/service-requests", body);
    return data;
}

/**
 * PATCH /api/service-requests/:id
 */
export async function patchServiceRequest(id, body) {
    const { data } = await http.patch(`/service-requests/${id}`, body);
    return data;
}

/**
 * PATCH /api/service-requests/:id/status
 */
export async function updateStatus(id, status) {
    const { data } = await http.patch(`/service-requests/${id}/status`, { status });
    return data;
}

/**
 * PATCH /api/service-requests/:id/assign-inspector
 */
export async function assignInspector(id, inspectedBy) {
    const { data } = await http.patch(`/service-requests/${id}/assign-inspector`, { inspectedBy });
    return data;
}

/**
 * Flow endpoints
 */
export async function sendToSupplier(id) {
    const { data } = await http.post(`/service-requests/${id}/send-to-supplier`);
    return data;
}

export async function receiveFromSupplier(id) {
    const { data } = await http.post(`/service-requests/${id}/receive-from-supplier`);
    return data;
}

export async function sendToCustomer(id) {
    const { data } = await http.post(`/service-requests/${id}/send-to-customer`);
    return data;
}

/**
 * DELETE /api/service-requests/:id
 */
export async function deleteServiceRequest(id) {
    const { data } = await http.delete(`/service-requests/${id}`);
    return data;
}
