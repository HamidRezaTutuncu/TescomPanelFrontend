import React from "react";
import { Navigate } from "react-router-dom";
import { authStore } from "./auth.store";
import { hasRole } from "../app/constants";

export default function ProtectedRoute({ children, roles }) {
    if (!authStore.isAuthed()) return <Navigate to="/" replace />;
    const user = authStore.getUser();
    if (roles && !hasRole(user, roles)) return <Navigate to="/app" replace />;
    return children;
}
