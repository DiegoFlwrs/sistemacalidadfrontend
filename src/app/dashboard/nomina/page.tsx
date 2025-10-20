/* eslint-disable */
// @ts-nocheck
"use client";
import { ModalComponent } from "@/components/Modal";
import { FormNomina } from "./form/formNomina";
import { useNomina } from "./hooks/useNomina";
import { Paper, Typography, TextField } from "@mui/material";
import { useState } from "react";
import { Dropdown } from "@/components/Dropdown";
import { TableNominaDetail } from "./table/TableNominaDetail";
import { getLabel } from "@/utils/helpers";
import { ESTADOS_NOMINA, MESES } from "@/utils/constanst";

export default function NominaPage() {
  const { openModal, setOpenModal, nomina, anios, meses, departamentos } = useNomina();

  const OPTIONS_MESES = [
    { value: 1, label: "Enero" },
    { value: 2, label: "Febrero" },
    { value: 3, label: "Marzo" },
  ];

  const [mes, setMes] = useState("");
  const [anio, setAnio] = useState<number[]>([]);

  const handleChangeMes = (event: any) => setMes(event.target.value);
  const handleChangeAnio = (event: any) => setAnio(event.target.value);

  const [selectedNomina, setSelectedNomina] = useState<any>(null);
  const [empleadoNombre, setEmpleadoNombre] = useState<any>(null);

  return (
    <div className="pt-6">
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography fontSize={20} fontWeight={600} mb={3}>
          Filtros de búsqueda
        </Typography>

        <div className="flex mt-5 gap-3">
          <div className="w-[20%]">
            <Dropdown
              value={anio}
              onChange={handleChangeAnio}
              data={anios.map((a) => ({
                value: a,
                label: a,
              }))}
              placeholder="Seleccionar Año"
              borderRadius="10px"
              borderColor="#d5d7da"
            />
          </div>
          <div className="w-[20%]">
            <Dropdown
              value={mes}
              onChange={handleChangeMes}
              data={meses.map((m) => ({
                value: m,
                label: getLabel(MESES, m) ,  
              }))}
              placeholder="Seleccionar Mes"
              borderRadius="10px"
              borderColor="#d5d7da"
            />
          </div>
          <div className="w-[20%]">
            <Dropdown
              value={mes}
              onChange={handleChangeMes}
              data={departamentos.map((d) => ({
                value: d.DepartamentoCodigo,
                label: d.DepartamentoNombre,  
              }))}
              placeholder="Seleccionar Departamento"
              borderRadius="10px"
              borderColor="#d5d7da"
            />
          </div>
          <div className="w-[20%]">
            <Dropdown
              value={mes}
              onChange={handleChangeMes}
              data={ESTADOS_NOMINA.map((e) => ({
                value: e.value,
                label: e.label,  
              }))}
              placeholder="Seleccionar Estado"
              borderRadius="10px"
              borderColor="#d5d7da"
            />
          </div>
        </div>
        <div className="flex mt-5 gap-3">
          <div className="w-[20%]">
            <TextField
              label="Nombre Empleado"
              value={empleadoNombre}
              onChange={(e) => setEmpleadoNombre(e.target.value)}
              size="small"
              fullWidth
            />
          </div>
          <div className="w-[20%]">
            <TextField
              label="Apellido Empleado"
              value={empleadoNombre}
              onChange={(e) => setEmpleadoNombre(e.target.value)}
              size="small"
              fullWidth
            />
          </div>
        </div>
      </Paper>

      <TableNominaDetail
        nomina={nomina ?? []}
        setOpenModal={setOpenModal}
        setSelectedNomina={setSelectedNomina}
      />

      <ModalComponent open={openModal} setOpen={setOpenModal} width={520}>
        <FormNomina data={selectedNomina} />
      </ModalComponent>
    </div>
  );
}
