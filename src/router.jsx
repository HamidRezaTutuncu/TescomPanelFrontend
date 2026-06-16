import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import LoginPage from "./pages/auth/LoginPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ServiceRequestsList from "./pages/dashboard/ServiceRequestsList";
import ServiceRequestCreate from "./pages/dashboard/ServiceRequestCreate";
import ServiceRequestDetail from "./pages/dashboard/ServiceRequestDetail";
import ProfilePage from "./pages/dashboard/ProfilePage";

import SupportTicketsList from "./pages/dashboard/SupportTicketsList";
import SupportTicketCreate from "./pages/dashboard/SupportTicketCreate";
import SupportTicketDetail from "./pages/dashboard/SupportTicketDetail";

// ✅ EKLENDİ
import UsersPage from "./pages/dashboard/UsersPage";

import { ROLE } from "./app/constants";

const router = createBrowserRouter([
    { path: "/", element: <LoginPage /> },
    {
        path: "/app",
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            { path: "", element: <DashboardHome /> },

            // Arıza kayıtları: herkes (operatör dahil)
            { path: "service-requests", element: <ServiceRequestsList /> },
            { path: "service-requests/new", element: <ServiceRequestCreate /> },
            { path: "service-requests/:id", element: <ServiceRequestDetail /> },

            // Tickets: Admin + Teknisyen (operatör görmesin)
            {
                path: "support-tickets",
                element: (
                    <ProtectedRoute roles={[ROLE.ADMIN, ROLE.TECHNICIAN]}>
                        <SupportTicketsList />
                    </ProtectedRoute>
                ),
            },
            {
                path: "support-tickets/new",
                element: (
                    <ProtectedRoute roles={[ROLE.ADMIN, ROLE.TECHNICIAN]}>
                        <SupportTicketCreate />
                    </ProtectedRoute>
                ),
            },
            {
                path: "support-tickets/:id",
                element: (
                    <ProtectedRoute roles={[ROLE.ADMIN, ROLE.TECHNICIAN]}>
                        <SupportTicketDetail />
                    </ProtectedRoute>
                ),
            },

            // ✅ EKLENDİ: Users: SADECE ADMIN
            {
                path: "users",
                element: (
                    <ProtectedRoute roles={[ROLE.ADMIN]}>
                        <UsersPage />
                    </ProtectedRoute>
                ),
            },

            { path: "profile", element: <ProfilePage /> },
        ],
    },
]);

export default router;
