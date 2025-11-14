/* eslint-disable */
// @ts-nocheck
// "use client";
import React, { useState, useEffect,useRef } from "react";
import {
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
} from "@mui/material";
import { ContratoData } from "../hooks/useGestion";

interface FormGestionProps {
  isEdit: boolean;
  setOpenModalForm: (open: boolean) => void;
  AgregarContratoServicio: (
      contratoData: ContratoData
  ) => Promise<void>;
  ActualizarContratoServicio: (
    codigo: string,
    contratoData: Partial<ContratoData>,
    motivo: string
  ) => Promise<void>;
  contratoToEdit: ContratoData | null;
  setContratoToEdit: (contrato: ContratoData | null) => void;
  empleados: any[];
  tiposContrato: any[];
  modalidadesPago: any[];
  jornadasLaborales: any[];
}

export const FormGestion: React.FC<FormGestionProps> = ({
  isEdit,
  setOpenModalForm,
  AgregarContratoServicio,
  ActualizarContratoServicio,
  contratoToEdit,
  setContratoToEdit,
  empleados,
  tiposContrato,
  modalidadesPago,
  jornadasLaborales,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [motivoModificacion, setMotivoModificacion] = useState("");
    const submitLock = useRef(false);
  const [formData, setFormData] = useState({
    
    codigo:"",
    empleadoCodigo: "",
    tipoContratoCodigo: "",
    modalidadCodigo: "",
    jornadaCodigo: "",
    fechaInicio: "",
    fechaFin: "",
    salario: "",
    bonificacion: "0",
    descuento: "0",
    usuarioCodigo: "USU01",
    estado: "A" 
  });

  useEffect(() => {
    if (isEdit && contratoToEdit) {
      const normalizarFecha = (fecha: string) => {
      if (!fecha) return "";
      return fecha.includes("T") ? fecha.split("T")[0] : fecha;
      };
      setFormData({
        codigo: contratoToEdit.codigo,
        empleadoCodigo: contratoToEdit.empleadoCodigo.trim(),
        tipoContratoCodigo: contratoToEdit.tipoContratoCodigo.trim(),
        modalidadCodigo: contratoToEdit.modalidadCodigo.trim(),
        jornadaCodigo: contratoToEdit.jornadaCodigo.trim(),
        fechaInicio: normalizarFecha(contratoToEdit.fechaInicio),
        fechaFin: normalizarFecha(contratoToEdit.fechaFin),
        salario: contratoToEdit.salario.toString(),
        bonificacion: contratoToEdit.bonificacion.toString(),
        descuento: contratoToEdit.descuento.toString(),
        usuarioCodigo: contratoToEdit.usuarioCodigo,
        estado: contratoToEdit.estado 
      });
    } else {
      resetForm();
    }
  }, [isEdit, contratoToEdit]);


  const resetForm = () => {
    setFormData({
      codigo:"",
      empleadoCodigo: "",
      tipoContratoCodigo: "",
      modalidadCodigo: "",
      jornadaCodigo: "",
      fechaInicio: "",
      fechaFin: "",
      salario: "",
      bonificacion: "0",
      descuento: "0",
      usuarioCodigo: "USU01",
       estado: "A"
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitLock.current) return;  
    submitLock.current = true;
    setLoading(true);
    setError(null);

    try {
      if (
        !formData.empleadoCodigo ||
        !formData.tipoContratoCodigo ||
        !formData.modalidadCodigo ||
        !formData.jornadaCodigo ||
        !formData.fechaInicio ||
        !formData.fechaFin ||
        !formData.salario
      ) {
        throw new Error("Todos los campos marcados con * son obligatorios");
      }

      if (new Date(formData.fechaFin) <= new Date(formData.fechaInicio)) {
        throw new Error("La fecha de fin debe ser posterior a la de inicio");
      }

      if (isEdit && !motivoModificacion.trim()) {
        throw new Error("Debe ingresar un motivo de modificación");
      }

          const contratoData = {
            empleadoCodigo: formData.empleadoCodigo.trim(),
            tipoContratoCodigo: formData.tipoContratoCodigo.trim(),
            modalidadCodigo: formData.modalidadCodigo.trim(),
            jornadaCodigo: formData.jornadaCodigo.trim(),
            usuarioCodigo: formData.usuarioCodigo.trim(),
            fechaInicio: formData.fechaInicio,
            fechaFin: formData.fechaFin,
            salario: parseFloat(formData.salario),
            bonificacion: parseFloat(formData.bonificacion),
            descuento: parseFloat(formData.descuento),
            estado: "A"
          };

      if (isEdit && contratoToEdit) {
        await ActualizarContratoServicio(
          contratoToEdit.codigo.trim(),
          contratoData,
          motivoModificacion
        );
      } 
      else {
        await AgregarContratoServicio({
          ...contratoData,
          codigo: formData.codigo.trim() 
        });
      }

      setOpenModalForm(false);
      setContratoToEdit(null);
      setMotivoModificacion("");
      resetForm();
    } catch (err: any) {
      setError(err.message || "Error al guardar el contrato");
    } finally {
      setLoading(false);
      submitLock.current = false; 
    }
  };

  const handleClose = () => {
    setOpenModalForm(false);
    setContratoToEdit(null);
    setMotivoModificacion("");
    setError(null);
  };


  return (
    <div className="flex justify-center items-center">
      <div className="rounded-2xl w-[420px] bg-white shadow-md p-6">
        <Typography
          variant="h6"
          className="text-center font-semibold text-gray-800 mb-6"
        >
          {isEdit ? "Editar Contrato Laboral" : "Nuevo Contrato Laboral"}
        </Typography>

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Código de Contrato
            </label>
            <input
              type="text"
              value={formData.codigo}
              onChange={(e) =>
              setFormData({ ...formData, codigo: e.target.value.toUpperCase() })
              }
              disabled={isEdit}                
              required={!isEdit}              
              className={`w-full border border-gray-300 rounded-lg px-3 py-2
              ${isEdit ? "bg-gray-200 cursor-not-allowed" : "bg-white"}`}
              placeholder="Ejemplo: CON15"
            />

          </div>

          {/* Empleado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Empleado *
            </label>
            <select
              value={formData.empleadoCodigo}
              onChange={(e) =>
                setFormData({ ...formData, empleadoCodigo: e.target.value })
              }
              disabled={isEdit}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isEdit ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              required
            >
              <option value="">Seleccionar empleado</option>
              {empleados.map((emp) => (
                <option key={emp.Codigo} value={emp.Codigo}>
                  {emp.EmpleadoNombre}
                </option>
              ))}
            </select>
          </div>

          {/* Tipo contrato */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Contrato *
            </label>
            <select
              value={formData.tipoContratoCodigo}
              onChange={(e) =>
                setFormData({ ...formData, tipoContratoCodigo: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Seleccionar tipo</option>
              {tiposContrato.map((tipo) => (
                <option key={tipo.Codigo} value={tipo.Codigo}>
                  {tipo.Descripcion}
                </option>
              ))}
            </select>
          </div>

          {/* Modalidad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Modalidad de Pago *
            </label>
            <select
              value={formData.modalidadCodigo}
              onChange={(e) =>
                setFormData({ ...formData, modalidadCodigo: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Seleccionar modalidad</option>
              {modalidadesPago.map((m) => (
                <option key={m.Codigo} value={m.Codigo}>
                  {m.Descripcion}
                </option>
              ))}
            </select>
          </div>

          {/* Jornada */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jornada Laboral *
            </label>
            <select
              value={formData.jornadaCodigo}
              onChange={(e) =>
                setFormData({ ...formData, jornadaCodigo: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Seleccionar jornada</option>
              {jornadasLaborales.map((j) => (
                <option key={j.Codigo} value={j.Codigo}>
                  {j.Descripcion}
                </option>
              ))}
            </select>
          </div>

          {/* Fechas */}
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha Inicio *
              </label>
              <input
                type="date"
                value={formData.fechaInicio}
                // mmin={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  setFormData({ ...formData, fechaInicio: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha Fin *
              </label>
              <input
                type="date"
                value={formData.fechaFin}
                // min={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  setFormData({ ...formData, fechaFin: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {/* Salario y otros */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Salario (S/.) *
            </label>
            <input
              type="number"
              value={formData.salario}
              min="1025"
              step="0.01"
              onChange={(e) =>
                setFormData({ ...formData, salario: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"         
              required
            />
          </div>

          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bonificación (S/.)
              </label>
              <input
                type="number"
                value={formData.bonificacion}
                onChange={(e) =>
                  setFormData({ ...formData, bonificacion: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                min="0"
                step="0.01"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descuento (S/.)
              </label>
              <input
                type="number"
                value={formData.descuento}
                onChange={(e) =>
                  setFormData({ ...formData, descuento: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Motivo de modificación */}
          {isEdit && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Motivo de Modificación *
              </label>
              <textarea
                value={motivoModificacion}
                onChange={(e) => setMotivoModificacion(e.target.value)}
                rows={3}
                required
                placeholder="Describa el motivo de la modificación..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all"
            >
              {loading
                ? "Guardando..."
                : isEdit
                ? "Actualizar Contrato"
                : "Registrar Contrato"}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="px-4 bg-gray-500 text-white font-semibold py-2 rounded-lg hover:bg-gray-600 transition-all"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
