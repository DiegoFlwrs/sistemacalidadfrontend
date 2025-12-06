"use client";
import * as React from "react";
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow
} from "@mui/material";

interface TableReporteDetailProps {
  data: any[];
  onSelect?: (row: any) => void;
}

interface Column {
  id: string;
  label: string;
  align?: "center" | "left" | "right" | "justify" | "inherit";
  minWidth?: number;
}

type RowData = {
  [key: string]: React.ReactNode;
};

const columns: Column[] = [
  { id: "codigo", label: "Código" },
  { id: "empleado", label: "Empleado" },
  { id: "salario", label: "Salario Base" },
  { id: "horasExtras", label: "Horas Extras" },
  { id: "montoHorasExtras", label: "Monto Horas Extras" },
  { id: "bonificacion", label: "Bonificación" },
  { id: "asignacionFamiliar", label: "Asignación Familiar" },
  { id: "ingresos", label: "Total Ingresos" },
  { id: "descuentoPension", label: "Desc. Pensión" },
  { id: "descuentoIR", label: "IR 5ta" },
  { id: "essalud", label: "Essalud" },
  { id: "otrosDescuentos", label: "Otros Desc." },
  { id: "totalDescuentos", label: "Total Descuentos" },
  { id: "sueldoNeto", label: "Sueldo Neto", align: "center" },
];

function parseData(data: any[]): RowData[] {
  return data.map((item) => ({
    codigo: <b>{item.Codigo}</b>,
    empleado: item.Empleado,
    salario: `S/ ${item.SalarioBase}`,
    horasExtras: item.HorasExtras ?? 0,
    montoHorasExtras: `S/ ${item.MontoHorasExtras ?? 0}`,
    bonificacion: `S/ ${item.Bonificacion ?? 0}`,
    asignacionFamiliar: `S/ ${item.AsignacionFamiliar ?? 0}`,
    ingresos: `S/ ${item.TotalIngresos ?? 0}`,
    descuentoPension: `S/ ${item.DescPension ?? 0}`,
    descuentoIR: `S/ ${item.IR5ta ?? 0}`,
    essalud: `S/ ${item.Essalud ?? 0}`,
    otrosDescuentos: `S/ ${item.OtrosDesc ?? 0}`,
    totalDescuentos: `S/ ${item.TotalDescuentos ?? 0}`,
    sueldoNeto: <b style={{ color: "green" }}>S/ {item.SueldoNeto ?? 0}</b>,
  }));
}

export default function TableReporteDetail({ data, onSelect }: TableReporteDetailProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const rows: RowData[] = parseData(data);

  const getValidAlign = (align?: string): Column["align"] => {
    const validAligns = ["center", "left", "right", "justify", "inherit"];
    return validAligns.includes(align || "") ? (align as Column["align"]) : undefined;
  };

  return (
    <Paper sx={{ width: "100%", overflowX: "auto" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={getValidAlign(column.align)}
                  style={{
                    backgroundColor: "#3A649A",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
              <TableRow
                hover
                tabIndex={-1}
                key={idx}
                onClick={() => onSelect?.(data[idx])} // 👈 selecciona fila original
                style={{ cursor: "pointer" }}
              >
                {columns.map((column) => (
                  <TableCell key={column.id} align={getValidAlign(column.align)}>
                    {row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(+e.target.value);
          setPage(0);
        }}
      />
    </Paper>
  );
}
