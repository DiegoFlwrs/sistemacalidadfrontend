import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Dropdown } from "@/components/Dropdown";

interface FormNominaProps { 
    isEdit: boolean;
 }

export const FormNomina = ({ isEdit }: FormNominaProps) => {
  const [anio, setAnio] = useState("");
  const [mes, setMes] = useState("");

  const handleChangeAnio = (e: any) => setAnio(e.value);
  const handleChangeMes = (e: any) => setMes(e.value);

  const anios = [2023, 2024, 2025, 2026];
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    <div className="flex justify-center mt-2">
      <div className="bg-white shadow-lg rounded-xl p-6 w-[450px]">
        <Typography
          fontSize={20}
          fontWeight={600}
          mb={3}
          mt={-3}
          className="text-center"
        >
          {isEdit ? "Editar Nómina" : "Registrar Nómina"}
        </Typography>

        {/* Código de Nómina */}
        <div className="flex items-center justify-between mb-3">
          <label className="font-medium">Código de Nómina:</label>
          <input
            type="text"
            value="085"
            className="border border-gray-300 rounded px-2 py-1 w-[50%]"
            readOnly
          />
        </div>

        {/* Periodo de Nómina */}
        <div className="flex items-center justify-between mb-3">
          <label className="font-medium">Periodo de Nómina:</label>
          <div className="flex gap-2 w-[50%]">
            <div className="w-[50%]">
              <Dropdown
                value={anio}
                onChange={handleChangeAnio}
                data={anios.map((a) => ({
                  value: a,
                  label: a,
                }))}
                placeholder="Año"
                borderRadius="10px"
                borderColor="#d5d7da"
              />
            </div>
            <div className="w-[50%]">
              <Dropdown
                value={mes}
                onChange={handleChangeMes}
                data={meses.map((m) => ({
                  value: m,
                  label: m,
                }))}
                placeholder="Mes"
                borderRadius="10px"
                borderColor="#d5d7da"
              />
            </div>
          </div>
        </div>

        {/* Contrato del Empleado */}
        <div className="flex items-center justify-between mb-4">
          <label className="font-medium">Contrato del Empleado:</label>
          <div className="w-[50%]">
            <Dropdown
              value=""
              onChange={() => {}}
              data={[
                { value: "1", label: "Empleado 1" },
                { value: "2", label: "Empleado 2" },
              ]}
              placeholder="Seleccione un empleado"
              borderRadius="10px"
              borderColor="#d5d7da"
            />
          </div>
        </div>

        <hr className="my-4 border-gray-300" />

        {/* Detalle del Pago */}
        <p className="font-semibold mb-2 text-left">Detalle del Pago:</p>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label>Sueldo Básico:</label>
            <input
              type="number"
              defaultValue="0.00"
              className="border border-gray-300 rounded px-2 py-1 w-[50%] text-right"
            />
          </div>

          <div className="flex items-center justify-between">
            <label>Horas Extras:</label>
            <input
              type="number"
              defaultValue="0"
              className="border border-gray-300 rounded px-2 py-1 w-[50%] text-right"
            />
          </div>

          <div className="flex items-center justify-between">
            <label>Bonificación:</label>
            <input
              type="number"
              defaultValue="0.00"
              className="border border-gray-300 rounded px-2 py-1 w-[50%] text-right"
            />
          </div>

          <div className="flex items-center justify-between">
            <label>Otros Descuentos:</label>
            <input
              type="number"
              defaultValue="0.00"
              className="border border-gray-300 rounded px-2 py-1 w-[50%] text-right"
            />
          </div>
        </div>

        <hr className="my-4 border-gray-300" />

        {/* Resumen Calculado */}
        <p className="font-semibold mb-2 text-left">Resumen Calculado:</p>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label>Total Ingresos:</label>
            <input
              type="text"
              value="0.00"
              readOnly
              className="border border-gray-300 rounded px-2 py-1 w-[50%] text-right bg-gray-100"
            />
          </div>

          <div className="flex items-center justify-between">
            <label>Total Descuentos:</label>
            <input
              type="text"
              value="0.00"
              readOnly
              className="border border-gray-300 rounded px-2 py-1 w-[50%] text-right bg-gray-100"
            />
          </div>

          <div className="flex items-center justify-between">
            <label>Sueldo Neto:</label>
            <input
              type="text"
              value="0.00"
              readOnly
              className="border border-gray-300 rounded px-2 py-1 w-[50%] text-right bg-gray-100"
            />
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-center gap-3 mt-5">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Guardar Nómina
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
