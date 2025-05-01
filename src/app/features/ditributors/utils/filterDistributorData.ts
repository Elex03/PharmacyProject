
interface DistributorItem {
    id: number;
    nombre: string;
    empresa: string;
    telefono: string;
    ultimoPedido: string;
    [key: string]: unknown; 
  }
  
  export function getFilteredDistributors(
    data: DistributorItem[],
    searchTerm: string,
    sortOrder: string
  ): DistributorItem[] {
    return data
      .filter((distributor) =>
        Object.values(distributor).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .sort((a, b) => {
        if (sortOrder === "A-Z") return a.nombre.localeCompare(b.nombre);
        return 0;
      });
  }