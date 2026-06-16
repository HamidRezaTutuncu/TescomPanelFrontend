import React from "react";
export default function Card({ className="", children }) {
    return <div className={`rounded-2xl bg-white/75 backdrop-blur-xl shadow-card ${className}`}>{children}</div>;
}
