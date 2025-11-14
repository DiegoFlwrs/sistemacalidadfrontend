/* eslint-disable */
// @ts-nocheck
"use client";
import React from "react";
import {
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import { Edit, Delete, Visibility, Pause, PlayArrow } from "@mui/icons-material";
import { TableGeneric } from "@/components/TableGeneric";
import { ContratoData } from "../hooks/useGestion";

interface TableGestionDetailProps {
  contratos: ContratoData[];
  setOpenModal: (open: boolean) => void;
  setSelectedContrato: (contrato: ContratoData) => void;
  onEditContrato: (contrato: ContratoData) => void;
  onDeleteContrato: (codigo: string, motivo: string) => void;
  onSuspendContrato: (codigo: string, motivo: string) => void;
  onReactivateContrato: (codigo: string, motivo: string) => void;
  tienePermisosElevados: boolean;
  getEstadoTexto: (estadoCodigo: string) => string;
  getEstadoColor: (estadoCodigo: string) => "success" | "warning" | "error" | "default";
}

export const TableGestionDetail: React.FC<TableGestionDetailProps> = ({
  contratos,
  setOpenModal,
  setSelectedContrato,
  onEditContrato,
  onDeleteContrato,
  onSuspendContrato,
  onReactivateContrato,
  tienePermisosElevados,
  getEstadoTexto,
  getEstadoColor,
}) => {

  const columns = [
    { field: "codigo", header: "Código" },
    { field: "empleadoCodigo", header: "Empleado" },
    { field: "tipoContratoCodigo", header: "Contrato" },
    { field: "modalidadCodigo", header: "Modalidad" },
    { field: "jornadaCodigo", header: "Jornada" },
    { field: "fechaInicio", header: "Inicio" },
    { field: "fechaFin", header: "Fin" },
    { field: "salario", header: "Salario" },
    { field: "estado", header: "Estado" },
  ];


  const parseData = () =>
    contratos.map((c) => ({
      _item: c,
      codigo: c.ContratoCodigo,
      empleadoCodigo: c.EmpleadoNombre + " " + c.EmpleadoApellido,
      tipoContratoCodigo: c.TipoContratoDescripcion,
      modalidadCodigo: c.ModalidadDescripcion,
      jornadaCodigo: c.JornadaDescripcion,
      fechaInicio: c.ContratoFechaInicio
        ? new Date(c.ContratoFechaInicio).toLocaleDateString("es-PE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "-",
      fechaFin: c.ContratoFechaFin
        ? new Date(c.ContratoFechaFin).toLocaleDateString("es-PE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "-",
      salario: `S/ ${Number(c.ContratoSalario || 0).toLocaleString("es-PE", {
        minimumFractionDigits: 2,
      })}`,
      estado: (
        <Chip
          label={getEstadoTexto(c.ContratoEstado)}
          color={getEstadoColor(c.ContratoEstado)}
          size="small"
        />
      ),
    }));


  const actions = (row) => {
    const estado = row._item.ContratoEstado?.trim().toUpperCase();

    return(
    <div className="flex gap-1 justify-center">
      <Tooltip title="Ver detalle">
        <IconButton color="primary" onClick={() => {
          setSelectedContrato(row._item);
          setOpenModal(true);
        }} size="small">
          <Visibility />
        </IconButton>
      </Tooltip>

      {tienePermisosElevados && (
        <>
          <Tooltip title="Editar">
            <IconButton
              color="secondary"
              onClick={() => onEditContrato(row._item)}
              size="small"
              disabled={row._item.ContratoEstado === 'F'}
            >
              <Edit />
            </IconButton>
          </Tooltip>

          {estado === 'A' && (
            <Tooltip title="Suspender">
              <IconButton
                color="warning"
                onClick={() => {
                  const motivo = prompt("Ingrese el motivo de la suspensión:");
                  if (motivo && motivo.trim()) onSuspendContrato(row._item.ContratoCodigo, motivo.trim());
                }}
                size="small"
              >
                <Pause />
              </IconButton>
            </Tooltip>
          )}

          {estado === 'S' && (
            <Tooltip title="Reactivar">
              <IconButton
                color="success"
                onClick={() => {
                  const motivo = prompt("Ingrese el motivo de la reactivación:");
                  if (motivo && motivo.trim()) onReactivateContrato(row._item.ContratoCodigo, motivo.trim());
                }}
                size="small"
              >
                <PlayArrow />
              </IconButton>
            </Tooltip>
          )}

          {["I", "F"].includes(estado) && (
            <Tooltip title="Activar contrato">
              <IconButton
                color="success"
                onClick={() => {
                  const motivo = prompt("Ingrese el motivo de la activación:");
                  if (motivo && motivo.trim())
                    onReactivateContrato(row._item.ContratoCodigo, motivo.trim());
                }}
                size="small"
              >
                <PlayArrow />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Dar de baja">
            <IconButton
              color="error"
              onClick={() => {
                const motivo = prompt("Ingrese el motivo de la baja:");
                if (motivo && motivo.trim()) onDeleteContrato(row._item.ContratoCodigo, motivo.trim());
              }}
              size="small"
              disabled={['F', 'I'].includes(row._item.ContratoEstado)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </>
      )}
    </div>
    );
  };

  return (
    <TableGeneric
      columns={columns}
      rows={parseData()}
      actions={tienePermisosElevados ? actions : undefined}
    />
  );
};
