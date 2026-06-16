import React from "react";

export default function Toggle({ checked, onChange, label }) {
    return (
        <button type="button" onClick={() => onChange(!checked)} className="flex items-center gap-3">
      <span className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-primary" : "bg-slate-200"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${checked ? "left-5" : "left-0.5"}`} />
      </span>
            {label && <span className="text-sm text-muted">{label}</span>}
        </button>
    );
}
