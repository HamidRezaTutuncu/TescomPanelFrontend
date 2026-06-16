import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { authStore } from "../../auth/auth.store";

export default function Topbar() {
    const nav = useNavigate();
    const user = authStore.getUser();

    const logout = () => {
        authStore.clear();
        nav("/", { replace: true });
    };
/*
<div className="rounded-xl bg-slate-100 px-3 py-2">
                    <input className="w-72 bg-transparent text-sm outline-none" placeholder="Search..." />
                </div>
 */
    return (
        <div className="flex items-center justify-between rounded-2xl bg-white/70 backdrop-blur-xl px-5 py-4 shadow-card">
            <div className="flex items-center gap-3">


            </div>

            <div className="flex items-center gap-3">
                <div className="text-sm text-muted font-semibold">{user?.username || user?.email || "User"}</div>
                <Button variant="soft" onClick={logout}>Çıkış</Button>
            </div>
        </div>
    );
}
