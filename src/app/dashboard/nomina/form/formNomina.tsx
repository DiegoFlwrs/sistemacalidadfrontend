"use client";
import React from "react";
import { Box, Typography, Paper, Chip } from "@mui/material";
import { ESTADOS_NOMINA, MESES } from "@/utils/constanst";
import { getLabel, getEstadoColor, formatDateTime } from "@/utils/helpers";
import PaidIcon from "@mui/icons-material/Paid";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";

interface FormNominaProps {
  data?: any;
}

export const FormNomina = ({ data }: FormNominaProps) => {
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
      {/* Header */}
      <Typography variant="h5" fontWeight={700} mb={3} mt={-5} textAlign="center">
        Detalle de Nómina
      </Typography>

      {/* Información básica */}
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
            <b>Código</b>
          </Typography>
          <Typography fontWeight={15} fontSize={16}>
            {data.NominaCodigo}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary">
            <b>Empleado</b>
          </Typography>
          <Typography fontWeight={15} fontSize={16}>
            {data.EmpleadoApellido} {data.EmpleadoNombre}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary">
            <b>Departamento</b>
          </Typography>
          <Typography fontSize={15}>{data.DepartamentoNombre}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary">
            <b>Cargo</b>
          </Typography>
          <Typography fontSize={15}>{data.CargoNombre}</Typography>
        </Box>
      </Box>

      {/* Resumen financiero */}
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
          <PaidIcon fontSize="medium" color="primary" />
          <Typography fontSize={15}>Salario: S/ {data.ContratoSalario}</Typography>
        </Box>

        <Box
          sx={{
            flex: "1 1 45%",
            p: 2,
            borderRadius: 3,
            backgroundColor: "#e8f5e9",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <AccountBalanceWalletIcon fontSize="medium" color="success" />
          <Typography fontSize={15}>
            Extras: S/ {data.NominaHorasExtras}
          </Typography>
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
          <PaidIcon fontSize="medium" color="warning" />
          <Typography fontSize={15}>
            Bonificación: S/ {data.NominaBonificacion}
          </Typography>
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
          <MoneyOffIcon fontSize="medium" color="error" />
          <Typography fontSize={15}>
            Descuentos: S/ {data.NominaDescuentos}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: "1 1 100%",
            p: 2,
            borderRadius: 3,
            backgroundColor: "#e8f5e9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "2px solid #2e7d32",
          }}
        >
          <Typography fontWeight={700} fontSize={16}>
            Sueldo Neto
          </Typography>
          <Typography fontWeight={700} fontSize={16} color="#2e7d32">
            S/ {data.NominaSueldoNeto}
          </Typography>
        </Box>
      </Box>

      {/* Estado y periodo */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography variant="body1" color="text.secondary" fontWeight={500}>
          <span className="mr-2 font-bold">
          Estado:  
          </span> 
          <Chip
            label={getLabel(ESTADOS_NOMINA, data.NominaEstado)}
            color={getEstadoColor(data.NominaEstado)}
            size="medium"
          />
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
