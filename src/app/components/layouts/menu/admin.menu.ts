import { Angry, BadgeDollarSign, Citrus, ScreenShare } from "lucide-react"


 export const adminMenu = [
  { to: "/admin", icon: Angry , label: "Kereta" },
  { to: "/admin/genre", icon: Citrus , label: "Stasiun" },
  { to: "/admin/movie", icon: ScreenShare, label: "Jadwal" },
  { to: "/admin/transaksi", icon: BadgeDollarSign, label: "Tiket" }
]

export type IMenu = typeof adminMenu[0]