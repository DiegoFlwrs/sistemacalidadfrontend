import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Dropdown } from "@/components/Dropdown";

interface FormNominaProps {
  isEdit: boolean;
  setOpenModalForm: (open: boolean) => void;
  contratos: any[];
  periodo: any[];
   AgregarNominaServicio: (
    NominaCodigo: string,
    PeriodoCodigo: string,
    ContratoCodigo: string,
    NominaHorasExtras: number,
    NominaBonificacion: number,
    NominaDescuentos: number
  ) => Promise<void>;
}

export const FormNomina = ({ isEdit, setOpenModalForm, contratos, periodo, AgregarNominaServicio }: FormNominaProps) => {
  const [horasExtras, setHorasExtras] = useState<number>();
  const [bonificacion, setBonificacion] = useState<number>();
  const [descuentos, setDescuentos] = useState<number>();
  const [periodoFiltro, setPeriodoFiltro] = useState<any>(null);
  const [contrato, setContrato] = useState<any>(null);
  const [codigoNomina, setCodigoNomina] = useState("");

  

  const handleChangePeriodo = (event: any) => setPeriodoFiltro(event.target.value);
  const handleChangeContrato = (event: any) => setContrato(event.target.value);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    AgregarNominaServicio(
      codigoNomina,
      periodoFiltro,
      contrato,
      horasExtras!,
      bonificacion!,
      descuentos!
    )
    setOpenModalForm(false);
  }

  return (
    <div className="flex justify-center items-center">
      <div className="rounded-2xl w-[400px]">
        <Typography
          variant="h6"
          className="text-center font-semibold text-gray-800 mb-6"
        >
          {isEdit ? "Editar Nómina" : "Insertar Nómina"}
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Código de Nómina
            </label>
             <input
              type="text"
              value={codigoNomina}
              onChange={(e) => setCodigoNomina(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Periodo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Periodo (Año - Mes)
            </label>
            <div className="flex gap-2">
              <Dropdown
                value={periodoFiltro}
                onChange={handleChangePeriodo}
                data={periodo.map((p) => ({ value: p.PeriodoCodigo, label: p.PeriodoDescripcion }))}
                placeholder="Periodo"
                borderRadius="10px"
                borderColor="#d5d7da"
              />
            </div>
          </div>

          {/* Contrato */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contrato del Empleado
            </label>
            <Dropdown
              value={contrato}
              onChange={handleChangeContrato}
              data={contratos.map((e) => ({ value: e.ContratoCodigo, label: e.EmpleadoDescripcion }))}
              placeholder="Seleccione contrato"
              borderRadius="10px"
              borderColor="#d5d7da"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Horas Extras
            </label>
            <input
              type="number"
              value={horasExtras}
              onChange={(e) => setHorasExtras(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Bonificación */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bonificación (S/)
            </label>
            <input
              type="number"
              value={bonificacion}
              onChange={(e) => setBonificacion(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Descuentos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descuentos (S/)
            </label>
            <input
              type="number"
              value={descuentos}
              onChange={(e) => setDescuentos(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all"
          >
            Registrar Nómina
          </button>

          <p className="text-center text-gray-500 text-sm mt-2">
            Estado por defecto: <span className="font-semibold">Activo</span>
          </p>
        </form>
      </div>
    </div>
  );
};
