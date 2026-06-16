import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { login } from "../../api/auth.api";
import { authStore } from "../../auth/auth.store";

export default function LoginPage() {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        setLoading(true);
        try {
            const res = await login(email, password); // POST /api/auth/login
            if (!res?.success) throw new Error(res?.message || "Login failed");

            authStore.set({
                user: res.data.user,
                token: res.data.token,
            });

            nav("/app", { replace: true });
        } catch (e2) {
            setErr(e2?.message || "Login error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-200 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <Card className="p-8">
                    <div className="text-center">
                        <img src="/logo.png" className="mx-auto h-12 w-auto" alt="Tescom" />
                        <h1 className="mt-5 text-2xl font-extrabold text-text">HOŞGELDİNİZ</h1>
                        <p className="mt-1 text-sm text-muted">Hesabınıza giriş yapın</p>
                    </div>

                    <form onSubmit={onSubmit} className="mt-7 space-y-4">
                        <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        <Input label="Şifre" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />



                        {err && (
                            <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                                {err}
                            </div>
                        )}

                        <Button className="w-full" type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>


                    </form>
                </Card>
            </div>
        </div>
    );
}
