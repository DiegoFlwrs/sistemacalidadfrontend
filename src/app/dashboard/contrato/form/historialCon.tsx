/* eslint-disable */
// @ts-nocheck
import { ModalComponent } from "@/components/Modal";
import { Alert, Paper, Typography } from "@mui/material";

export const HistorialContratoModal = ({
  open,
  setOpen,
  historialContrato
}) => {
  return (
    <ModalComponent open={open} setOpen={setOpen} width={500}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Historial de contratos
      </Typography>

      {historialContrato.length === 0 ? (
        <Alert severity="info">No hay historial disponible.</Alert>
      ) : (
        <div
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            paddingRight: "4px"
          }}
        >
          {historialContrato.map((item) => (
            <Paper key={item.HistorialCodigo} sx={{ p: 2 }}>
              <Typography><b>Código contrato:</b> {item.ContratoCodigo}</Typography>
              <Typography><b>Detalle:</b> {item.Detalle}</Typography>
              <Typography><b>Motivo:</b> {item.Motivo}</Typography>
              <Typography><b>Fecha:</b> {item.HistorialFechaF}</Typography>
            </Paper>
          ))}
        </div>
      )}
    </ModalComponent>
  );
};
