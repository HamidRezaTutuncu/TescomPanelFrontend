import React from "react";
import { Navigate } from "react-router-dom";
import { authStore } from "../../auth/auth.store";
import { ROLE } from "../../app/constants";

export default function AppIndexRedirect() {
    const user = authStore.getUser();
    // Operatör sadece Arıza Kayıtları
    if (user?.roleId === ROLE.OPERATOR) return <Navigate to="/app/service-requests" replace />;
    // Admin/Teknisyen için dashboard
    return <Navigate to="/app/home" replace />;
}
