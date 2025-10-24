import {
  AnioData,
  ContratosData,
  DepartamentoData,
  getAniosService,
  getContratosService,
  getDepartamentosService,
  getMesService,
  getPeriodosService,
  MesData,
  NominaData,
  NominaResponse,
  PeriodosData,
  postAgregarNominaService,
  postListaNominaService,
} from "@/core/services/nomiaService";
import { useEffect, useState } from "react";

export const useNomina = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [nomina, setNomina] = useState<NominaData[] | null>(null);

  const [mes, setMes] = useState<number | null>(null);
  const [anio, setAnio] = useState<number | null>(null);
  const [departamento, setDepartamento] = useState<string | null>(null);
  const [estado, setEstado] = useState<string | null>(null);
  const [selectedNomina, setSelectedNomina] = useState<any>(null);
  const [empleadoNombre, setEmpleadoNombre] = useState<string>("");
  const [empleadoApellido, setEmpleadoApellido] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);

  const [periodo, setPeriodo] = useState<PeriodosData[]>([]);
  const [contratos, setContratos] = useState<ContratosData[]>([]);

  const obtenerPeriodos = async () => {
    try {
      const response = await getPeriodosService();
      if (response?.data) {
        setPeriodo(response.data);
      } else {
        console.error("Error: No se recibió data en la respuesta");
      }
    } catch (error) {
      console.error("Error al consumir el servicio:", error);
    }
  };

  const obtenerContratos = async () => {
    try {
      const response = await getContratosService();
      if (response?.data) {
        setContratos(response.data);
      } else {
        console.error("Error: No se recibió data en la respuesta");
      }
    } catch (error) {
      console.error("Error al consumir el servicio:", error);
    }
  };

  const [filtro, setFiltro] = useState<boolean>(false);

  const [page, setPage] = useState(1);
  const size = 5;

  const [isEdit, setIsEdit] = useState(false);

  const handleChangeMes = (event: any) => {
    setMes(event.target.value);
    setFiltro(true);
  };
  const handleChangeAnio = (event: any) => {
    setAnio(event.target.value);
    setFiltro(true);
  };
  const handleChangeDepartamento = (event: any) => {
    setDepartamento(event.target.value);
    setFiltro(true);
  };
  const handleChangeEstado = (event: any) => {
    setEstado(event.target.value);
    setFiltro(true);
  };
  function handleResetFilters() {
    setMes(null);
    setAnio(null);
    setDepartamento(null);
    setEstado(null);
    setEmpleadoNombre("");
    setEmpleadoApellido("");
    setFiltro(false);
  }

  const consumirServicio = async () => {
    try {
      const response = await postListaNominaService({
        periodoAnio: anio,
        periodoMes: mes,
        nominaEstado: estado,
        empleadoNombre: empleadoNombre,
        empleadoApellido: empleadoApellido,
        departamentoCodigo: departamento,
        pageNumber: page,
        pageSize: 5,
      });

      if (response?.data) {
        setNomina(response.data);
        setTotalItems(response.TotalRows);
      } else {
        console.error("Error: No se recibió data en la respuesta");
      }
    } catch (error) {
      console.error("Error al consumir el servicio:", error);
    }
  };

  const [anios, setAnios] = useState<AnioData[]>([]);

  const obtenerAnios = async () => {
    try {
      const response = await getAniosService();
      if (response?.data) {
        setAnios(response.data);
      } else {
        console.error("Error: No se recibió data en la respuesta");
      }
    } catch (error) {
      console.error("Error al consumir el servicio:", error);
    }
  };

  const [meses, setMeses] = useState<MesData[]>([]);

  const obtenerMeses = async () => {
    try {
      const response = await getMesService();
      if (response?.data) {
        setMeses(response.data);
      } else {
        console.error("Error: No se recibió data en la respuesta");
      }
    } catch (error) {
      console.error("Error al consumir el servicio:", error);
    }
  };

  const [departamentos, setDepartamentos] = useState<DepartamentoData[]>([]);

  const obtenerDepartamentos = async () => {
    try {
      const response = await getDepartamentosService();
      if (response?.data) {
        setDepartamentos(response.data);
      } else {
        console.error("Error: No se recibió data en la respuesta");
      }
    } catch (error) {
      console.error("Error al consumir el servicio:", error);
    }
  };

  const AgregarNominaServicio = async (
    NominaCodigo: string,
    PeriodoCodigo: string,
    ContratoCodigo: string,
    NominaHorasExtras: number,
    NominaBonificacion: number,
    NominaDescuentos: number
  ) => {
    try {
      await postAgregarNominaService({
        NominaCodigo: NominaCodigo,
        PeriodoCodigo: PeriodoCodigo,
        ContratoCodigo: ContratoCodigo,
        NominaHorasExtras: NominaHorasExtras,
        NominaBonificacion: NominaBonificacion,
        NominaDescuentos: NominaDescuentos,
      });
    } catch (error) {
      console.error("Error al consumir el servicio:", error);
    }
  };

  useEffect(() => {
    consumirServicio();
  }, [anio, mes, departamento, estado, empleadoNombre, empleadoApellido, page, AgregarNominaServicio]);

  useEffect(() => {
    consumirServicio();
    obtenerAnios();
    obtenerMeses();
    obtenerDepartamentos();
    obtenerPeriodos();
    obtenerContratos();
  }, []);

  return {
    openModal,
    setOpenModal,
    nomina,
    anios,
    meses,
    departamentos,
    mes,
    anio,
    departamento,
    estado,
    handleChangeAnio,
    handleChangeMes,
    handleChangeDepartamento,
    handleChangeEstado,
    handleResetFilters,
    empleadoNombre,
    setSelectedNomina,
    selectedNomina,
    empleadoApellido,
    setEmpleadoApellido,
    setEmpleadoNombre,
    filtro,
    size,
    page,
    totalItems,
    setPage,
    openModalForm,
    setOpenModalForm,
    isEdit,
    setIsEdit,
    contratos,
    periodo,
    AgregarNominaServicio
  };
};
