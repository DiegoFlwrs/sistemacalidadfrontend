import {
  getDepartamentosService,
  getPeriodosService,
} from "@/core/services/nomiaService";
import { 
  getReporteNominaService, 
  postReporteNominaPdfService,
  postReporteNominaExcelService  // ← NUEVO
} from "@/core/services/reporteService";
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

  // ✅ Función existente para PDF
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

      toast.success("Reporte PDF descargado correctamente");
    } catch (error: any) {
      toast.error(error.message || "Error al descargar el reporte PDF");
      console.error(error);
    }
  };

  // 🆕 NUEVA función para Excel
  const handleDescargarExcel = async () => {
    try {
      const requestBody = {
        PeriodoCodigo: periodoFiltro,
        DepartamentoCodigo: departamentoFiltro || null,
        CargoCodigo: null,
        TipoContratoCodigo: null,
      };

      // Llamar al nuevo servicio de Excel
      const excelBlob = await postReporteNominaExcelService(requestBody);

      // Generar nombre de archivo con período si está disponible
      const nombreArchivo = periodoFiltro 
        ? `Reporte_Nomina_${periodoFiltro}_${new Date().toISOString().slice(0, 10)}.xlsx`
        : `Reporte_Nomina_${new Date().toISOString().slice(0, 10)}.xlsx`;

      downloadBlob(excelBlob, nombreArchivo);

      toast.success("Reporte Excel descargado correctamente");
    } catch (error: any) {
      toast.error(error.message || "Error al descargar el reporte Excel");
      console.error(error);
    }
  };

  return {
    periodoFiltro,
    departamentoFiltro,
    handleChangePeriodo,
    handleChangeDepartamento,
    nominas,
    periodos,
    departamentos,
    handleDescargar,       // Para PDF
    handleDescargarExcel,  // 🆕 Para Excel
    handleResetFilters,
    filtro
  };
};