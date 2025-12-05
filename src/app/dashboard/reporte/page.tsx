"use client";
import { useEffect, useState } from "react";
import {
  getPeriodosService,
  getDepartamentosService,
} from "@/core/services/nomiaService"; // solo para combos
import {
  getReporteNominaService,
  postReporteNominaPdfService,
} from "@/core/services/reporteService"; // servicios de Reportes
import { toast } from "react-toastify";
import { FormReporte } from "./form/FormReporte";
import TableReporteDetail from "./table/TableReporteDetail";
import { Paper, Typography } from "@mui/material";

export default function ReportePage() {
  const [periodos, setPeriodos] = useState<any[]>([]);
  const [departamentos, setDepartamentos] = useState<any[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [nominas, setNominas] = useState<any[]>([]);

  // 🔹 Estado para filtros
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState<string>("");
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState<string>("");

  // 🔹 Cargar periodos
  useEffect(() => {
    const fetchPeriodos = async () => {
      try {
        const pRes = await getPeriodosService();
        // Ajusta según lo que devuelve tu backend
        const filtrados = (pRes?.data ?? []).filter((p: any) => p.PeriodoEstado === "P");
        setPeriodos(filtrados);
      } catch (error) {
        console.error("Error al obtener periodos:", error);
      }
    };
    fetchPeriodos();
  }, []);

  // 🔹 Cargar departamentos
  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const dRes = await getDepartamentosService();
        setDepartamentos(dRes?.data ?? []);
      } catch (error) {
        console.error("Error al obtener departamentos:", error);
      }
    };
    fetchDepartamentos();
  }, []);

  // 🔹 Generar reporte por período + departamento (tabla y PDF)
  const handleGenerarReporte = async (PeriodoCodigo: string) => {
    try {
      setPeriodoSeleccionado(PeriodoCodigo);

      const filtros = {
        PeriodoCodigo,
        DepartamentoCodigo: departamentoSeleccionado || null,
      };

      // PDF filtrado
      const blob = await postReporteNominaPdfService(filtros);
      const url = window.URL.createObjectURL(blob);
      setPdfUrl(url);
      toast.success("PDF generado exitosamente");

      // Tabla filtrada
      const nomRes = await getReporteNominaService(filtros);
      setNominas(nomRes?.data ?? []);
    } catch (error: any) {
      toast.error(error?.message || "Error al generar el reporte");
    }
  };

  const handleDescargar = () => {
    if (!pdfUrl) return;
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = `Reporte_Nomina_${new Date().toISOString()}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="pt-6">
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography fontSize={20} fontWeight={600} mb={3}>
          Generar Reporte de Nómina
        </Typography>
        <FormReporte
          periodo={periodos}
          departamento={departamentos}
          onGenerar={handleGenerarReporte}
          setDepartamentoFiltro={setDepartamentoSeleccionado}
        />
      </Paper>

      {/* Tabla */}
      {periodoSeleccionado && (
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Typography fontSize={20} fontWeight={600} mb={3}>
            Reporte por Período
          </Typography>
          {nominas.length > 0 ? (
            <TableReporteDetail data={nominas} />
          ) : (
            <Typography>No hay registros para este filtro.</Typography>
          )}
        </Paper>
      )}

      {/* PDF */}
      {pdfUrl && (
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Typography fontSize={20} fontWeight={600} mb={3}>
            Vista Previa del PDF
          </Typography>
          <iframe src={pdfUrl} width="100%" height="600px" />
          <div className="flex gap-2 mt-3">
            <button onClick={handleDescargar} className="bg-blue-600 text-white px-4 py-2 rounded">
              Descargar PDF
            </button>
            <button
              onClick={() => {
                window.URL.revokeObjectURL(pdfUrl);
                setPdfUrl(null);
                setNominas([]);
                setPeriodoSeleccionado("");
              }}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cerrar Vista
            </button>
          </div>
        </Paper>
      )}
    </div>
  );
}
