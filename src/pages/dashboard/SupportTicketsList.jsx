import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { listSupportTickets } from "../../api/supportTickets.api";

const STATUS = ["ACIK", "INCELEMEDE", "BEKLEMEDE", "COZULDU", "KAPANDI"];
const NOTIF = ["TELEFON", "E_POSTA", "WHATSAPP", "YUZ_YUZE", "DIGER"];

export default function SupportTicketsList() {
    const [status, setStatus] = useState("");
    const [notificationType, setNotificationType] = useState("");
    const [companyLike, setCompanyLike] = useState("");
    const [contactNameLike, setContactNameLike] = useState("");

    // ✅ TÜM KAYITLAR: openedBy/createdBy gibi user filtreleri GÖNDERME!
    const params = useMemo(() => {
        const p = { limit: 20, offset: 0 };
        if (status) p.status = status;
        if (notificationType) p.notificationType = notificationType;
        if (companyLike) p.companyLike = companyLike;
        if (contactNameLike) p.contactNameLike = contactNameLike;
        return p;
    }, [status, notificationType, companyLike, contactNameLike]);

    const q = useQuery({
        queryKey: ["support-tickets", params],
        queryFn: () => listSupportTickets(params),
    });

    const rows = q.data?.data || [];

    return (
        <div className="space-y-6">
            <div className="flex items-end justify-between gap-3 flex-wrap">
                <div>
                    <div className="text-2xl font-extrabold text-text">Support Tickets</div>
                    <div className="text-muted">Kayıt açın, güncelleyin, takip edin.</div>
                </div>
                <Link to="/app/support-tickets/new">
                    <Button>+ Yeni Ticket</Button>
                </Link>
            </div>

            <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <Input
                        label="Firma (companyLike)"
                        value={companyLike}
                        onChange={(e) => setCompanyLike(e.target.value)}
                        placeholder="Örn: ABC LTD"
                    />
                    <Input
                        label="İrtibat (contactNameLike)"
                        value={contactNameLike}
                        onChange={(e) => setContactNameLike(e.target.value)}
                        placeholder="Örn: Mehmet"
                    />
                    <Select
                        label="Notification Type"
                        value={notificationType}
                        onChange={(e) => setNotificationType(e.target.value)}
                        options={[{ label: "Hepsi", value: "" }, ...NOTIF.map((x) => ({ label: x, value: x }))]}
                    />
                    <Select
                        label="Status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        options={[{ label: "Hepsi", value: "" }, ...STATUS.map((x) => ({ label: x, value: x }))]}
                    />
                </div>

                <div className="mt-3 text-sm text-muted">
                    {q.isLoading ? "Yükleniyor..." : `Toplam: ${rows.length}`}
                </div>
            </Card>

            <Card className="p-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="text-muted">
                        <tr>
                            <th className="py-3 pr-4 font-bold">ID</th>
                            <th className="py-3 pr-4 font-bold">Firma</th>
                            <th className="py-3 pr-4 font-bold">Oluşturan</th>
                            <th className="py-3 pr-4 font-bold">İrtibat</th>
                            <th className="py-3 pr-4 font-bold">Telefon</th>
                            <th className="py-3 pr-4 font-bold">Tip</th>
                            <th className="py-3 pr-4 font-bold">Status</th>
                            <th className="py-3 pr-4 font-bold"></th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-200">
                        {!q.isLoading &&
                            rows.map((r) => (
                                <tr key={r.id} className="hover:bg-slate-50 transition">
                                    <td className="py-4 pr-4 font-bold text-text">{r.id}</td>
                                    <td className="py-4 pr-4 text-text">{r.company}</td>

                                    {/* ✅ Kim oluşturdu? Dokümana göre ticket response'ta openedBy var */}
                                    <td className="py-4 pr-4 text-muted">{r.openedBy ?? "-"}</td>

                                    <td className="py-4 pr-4 text-text">{r.contactName}</td>
                                    <td className="py-4 pr-4 text-muted">{r.phone}</td>
                                    <td className="py-4 pr-4 text-muted">{r.notificationType}</td>

                                    {/* ✅ Status renkli: Badge.jsx map ile renklendiriyor */}
                                    <td className="py-4 pr-4">
                                        <Badge>{r.status}</Badge>
                                    </td>

                                    <td className="py-4 pr-4">
                                        <Link
                                            to={`/app/support-tickets/${r.id}`}
                                            className="text-primary font-bold hover:underline"
                                        >
                                            Detay
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                        {q.isLoading && (
                            <tr>
                                <td colSpan={8} className="py-10 text-center text-muted">
                                    Loading...
                                </td>
                            </tr>
                        )}
                        {!q.isLoading && rows.length === 0 && (
                            <tr>
                                <td colSpan={8} className="py-10 text-center text-muted">
                                    Kayıt yok
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
