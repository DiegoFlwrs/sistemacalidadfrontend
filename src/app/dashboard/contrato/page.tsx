/* eslint-disable */
// @ts-nocheck
"use client";
import { ModalComponent } from "@/components/Modal";
import { DetalleContratoLaboral } from "./form/detalleGestion";
import { useGestion } from "./hooks/useGestion";
import { Paper, Typography, TextField, Button, Chip, Alert } from "@mui/material";
import { Dropdown } from "@/components/Dropdown";
import { TableGestionDetail } from "./table/TableGestionDetail";
import { Search, RestartAlt, Warning } from "@mui/icons-material";
import Pagination from "@/components/Pagination";
import { FormGestion } from "./form/formGestion";

export default function GestionContratosPage() {
  
  const {
    openModal,
    setOpenModal,
    openModalForm,
    setOpenModalForm,
    contratos,
    selectedContrato,
    setSelectedContrato,
    searchTerm,
    setSearchTerm,
    estadoFilter,
    setEstadoFilter,
    tipoContratoFilter,
    setTipoContratoFilter,
    filtro,
    page,
    setPage,
    size,
    totalItems,
    isEdit,
    setIsEdit,
    contratoToEdit,
    setContratoToEdit,
    handleResetFilters,
    handleEditContrato,
    AgregarContratoServicio,
    ActualizarContratoServicio,
    EliminarContratoServicio,
    SuspenderContratoServicio,
    ReactivarContratoServicio,
    contratosProximosVencer,
    tienePermisosElevados,
    getEstadoTexto,
    getEstadoColor,
    loading,
    tiposContrato,
    modalidadesPago,
    jornadasLaborales,
    empleados
  } = useGestion();

  //Comentario

  const estadoOptions = [
    { value: "", label: "Todos los estados" },
    { value: "A", label: "Vigente" },
    { value: "S", label: "Suspendido" },
    { value: "F", label: "Finalizado" },
    { value: "I", label: "Inactivo" },
  ];


  if (!tienePermisosElevados) {
    return (
      <div className="pt-6">
        <Alert severity="error" className="mb-4">
          No cuenta con los privilegios necesarios para acceder a esta funcionalidad.
        </Alert>
      </div>
    );
  }

  return (
    <div className="pt-6">
      {contratosProximosVencer.length > 0 && (
        <Alert 
          severity="warning" 
          icon={<Warning />}
          className="mb-4"
        >
          <Typography fontWeight="bold">
            Contratos próximos a vencer ({contratosProximosVencer.length})
          </Typography>
          <ul className="mt-1">
            {contratosProximosVencer.slice(0, 3).map(contrato => (
              <li key={contrato.codigo}>
                {contrato.codigo} - {contrato.empleadoCodigo} - Vence: {new Date(contrato.fechaFin).toLocaleDateString()}
              </li>
            ))}
            {contratosProximosVencer.length > 3 && (
              <li>... y {contratosProximosVencer.length - 3} más</li>
            )}
          </ul>
        </Alert>
      )}

      {loading && (
        <Alert severity="info" className="mb-4">
          Cargando contratos...
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography fontSize={20} fontWeight={600} mb={3}>
          Gestión de Contratos Laborales
        </Typography>

        <div className="flex my-5 gap-3">
          <Button
            variant="contained"
            startIcon={<span>➕</span>}
            onClick={() => {
              setContratoToEdit(null);
              setIsEdit(false);
              setOpenModalForm(true);
            }}
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            Nuevo Contrato
          </Button>
        </div>

        <Typography fontSize={20} fontWeight={600} mb={3}>
          Filtros de búsqueda
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <TextField
            label="Buscar por código"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            fullWidth
            InputProps={{
              endAdornment: <Search color="action" />,
            }}
          />
          
          <Dropdown
            value={estadoFilter}
            onChange={(e) => setEstadoFilter(e.target.value)}
            data={estadoOptions}
            placeholder="Filtrar por estado"
            borderRadius="10px"
            borderColor="#d5d7da"
          />
          
          <Dropdown
            value={tipoContratoFilter}
            onChange={(e) => setTipoContratoFilter(e.target.value)}
            data={tiposContrato.map(tipo => ({
              value: tipo.Codigo,
              label: tipo.Descripcion
            }))}
            placeholder="Filtrar por tipo"
            borderRadius="10px"
            borderColor="#d5d7da"
          />
        </div>

        <div className="flex justify-between items-center">
          <Typography variant="body2" color="textSecondary">
            Mostrando {contratos?.length || 0} de {totalItems} contratos
          </Typography>
          
          <button
            className={filtro ? "text-red-800" : "text-gray-500"}
            onClick={handleResetFilters}
          >
            <RestartAlt />
          </button>
        </div>
      </Paper>

      {!loading && contratos.length === 0 && (
        <Alert severity="info" className="mb-4">
          No se encontraron contratos con los filtros seleccionados.
        </Alert>
      )}

      <TableGestionDetail
        contratos={contratos ?? []}
        setOpenModal={setOpenModal}
        setSelectedContrato={setSelectedContrato}
        onEditContrato={handleEditContrato}
        onDeleteContrato={EliminarContratoServicio}
        onSuspendContrato={SuspenderContratoServicio}
        onReactivateContrato={ReactivarContratoServicio}
        tienePermisosElevados={tienePermisosElevados}
        getEstadoTexto={getEstadoTexto}
        getEstadoColor={getEstadoColor}
      />

      <Pagination
        page={page}
        size={size}
        totalItems={totalItems}
        onPageChange={setPage}
      />

      <ModalComponent open={openModal} setOpen={setOpenModal} width={600}>
        <DetalleContratoLaboral
          data={selectedContrato}
          empleados={empleados}
          tiposContrato={tiposContrato}
          modalidadesPago={modalidadesPago}
          jornadasLaborales={jornadasLaborales}
          getEstadoTexto={getEstadoTexto}
        />
      </ModalComponent>

      <ModalComponent open={openModalForm} setOpen={setOpenModalForm} width={700}>
        <FormGestion 
          isEdit={isEdit} 
          setOpenModalForm={setOpenModalForm} 
          AgregarContratoServicio={AgregarContratoServicio}
          ActualizarContratoServicio={ActualizarContratoServicio}
          contratoToEdit={contratoToEdit}
          setContratoToEdit={setContratoToEdit}
          empleados={empleados}
          tiposContrato={tiposContrato}
          modalidadesPago={modalidadesPago}
          jornadasLaborales={jornadasLaborales}
        />
      </ModalComponent>
    </div>
  );
}