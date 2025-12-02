"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_ROUTES } from "../utils/Routes";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-[#223F65] text-white h-screen p-4">
      <h1 className="text-xl font-bold py-5">Sistema de Nomina</h1> 
      <nav className="space-y-2">
        {DASHBOARD_ROUTES.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-700 ${
              pathname === route.path ? "bg-gray-700" : ""
            }`}
          >
            <route.icon className="h-5 w-5" />
            {route.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
