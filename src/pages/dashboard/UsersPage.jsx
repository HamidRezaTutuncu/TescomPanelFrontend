import React, { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { ROLE } from "../../app/constants";
import {
    createUser,
    deleteUser,
    listUsers,
    updateUserPassword,
    updateUserRole,
} from "../../api/users.api";

const ROLE_OPTIONS = [
    { value: ROLE.ADMIN, label: "Admin" },
    { value: ROLE.TECHNICIAN, label: "Teknisyen" },
    { value: ROLE.OPERATOR, label: "Operatör" },
];

export default function UsersPage() {
    const qc = useQueryClient();

    const [filterRoleId, setFilterRoleId] = useState("");

    const params = useMemo(() => {
        const p = { limit: 50, offset: 0 };
        if (filterRoleId) p.roleId = Number(filterRoleId);
        return p;
    }, [filterRoleId]);

    const q = useQuery({
        queryKey: ["users", params],
        queryFn: () => listUsers(params),
    });

    const rows = q.data?.data || [];

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [roleId, setRoleId] = useState(String(ROLE.OPERATOR));

    const [err, setErr] = useState("");
    const [saving, setSaving] = useState(false);

    const onCreate = async (e) => {
        e.preventDefault();
        setErr("");
        setSaving(true);
        try {
            const res = await createUser({
                username,
                email,
                password,
                roleId: Number(roleId),
            });
            if (!res?.success) throw new Error(res?.message || "Kullanıcı oluşturulamadı");

            setUsername("");
            setEmail("");
            setPassword("");
            setRoleId(String(ROLE.OPERATOR));

            await qc.invalidateQueries({ queryKey: ["users"] });
        } catch (e2) {
            setErr(e2?.message || "Hata");
        } finally {
            setSaving(false);
        }
    };

    const onChangeRole = async (id, newRoleId) => {
        setErr("");
        setSaving(true);
        try {
            const res = await updateUserRole(id, Number(newRoleId));
            if (!res?.success) throw new Error(res?.message || "Rol güncellenemedi");
            await qc.invalidateQueries({ queryKey: ["users"] });
        } catch (e) {
            setErr(e?.message || "Hata");
        } finally {
            setSaving(false);
        }
    };

    const onResetPassword = async (id) => {
        const np = prompt("Yeni şifre:");
        if (!np) return;

        setErr("");
        setSaving(true);
        try {
            const res = await updateUserPassword(id, np);
            if (!res?.success) throw new Error(res?.message || "Şifre güncellenemedi");
        } catch (e) {
            setErr(e?.message || "Hata");
        } finally {
            setSaving(false);
        }
    };

    const onDelete = async (id) => {
        if (!confirm("Kullanıcı silinsin mi?")) return;

        setErr("");
        setSaving(true);
        try {
            const res = await deleteUser(id);
            if (!res?.success) throw new Error(res?.message || "Silinemedi");
            await qc.invalidateQueries({ queryKey: ["users"] });
        } catch (e) {
            setErr(e?.message || "Hata");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <div className="text-2xl font-extrabold text-text">Kullanıcı Yönetimi</div>
                <div className="text-muted">Ekle • rol değiştir • şifre yenile • sil</div>
            </div>

            <Card className="p-6">
                <form onSubmit={onCreate} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <Select
                        label="Role"
                        value={roleId}
                        onChange={(e) => setRoleId(e.target.value)}
                        options={ROLE_OPTIONS.map(o => ({ label: o.label, value: String(o.value) }))}
                    />

                    <div className="md:col-span-4 flex flex-wrap gap-3 items-end">
                        <Button type="submit" disabled={saving}>{saving ? "Kaydediliyor..." : "Kullanıcı Ekle"}</Button>

                        <Select
                            label="Filtre (roleId)"
                            value={filterRoleId}
                            onChange={(e) => setFilterRoleId(e.target.value)}
                            options={[{ label: "Hepsi", value: "" }, ...ROLE_OPTIONS.map(o => ({ label: o.label, value: String(o.value) }))]}
                            className="max-w-xs"
                        />
                    </div>

                    {err && (
                        <div className="md:col-span-4 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                            {err}
                        </div>
                    )}
                </form>
            </Card>

            <Card className="p-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="text-muted">
                        <tr>
                            <th className="py-3 pr-4 font-bold">ID</th>
                            <th className="py-3 pr-4 font-bold">Username</th>
                            <th className="py-3 pr-4 font-bold">Email</th>
                            <th className="py-3 pr-4 font-bold">Role</th>
                            <th className="py-3 pr-4 font-bold"></th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-200">
                        {q.isLoading && (
                            <tr><td colSpan={5} className="py-10 text-center text-muted">Loading...</td></tr>
                        )}

                        {!q.isLoading && rows.map((u) => (
                            <tr key={u.id} className="hover:bg-slate-50 transition">
                                <td className="py-4 pr-4 font-bold text-text">{u.id}</td>
                                <td className="py-4 pr-4 text-text">{u.username}</td>
                                <td className="py-4 pr-4 text-muted">{u.email}</td>

                                <td className="py-4 pr-4">
                                    <div className="flex items-center gap-2">
                                        <Badge>{u.roleId}</Badge>
                                        <Select
                                            value={String(u.roleId)}
                                            onChange={(e) => onChangeRole(u.id, e.target.value)}
                                            options={ROLE_OPTIONS.map(o => ({ label: o.label, value: String(o.value) }))}
                                            className="max-w-[180px]"
                                        />
                                    </div>
                                </td>

                                <td className="py-4 pr-4">
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            onClick={() => onResetPassword(u.id)}
                                            disabled={saving}
                                            className="bg-black text-text border border-slate-200 hover:bg-slate-50"
                                        >
                                            Şifre
                                        </Button>

                                        <Button
                                            type="button"
                                            onClick={() => onDelete(u.id)}
                                            disabled={saving}
                                            className="bg-rose-600 hover:bg-rose-700"
                                        >
                                            Sil
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {!q.isLoading && rows.length === 0 && (
                            <tr><td colSpan={5} className="py-10 text-center text-muted">Kayıt yok</td></tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
