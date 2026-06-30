'use client'

import { Angry, BadgeDollarSign, Citrus, LayoutDashboard, ScreenShare } from "lucide-react";
import { IMenu } from "./menu/admin.menu";
import Link from "next/link";


const navItems = [
  { to: "/admin", icon: <LayoutDashboard/> , label: "dashboard" },
  { to: "/admin/kereta", icon: <Angry /> , label: "Kereta" },
  { to: "/admin/stasiun", icon: <Citrus />, label: "Stasiun" },
  { to: "/admin/jadwal", icon: <ScreenShare />, label: "Jadwal" },
  { to: "/admin/tiket", icon: <BadgeDollarSign />, label: "Tiket" },
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
        {!collapsed && <span className="brand-name">TIKET KERETA</span>}
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