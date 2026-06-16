import React from "react";
import Card from "../../components/ui/Card.jsx";

export default function DashboardHome() {
    return (
        <div className="space-y-6">
            <div>
                <div className="text-3xl font-extrabold text-text">Dashboard</div>
                <div className="text-muted">Maintenance & Fault Tracking</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                    <div className="text-sm text-muted font-bold">Total Fault Records</div>
                    <div className="mt-2 text-4xl font-extrabold text-text">—</div>
                    <div className="mt-1 text-sm text-emerald-600 font-bold">API bağlanınca dolacak</div>
                </Card>
            </div>
        </div>
    );
}
