import {
  getPeriodosService,
  NominaData,
  PeriodosData,
  postAgregarNominaService,
  postListaNominaService,
} from "@/core/services/nomiaService";
import { useEffect, useState } from "react";

export const useNomina = () => {
  const [openModalForm, setOpenModalForm] = useState(false);
  const [nomina, setNomina] = useState<NominaData[] | null>(null);
  const [periodo, setPeriodo] = useState<PeriodosData[]>([]);
  const [reloadData, setReloadData] = useState(false);

  const [periodoFiltro, setPeriodoFiltro] = useState<string>("");

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

  const consumirServicio = async () => {
    try {
      const response = await postListaNominaService({
        CodigoPeriodo: periodoFiltro
      });

      if (response?.data) {
        setNomina(response.data);
      } else {
        console.error("Error: No se recibió data en la respuesta");
      }
    } catch (error) {
      console.error("Error al consumir el servicio:", error);
    }
  };

  const AgregarNominaServicio = async (
    PeriodoCodigo: string
  ) => {
    try {
      await postAgregarNominaService({
        PeriodoCodigo: PeriodoCodigo,
      });
      setReloadData(!reloadData); 
    } catch (error) {
      console.error("Error al consumir el servicio:", error);
    }
  };

  useEffect(() => {
    consumirServicio();
    obtenerPeriodos();
  }, [reloadData]);

  useEffect(() => {
    consumirServicio();
    obtenerPeriodos();
  }, []);

  return {
    nomina,
    openModalForm,
    setOpenModalForm,
    periodo,
    AgregarNominaServicio,
    periodoFiltro,
    setPeriodoFiltro
  };
};
