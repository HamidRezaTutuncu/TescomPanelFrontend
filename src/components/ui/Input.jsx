import React from "react";

export default function Input({ label, className="", ...props }) {
    return (
        <label className="block">
            {label && <div className="mb-1 text-sm font-semibold text-text">{label}</div>}
            <input
                className={[
                    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-text",
                    "placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-200",
                    className
                ].join(" ")}
                {...props}
            />
        </label>
    );
}
