"use client";
import { ModalComponent } from "@/components/Modal";
import { toast } from "react-toastify";
import { FormNomina } from "./form/formNomina";
import { useNomina } from "./hooks/useNomina";

export default function NominaPage() {

  const { 
    openModal, 
    setOpenModal,
    prueba
  } = useNomina();

  return (
    <div className="pb-6">
      <div className="bg-white pb-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4 text-blue-600">Procesar Nómina por periodo</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Seleccionar periodo</label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
              <option>Marzo 2024</option>
              <option>Abril 2024</option>
              <option>Mayo 2024</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de pago</label>
            <input 
              type="date" 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
          onClick={() => {toast.success("Todos los campos son obligatorios");}}>
            toast bien
          </button>
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
          onClick={() => {toast.warning("Todos los campos son obligatorios");}}>
            toast warning
          </button>
        <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
        onClick={() => {toast.error("Todos los campos son obligatorios");}}>
          toast error
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
        onClick={() => {toast.info("Todos los campos son obligatorios");}}>
          toast info
        </button>
        <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
        onClick={() => setOpenModal(true)}>
          Abrir modal
        </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-purple-600">Lista de Empleados</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">usuario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">nombre del módulo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">correo electrónico</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">descripción</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prueba?.map((e, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{e.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{e.module_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{e.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{e.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">Editar</button>
                    <button className="text-gray-600 hover:text-gray-800">Ver detalles</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalComponent open={openModal} setOpen={setOpenModal} width={520}>
          <FormNomina />
        </ModalComponent>
    </div>
  );
}