// services/reporteNominaPdfService.ts
import { AxiosResponse } from "axios";
import { customRequest } from "./api/httpClient";

export interface ReporteNominaPdfRequest {
  PeriodoCodigo: string;
  DepartamentoCodigo?: string | null;
  CargoCodigo?: string | null;
  TipoContratoCodigo?: string | null;
}

export const postReporteNominaPdfService = async (
  requestBody: ReporteNominaPdfRequest
): Promise<Blob> => {
  try {
    const response = await customRequest<
      ReporteNominaPdfRequest,
      Blob
    >({
      url: "api/reportes/nomina/pdf",
      method: "post",
      data: requestBody,
      responseType: "blob",
    });

    // Verificar si el backend envió JSON (error)
    const contentType = response.headers["content-type"];

    if (contentType && contentType.includes("application/json")) {
      const text = await response.data.text(); // convertir blob → texto
      const json = JSON.parse(text);          // texto → JSON
      throw new Error(json.message || json.error || "Error desconocido.");
    }

    // Si es PDF:
    return response.data;
  } catch (error) {
    throw error;
  }
};

