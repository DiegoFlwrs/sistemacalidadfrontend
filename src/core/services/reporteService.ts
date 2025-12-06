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

// 🆕 NUEVO: Servicio POST para generar Excel
export const postReporteNominaExcelService = async (
  requestBody: ReporteNominaRequest
): Promise<Blob> => {
  try {
    const response: AxiosResponse<Blob> = await customRequest<
      ReporteNominaRequest,
      Blob
    >({
      url: "/api/reportes/nomina/excel", // 👈 NUEVO endpoint Excel
      method: "post",
      data: requestBody,
      responseType: "blob",
    });

    const blob = response.data;

    // Verificar si el servidor devolvió un error (pero como blob)
    if (blob && blob.type === "application/json") {
      const text = await blob.text();
      try {
        const json = JSON.parse(text);
        throw new Error(json.message || json.error || "Error al generar Excel.");
      } catch {
        throw new Error("Error al generar Excel.");
      }
    }
    
    // Verificar que sea realmente un archivo Excel
    if (blob && !blob.type.includes("spreadsheet") && !blob.type.includes("excel")) {
      // Si no es un archivo Excel, intentar leer como error
      const text = await blob.text();
      try {
        const json = JSON.parse(text);
        throw new Error(json.message || json.error || "Error al generar Excel.");
      } catch {
        throw new Error("El servidor no devolvió un archivo Excel válido.");
      }
    }

    return blob;
  } catch (error: any) {
    // Manejo específico de errores de red o de axios
    if (error.response) {
      // El servidor respondió con un error
      const status = error.response.status;
      let errorMessage = `Error ${status}: `;
      
      if (error.response.data instanceof Blob) {
        // Si el error viene como blob
        const text = await error.response.data.text();
        try {
          const json = JSON.parse(text);
          errorMessage += json.message || json.error || "Error del servidor";
        } catch {
          errorMessage += "Error al procesar la respuesta del servidor";
        }
      } else if (typeof error.response.data === 'string') {
        errorMessage += error.response.data;
      } else if (error.response.data?.message) {
        errorMessage += error.response.data.message;
      }
      
      throw new Error(errorMessage);
    } else if (error.request) {
      // La solicitud fue hecha pero no hubo respuesta
      throw new Error("No se pudo conectar con el servidor. Verifica tu conexión.");
    } else {
      // Algo pasó al configurar la solicitud
      throw new Error(error.message || "Error al configurar la solicitud.");
    }
  }
};