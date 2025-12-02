import { 
  DocumentTextIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon
} from "@heroicons/react/24/outline";

export const DASHBOARD_ROUTES = [
  { path: "/dashboard/contrato", name: "Contrato", icon: DocumentTextIcon },
  { path: "/dashboard/nomina", name: "Nómina", icon: CurrencyDollarIcon },
  { path: "/dashboard/reporte", name: "Reporte", icon: ChartBarIcon },
];

export const MODULE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/contrato": "Gestiónar Contrato Laboral",
  "/dashboard/nomina": "Procesar Nominas por periodo",
  "/dashboard/reporte": "Gestión de Reportes de Nominas",
};