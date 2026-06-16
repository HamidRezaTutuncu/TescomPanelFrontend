const KEY = "tescom_auth";

export const authStore = {
    get() {
        try { return JSON.parse(localStorage.getItem(KEY) || "null"); }
        catch { return null; }
    },
    set(payload) { localStorage.setItem(KEY, JSON.stringify(payload)); },
    clear() { localStorage.removeItem(KEY); },
    getToken() { return this.get()?.token || null; },
    getUser() { return this.get()?.user || null; },
    isAuthed() { return !!this.getToken(); },
};
