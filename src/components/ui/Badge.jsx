import React from "react";

const map = {
    // SERVICE REQUEST STATUS
    KAYIT_OLUSTURULDU: "bg-blue-100 text-blue-700",
    INCELEMEDE: "bg-amber-100 text-amber-700",
    ITHALATCIYA_GONDERILDI: "bg-indigo-100 text-indigo-700",
    ITHALATCIDAN_GELDI: "bg-teal-100 text-teal-700",
    MUSTERIYE_GONDERILDI: "bg-purple-100 text-purple-700",
    KAPANDI: "bg-slate-200 text-slate-700",

    // SUPPORT TICKET STATUS (renkli olsun)
    ACIK: "bg-green-100 text-green-700",
    BEKLEMEDE: "bg-yellow-100 text-yellow-700",
    COZULDU: "bg-blue-100 text-blue-700",
};

export default function Badge({ children }) {
    const cls = map[children] || "bg-slate-200 text-slate-700";
    return <span className={`rounded-full px-3 py-1 text-xs font-bold ${cls}`}>{children}</span>;
}
