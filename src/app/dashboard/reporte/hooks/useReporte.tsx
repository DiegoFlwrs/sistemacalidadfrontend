import {
  getDepartamentosService,
  getPeriodosService,
} from "@/core/services/nomiaService";
import { getReporteNominaService, postReporteNominaPdfService } from "@/core/services/reporteService";
import { downloadBlob } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useReporte = () => {
  const [periodos, setPeriodos] = useState<any[]>([]);
  const [departamentos, setDepartamentos] = useState<any[]>([]);
  const [nominas, setNominas] = useState<any[]>([]);

  const [periodoFiltro, setPeriodoFiltro] = useState<string>("");
  const [departamentoFiltro, setDepartamentoFiltro] = useState<string>("");
  
  const [filtro, setFiltro] = useState<boolean>(false);

  const handleChangePeriodo = (event: any) => {
    setPeriodoFiltro(event.target.value);
    setFiltro(true);
  };

  const handleChangeDepartamento = (event: any) => {
    const value = event.target.value;
    setDepartamentoFiltro(value);
    setFiltro(true);
  };

  function handleResetFilters() {
    setDepartamentoFiltro("");
    setPeriodoFiltro("");
    setFiltro(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const filtros = {
        PeriodoCodigo: periodoFiltro,
        DepartamentoCodigo: departamentoFiltro || null,
      };

      const nomRes = await getReporteNominaService(filtros);
      setNominas(nomRes?.data ?? []);
    };

    fetchData();
  }, [periodoFiltro, departamentoFiltro]);

  useEffect(() => {
    const fetchPeriodos = async () => {
      try {
        const response = await getPeriodosService();
        const filtrados = (response?.data ?? []).filter(
          (p: any) => p.PeriodoEstado === "P"
        );
        setPeriodos(filtrados);
      } catch (error) {
        console.error("Error al obtener periodos:", error);
      }
    };
    fetchPeriodos();
  }, []);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await getDepartamentosService();
        setDepartamentos(response?.data ?? []);
      } catch (error) {
        console.error("Error al obtener departamentos:", error);
      }
    };
    fetchDepartamentos();
  }, []);

  const handleDescargar = async () => {
    try {
      const requestBody = {
        PeriodoCodigo: periodoFiltro,
        DepartamentoCodigo: departamentoFiltro || null,
        CargoCodigo: null,
        TipoContratoCodigo: null,
      };

      const pdfBlob = await postReporteNominaPdfService(requestBody);

      downloadBlob(pdfBlob, `Reporte_Nomina_${new Date().toISOString()}.pdf`);

      toast.success("Reporte descargado correctamente");
    } catch (error: any) {
      toast.error(error.message || "Error al descargar el reporte");
      console.error(error);
    }
  };
  // // Extraer año y mes del código de periodo

  return {
    periodoFiltro,
    departamentoFiltro,
    handleChangePeriodo,
    handleChangeDepartamento,
    nominas,
    periodos,
    departamentos,
    handleDescargar,
    handleResetFilters,
    filtro
  };
};
