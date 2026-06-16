import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { createServiceRequest } from "../../api/serviceRequests.api";
import { useNavigate } from "react-router-dom";

export default function ServiceRequestCreate() {
    const nav = useNavigate();
    const [form, setForm] = useState({
        brand: "",
        model: "",
        serialNumber: "",
        company: "",
        contactPerson: "",
        phone: "",
        customerComplaint: "",
    });

    const m = useMutation({
        mutationFn: () => createServiceRequest(form),
        onSuccess: (res) => {
            const id = res?.data?.id;
            if (id) nav(`/app/service-requests/${id}`);
            else nav("/app/service-requests");
        },
    });

    const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

    return (
        <div className="space-y-6">
            <div>
                <div className="text-2xl font-extrabold text-text">Yeni Arıza Kaydı</div>
                <div className="text-muted">Müşteri kaydı oluşturun.</div>
            </div>

            <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Brand" value={form.brand} onChange={set("brand")} placeholder="Siemens" />
                    <Input label="Model" value={form.model} onChange={set("model")} placeholder="X100" />
                    <Input label="Serial Number" value={form.serialNumber} onChange={set("serialNumber")} placeholder="SN-123" />
                    <Input label="Company" value={form.company} onChange={set("company")} placeholder="ABC LTD" />
                    <Input label="Contact Person" value={form.contactPerson} onChange={set("contactPerson")} placeholder="Ali Veli" />
                    <Input label="Phone" value={form.phone} onChange={set("phone")} placeholder="0555..." />

                    <label className="md:col-span-2 block">
                        <div className="mb-1 text-sm font-semibold text-text">Customer Complaint</div>
                        <textarea
                            className="min-h-[120px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-text focus:outline-none focus:ring-4 focus:ring-blue-200"
                            value={form.customerComplaint}
                            onChange={set("customerComplaint")}
                            placeholder="Cihaz açılmıyor..."
                        />
                    </label>

                    <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                        <Button variant="ghost" type="button" onClick={() => nav(-1)}>İptal</Button>
                        <Button type="button" disabled={m.isPending} onClick={() => m.mutate()}>
                            {m.isPending ? "Kaydediliyor..." : "Kaydı Oluştur"}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
