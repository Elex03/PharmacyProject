interface SalesItem {
  id: number;
  cliente: string;
  fechaventa: string;
  total: number;
  [key: string]: unknown;
}
  export function getFilteredSalesHistory(
    data: SalesItem[],
    searchTerm: string,
    sortOrder: string
  ): SalesItem[] {
    return data
      .filter((distributor) =>
        Object.values(distributor).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .sort((a, b) => {
        if (sortOrder === "A-Z") return a.cliente.localeCompare(b.cliente);
        return 0;
      });
  }