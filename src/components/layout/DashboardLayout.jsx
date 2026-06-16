import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-200">
            <div className="mx-auto flex min-h-screen max-w-[1400px] gap-6 p-6">
                <Sidebar />
                <div className="flex-1">
                    <Topbar />
                    <div className="mt-6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
