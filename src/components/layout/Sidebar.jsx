import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    ChevronDown,
    ChevronRight,
    LayoutDashboard,
    FileText,
    User,
    LifeBuoy,
    Users
} from "lucide-react";
import { authStore } from "../../auth/auth.store";
import { ROLE } from "../../app/constants";

export default function Sidebar() {
    const [openSr, setOpenSr] = useState(true);
    const [openTickets, setOpenTickets] = useState(true);
    const [openUsers, setOpenUsers] = useState(true);

    const user = authStore.getUser();
    const roleId = user?.roleId;

    const isOperator = roleId === ROLE.OPERATOR;
    const isAdmin = roleId === ROLE.ADMIN;

    const link = ({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
            isActive
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
        }`;

    return (
        <aside className="w-72 rounded-2xl bg-gradient-to-b from-blue-50 via-white to-blue-50 border border-blue-100 p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
                <img src="/logo.png" alt="Tescom" className="h-10 w-auto" />
                <div className="text-blue-600 font-bold text-lg"></div>
            </div>
            <p className="text-xs text-gray-500 ml-13 mb-8"></p>

            <nav className="space-y-1.5">
                <NavLink to="/app" className={link}>
                    <LayoutDashboard className="w-4 h-4" />
                    Kontrol Paneli
                </NavLink>

                {/* Service Requests */}
                <button
                    type="button"
                    onClick={() => setOpenSr((v) => !v)}
                    className="w-full text-left flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition"
                >
                    <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4" />
                        <span>Arıza Kayıtları</span>
                    </div>
                    {openSr ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>

                {openSr && (
                    <div className="space-y-1.5 pl-2 mt-2 border-l-2 border-blue-200">
                        <NavLink to="/app/service-requests/new" className={link}>
                            <span className="text-blue-500 font-bold">+</span>
                            Yeni Kayıt Ekle
                        </NavLink>
                        <NavLink to="/app/service-requests" className={link}>
                            <span className="text-blue-500">≡</span>
                            Kayıtları Görüntüle
                        </NavLink>
                    </div>
                )}

                {/* Support Tickets: operatör görmesin (Admin + Teknisyen görür) */}
                {!isOperator && (
                    <>
                        <button
                            type="button"
                            onClick={() => setOpenTickets((v) => !v)}
                            className="w-full text-left flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition"
                        >
                            <div className="flex items-center gap-3">
                                <LifeBuoy className="w-4 h-4" />
                                <span>Support Tickets</span>
                            </div>
                            {openTickets ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>

                        {openTickets && (
                            <div className="space-y-1.5 pl-2 mt-2 border-l-2 border-blue-200">
                                <NavLink to="/app/support-tickets/new" className={link}>
                                    <span className="text-blue-500 font-bold">+</span>
                                    Yeni Ticket
                                </NavLink>
                                <NavLink to="/app/support-tickets" className={link}>
                                    <span className="text-blue-500">≡</span>
                                    Ticketları Görüntüle
                                </NavLink>
                            </div>
                        )}
                    </>
                )}

                {/* Kullanıcı Yönetimi: SADECE ADMIN */}
                {isAdmin && (
                    <>
                        <button
                            type="button"
                            onClick={() => setOpenUsers((v) => !v)}
                            className="w-full text-left flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition"
                        >
                            <div className="flex items-center gap-3">
                                <Users className="w-4 h-4" />
                                <span>Kullanıcı Yönetimi</span>
                            </div>
                            {openUsers ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>

                        {openUsers && (
                            <div className="space-y-1.5 pl-2 mt-2 border-l-2 border-blue-200">
                                <NavLink to="/app/users" className={link}>
                                    <span className="text-blue-500">≡</span>
                                    Kullanıcılar
                                </NavLink>
                            </div>
                        )}
                    </>
                )}

                <NavLink to="/app/profile" className={link}>
                    <User className="w-4 h-4" />
                    Kişisel Bilgiler
                </NavLink>
            </nav>

            <div className="mt-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-4 text-white shadow-md">
                <div className="font-semibold text-sm">Tescom Panel</div>
                <div className="text-xs text-blue-100 mt-1">Hizmet Yönetim Sistemi</div>
            </div>
        </aside>
    );
}
