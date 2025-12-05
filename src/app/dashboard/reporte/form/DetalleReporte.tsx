"use client";
import React from "react";
import { Box, Typography, Paper } from "@mui/material";

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

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <Typography variant="subtitle1" color="text.secondary"><b>Código</b></Typography>
          <Typography>{data.Codigo}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary"><b>Empleado</b></Typography>
          <Typography>{data.Empleado}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary"><b>Salario Base</b></Typography>
          <Typography>S/ {data.SalarioBase}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary"><b>Horas Extras</b></Typography>
          <Typography>{data.HorasExtras}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary"><b>Monto Horas Extras</b></Typography>
          <Typography>S/ {data.MontoHorasExtras}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary"><b>Bonificación</b></Typography>
          <Typography>S/ {data.Bonificacion}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary"><b>Asignación Familiar</b></Typography>
          <Typography>S/ {data.AsignacionFamiliar}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary"><b>Total Ingresos</b></Typography>
          <Typography>S/ {data.TotalIngresos}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary"><b>Desc. Pensión</b></Typography>
          <Typography>S/ {data.DescPension}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary"><b>IR 5ta</b></Typography>
          <Typography>S/ {data.IR5ta}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary"><b>Essalud</b></Typography>
          <Typography>S/ {data.Essalud}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary"><b>Otros Desc.</b></Typography>
          <Typography>S/ {data.OtrosDesc}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary"><b>Total Descuentos</b></Typography>
          <Typography>S/ {data.TotalDescuentos}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary"><b>Sueldo Neto</b></Typography>
          <Typography sx={{ color: "green", fontWeight: "bold" }}>
            S/ {data.SueldoNeto}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
