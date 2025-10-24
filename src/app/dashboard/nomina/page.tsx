/* eslint-disable */
// @ts-nocheck
"use client";
import { ModalComponent } from "@/components/Modal";
import { DetalleNomina } from "./form/detalleNomina";
import { useNomina } from "./hooks/useNomina";
import { Paper, Typography, TextField } from "@mui/material";
import { useState } from "react";
import { Dropdown } from "@/components/Dropdown";
import { TableNominaDetail } from "./table/TableNominaDetail";
import { getLabel } from "@/utils/helpers";
import { ESTADOS_NOMINA, MESES } from "@/utils/constanst";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Pagination from "@/components/Pagination";
import { FormNomina } from "./form/formNomina";

export default function NominaPage() {
  const {
    openModal,
    setOpenModal,
    nomina,
    anios,
    meses,
    departamentos,
    selectedNomina,
    setSelectedNomina,
    mes,
    anio,
    departamento,
    estado,
    handleChangeAnio,
    handleChangeMes,
    handleChangeDepartamento,
    handleChangeEstado,
    handleResetFilters,
    empleadoApellido, 
    setEmpleadoApellido,
    setEmpleadoNombre,
    empleadoNombre,
    filtro,
    size,
    page,
    totalItems,
    setPage,
    openModalForm, 
    setOpenModalForm,
    isEdit, 
    setIsEdit,
    contratos,
    periodo,
    AgregarNominaServicio,
    ActualizarNominaServicio,
    handleEditNomina,
    nominaToEdit,
    setNominaToEdit
  } = useNomina();

  return (
    <div className="pt-6">
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography fontSize={20} fontWeight={600} mb={3}>
          Opciones de Nómina
        </Typography>

        <div className="flex my-5 gap-3">
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
          onClick={() => {
            setNominaToEdit(null);
            setIsEdit(false);
            setOpenModalForm(true)
          }}
          >
            <span>➕</span> Nueva Nómina
          </button>
          {/* <button className="bg-green-600 text-white p-2 rounded">Generar Reporte Nómina</button> */}
        </div>

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
                label: getLabel(MESES, m),
              }))}
              placeholder="Seleccionar Mes"
              borderRadius="10px"
              borderColor="#d5d7da"
            />
          </div>
          <div className="w-[20%]">
            <Dropdown
              value={departamento}
              onChange={handleChangeDepartamento}
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
              value={estado}
              onChange={handleChangeEstado}
              data={ESTADOS_NOMINA.map((e) => ({
                value: e.value,
                label: e.label,
              }))}
              placeholder="Seleccionar Estado"
              borderRadius="10px"
              borderColor="#d5d7da"
            />
          </div>
          <div>
            <button
              className={filtro ? "text-red-800" : "text-gray-500"}
              onClick={handleResetFilters}
            >
              <RestartAltIcon />
            </button>
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
              value={empleadoApellido}
              onChange={(e) => setEmpleadoApellido(e.target.value)}
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
        onEditNomina={handleEditNomina}
      />
      <Pagination
        page={page}
        size={size}
        totalItems={totalItems}
        onPageChange={setPage}
      />
      <ModalComponent open={openModal} setOpen={setOpenModal} width={520}>
        <DetalleNomina data={selectedNomina} />
      </ModalComponent>

      <ModalComponent open={openModalForm} setOpen={setOpenModalForm} width={480}>
        <FormNomina 
          isEdit={isEdit} 
          setOpenModalForm={setOpenModalForm} 
          contratos={contratos} 
          periodo={periodo} 
          AgregarNominaServicio={AgregarNominaServicio}
          ActualizarNominaServicio={ActualizarNominaServicio}
          nominaToEdit={nominaToEdit}
          setNominaToEdit={setNominaToEdit}
        />
      </ModalComponent>
    </div>
  );
}
