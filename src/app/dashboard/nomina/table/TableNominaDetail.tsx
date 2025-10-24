"use client";
import React from "react";
import { Chip, Tooltip, Button } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import { ESTADOS_NOMINA, MESES } from "@/utils/constanst";
import { getEstadoColor, getLabel } from "@/utils/helpers";
import { TableGeneric } from "@/components/TableComponent";
import type { Column } from "@/components/TableComponent";

interface TableNominaDetailProps {
  nomina: any[];
  setOpenModal: (open: boolean) => void;
  setSelectedNomina: (item: any) => void;
  onEditNomina: (item: any) => void;
}

export const TableNominaDetail = ({
  nomina,
  setOpenModal,
  setSelectedNomina,
  onEditNomina,
}: TableNominaDetailProps) => {
  const columns: Column[] = [
    { field: "codigo", header: "Código" },
    { field: "empleado", header: "Empleado" },
    { field: "anio", header: "Año" },
    { field: "mes", header: "Mes" },
    { field: "departamento", header: "Departamento" },
    { field: "sueldo", header: "Sueldo Neto", align: "center" },
    { field: "estado", header: "Estado" },
  ];

  const parseData = () =>
    nomina.map((item) => ({
      _item: item,
      codigo: <b>{item.NominaCodigo}</b>,
      empleado: `${item.EmpleadoApellido} ${item.EmpleadoNombre}`,
      anio: item.PeriodoAnio,
      mes: getLabel(MESES, item.PeriodoMes),
      departamento: item.DepartamentoNombre,
      sueldo: `S/ ${item.NominaSueldoNeto}`,
      estado: (
        <Chip
          label={getLabel(ESTADOS_NOMINA, item.NominaEstado)}
          color={getEstadoColor(item.NominaEstado)}
          size="medium"
        />
      ),
    }));

  return (
    <TableGeneric
      columns={columns}
      rows={parseData()}
      actions={(row) => (
        <div className="flex gap-2">
          <Tooltip title="Ver Detalle" arrow>
            <Button
              color="primary"
              variant="outlined"
              size="small"
              startIcon={<RemoveRedEyeIcon />}
              onClick={() => {
                setSelectedNomina(row._item);
                setOpenModal(true);
              }}
            >
              Ver
            </Button>
          </Tooltip>
          <Tooltip title="Editar Nómina" arrow>
            <Button
              color="warning"
              variant="outlined"
              size="small"
              startIcon={<EditIcon />}
              onClick={() => onEditNomina(row._item)}
            >
              Editar
            </Button>
          </Tooltip>
        </div>
      )}
    />
  );
};
