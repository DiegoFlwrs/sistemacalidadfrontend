import { AnioData, DepartamentoData, getAniosService, getDepartamentosService, getMesService, MesData, NominaData, NominaResponse, postListaNominaService } from '@/core/services/nomiaService';
import { useEffect, useState } from 'react'

export const useNomina = () => {
  const [openModal, setOpenModal] = useState(false);

  const [nomina, setNomina] = useState<NominaData[] | null>(null);

  const consumirServicio = async () => {
      try {
        const response = await postListaNominaService({
          periodoAnio: null,
          periodoMes: null,
          nominaEstado: null,
          empleadoNombre: null,
          empleadoApellido: null,
          departamentoCodigo: null,
          pageNumber: 1,
          pageSize: 10
        });

        if (response?.data) {
          setNomina(response.data); 
        } else {
          console.error('Error: No se recibió data en la respuesta');
        }
      } catch (error) {
        console.error('Error al consumir el servicio:', error);
      }
    };

    const [anios, setAnios] = useState<AnioData[]>([]);

    const obtenerAnios = async () => {
      try {
        const response = await getAniosService();
        if (response?.data) {
          setAnios(response.data);
        } else {
          console.error('Error: No se recibió data en la respuesta');
        }
      } catch (error) {
        console.error('Error al consumir el servicio:', error);
      }
    };

    const [meses, setMeses] = useState<MesData[]>([]);

    const obtenerMeses = async () => {
      try {
        const response = await getMesService();
        if (response?.data) {
          setMeses(response.data);
        } else {
          console.error('Error: No se recibió data en la respuesta');
        }
      } catch (error) {
        console.error('Error al consumir el servicio:', error);
      }
    };

    const [departamentos, setDepartamentos] = useState<DepartamentoData[]>([]);

    const obtenerDepartamentos = async () => {
      try {
        const response = await getDepartamentosService();
        if (response?.data) {
          setDepartamentos(response.data);
        } else {
          console.error('Error: No se recibió data en la respuesta');
        }
      } catch (error) {
        console.error('Error al consumir el servicio:', error);
      }
    };

  useEffect(() => {
    consumirServicio();
    obtenerAnios();
    obtenerMeses();
    obtenerDepartamentos();
  }, []); 

  return {
    openModal,
    setOpenModal,
    nomina,
    anios,
    meses,
    departamentos
  }
}
