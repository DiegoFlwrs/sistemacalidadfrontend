import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { Dropdown } from "@/components/Dropdown";
import { NominaData } from "@/core/services/nomiaService";

interface FormNominaProps {
  isEdit: boolean;
  setOpenModalForm: (open: boolean) => void;
  contratos: any[];
  periodo: any[];
  nominaToEdit: NominaData | null;
  setNominaToEdit: (nomina: NominaData | null) => void;
   AgregarNominaServicio: (
    NominaCodigo: string,
    PeriodoCodigo: string,
    ContratoCodigo: string,
    NominaHorasExtras: number,
    NominaBonificacion: number,
    NominaDescuentos: number
  ) => Promise<void>;
   ActualizarNominaServicio: (
    NominaCodigo: string,
    PeriodoCodigo: string,
    ContratoCodigo: string,
    NominaHorasExtras: number,
    NominaBonificacion: number,
    NominaDescuentos: number
  ) => Promise<void>;
}

export const FormNomina = ({ 
  isEdit, 
  setOpenModalForm, 
  contratos, 
  periodo, 
  AgregarNominaServicio, 
  ActualizarNominaServicio, 
  nominaToEdit, 
  setNominaToEdit 
}: FormNominaProps) => {
  const [horasExtras, setHorasExtras] = useState<number>(0);
  const [bonificacion, setBonificacion] = useState<number>(0);
  const [descuentos, setDescuentos] = useState<number>(0);
  const [periodoFiltro, setPeriodoFiltro] = useState<string>("");
  const [contrato, setContrato] = useState<string>("");
  const [codigoNomina, setCodigoNomina] = useState("");

  const getPeriodoDescripcion = (codigo: string) => {
    const periodoEncontrado = periodo.find(p => p.PeriodoCodigo === codigo);
    return periodoEncontrado ? periodoEncontrado.PeriodoDescripcion : "";
  };

  const getContratoDescripcion = (codigo: string) => {
    const contratoEncontrado = contratos.find(c => c.ContratoCodigo === codigo);
    return contratoEncontrado ? contratoEncontrado.EmpleadoDescripcion : "";
  };

  useEffect(() => {
    if (isEdit && nominaToEdit && contratos.length > 0 && periodo.length > 0) {
      console.log("Cargando datos para edición:", nominaToEdit);
      setCodigoNomina(nominaToEdit.NominaCodigo || "");
      setContrato(nominaToEdit.ContratoCodigo || "");
      setPeriodoFiltro(nominaToEdit.PeriodoCodigo || "");
      setHorasExtras(nominaToEdit.NominaHorasExtras || 0);
      setBonificacion(nominaToEdit.NominaBonificacion || 0);
      setDescuentos(nominaToEdit.NominaDescuentos || 0);
      
      const contratoEncontrado = contratos.find(c => {
        if (nominaToEdit.EmpleadoCodigo) {
          return c.EmpleadoDescripcion.includes(nominaToEdit.EmpleadoCodigo);
        }
        
        const descripcion = c.EmpleadoDescripcion.toLowerCase();
        const nombreCompleto = `${nominaToEdit.EmpleadoApellido} ${nominaToEdit.EmpleadoNombre}`.toLowerCase();
        return descripcion.includes(nombreCompleto) || 
               (descripcion.includes(nominaToEdit.EmpleadoNombre.toLowerCase()) && 
                descripcion.includes(nominaToEdit.EmpleadoApellido.toLowerCase()));
      });
      
      console.log("Contrato encontrado:", contratoEncontrado);
      if (contratoEncontrado) {
        setContrato(contratoEncontrado.ContratoCodigo);
      }
    } else if (!isEdit) {
      resetForm();
    }
  }, [isEdit, nominaToEdit, contratos, periodo]);

  const resetForm = () => {
    setCodigoNomina("");
    setPeriodoFiltro("");
    setContrato("");
    setHorasExtras(0);
    setBonificacion(0);
    setDescuentos(0);
  };

  

  const handleChangePeriodo = (event: any) => setPeriodoFiltro(event.target.value);
  const handleChangeContrato = (event: any) => setContrato(event.target.value);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!codigoNomina.trim() || !periodoFiltro || !contrato) {
      alert("Por favor complete todos los campos obligatorios");
      return;
    }

    try {
      console.log("Enviando datos:", {
        codigoNomina,
        periodoFiltro,
        contrato,
        horasExtras,
        bonificacion,
        descuentos,
        isEdit
      });

      if (isEdit) {
        await ActualizarNominaServicio(
          codigoNomina,
          periodoFiltro,
          contrato,
          horasExtras,
          bonificacion,
          descuentos
        );
      } else {
        await AgregarNominaServicio(
          codigoNomina,
          periodoFiltro,
          contrato,
          horasExtras,
          bonificacion,
          descuentos
        );
      }
      
      setOpenModalForm(false);
      resetForm();
      setNominaToEdit(null);
    } catch (error) {
      console.error("Error al procesar la nómina:", error);
      alert(`Error al ${isEdit ? 'actualizar' : 'agregar'} la nómina. Inténtelo nuevamente.`);
    }
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
              disabled={isEdit}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isEdit ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Periodo (Año - Mes)
            </label>
            <div className="flex gap-2">
              <Dropdown
                value={periodoFiltro || ""}
                onChange={handleChangePeriodo}
                data={periodo.map((p) => ({ 
                  value: p.PeriodoCodigo, 
                  label: p.PeriodoDescripcion 
                }))}
                placeholder="Seleccionar Periodo"
                borderRadius="10px"
                borderColor="#d5d7da"
              />
            </div>
            {isEdit && periodoFiltro && (
              <div className="text-xs text-blue-600 mt-1">
                Seleccionado: {getPeriodoDescripcion(periodoFiltro)}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contrato del Empleado
            </label>
            <Dropdown
              value={contrato || ""}
              onChange={handleChangeContrato}
              data={contratos.map((e) => ({ 
                value: e.ContratoCodigo, 
                label: e.EmpleadoDescripcion 
              }))}
              placeholder="Seleccionar Contrato"
              borderRadius="10px"
              borderColor="#d5d7da"
            />
            {isEdit && contrato && (
              <div className="text-xs text-blue-600 mt-1">
                Seleccionado: {getContratoDescripcion(contrato)}
              </div>
            )}
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
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bonificación (S/)
            </label>
            <input
              type="number"
              value={bonificacion}
              onChange={(e) => setBonificacion(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descuentos (S/)
            </label>
            <input
              type="number"
              value={descuentos}
              onChange={(e) => setDescuentos(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              min="0"
              step="0.01"
            />
          </div>

          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all"
            >
              {isEdit ? "Actualizar Nómina" : "Registrar Nómina"}
            </button>
            <button
              type="button"
              onClick={() => {
                setOpenModalForm(false);
                resetForm();
                setNominaToEdit(null);
              }}
              className="px-4 bg-gray-500 text-white font-semibold py-2 rounded-lg hover:bg-gray-600 transition-all"
            >
              Cancelar
            </button>
          </div>

          <p className="text-center text-gray-500 text-sm mt-2">
            Estado por defecto: <span className="font-semibold">Activo</span>
          </p>
        </form>
      </div>
    </div>
  );
};
