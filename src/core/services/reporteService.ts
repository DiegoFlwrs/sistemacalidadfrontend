// services/reporteNominaService.ts
import { AxiosResponse } from "axios";
import { customRequest } from "./api/httpClient";

// 🔹 Request común para ambos endpoints
export interface ReporteNominaRequest {
  PeriodoCodigo: string;
  DepartamentoCodigo?: string | null;
  CargoCodigo?: string | null;
  TipoContratoCodigo?: string | null;
}

// 🔹 Respuesta de listado
export interface ReporteNominaItem {
  NominaCodigo: string;
  Nombre: string;
  DepartamentoCodigo?: string;
  DepartamentoNombre?: string;
  NominaHorasExtras: number | null;
  NominaMontoHorasExtras: number | null;
  ContratoSalario: number;
  NominaBonificacion: number | null;
  NominaAsignacionFamiliar: number | null;
  NominaTotalIngresos: number | null;
  NominaDescuentoPension: number | null;
  NominaDescuentoIR5ta: number | null;
  NominaAporteEssalud: number | null;
  NominaOtrosDescuentos: number | null;
  NominaTotalDescuentos: number | null;
  NominaSueldoNeto: number | null;
}

export interface ReporteNominaListResponse {
  statusCode: number;
  success: string;
  message: string;
  data: ReporteNominaItem[];
}

// 🔹 Servicio GET para listar nóminas
export const getReporteNominaService = async (
  params: ReporteNominaRequest
): Promise<ReporteNominaListResponse> => {
  // Limpia params nulos/undefined para no ensuciar la query
  const cleanParams: Record<string, string> = {};
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") cleanParams[k] = String(v);
  });

  const response: AxiosResponse<ReporteNominaListResponse> = await customRequest<
    typeof cleanParams,
    ReporteNominaListResponse
  >({
    url: "/api/reportes/nomina", // 👈 endpoint GET
    method: "get",
    params: cleanParams,
  });

  return response.data;
};

// 🔹 Servicio POST para generar PDF
export const postReporteNominaPdfService = async (
  requestBody: ReporteNominaRequest
): Promise<Blob> => {
  try {
    const response: AxiosResponse<Blob> = await customRequest<
      ReporteNominaRequest,
      Blob
    >({
      url: "/api/reportes/nomina/pdf", 
      method: "post",
      data: requestBody,
      responseType: "blob",
    });

    const blob = response.data;

    if (blob && blob.type === "application/json") {
      const text = await blob.text();
      try {
        const json = JSON.parse(text);
        throw new Error(json.message || json.error || "Error al generar PDF.");
      } catch {
        throw new Error("Error al generar PDF.");
      }
    }
    return blob;
  } catch (error: any) {
    const msg =
      error?.message || "No se pudo generar el PDF del reporte de nómina.";
    throw new Error(msg);
  }
};
