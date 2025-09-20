import { postPruebaService, PruebaResponse } from '@/core/services/pruebaServices';
import React, { useEffect, useState } from 'react'

export const useNomina = () => {

    const [openModal, setOpenModal] = useState(false);

    const [prueba, setPrueba] = useState<PruebaResponse[] | undefined>([]);

    useEffect(() => {
        const consumirServicio = async () => {
            const response = await postPruebaService(2);
            setPrueba(response?.data);
        }
        consumirServicio();
    }, []);

  return {
    openModal,
    setOpenModal,
    prueba
  }
}
