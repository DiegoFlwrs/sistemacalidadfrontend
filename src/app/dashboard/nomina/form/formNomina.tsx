import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Dropdown } from "@/components/Dropdown";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentIcon from "@mui/icons-material/Assignment";

interface FormNominaProps {
  setOpenModalForm: (open: boolean) => void;
  periodo: any[];
  setAnio: (anio: number) => void;
  setMes: (mes: number) => void;
  AgregarNominaServicio: (
    PeriodoCodigo: string
  ) => Promise<void>;
}

export const FormNomina = ({
  setOpenModalForm,
  periodo,
  setAnio,
  setMes,
  AgregarNominaServicio
}: FormNominaProps) => {
  const [periodoFiltro, setPeriodoFiltro] = useState<string>("");

  const getPeriodoDescripcion = (codigo: string) => {
    const periodoEncontrado = periodo.find((p) => p.PeriodoCodigo === codigo);
    return periodoEncontrado ? periodoEncontrado.PeriodoDescripcion : "";
  };

  const handleChangePeriodo = (event: any) => setPeriodoFiltro(event.target.value);

  const handleProcesarNomina = () => {
    if (!periodoFiltro) {
      alert("Seleccione un periodo para procesar la nómina.");
      return;
    }
    // // Extraer año y mes del código de periodo
    // const periodoSeleccionado = periodo.find((p) => p.PeriodoCodigo === periodoFiltro);
    // if (periodoSeleccionado) {
    //   const anio = parseInt(periodoSeleccionado.PeriodoCodigo.substring(0, 4));
    //   const mes = parseInt(periodoSeleccionado.PeriodoCodigo.substring(4, 6));
    //   setAnio(anio);
    //   setMes(mes);
    // }

    AgregarNominaServicio(
      periodoFiltro
    )
    setOpenModalForm(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[300px]">
      <div className="bg-white p-8 w-full max-w-md rounded-xl">
        <div className="flex flex-col items-center mb-6">
          <AssignmentIcon style={{ fontSize: 40, color: "#1976d2" }} />
          <Typography
            variant="h5"
            className="font-bold text-gray-800 mt-4 mb-2"
            style={{ letterSpacing: 1 }}
          >
            Procesar Nómina
          </Typography>
          <Typography
            variant="body2"
            className="text-gray-500 mb-4 text-center"
            style={{ maxWidth: 320 }}
          >
            Selecciona el periodo para procesar la nómina de los empleados.<br />
            Solo se mostrarán los datos del periodo elegido.
          </Typography>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <CalendarMonthIcon style={{ marginRight: 6, verticalAlign: "middle", color: "#1976d2" }} />
              Periodo (Año - Mes)
            </label>
            <Dropdown
              value={periodoFiltro || ""}
              onChange={handleChangePeriodo}
              data={periodo.map((p) => ({
                value: p.PeriodoCodigo,
                label: p.PeriodoDescripcion,
              }))}
              placeholder="Seleccionar Periodo"
              borderRadius="10px"
              borderColor="#d5d7da"
            />
            {periodoFiltro && (
              <div className="text-xs text-blue-600 mt-3">
                Seleccionado: <b>{getPeriodoDescripcion(periodoFiltro)}</b>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={handleProcesarNomina}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all"
            >
              Procesar Nómina
            </button>
            <button
              type="button"
              onClick={() => setOpenModalForm(false)}
              className="px-4 bg-gray-400 text-white font-semibold py-2 rounded-lg hover:bg-gray-500 transition-all"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};