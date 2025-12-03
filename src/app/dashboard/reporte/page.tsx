"use client";
import { useEffect, useState } from "react";
import { getPeriodosService, postListaNominaService } from "@/core/services/nomiaService";
import { postReporteNominaPdfService } from "@/core/services/reporteService";
import { toast } from "react-toastify";
import { ModalComponent } from "@/components/Modal";
import { FormReporte } from "./form/FormReporte";
import { DetalleReporte } from "./form/DetalleReporte";
import TableNominaDetail from "../nomina/table/TableNominaDetail";
import { Paper, Typography } from "@mui/material";

export default function ReportePage() {
  const [periodos, setPeriodos] = useState<any[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [nominas, setNominas] = useState<any[]>([]);
  const [selectedNomina, setSelectedNomina] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchPeriodos = async () => {
      try {
        const pRes = await getPeriodosService();
        const filtrados = (pRes?.data ?? []).filter((p: any) => p.PeriodoEstado === "P");
        setPeriodos(filtrados);

      } catch (error) {
        console.error("Error al obtener periodos:", error);
      }
    };
    fetchPeriodos();
  }, []);

  const handleGenerarReporte = async (PeriodoCodigo: string) => {
    try {
      // Generar PDF
      const blob = await postReporteNominaPdfService({ PeriodoCodigo });
      const url = window.URL.createObjectURL(blob);
      setPdfUrl(url);
      toast.success("PDF generado exitosamente");

      // Cargar nóminas del periodo
      const nomRes = await postListaNominaService({ CodigoPeriodo: PeriodoCodigo });
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
        <FormReporte periodo={periodos} onGenerar={handleGenerarReporte} />
      </Paper>

      {nominas.length > 0 && (
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Typography fontSize={20} fontWeight={600} mb={3}>
            Reporte por Período
          </Typography>
          <TableNominaDetail nomina={nominas} />

        </Paper>
      )}

      <ModalComponent open={openModal} setOpen={setOpenModal} width={580}>
        <DetalleReporte data={selectedNomina} />
      </ModalComponent>

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
