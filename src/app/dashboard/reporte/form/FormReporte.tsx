"use client";
import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Dropdown } from "@/components/Dropdown";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface FormReporteProps {
  periodo: any[];
  departamento: any[];
  onGenerar: (PeriodoCodigo: string) => Promise<void>;
  setDepartamentoFiltro: (codigo: string) => void; // 👈 actualiza estado en ReportePage
}

export const FormReporte = ({
  periodo,
  departamento,
  onGenerar,
  setDepartamentoFiltro,
}: FormReporteProps) => {
  const [periodoFiltro, setPeriodoFiltro] = useState<string>("");
  const [departamentoFiltro, setDepartamentoFiltroLocal] = useState<string>(""); // 👈 estado local para mostrar selección
  const [error, setError] = useState<string>("");

  const getPeriodoDescripcion = (codigo: string) => {
    const periodoEncontrado = periodo.find((p) => p.PeriodoCodigo === codigo);
    return periodoEncontrado ? periodoEncontrado.PeriodoDescripcion : "";
  };

  const handleChangePeriodo = (event: any) => {
    setPeriodoFiltro(event.target.value);
    setError("");
  };

  const handleChangeDepartamento = (event: any) => {
    const value = event.target.value;
    setDepartamentoFiltroLocal(value); // 👈 actualiza selección local
    setDepartamentoFiltro(value);      // 👈 actualiza estado en ReportePage
    setError("");
  };

  const handleGenerar = async () => {
    if (!periodoFiltro) {
      setError("Seleccione un período para generar reporte");
      return;
    }
    setError("");
    await onGenerar(periodoFiltro); // 👈 solo envía período, el departamento ya está en ReportePage
  };

  return (
    <div className="flex justify-start items-center min-h-[250px]">
      <div className="bg-white p-8 w-full max-w-5xl rounded-xl">
        <div className="flex flex-col items-center mb-6">
          <Typography variant="body2" className="text-gray-500 mb-4 text-center">
            Selecciona el periodo y aplica filtros opcionales para generar el reporte de la nómina.
          </Typography>
        </div>

        <form className="space-y-6 text-left">
          <div className="flex space-x-6">
            {/* Periodo */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <CalendarMonthIcon
                  style={{ marginRight: 6, verticalAlign: "middle", color: "#1976d2" }}
                />
                Periodo (Año - Mes)
              </label>
              <Dropdown
                value={periodoFiltro || ""}
                onChange={handleChangePeriodo}
                data={periodo.map((p) => ({
                  value: String(p.PeriodoCodigo),
                  label: p.PeriodoDescripcion,
                }))}
                placeholder="Seleccionar Periodo"
                borderRadius="10px"
                borderColor="#d5d7da"
              />

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleGenerar}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all"
                >
                  Buscar Reporte
                </button>
              </div>
            </div>

            {/* Departamento */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Departamento
              </label>
              <Dropdown
                value={departamentoFiltro || ""} // 👈 ahora sí refleja la selección
                onChange={handleChangeDepartamento}
                data={departamento.map((d) => ({
                  value: String(d.DepartamentoCodigo), // 👈 se envía el código
                  label: d.DepartamentoNombre,         // 👈 se muestra el nombre
                }))}
                placeholder="Filtrar por Departamento"
                borderRadius="10px"
                borderColor="#d5d7da"
              />
            </div>
          </div>

          {error && <div className="text-xs text-red-600 mt-2">{error}</div>}
          {periodoFiltro && (
            <div className="text-xs text-blue-600 mt-3">
              Seleccionado: <b>{getPeriodoDescripcion(periodoFiltro)}</b>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
