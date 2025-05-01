export interface InventoryItem {
    id: string;
    descripcion: string;
    stock: number | string;
    [key: string]: unknown; // para permitir propiedades adicionales
  }
  
  export interface ProcessedInventoryItem extends InventoryItem {
    estadoStock: string;
  }
  
  export function getFilteredInventory(
    data: InventoryItem[],
    searchTerm: string,
    stockFilter: string,
    sortOrder: string
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
      .sort((a, b) => {
        if (sortOrder === "A-Z")
          return a.descripcion.localeCompare(b.descripcion);
        return 0;
      });
  }
  