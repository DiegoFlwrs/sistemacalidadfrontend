/* eslint-disable */
// @ts-nocheck
"use client";
import { ModalComponent } from "@/components/Modal";
import { useNomina } from "./hooks/useNomina";
import { Paper, Typography } from "@mui/material";
import { FormNomina } from "./form/formNomina";
import TableNominaDetail from "./table/TableNominaDetail";

export default function NominaPage() {
  const {
    nomina,
    openModalForm,
    setOpenModalForm,
    periodo,
    AgregarNominaServicio,
    periodoFiltro,
    setPeriodoFiltro
  } = useNomina();

  return (
    <div>
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography fontSize={20} fontWeight={600} mb={2}>
          Opciones de Nómina
        </Typography>

        <div className="flex my-3 gap-3">
          <button
            className="bg-[#3A649A] text-white px-4 py-2 rounded-lg hover:bg-[#2B4D7B] transition-colors flex items-center gap-2"
            onClick={() => {
              setOpenModalForm(true);
            }}
          >
            <span>➕</span> Procesar Nómina
          </button>
        </div>
      </Paper>

      {nomina && nomina.length === 0 ? (
        <div className="flex justify-center">
          <Typography fontSize={20} fontWeight={600} mb={3}>
            PROCESE UNA NOMINA PARA MOSTRAR LOS REGISTROS
          </Typography>
        </div>
      ) : (
        <div>
          <Typography fontSize={20} fontWeight={600} mb={3}>
            Registros procesados
          </Typography>
        <TableNominaDetail
          nomina={nomina ?? []}
        />
        </div>
      )}

      <ModalComponent
        open={openModalForm}
        setOpen={setOpenModalForm}
        width={480}
      >
        <FormNomina
          setOpenModalForm={setOpenModalForm}
          periodo={periodo}
          AgregarNominaServicio={AgregarNominaServicio}
          periodoFiltro={periodoFiltro}
          setPeriodoFiltro={setPeriodoFiltro}
        />
      </ModalComponent>
    </div>
  );
}
