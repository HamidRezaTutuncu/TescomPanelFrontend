import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Toggle from "../../components/ui/Toggle";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { listServiceRequests } from "../../api/serviceRequests.api";
import { authStore } from "../../auth/auth.store";
import { ROLE } from "../../app/constants";

const STATUS = [
    "KAYIT_OLUSTURULDU",
    "INCELEMEDE",
    "ITHALATCIYA_GONDERILDI",
    "ITHALATCIDAN_GELDI",
    "MUSTERIYE_GONDERILDI",
    "KAPANDI",
];

export default function ServiceRequestsList() {
    const user = authStore.getUser();
    const roleId = user?.roleId;

    const isOperator = roleId === ROLE.OPERATOR;

    const [status, setStatus] = useState("");
    const [brandLike, setBrandLike] = useState("");
    const [companyLike, setCompanyLike] = useState("");

    // Operatör için toggle anlamlı; admin/teknisyen için zaten "tüm kayıtlar"
    const [listAll, setListAll] = useState(true);

    const params = useMemo(() => {
        const p = { limit: 20, offset: 0 };

        // ✅ Admin + Teknisyen: her zaman tüm kayıtlar
        // ✅ Operatör: toggle’a göre tüm/kendi
        const effectiveListAll = isOperator ? listAll : true;

        // ⚠️ Backend bazen "true/false" string bekler → garantiye alıyoruz
        p.listAll = effectiveListAll ? "true" : "false";

        // Eğer backend "listAll=false" iken createdBy ile filtre istiyorsa:
        if (!effectiveListAll && user?.id) {
            p.createdBy = user.id;
        }

        if (status) p.status = status;
        if (brandLike) p.brandLike = brandLike;
        if (companyLike) p.companyLike = companyLike;

        return p;
    }, [status, brandLike, companyLike, listAll, isOperator, user?.id]);

    const q = useQuery({
        queryKey: ["service-requests", params],
        queryFn: () => listServiceRequests(params),
    });

    const rows = q.data?.data || [];

    return (
        <div className="space-y-6">
            <div className="flex items-end justify-between gap-3 flex-wrap">
                <div>
                    <div className="text-2xl font-extrabold text-text">Arıza Kayıtları</div>
                    <div className="text-muted">Filtreleyin, görüntüleyin, takip edin.</div>
                </div>
                <Link to="/app/service-requests/new">
                    <Button>+ Yeni Kayıt</Button>
                </Link>
            </div>

            <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <Input
                        label="Marka (brandLike)"
                        value={brandLike}
                        onChange={(e) => setBrandLike(e.target.value)}
                        placeholder="Örn: Siemens"
                    />
                    <Input
                        label="Firma (companyLike)"
                        value={companyLike}
                        onChange={(e) => setCompanyLike(e.target.value)}
                        placeholder="Örn: ABC LTD"
                    />
                    <Select
                        label="Status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        options={[
                            { label: "Hepsi", value: "" },
                            ...STATUS.map((s) => ({ label: s, value: s })),
                        ]}
                    />

                    <div className="md:col-span-3 flex items-center justify-between flex-wrap gap-3 pt-2">
                        {/* ✅ Toggle sadece operatörde görünür */}
                        {isOperator ? (
                            <Toggle checked={listAll} onChange={setListAll} label="List All" />
                        ) : (
                            <div className="text-sm text-muted">Admin/Teknisyen: Tüm kayıtlar gösterilir</div>
                        )}

                        <div className="text-sm text-muted">
                            {q.isLoading ? "Yükleniyor..." : `Toplam: ${rows.length}`}
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="text-muted">
                        <tr>
                            <th className="py-3 pr-4 font-bold">ID</th>
                            <th className="py-3 pr-4 font-bold">Brand</th>
                            <th className="py-3 pr-4 font-bold">Model</th>
                            <th className="py-3 pr-4 font-bold">Serial</th>
                            <th className="py-3 pr-4 font-bold">Company</th>
                            <th className="py-3 pr-4 font-bold">Oluşturan</th>
                            <th className="py-3 pr-4 font-bold">Status</th>
                            <th className="py-3 pr-4 font-bold"></th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-200">
                        {!q.isLoading &&
                            rows.map((r) => (
                                <tr key={r.id} className="hover:bg-slate-50 transition">
                                    <td className="py-4 pr-4 font-bold text-text">{r.id}</td>
                                    <td className="py-4 pr-4 text-text">{r.brand}</td>
                                    <td className="py-4 pr-4 text-text">{r.model}</td>
                                    <td className="py-4 pr-4 text-muted">{r.serialNumber}</td>
                                    <td className="py-4 pr-4 text-muted">{r.company}</td>

                                    {/* createdBy dokümanda var, ID döner */}
                                    <td className="py-4 pr-4 text-muted">{r.createdBy ?? "-"}</td>

                                    <td className="py-4 pr-4">
                                        <Badge>{r.status}</Badge>
                                    </td>
                                    <td className="py-4 pr-4">
                                        <Link
                                            to={`/app/service-requests/${r.id}`}
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
