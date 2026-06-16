import React from "react";

export default function Button({ variant = "primary", className = "", children, ...props }) {
    const base =
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition active:scale-[0.98] disabled:opacity-60";
    const styles = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        soft: "bg-blue-100 text-blue-700 hover:bg-blue-200",
        ghost: "bg-transparent text-blue-600 hover:bg-blue-50",
    };

    return (
        <button className={`${base} ${styles[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
}
