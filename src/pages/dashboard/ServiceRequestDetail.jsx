import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Select from "../../components/ui/Select";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import {
    getServiceRequest,
    patchServiceRequest,
    updateStatus,
    sendToSupplier,
    receiveFromSupplier,
    sendToCustomer,
} from "../../api/serviceRequests.api";

const STATUS = [
    "KAYIT_OLUSTURULDU",
    "INCELEMEDE",
    "ITHALATCIYA_GONDERILDI",
    "ITHALATCIDAN_GELDI",
    "MUSTERIYE_GONDERILDI",
    "KAPANDI",
];

export default function ServiceRequestDetail() {
    const { id } = useParams();
    const q = useQuery({
        queryKey: ["service-request", id],
        queryFn: () => getServiceRequest(id),
    });

    const item = q.data?.data;

    const [edit, setEdit] = useState({ initialInspectionResult: "", supplierNote: "" });
    const [newStatus, setNewStatus] = useState("");
    //const [inspectedBy, setInspectedBy] = useState("");

    const mPatch = useMutation({ mutationFn: () => patchServiceRequest(id, edit), onSuccess: () => q.refetch() });
    const mStatus = useMutation({ mutationFn: () => updateStatus(id, newStatus), onSuccess: () => q.refetch() });
    //const mAssign = useMutation({ mutationFn: () => assignInspector(id, Number(inspectedBy)), onSuccess: () => q.refetch() });

    const mSend = useMutation({ mutationFn: () => sendToSupplier(id), onSuccess: () => q.refetch() });
    const mRecv = useMutation({ mutationFn: () => receiveFromSupplier(id), onSuccess: () => q.refetch() });
    const mShip = useMutation({ mutationFn: () => sendToCustomer(id), onSuccess: () => q.refetch() });

    if (q.isLoading) return <div className="text-muted">Loading...</div>;
    if (!item) return <div className="text-muted">Not found</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-end justify-between gap-3 flex-wrap">
                <div>
                    <div className="text-2xl font-extrabold text-text">Kayıt Detayı #{item.id}</div>
                    <div className="text-muted">Status: <span className="ml-2"><Badge>{item.status}</Badge></span></div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="p-6 lg:col-span-2">
                    <div className="text-lg font-extrabold text-text">Bilgiler</div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div><div className="text-muted font-bold">Brand</div><div className="font-semibold">{item.brand}</div></div>
                        <div><div className="text-muted font-bold">Model</div><div className="font-semibold">{item.model}</div></div>
                        <div><div className="text-muted font-bold">Serial</div><div className="font-semibold">{item.serialNumber}</div></div>
                        <div><div className="text-muted font-bold">Company</div><div className="font-semibold">{item.company}</div></div>
                        <div><div className="text-muted font-bold">Contact</div><div className="font-semibold">{item.contactPerson}</div></div>
                        <div><div className="text-muted font-bold">Phone</div><div className="font-semibold">{item.phone}</div></div>
                        <div className="md:col-span-2">
                            <div className="text-muted font-bold">Complaint</div>
                            <div className="font-semibold">{item.customerComplaint}</div>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="text-lg font-extrabold text-text">İşlemler</div>

                    <div className="mt-4 space-y-4">
                        <Select
                            label="Status güncelle"
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            options={[
                                { label: "Seçiniz", value: "" },
                                ...STATUS.map((s) => ({ label: s, value: s })),
                            ]}
                        />
                        <Button className="w-full" disabled={!newStatus || mStatus.isPending} onClick={() => mStatus.mutate()}>
                            {mStatus.isPending ? "Güncelleniyor..." : "Status Update"}
                        </Button>



                        <div className="pt-2 border-t border-slate-200" />

                        <Button className="w-full" variant="soft" disabled={mSend.isPending} onClick={() => mSend.mutate()}>
                            İthalatçıya Gönder
                        </Button>
                        <Button className="w-full" variant="soft" disabled={mRecv.isPending} onClick={() => mRecv.mutate()}>
                            İthalatçıdan Geldi
                        </Button>
                        <Button className="w-full" variant="soft" disabled={mShip.isPending} onClick={() => mShip.mutate()}>
                            Müşteriye Gönder
                        </Button>
                    </div>
                </Card>
            </div>

            <Card className="p-6">
                <div className="text-lg font-extrabold text-text">Notlar</div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Initial Inspection Result"
                        value={edit.initialInspectionResult}
                        onChange={(e) => setEdit((p) => ({ ...p, initialInspectionResult: e.target.value }))}
                        placeholder="Anakart arızalı..."
                    />
                    <Input
                        label="Supplier Note"
                        value={edit.supplierNote}
                        onChange={(e) => setEdit((p) => ({ ...p, supplierNote: e.target.value }))}
                        placeholder="Parça bekleniyor..."
                    />
                    <div className="md:col-span-2 flex justify-end">
                        <Button disabled={mPatch.isPending} onClick={() => mPatch.mutate()}>
                            {mPatch.isPending ? "Kaydediliyor..." : "Kaydet (PATCH)"}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
