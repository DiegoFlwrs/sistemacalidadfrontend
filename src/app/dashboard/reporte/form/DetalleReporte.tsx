// reporte/form/DetalleReporte.tsx
"use client";
import React from "react";
import { Box, Typography, Paper, Chip } from "@mui/material";
import { ESTADOS_NOMINA, MESES } from "@/utils/constanst";
import { getLabel, getEstadoColor, formatDateTime } from "@/utils/helpers";

interface DetalleReporteProps {
  data?: any;
}

export const DetalleReporte = ({ data }: DetalleReporteProps) => {
  if (!data) {
    return (
      <Typography variant="body1" color="text.secondary" textAlign="center">
        No hay datos seleccionados.
      </Typography>
    );
  }

  return (
    <Paper elevation={8} sx={{ p: 4, borderRadius: 4, maxWidth: 550, margin: "0 auto" }}>
      <Typography variant="h5" fontWeight={700} mb={3} textAlign="center">
        Detalle de Reporte
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="subtitle1" color="text.secondary"><b>Código</b></Typography>
          <Typography>{data.NominaCodigo}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" color="text.secondary"><b>Empleado</b></Typography>
          <Typography>{data.EmpleadoApellido} {data.EmpleadoNombre}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" color="text.secondary"><b>Departamento</b></Typography>
          <Typography>{data.DepartamentoNombre}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" color="text.secondary"><b>Cargo</b></Typography>
          <Typography>{data.CargoNombre}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Typography variant="body1" color="text.secondary" fontWeight={500}>
          Estado:  
          <Chip label={getLabel(ESTADOS_NOMINA, data.NominaEstado)} color={getEstadoColor(data.NominaEstado)} />
        </Typography>
        <Typography variant="body1" color="text.secondary" fontWeight={500}>
          <b>Periodo:</b> {getLabel(MESES, data.PeriodoMes)} {data.PeriodoAnio}
        </Typography>
      </Box>

      <Typography variant="body2" display="block" mt={1.5} textAlign="right" color="text.secondary">
        <b>Procesado:</b> {formatDateTime(data.NominaFechaProcesamiento)}
      </Typography>
    </Paper>
  );
};
