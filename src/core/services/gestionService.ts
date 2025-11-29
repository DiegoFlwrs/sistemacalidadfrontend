import { AxiosResponse } from "axios";
import { customRequest } from "./api/httpClient";
import { toast } from "react-toastify";


// export interface GestionData {
//   ContratoCodigo: string;
//   EmpleadoCodigo: string;
//   TipoContratoCodigo: string;
//   ModalidadCodigo: string;
//   JornadaCodigo: string;
//   UsuarioCodigo: string;
//   ContratoFechaInicio: string;
//   ContratoFechaFin: string;
//   ContratoSalario: number;
//   ContratoBonificacion: number;
//   ContratoDescuento: number;
//   ContratoEstado: string;
// }

export interface GestionData {
  ContratoCodigo: string;  
  EmpleadoCodigo: string;
  EmpleadoNombre?: string;
  EmpleadoApellido?: string;
  TipoContratoCodigo: string;         
  TipoContratoDescripcion?: string;
  ModalidadCodigo: string;                 
  ModalidadDescripcion?: string;
  JornadaCodigo: string;                   
  JornadaDescripcion?: string;
  UsuarioCodigo: string;
  ContratoFechaInicio: string | Date; 
  ContratoFechaFin: string | Date;
  ContratoSalario: number;      
  ContratoEstado: string;
  ContratoFechaRegistro?: string | Date;
  ContratoFechaModificacion?: string | Date;
  motivo:string;
}


export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T[];
  TotalRows?: number;
}


export const getContratosLaboralesService = async () =>
  (await customRequest<{}, ApiResponse<GestionData>>({
    url: "/ContratoLaboral/Mostrar",
    method: "get",
  })).data;

export const postAgregarContratoLaboralService = async (requestBody: any) => {
  try {
    const { data } = await customRequest<any, ApiResponse<GestionData>>({
      url: "/ContratoLaboral/Registrar",
      method: "post",
      data: requestBody,
    });
    toast.success("Contrato laboral agregado con éxito");
    return data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Error al agregar contrato laboral");
    throw error;
  }
};

export const putActualizarContratoLaboralService = async (
  contratoCodigo: string,
  requestBody: GestionData
) => {
  try {
    const { data } = await customRequest<GestionData, ApiResponse<GestionData>>({
      url: `/ContratoLaboral/Actualizar?contratoCodigo=${contratoCodigo}`,
      method: "put",
      data: requestBody,
    });
    toast.success("Contrato laboral actualizado con éxito");
    return data;
  } catch (error: any) {
    console.error(" Error en actualización:", error);
    toast.error(error?.response?.data?.message || "Error al actualizar el contrato laboral");
    throw error;
  }
};

export const deleteContratoLaboralService = async (contratoCodigo: string) => {
  try {
    const { data } = await customRequest<{}, ApiResponse<GestionData>>({
      url: `/ContratoLaboral/Eliminar?contratoCodigo=${contratoCodigo}`,
      method: "delete",
    });
    // toast.success("Contrato laboral eliminado con éxito");
    return data;
  } catch (error: any) {
    console.error(" Error al eliminar contrato:", error);
    toast.error(error?.response?.data?.message || "Error al eliminar el contrato laboral");
    throw error;
  }
};

export const putCambiarEstadoContratoLaboralService = async (
  codigo: string,
  nuevoEstado: "A" | "S",
  motivo: string
) => {
  try {
    const { data } = await customRequest<{}, ApiResponse<GestionData>>({
      url: `/ContratoLaboral/CambiarEstado?codigo=${codigo}&nuevoEstado=${nuevoEstado}&motivo=${encodeURIComponent(
        motivo
      )}`,
      method: "put",
    });
    toast.success("Estado del contrato actualizado con éxito");
    return data;
  } catch (error: any) {
    console.error(" Error al cambiar estado:", error);
    toast.error(error?.response?.data?.message || "Error al cambiar el estado del contrato");
    throw error;
  }
};


export interface CatalogoBase {
  Codigo: string;
  Descripcion: string;
}

export const getCatalogoService = async <T extends CatalogoBase>(
  endpoint: string
): Promise<ApiResponse<T>> =>
  (await customRequest<{}, ApiResponse<T>>({
    url: `/ContratoLaboral/${endpoint}`,
    method: "get",
  })).data;


export const getTipoContratoService = () => getCatalogoService("TipoContrato");
export const getModalidadService = () => getCatalogoService("Modalidad");
export const getJornadaService = () => getCatalogoService("Jornada");
// export const getEmpleadoService = () => getCatalogoService("EmpleadosSinContrato");


export interface EmpleadoData {
  EmpleadoCodigo: string;
  EmpleadoNombre: string;
}

export const getEmpleadoService = async () =>
  (await customRequest<{}, ApiResponse<EmpleadoData>>({
    url: "/ContratoLaboral/EmpleadosSinContrato",
    method: "get",
  })).data;

  export interface HistorialContrato {
  ContratoCodigo: string;
  Detalle: string;
  Motivo: string;
  HistorialFechaF: string;
}

export const getHistorialContratoService = async () =>
  (await customRequest<{}, ApiResponse<HistorialContrato>>({
    url: "/ContratoLaboral/DetallesHistorial",
    method: "get",
  })).data;
