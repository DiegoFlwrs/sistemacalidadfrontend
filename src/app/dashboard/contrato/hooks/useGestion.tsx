import { useEffect, useState } from "react";
import {
  GestionData,
  getContratosLaboralesService,
  postAgregarContratoLaboralService,
  getTipoContratoService,
  getModalidadService,
  getJornadaService,
  getEmpleadoService,
  putActualizarContratoLaboralService,
  deleteContratoLaboralService,
  putCambiarEstadoContratoLaboralService,
  CatalogoBase,
} from "@/core/services/gestionService";
import { toast } from "react-toastify";


export interface ContratoData {
  codigo: string;
  empleadoCodigo: string;
  tipoContratoCodigo: string;
  modalidadCodigo: string;
  jornadaCodigo: string;
  usuarioCodigo: string;
  fechaInicio: string | Date;
  fechaFin: string | Date;
  salario: number;
  bonificacion: number;
  descuento: number;
  estado: string;
}


export type TipoContrato = CatalogoBase;
export type ModalidadPago = CatalogoBase;
export type Jornada = CatalogoBase;
export type Empleado = CatalogoBase;


const mapApiToLocal = (apiData: GestionData): ContratoData => ({
  codigo: apiData.ContratoCodigo,
  empleadoCodigo: apiData.EmpleadoCodigo,
  tipoContratoCodigo: apiData.TipoContratoCodigo,
  modalidadCodigo: apiData.ModalidadCodigo,
  jornadaCodigo: apiData.JornadaCodigo,
  usuarioCodigo: apiData.UsuarioCodigo,
  fechaInicio: apiData.ContratoFechaInicio?.split("T")[0] || "",
  fechaFin: apiData.ContratoFechaFin?.split("T")[0] || "",
  salario: apiData.ContratoSalario,
  bonificacion: apiData.ContratoBonificacion,
  descuento: apiData.ContratoDescuento,
  estado: apiData.ContratoEstado?.trim(),
});


const getEstadoTexto = (estado: string) => {
  if (!estado) return "Desconocido";
  const normalized = estado.trim().toUpperCase();
  switch (normalized) {
    case "A":
      return "Vigente";
    case "S":
      return "Suspendido";
    case "F":
      return "Finalizado";
    case "I":
      return "Inactivo";
    default:
      return "Desconocido";
  }
};

const getEstadoColor = (estado: string) => {
  if (!estado) return "default";
  const normalized = estado.trim().toUpperCase();
  switch (normalized) {
    case "A":
      return "success";
    case "S":
      return "warning";
    case "F":
      return "error";
    case "I":
      return "default";
    default:
      return "default";
  }
};


export const useGestion = () => {

  const [openModal, setOpenModal] = useState(false);
  const [openModalForm, setOpenModalForm] = useState(false);

 
  const [contratos, setContratos] = useState<ContratoData[]>([]);
  const [selectedContrato, setSelectedContrato] = useState<ContratoData | null>(null);
  const [contratoToEdit, setContratoToEdit] = useState<ContratoData | null>(null);

 
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reloadData, setReloadData] = useState(false);

 
  const [searchTerm, setSearchTerm] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");
  const [tipoContratoFilter, setTipoContratoFilter] = useState("");
  const [page, setPage] = useState<number>(1);
  const size = 5;
  const [totalItems, setTotalItems] = useState(0);
  const [filtro, setFiltro] = useState(false);

  const [tiposContrato, setTiposContrato] = useState<TipoContrato[]>([]);
  const [modalidadesPago, setModalidad] = useState<ModalidadPago[]>([]);
  const [jornadasLaborales, setJornada] = useState<Jornada[]>([]);
  const [empleados, setEmpleado] = useState<Empleado[]>([]);

  const [tienePermisosElevados] = useState(true);
  const [contratosProximosVencer, setContratosProximosVencer] = useState<ContratoData[]>([]);

 
  const obtenerContratosService = async () => {
    setLoading(true);
    try {
      const response = await getContratosLaboralesService();
      if (response.success && response.data) {
        let data = response.data.map(mapApiToLocal);

        if (searchTerm) {
          data = data.filter((c) =>
            c.codigo.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        if (estadoFilter) data = data.filter((c) => c.estado === estadoFilter);
        if (tipoContratoFilter)
          data = data.filter((c) => c.tipoContratoCodigo === tipoContratoFilter);

        const hoy = new Date();
        const proximos = data.filter((c) => {
          if (c.estado !== "A") return false;
          const fin = new Date(c.fechaFin);
          const dias = Math.ceil((fin.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
          return dias <= 15 && dias > 0;
        });

        const start = (page - 1) * size;
        const paginatedData = data.slice(start, start + size);

        setContratos(paginatedData);
        setContratosProximosVencer(proximos);
        setTotalItems(data.length);
      } else {
        toast.error(response.message || "No se pudo obtener la lista de contratos");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error al obtener contratos");
    } finally {
      setLoading(false);
    }
  };


  const obtenerTiposContrato = async () => {
    try {
      const response = await getTipoContratoService();
      setTiposContrato(response.data || []);
    } catch {
      toast.error("Error al obtener tipos de contrato");
    }
  };

  const obtenerModalidad = async () => {
    try {
      const response = await getModalidadService();
      setModalidad(response.data || []);
    } catch {
      toast.error("Error al obtener modalidades");
    }
  };

  const obtenerJornada = async () => {
    try {
      const response = await getJornadaService();
      setJornada(response.data || []);
    } catch {
      toast.error("Error al obtener jornadas");
    }
  };

  const obtenerEmpleado = async () => {
    try {
      const response = await getEmpleadoService();
      setEmpleado(response.data || []);
    } catch {
      toast.error("Error al obtener empleados");
    }
  };


  const AgregarContratoServicio = async (contrato: ContratoData) => {
    try {

      if (!contrato.fechaInicio || !contrato.fechaFin) {
        throw new Error("Las fechas de inicio y fin son obligatorias.");
      }

      // const inicioISO = new Date(`${contrato.fechaInicio}T00:00:00`);
      // const finISO = new Date(`${contrato.fechaFin}T23:59:59`);

      // //  Validar si la conversión fue exitosa
      // if (isNaN(inicioISO.getTime()) || isNaN(finISO.getTime())) {
      //   throw new Error("Formato de fecha inválido. Verifica los campos de fecha.");
      // }
      const requestBody = {
        ContratoCodigo: contrato.codigo,
        EmpleadoCodigo: contrato.empleadoCodigo.trim(),
        TipoContratoCodigo: contrato.tipoContratoCodigo.trim(),
        ModalidadCodigo: contrato.modalidadCodigo.trim(),
        JornadaCodigo: contrato.jornadaCodigo.trim(),
        UsuarioCodigo: "USR01",
        ContratoFechaInicio: `${contrato.fechaInicio}T00:00:00`,
        ContratoFechaFin: `${contrato.fechaFin}T23:59:59`,
        ContratoSalario: contrato.salario ?? 0,
        ContratoBonificacion: contrato.bonificacion ?? 0,
        ContratoDescuento: contrato.descuento ?? 0,
        ContratoEstado: "A",
      };

      console.log("Body enviado:", requestBody);

      const response= await postAgregarContratoLaboralService(requestBody);

        if (response?.success) {
        toast.success("Contrato registrado correctamente");
        setReloadData(prev => !prev); 
        setOpenModalForm(false);      
        }
    } catch (error: any) {
      console.error(" Error completo:", error);

      if (error.response) {
        console.error("Error API:", error.response.data);
        throw new Error(error.response.data.message || "Error en la API");
      } else if (error.request) {
        console.error(" No hubo respuesta del servidor:", error.request);
        throw new Error("No se recibió respuesta del servidor");
      } else {
        console.error(" Error de configuración:", error.message);
        throw new Error(error.message);
      }
    }
  };


  const ActualizarContratoServicio = async (
    codigo: string,
    data: Partial<ContratoData>,
    motivo: string
  ) => {
    try {
      if (!codigo) throw new Error("El código del contrato es obligatorio");

     

      const requestBody = {
        ContratoCodigo: codigo,
        EmpleadoCodigo: data.empleadoCodigo?.trim() || "",
        TipoContratoCodigo: data.tipoContratoCodigo?.trim() || "",
        ModalidadCodigo: data.modalidadCodigo?.trim() || "",
        JornadaCodigo: data.jornadaCodigo?.trim() || "",
        UsuarioCodigo: data.usuarioCodigo?.trim() || "USR01",
        ContratoFechaInicio: `${data.fechaInicio}T00:00:00`,
        ContratoFechaFin: `${data.fechaFin}T23:59:59`,
        ContratoSalario: data.salario ?? 0,
        ContratoBonificacion: data.bonificacion ?? 0,
        ContratoDescuento: data.descuento ?? 0,
        ContratoEstado: data.estado || "A",
      };

      const res = await putActualizarContratoLaboralService(codigo, requestBody);
      if (res) {
        toast.success("Contrato actualizado correctamente");
        setReloadData(!reloadData);
        setOpenModalForm(false);
      }
    } catch (err: any) {
      console.error(" Error al actualizar contrato:", err);
      toast.error(err?.message || "Error al actualizar contrato");
    }
  };

  const EliminarContratoServicio = async (codigo: string) => {
    try {
      if (!codigo) throw new Error("El código del contrato es obligatorio");
      const res = await deleteContratoLaboralService(codigo);
      if (res?.success) {
        toast.success("Contrato eliminado correctamente");
        setReloadData(!reloadData);
      }
    } catch (err: any) {
      console.error("Error al eliminar contrato:", err);
      toast.error(err?.message || "Error al eliminar contrato");
    }
  };

  const SuspenderContratoServicio = async (codigo: string, motivo: string) => {
    try {
      if (!codigo || !motivo.trim()) throw new Error("Código y motivo son obligatorios");
      const res = await putCambiarEstadoContratoLaboralService(codigo, "S", motivo);
      if (res?.success) {
        toast.success("Contrato suspendido correctamente");
        setReloadData(!reloadData);
      }
    } catch (err: any) {
      console.error(" Error al suspender contrato:", err);
      toast.error(err?.message || "Error al suspender contrato");
    }
  };

  const ReactivarContratoServicio = async (codigo: string, motivo: string) => {
    try {
      if (!codigo || !motivo.trim()) throw new Error("Código y motivo son obligatorios");
      const res = await putCambiarEstadoContratoLaboralService(codigo, "A", motivo);
      if (res?.success) {
        toast.success("Contrato reactivado correctamente");
        setReloadData(!reloadData);
      }
    } catch (err: any) {
      console.error("Error al reactivar contrato:", err);
      toast.error(err?.message || "Error al reactivar contrato");
    }
  };


  const handleEditContrato = (contrato: ContratoData) => {
    setContratoToEdit(contrato);
    setIsEdit(true);
    setOpenModalForm(true);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setEstadoFilter("");
    setTipoContratoFilter("");
    setFiltro(false);
    setPage(1);
  };

 
  useEffect(() => {
    obtenerContratosService();
    obtenerTiposContrato();
    obtenerModalidad();
    obtenerJornada();
    obtenerEmpleado();
  }, [reloadData, searchTerm, estadoFilter, tipoContratoFilter, page]);


  return {
    openModal,
    setOpenModal,
    openModalForm,
    setOpenModalForm,
    contratos,
    modalidadesPago,
    empleados,
    jornadasLaborales,
    selectedContrato,
    setSelectedContrato,
    contratoToEdit,
    setContratoToEdit,
    isEdit,
    setIsEdit,
    tiposContrato,
    loading,
    totalItems,
    page,
    setPage,
    size,
    searchTerm,
    setSearchTerm,
    estadoFilter,
    setEstadoFilter,
    tipoContratoFilter,
    setTipoContratoFilter,
    filtro,
    handleEditContrato,
    handleResetFilters,
    AgregarContratoServicio,
    ActualizarContratoServicio,
    EliminarContratoServicio,
    SuspenderContratoServicio,
    ReactivarContratoServicio,
    contratosProximosVencer,
    tienePermisosElevados,
    getEstadoTexto,
    getEstadoColor,
  };
};
