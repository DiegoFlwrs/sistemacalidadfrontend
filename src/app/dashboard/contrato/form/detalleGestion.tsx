"use client";
import React from "react";
import { Box, Typography, Paper, Chip } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { getEstadoColor } from "@/utils/helpers";
import { TipoContrato } from '../hooks/useGestion';

interface DetalleContratoProps {
  data?: any;
  getEstadoTexto: (estado: string) => string;
}

export const DetalleContratoLaboral = ({
  data,
  getEstadoTexto,
}: DetalleContratoProps) => {
  if (!data) {
    return (
      <Typography variant="body1" color="text.secondary" textAlign="center">
        No hay datos seleccionados.
      </Typography>
    );
  }
  return (
    <Paper
      elevation={8}
      sx={{
        p: 4,
        borderRadius: 4,
        maxWidth: 550,
        margin: "0 auto",
        background: "#fafafa",
        boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
      }}
    >
      <Typography variant="h5" fontWeight={700} mb={3} mt={-3} textAlign="center">
        Detalle del Contrato Laboral
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="subtitle1" color="text.secondary">
            <b>Código del Contrato</b>
          </Typography>
          <Typography fontSize={15}>{data.ContratoCodigo}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary">
            <b>Empleado</b>
          </Typography>
          <Typography fontSize={15}>
            {data.EmpleadoNombre ? data.EmpleadoNombre : "No encontrado"}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary">
            <b>Tipo de Contrato</b>
          </Typography>
          <Typography fontSize={15}>
            {data.TipoContratoDescripcion ? data.TipoContratoDescripcion : "No especificado"}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary">
            <b>Modalidad</b>
          </Typography>
          <Typography fontSize={15}>
            {data.ModalidadDescripcion ? data.ModalidadDescripcion : "No especificado"}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary">
            <b>Jornada</b>
          </Typography>
          <Typography fontSize={15}>
            {data.JornadaDescripcion ? data.JornadaDescripcion : "No especificado"}
          </Typography>
        </Box>
      </Box>

      {/* Datos económicos */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box
          sx={{
            flex: "1 1 45%",
            p: 2,
            borderRadius: 3,
            backgroundColor: "#e3f2fd",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <MonetizationOnIcon fontSize="medium" color="primary" />
          <Typography fontSize={15}>Salario: S/ {data.ContratoSalario}</Typography>
        </Box>

        <Box
          sx={{
            flex: "1 1 45%",
            p: 2,
            borderRadius: 3,
            backgroundColor: "#fffde7",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <MonetizationOnIcon fontSize="medium" color="warning" />
          <Typography fontSize={15}>Bonificación: S/ {data.ContratoBonificacion}</Typography>
        </Box>

        <Box
          sx={{
            flex: "1 1 45%",
            p: 2,
            borderRadius: 3,
            backgroundColor: "#ffebee",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <MonetizationOnIcon fontSize="medium" color="error" />
          <Typography fontSize={15}>Descuentos: S/ {data.ContratoDescuento}</Typography>
        </Box>
      </Box>

      {/* Estado y Fechas */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography
          component="span"
          variant="body1"
          color="text.secondary"
          fontWeight={500}
        >
          <b>Estado:</b>{" "}
          <Chip
            label={getEstadoTexto(data.ContratoEstado)}
            color={getEstadoColor(data.ContratoEstado)}
            size="medium"
          />
        </Typography>

        <Typography variant="body1" color="text.secondary" fontWeight={500}>
          <b>Inicio:</b> {data.ContratoFechaInicio}
        </Typography>

        <Typography variant="body1" color="text.secondary" fontWeight={500}>
          <b>Fin:</b> {data.ContratoFechaFin}
        </Typography>
      </Box>
    </Paper>
  );
};
