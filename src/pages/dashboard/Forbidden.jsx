import React from "react";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function Forbidden() {
    return (
        <Card className="p-8">
            <div className="text-2xl font-extrabold text-text">Yetkiniz yok</div>
            <div className="mt-2 text-muted">Bu sayfaya erişim izniniz bulunmuyor.</div>
            <div className="mt-6 flex gap-3">
                <Link to="/app/service-requests">
                    <Button>Arıza Kayıtlarına Git</Button>
                </Link>
                <Link to="/app">
                    <Button className="bg-white text-text border border-slate-200 hover:bg-slate-50">Panele Dön</Button>
                </Link>
            </div>
        </Card>
    );
}
