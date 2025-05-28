interface Option {
  id: number;
  label: string;
  value: string;
  disabled?: boolean;
}

interface Option_Selector {
  id: string;
  value: string;
  label: string;
}

interface Medication {
  key: number;
  tipo: string;
  subtipo: string;
  cantidad: string | number | undefined;
}

export type ColumnDefinition<T> = {
  key: keyof T;
  header: string;
  isNumeric?: boolean;
  isDate?: boolean;
};

export interface InventoryItem {
  id: number;
  descripcion: string;
  stock: string;
  inventario: number;
  distribuidor: string;
  vencimiento: string;
  nombreComercial: string;
  nombreGenerico: string;
  formaFarmaceutica: string;
  concentracion: string;
  presentacion: string;
  laboratorio: string;
  precioCompra: number;
  precioVenta: string;
  margenUtilidad: number;
}

export interface FullMedicineData {
  nombre: string;
  codigo: string;
  accioTera: number[];
  presentacion: number;
  via: string;
  fabricante: number;
  imagen?: File;
  sintomas: string[];
  requierePrescripcion: boolean;
  precioCompra: number;
  precioVenta: number;
  minStock: number;
  maxStock: number;
}


declare global {
  interface Window {
    __isTourOpen?: boolean;
  }
}