import { Angry, BadgeDollarSign, Citrus, LayoutDashboard, ScreenShare, UserRoundPen } from "lucide-react"


 export const adminMenu = [
  { to: "/admin", icon: LayoutDashboard , label: "dashboard" },
  { to: "/admin/penumpang", icon: UserRoundPen, label: "Penumpang" },
  { to: "/admin/kereta", icon: Angry , label: "Kereta" },
  { to: "/admin/stasiun", icon: Citrus , label: "Stasiun" },
  { to: "/admin/jadwal", icon: ScreenShare, label: "Jadwal" },
  { to: "/admin/tiket", icon: BadgeDollarSign, label: "Tiket" }
]

export type IMenu = typeof adminMenu[0]