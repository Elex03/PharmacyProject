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
