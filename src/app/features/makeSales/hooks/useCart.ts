import { create } from "zustand";

type Product = {
  id: number;
  name: string;
  stock: number;
  price: number;
};

type createCart = {
  items: Product[];
  add: (product: Product) => void;
  empty: () => void;
  deleteItem: (id: number) => void;
};

export const useCart = create<createCart>((set) => ({
  items: [],
  add: (producto) => set((state) => ({ items: [...state.items, producto] })),
  empty: () => set({ items: [] }),
  deleteItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
}));
