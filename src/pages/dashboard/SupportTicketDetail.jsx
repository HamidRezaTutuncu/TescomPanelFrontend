import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import {
    getSupportTicket,
    patchSupportTicket,
    updateSupportTicketStatus,
    deleteSupportTicket,
} from "../../api/supportTickets.api";

const STATUS = ["ACIK", "INCELEMEDE", "BEKLEMEDE", "COZULDU", "KAPANDI"];

export default function SupportTicketDetail() {
    const { id } = useParams();
    const nav = useNavigate();
    const qc = useQueryClient();

    const q = useQuery({
        queryKey: ["support-ticket", id],
        queryFn: () => getSupportTicket(id),
    });

    const t = q.data?.data;
    const [saving, setSaving] = useState(false);
    const [err, setErr] = useState("");

    const [solution, setSolution] = useState("");
    const [note, setNote] = useState("");
    const [emailToSend, setEmailToSend] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (!t) return;
        setSolution(t.solution || "");
        setNote(t.note || "");
        setEmailToSend(t.emailToSend || "");
        setStatus(t.status || "");
    }, [t]);

    const onSaveFields = async () => {
        if (!id) return;
        setErr("");
        setSaving(true);
        try {
            const res = await patchSupportTicket(id, {
                solution,
                note,
                emailToSend: emailToSend || null,
            });
            if (!res?.success) throw new Error(res?.message || "Güncellenemedi");
            await qc.invalidateQueries({ queryKey: ["support-ticket", id] });
            await qc.invalidateQueries({ queryKey: ["support-tickets"] });
        } catch (e) {
            setErr(e?.message || "Hata");
        } finally {
            setSaving(false);
        }
    };

    const onSaveStatus = async () => {
        if (!id) return;
        setErr("");
        setSaving(true);
        try {
            const res = await updateSupportTicketStatus(id, status);
            if (!res?.success) throw new Error(res?.message || "Status güncellenemedi");
            await qc.invalidateQueries({ queryKey: ["support-ticket", id] });
            await qc.invalidateQueries({ queryKey: ["support-tickets"] });
        } catch (e) {
            setErr(e?.message || "Hata");
        } finally {
            setSaving(false);
        }
    };

    const onDelete = async () => {
        if (!id) return;
        if (!confirm("Ticket silinsin mi?")) return;
        setErr("");
        setSaving(true);
        try {
            const res = await deleteSupportTicket(id);
            if (!res?.success) throw new Error(res?.message || "Silinemedi");
            await qc.invalidateQueries({ queryKey: ["support-tickets"] });
            nav("/app/support-tickets", { replace: true });
        } catch (e) {
            setErr(e?.message || "Hata");
        } finally {
            setSaving(false);
        }
    };

    if (q.isLoading) return <Card className="p-6">Loading...</Card>;
    if (!t) return <Card className="p-6">Ticket bulunamadı.</Card>;

    return (
        <div className="space-y-6">
            <div className="flex items-end justify-between gap-3 flex-wrap">
                <div>
                    <div className="text-2xl font-extrabold text-text">Ticket #{t.id}</div>
                    <div className="text-muted">{t.company} • {t.contactName} • {t.phone}</div>
                    <div className="text-sm text-muted mt-1">Oluşturan: {t.openedBy ?? "-"}</div>
                </div>
                <div className="flex gap-2 items-center">
                    <Badge>{t.status}</Badge>
                    <Button
                        onClick={() => nav("/app/support-tickets")}
                        className="bg-white text-text border border-slate-200 hover:bg-slate-50"
                    >Liste</Button>
                </div>
            </div>

            <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <div className="text-sm font-semibold text-text mb-1">Issue</div>
                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-text">{t.issue}</div>
                    </div>

                    <Input label="Solution" value={solution} onChange={(e) => setSolution(e.target.value)} />
                    <Input label="Not" value={note} onChange={(e) => setNote(e.target.value)} />
                    <div className="md:col-span-2">
                        <Input label="Email To Send" value={emailToSend} onChange={(e) => setEmailToSend(e.target.value)} />
                    </div>

                    <div>
                        <Select
                            label="Status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            options={STATUS.map((x) => ({ label: x, value: x }))}
                        />
                        <div className="mt-2">
                            <Button onClick={onSaveStatus} disabled={saving}>Status Güncelle</Button>
                        </div>
                    </div>

                    <div className="flex items-end gap-3">
                        <Button onClick={onSaveFields} disabled={saving}>{saving ? "Kaydediliyor..." : "Alanları Kaydet"}</Button>
                        <Button onClick={onDelete} disabled={saving} className="bg-rose-600 hover:bg-rose-700">Sil</Button>
                    </div>
                </div>

                {err && (
                    <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{err}</div>
                )}
            </Card>
        </div>
    );
}
