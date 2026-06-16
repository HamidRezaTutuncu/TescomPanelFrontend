import React from "react";
import Card from "../../components/ui/Card";
import { authStore } from "../../auth/auth.store";

export default function ProfilePage() {
    const u = authStore.getUser();
    return (
        <Card className="p-6">
            <div className="text-2xl font-extrabold text-text">Personal information</div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-xs text-muted font-bold">Username</div>
                    <div className="mt-1 font-extrabold text-text">{u?.username || "-"}</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-xs text-muted font-bold">Email</div>
                    <div className="mt-1 font-extrabold text-text">{u?.email || "-"}</div>
                </div>
            </div>
        </Card>
    );
}
