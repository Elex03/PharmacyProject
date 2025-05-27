export interface InventoryItem {
  id: number;
  descripcion: string;
  stock: number | string;
  sintomas?: string[]; // <- ahora cada ítem puede tener síntomas asociados
  [key: string]: unknown;
}

export interface ProcessedInventoryItem extends InventoryItem {
  estadoStock: string;
}

export function getFilteredInventory(
  data: InventoryItem[],
  searchTerm: string,
  stockFilter: string,
  sortOrder: string,
  sintomasFiltro: string[] // <- Nuevo parámetro
): ProcessedInventoryItem[] {
  return data
    .map((item) => {
      const stock = Number(item.stock);
      const estadoStock =
        stock === 0
          ? "Agotado"
          : stock <= 10
          ? "Próximo a agotarse"
          : "Disponible";

      return {
        ...item,
        estadoStock,
      };
    })
    .filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .filter((item) => {
      const stock = Number(item.stock);
      if (!stockFilter) return true;
      if (stockFilter === "disponible" && stock > 10) return true;
      if (stockFilter === "proximo" && stock <= 10 && stock > 0) return true;
      if (stockFilter === "agotado" && stock === 0) return true;
      return false;
    })
    .filter((item) => {
      if (!sintomasFiltro.length) return true;
      if (!Array.isArray(item.sintomas)) return false;

      const sintomasItem = item.sintomas.map((s) => s.toLowerCase());
      return sintomasFiltro.some((s) => sintomasItem.includes(s.toLowerCase()));
    })
    .sort((a, b) => {
      if (sortOrder === "A-Z")
        return a.descripcion.localeCompare(b.descripcion);
      return 0;
    });
}
