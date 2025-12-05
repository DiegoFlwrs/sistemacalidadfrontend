"use client";
import TableReporteDetail from "./table/TableReporteDetail";
import { Paper, Typography } from "@mui/material";
import { Dropdown } from "@/components/Dropdown";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useReporte } from "./hooks/useReporte";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function ReportePage() {

  const {
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
  } = useReporte();
  return (
    <div className="pt-6">
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography fontSize={20} fontWeight={600}>
          Filtros de Reporte
        </Typography>
        <div className="flex pb-5 gap-4">
          <div className="w-[30%] mt-5">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <CalendarMonthIcon
                style={{
                  marginRight: 6,
                  verticalAlign: "middle",
                  color: "#1976d2",
                }}
              />
              Periodo (Año - Mes)
            </label>
            <Dropdown
              value={periodoFiltro || ""}
              onChange={handleChangePeriodo}
              data={periodos.map((p) => ({
                value: String(p.PeriodoCodigo),
                label: p.PeriodoDescripcion,
              }))}
              placeholder="Seleccionar Periodo"
              borderRadius="10px"
              borderColor="#d5d7da"
            />
          </div>
          <div className="w-[30%] mt-5">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Departamento
            </label>
            <Dropdown
              value={departamentoFiltro || ""}
              onChange={handleChangeDepartamento}
              data={departamentos.map((d) => ({
                value: String(d.DepartamentoCodigo),
                label: d.DepartamentoNombre,
              }))}
              placeholder="Filtrar por Departamento"
              borderRadius="10px"
              borderColor="#d5d7da"
            />
          </div>
          <div className="flex items-end pb-4">
            <button
              className={filtro ? "text-red-800" : "text-gray-500"}
              onClick={handleResetFilters}
            >
              <RestartAltIcon />
            </button>
          </div>
        </div>

        <Typography fontSize={20} fontWeight={600}>
          Opciones de descarga
        </Typography>

        <div className="flex">
          <div className="w-[20%] mt-5">
              <button className="bg-green-600 text-white p-2 rounded" onClick={() => handleDescargar()}>Generar Reporte Nómina</button>
          </div>
        </div>
      </Paper>
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
    </div>
  );
}
