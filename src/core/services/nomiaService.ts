
import { AxiosResponse } from "axios";
import { customRequest } from "./api/httpClient";
import { toast } from "react-toastify";


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
    TotalRows: number;
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
      url: "/Nomina/listar",
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

export interface PeriodosData {
    PeriodoCodigo: string;
    PeriodoDescripcion: string;
}

export interface PeriodosResponse {
    statusCode: number;
    success: string;
    message: string;
    data : PeriodosData[];
}

export const getPeriodosService = async (
): Promise<PeriodosResponse> => {

  return await customRequest<{
    token: string
  }, PeriodosResponse>({
    url: "/Nomina/periodos",
    method: "get",
  }).then((res: AxiosResponse<PeriodosResponse>) => res.data);
};


export interface ContratosData {
    ContratoCodigo: string;
    EmpleadoDescripcion: string;
}

export interface ContratosResponse {
    statusCode: number;
    success: string;
    message: string;
    data : ContratosData[];
}

export const getContratosService = async (
): Promise<ContratosResponse> => {

  return await customRequest<{
    token: string
  }, ContratosResponse>({
    url: "/Nomina/contratos",
    method: "get",
  }).then((res: AxiosResponse<ContratosResponse>) => res.data);
};


export interface NominaResponseRequest {
  statusCode: number;
  success: string;
  message: string;
}
export interface NominaAgregarRequest {
  NominaCodigo: string;
  PeriodoCodigo: string;
  ContratoCodigo: string;
  NominaHorasExtras: number;
  NominaBonificacion: number;
  NominaDescuentos: number;
}

export const postAgregarNominaService = async (
  requestBody: NominaAgregarRequest
): Promise<NominaResponseRequest | null> => {
  try {
    const response: AxiosResponse<NominaResponseRequest> = await customRequest<
      NominaAgregarRequest,
      NominaResponseRequest
    >({
      url: "/Nomina/procesar",
      method: "post",
      data: requestBody,
    });
    toast.success("Nómina agregada con éxito");
    return response.data;
  } catch (error) {
    throw error;
  }
};



export interface NominaEditarRequest {
  NominaCodigo: string;
  PeriodoCodigo: string;
  ContratoCodigo: string;
  NominaHorasExtras: number;
  NominaBonificacion: number;
  NominaDescuentos: number;
}

export const postEditarNominaService = async (
  requestBody: NominaEditarRequest
): Promise<NominaResponseRequest | null> => {
  try {
    const response: AxiosResponse<NominaResponseRequest> = await customRequest<
      NominaEditarRequest,
      NominaResponseRequest
    >({
      url: "/Nomina/actualizar",
      method: "put",
      data: requestBody,
    });
    toast.success("Nómina actualizada con éxito");
    return response.data;
  } catch (error) {
    throw error;
  }
};