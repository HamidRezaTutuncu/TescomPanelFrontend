import React from "react";

export default function Select({ label, options=[], className="", ...props }) {
    return (
        <label className="block">
            {label && <div className="mb-1 text-sm font-semibold text-text">{label}</div>}
            <select
                className={[
                    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-text",
                    "focus:outline-none focus:ring-4 focus:ring-blue-200",
                    className
                ].join(" ")}
                {...props}
            >
                {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
        </label>
    );
}
