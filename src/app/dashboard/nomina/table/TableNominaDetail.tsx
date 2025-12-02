"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface TableNominaDetailProps {
  nomina: any[];
}

interface Column {
  id: string;
  label: string;
  align?: "right" | "center" | "left";
  minWidth?: number;
}

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

type RowData = { [key: string]: React.ReactNode };

function parseData(nomina: any[]): RowData[] {
  return nomina.map((item) => ({
    codigo: <b>{item.NominaCodigo}</b>,
    empleado: item.Nombre,
    salario: `S/ ${item.ContratoSalario}`,
    horasExtras: item.NominaHorasExtras ?? 0,
    montoHorasExtras: `S/ ${item.NominaMontoHorasExtras ?? 0}`,
    bonificacion: `S/ ${item.NominaBonificacion ?? 0}`,
    asignacionFamiliar: `S/ ${item.NominaAsignacionFamiliar ?? 0}`,
    ingresos: `S/ ${item.NominaTotalIngresos ?? 0}`,
    descuentoPension: `S/ ${item.NominaDescuentoPension ?? 0}`,
    descuentoIR: `S/ ${item.NominaDescuentoIR5ta ?? 0}`,
    essalud: `S/ ${item.NominaAporteEssalud ?? 0}`,
    otrosDescuentos: `S/ ${item.NominaOtrosDescuentos ?? 0}`,
    totalDescuentos: `S/ ${item.NominaTotalDescuentos ?? 0}`,
    sueldoNeto: (
      <b style={{ color: "green" }}>S/ {item.NominaSueldoNeto ?? 0}</b>
    ),
  }));
}

export default function TableNominaDetail({
  nomina
}: TableNominaDetailProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const rows = parseData(nomina);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflowX: "auto" }}>
      <TableContainer sx={{ maxHeight: 440, width: "100%", overflowX: "auto" }}>
        <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => (
                <TableRow hover tabIndex={-1} key={idx}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
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
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}