'use client'

import { Angry, BadgeDollarSign, Citrus, ScreenShare } from "lucide-react";
import { IMenu } from "./menu/admin.menu";
import Link from "next/link";


const navItems = [
  { to: "/admin", icon: <Angry /> , label: "Kereta" },
  { to: "/admin/genre", icon: <Citrus />, label: "Stasiun" },
  { to: "/admin/movie", icon: <ScreenShare />, label: "Jadwal" },
  { to: "/admin/transaksi", icon: <BadgeDollarSign />, label: "Tiket" },
];

export default function Sidebar(
  { 
    isOpen,
    listMenu, 
    collapsed,
    onClose 
  } : {
    isOpen: boolean,
    listMenu: IMenu[],
    collapsed: boolean,
    onClose: () => void
  }
) {
  return (
    <div
      className={`sidebar ${isOpen ? "open" : ""} ${collapsed ? "collapsed" : ""}`}
    >
      <div className="sidebar-brand">
        {!collapsed && <span className="brand-name">Movie App</span>}
        <button
          className="btn d-md-none ms-auto"
          style={{ color: "white" }}
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <nav className="mt-2">
        <ul className="nav flex-column">
          {listMenu.map(({ to, icon: Icon, label }) => (
            <li className="nav-item" key={to}>
              <Link
                href={to}
                className={'nav-link'}
                onClick={onClose}
                title={collapsed ? label : ""}
              >
                <span className="nav-icon">
                  <Icon/>
                </span>
                {!collapsed && <span className="nav-label">{label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}