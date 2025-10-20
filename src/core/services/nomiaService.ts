
import { AxiosResponse } from "axios";
import { customRequest } from "./api/httpClient";


export interface NominaData {
    NominaCodigo: string;
    PeriodoCodigo: string;
    PeriodoAnio: number;
    PeriodoMes: number;
    PeriodoInicio: string;  
    PeriodoFin: string;     
    EmpleadoCodigo: string;
    EmpleadoApellido: string;
    EmpleadoNombre: string;
    CargoNombre: string;
    DepartamentoNombre: string;
    TipoContratoDescripcion: string;
    ContratoSalario: number;
    NominaHorasExtras: number;
    NominaBonificacion: number;
    NominaDescuentos: number;
    NominaTotalIngresos: number;
    NominaTotalDescuentos: number;
    NominaSueldoNeto: number;
    NominaFechaProcesamiento: string;  
    NominaEstado: string;
    EstadoNominaNombre: string;
}

export interface NominaResponse {
    statusCode: number;
    success: string;
    message: string;
    data : NominaData[];
}

export interface NominaRequest {
  periodoAnio: number | null;
  periodoMes: number | null;
  nominaEstado: string | null;
  empleadoNombre: string | null;
  empleadoApellido: string | null;
  departamentoCodigo: string | null;
  pageNumber: number;
  pageSize: number;
}

export const postListaNominaService = async (
  requestBody: NominaRequest
): Promise<NominaResponse | null> => {
  try {
    const response: AxiosResponse<NominaResponse> = await customRequest<
      NominaRequest,
      NominaResponse
    >({
      url: "/Nomina/procesar",
      method: "post",
      data: requestBody,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export interface AnioData {
    Anio: number;
}

export interface AniosResponse {
    statusCode: number;
    success: string;
    message: string;
    data : AnioData[];
}

export const getAniosService = async (
): Promise<AniosResponse> => {

  return await customRequest<{
    token: string
  }, AniosResponse>({
    url: "/Nomina/periodo/anios",
    method: "get",
  }).then((res: AxiosResponse<AniosResponse>) => res.data);
};



export interface MesData {
    Mes: number;
}

export interface MesResponse {
    statusCode: number;
    success: string;
    message: string;
    data : MesData[];
}

export const getMesService = async (
): Promise<MesResponse> => {

  return await customRequest<{
    token: string
  }, MesResponse>({
    url: "/Nomina/periodo/meses",
    method: "get",
  }).then((res: AxiosResponse<MesResponse>) => res.data);
};


export interface DepartamentoData {
    DepartamentoCodigo: string;
    DepartamentoNombre: string;
}

export interface DepartamentosResponse {
    statusCode: number;
    success: string;
    message: string;
    data : DepartamentoData[];
}

export const getDepartamentosService = async (
): Promise<DepartamentosResponse> => {

  return await customRequest<{
    token: string
  }, DepartamentosResponse>({
    url: "/Nomina/departamentos",
    method: "get",
  }).then((res: AxiosResponse<DepartamentosResponse>) => res.data);
};






