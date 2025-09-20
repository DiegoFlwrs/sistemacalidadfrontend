"use client";
import { usePathname } from "next/navigation";
import { MODULE_TITLES } from "@/utils/Routes";

export default function Topbar() {
  const pathname = usePathname();

  const title = MODULE_TITLES[pathname] || "Sistema de Nomina";

  return (
    <header className="bg-white shadow flex justify-between items-center px-6 py-3">
      <h1 className="text-black text-3xl font-bold pt-2">{title}</h1>
    </header>
  );
}
