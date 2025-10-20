/* eslint-disable */
// @ts-nocheck
"use client";
import React, { ReactElement } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";

interface Column {
  field: string;
  header: string;
  align?: "left" | "right" | "center";
}

interface TableGenericProps {
  columns: Column[];
  rows: any[];
  expandable?: boolean;
  actions?: (row: any) => ReactElement;
}

export const TableGeneric = ({
  columns,
  rows,
  expandable = false,
  actions,
}: TableGenericProps) => {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.field} align={col.align || "left"}>
                  <b>{col.header}</b>
                </TableCell>
              ))}
              {actions && (
                <TableCell align="center">
                  <b>Acciones</b>
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow
                  key={index}
                  hover
                  sx={{
                    "&:hover": { backgroundColor: "#f9fafb" },
                    transition: "0.2s",
                  }}
                >
                  {columns.map((col) => (
                    <TableCell key={col.field} align={col.align || "left"}>
                      {row[col.field] ?? "-"}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell align="center">{actions(row)}</TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0)}
                  align="center"
                >
                  No hay datos disponibles
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
