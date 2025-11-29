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
  EmpleadoData,
  getHistorialContratoService,
  HistorialContrato
} from "@/core/services/gestionService";
import { toast } from "react-toastify";

export interface ContratoData {
  ContratoCodigo: string;
  EmpleadoCodigo: string;
  EmpleadoNombre: string;
  EmpleadoApellido: string;
  TipoContratoCodigo: string;
  TipoContratoDescripcion: string;
  ModalidadCodigo: string;
  ModalidadDescripcion: string;
  JornadaCodigo: string;
  JornadaDescripcion: string;
  UsuarioCodigo: string;
  ContratoFechaInicio: string | Date;
  ContratoFechaFin: string | Date;
  ContratoSalario: number;
  ContratoEstado: string;
  ContratoFechaRegistro: string | Date;
  ContratoFechaModificacion: string | Date;
   motivo:string;
}

export type TipoContrato = CatalogoBase;
export type ModalidadPago = CatalogoBase;
export type Jornada = CatalogoBase;
export type Empleado = EmpleadoData;

const mapApiToLocal = (apiData: GestionData): ContratoData => ({
  ContratoCodigo: apiData.ContratoCodigo,
  EmpleadoCodigo: apiData.EmpleadoCodigo,
  EmpleadoNombre: apiData.EmpleadoNombre || "",
  EmpleadoApellido: apiData.EmpleadoApellido || "",
  TipoContratoCodigo: apiData.TipoContratoCodigo,
  TipoContratoDescripcion: apiData.TipoContratoDescripcion || "",
  ModalidadCodigo: apiData.ModalidadCodigo,
  ModalidadDescripcion: apiData.ModalidadDescripcion || "",
  JornadaCodigo: apiData.JornadaCodigo,
  JornadaDescripcion: apiData.JornadaDescripcion || ""  ,
  UsuarioCodigo: apiData.UsuarioCodigo,
  ContratoFechaInicio:
  typeof apiData.ContratoFechaInicio === "string"
    ? apiData.ContratoFechaInicio.split("T")[0]
    : apiData.ContratoFechaInicio.toISOString().split("T")[0],
  ContratoFechaFin:
  typeof apiData.ContratoFechaFin === "string"
    ? apiData.ContratoFechaFin.split("T")[0]
    : apiData.ContratoFechaFin.toISOString().split("T")[0],
  ContratoSalario: apiData.ContratoSalario,
  ContratoEstado: apiData.ContratoEstado?.trim(),
  ContratoFechaRegistro: apiData.ContratoFechaRegistro || "",
  ContratoFechaModificacion: apiData.ContratoFechaModificacion || "",
  motivo:apiData.motivo?.trim()
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
  const [empleados, setEmpleado] = useState<CatalogoBase[]>([]);

  const [tienePermisosElevados] = useState(true);
  const [contratosProximosVencer, setContratosProximosVencer] = useState<ContratoData[]>([]);

  const [openModalAccion, setOpenModalAccion] = useState(false);
  const [accionTitulo, setAccionTitulo] = useState("");
  const [accionCallback, setAccionCallback] = useState(null);
  const [historialContrato, setHistorialContrato] = useState<HistorialContrato[]>([]);

  const obtenerContratosService = async () => {
    setLoading(true);
    try {
      const response = await getContratosLaboralesService();
      if (response.success && response.data) {
        let data = response.data.map(mapApiToLocal);

        if (searchTerm) {
          data = data.filter((c) =>
            c.ContratoCodigo.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        if (estadoFilter)
          data = data.filter((c) => c.ContratoEstado === estadoFilter);

        if (tipoContratoFilter)
          data = data.filter((c) => c.TipoContratoCodigo === tipoContratoFilter);

        const hoy = new Date();
        const proximos = data.filter((c) => {
          if (c.ContratoEstado !== "A") return false;
          const fin = new Date(c.ContratoFechaFin);
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
    const empleadosNormalizados = response.data.map(emp => ({
      Codigo: emp.EmpleadoCodigo.trim(),
      Descripcion: emp.EmpleadoNombre
    }));

    setEmpleado(empleadosNormalizados);
  } catch {
    toast.error("Error al obtener empleados");
  }
};

const obtenerHistorialContrato = async () => {
  try {
    const response = await getHistorialContratoService();

    if (response.success) {
      setHistorialContrato(response.data);
      setOpenModal(true);
    }
  } catch {
    toast.error("Error al obtener el historial");
  }
};

  const AgregarContratoServicio = async (contrato: ContratoData) => {
    try {
      if (!contrato.ContratoFechaInicio || !contrato.ContratoFechaFin) {
        throw new Error("Las fechas de inicio y fin son obligatorias.");
      }

      const requestBody = {
        empleadoCodigo: contrato.EmpleadoCodigo.trim(),
        tipoContratoCodigo: contrato.TipoContratoCodigo.trim(),
        modalidadCodigo: contrato.ModalidadCodigo.trim(),
        jornadaCodigo: contrato.JornadaCodigo.trim(),
        usuarioCodigo: "USR01",
        contratoFechaInicio: `${contrato.ContratoFechaInicio}T00:00:00`,
        contratoFechaFin: `${contrato.ContratoFechaFin}T23:59:59`,
        contratoSalario: contrato.ContratoSalario ?? 0
      };

      const response = await postAgregarContratoLaboralService(requestBody);

      if (response?.success) {
        toast.success("Contrato registrado correctamente");
        setReloadData(prev => !prev);
      }
    } catch (error: any) {
       
        throw new Error(error.message);
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
        EmpleadoCodigo: data.EmpleadoCodigo?.trim() || "",
        TipoContratoCodigo: data.TipoContratoCodigo?.trim() || "",
        ModalidadCodigo: data.ModalidadCodigo?.trim() || "",
        JornadaCodigo: data.JornadaCodigo?.trim() || "",
        UsuarioCodigo: data.UsuarioCodigo || "USR01",
        ContratoFechaInicio: `${data.ContratoFechaInicio}T00:00:00`,
        ContratoFechaFin: `${data.ContratoFechaFin}T23:59:59`,
        ContratoSalario: data.ContratoSalario ?? 0,
        ContratoEstado: data.ContratoEstado || "A",
        motivo: motivo
      };

      const res = await putActualizarContratoLaboralService(codigo, requestBody);
      if (res?.success) {
        toast.success("Contrato actualizado correctamente");
        setReloadData(!reloadData);
      }
    } catch (err: any) {
      console.error("Error al actualizar contrato:", err);
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
      console.error("Error al suspender contrato:", err);
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

    openModalAccion,
    setOpenModalAccion,
    accionTitulo,
    setAccionTitulo,
    accionCallback,
    setAccionCallback,

    historialContrato,
    obtenerHistorialContrato
  };
};
