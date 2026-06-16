import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { createSupportTicket } from "../../api/supportTickets.api";

const NOTIF = ["TELEFON", "E_POSTA", "WHATSAPP", "YUZ_YUZE", "DIGER"];

export default function SupportTicketCreate() {
    const nav = useNavigate();
    const [company, setCompany] = useState("");
    const [contactName, setContactName] = useState("");
    const [phone, setPhone] = useState("");
    const [notificationType, setNotificationType] = useState("TELEFON");
    const [issue, setIssue] = useState("");
    const [note, setNote] = useState("");
    const [emailToSend, setEmailToSend] = useState("");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        setLoading(true);
        try {
            const res = await createSupportTicket({
                company,
                contactName,
                phone,
                notificationType,
                issue,
                note,
                emailToSend: emailToSend || undefined,
            });
            if (!res?.success) throw new Error(res?.message || "Ticket oluşturulamadı");
            nav(`/app/support-tickets/${res.data.id}`, { replace: true });
        } catch (e2) {
            setErr(e2?.message || "Hata");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <div className="text-2xl font-extrabold text-text">Yeni Support Ticket</div>
                <div className="text-muted">Müşteriden gelen bildirim kaydı.</div>
            </div>

            <Card className="p-6">
                <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Firma" value={company} onChange={(e) => setCompany(e.target.value)} required />
                    <Input label="İrtibat Kişisi" value={contactName} onChange={(e) => setContactName(e.target.value)} required />
                    <Input label="Telefon" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    <Select
                        label="Bildirim Tipi"
                        value={notificationType}
                        onChange={(e) => setNotificationType(e.target.value)}
                        options={NOTIF.map((x) => ({ label: x, value: x }))}
                    />

                    <div className="md:col-span-2">
                        <Input label="Issue" value={issue} onChange={(e) => setIssue(e.target.value)} required />
                    </div>
                    <div className="md:col-span-2">
                        <Input label="Not" value={note} onChange={(e) => setNote(e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                        <Input label="Email To Send" value={emailToSend} onChange={(e) => setEmailToSend(e.target.value)} />
                    </div>

                    {err && (
                        <div className="md:col-span-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{err}</div>
                    )}

                    <div className="md:col-span-2 flex gap-3">
                        <Button type="submit" disabled={loading}>{loading ? "Kaydediliyor..." : "Kaydet"}</Button>
                        <Button
                            type="button"
                            onClick={() => nav("/app/support-tickets")}
                            className="bg-white text-text border border-slate-200 hover:bg-slate-50"
                        >
                            İptal
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
