/* eslint-disable */
// @ts-nocheck
"use client";

import { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";

export const FormAccionContrato = ({
  titulo,
  onConfirm,
  setOpen,
}) => {
  const [motivo, setMotivo] = useState("");

  const ejecutar = () => {
    if (!motivo.trim()) return;
    onConfirm(motivo.trim());
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 p-2 min-w-[300px]">
      <Typography variant="h6" className="font-bold">
        {titulo}
      </Typography>

      <TextField
        label="Motivo"
        value={motivo}
        multiline
        minRows={3}
        onChange={(e) => setMotivo(e.target.value)}
        fullWidth
      />

      <div className="flex justify-end gap-3 mt-4">
        <Button variant="outlined" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={ejecutar}>
          Confirmar
        </Button>
      </div>
    </div>
  );
};
