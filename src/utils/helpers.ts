export function getLabel(constante: any[], value: any) {
  const estado = constante.find((e) => e.value === value);
  return estado ? estado.label : "DESCONOCIDO";
}

export function getEstadoColor(
  estado: string
): "success" | "warning" | "error" | "default" {
  switch (estado) {
    case "A": // Aprobado
      return "success";
    case "P": // Pendiente
      return "warning";
    case "C": // Cancelado
      return "error";
    default:
      return "default";
  }
}

export function formatDateTime(isoString: string) {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
