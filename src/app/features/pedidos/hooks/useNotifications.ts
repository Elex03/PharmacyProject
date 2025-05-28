// src/hooks/useNotifications.ts

import { useEffect, useState } from "react";

export interface Notificacion {
  nombre: string;
  stock: number;
  tipoAviso: "stock" | "vencimiento" | "pedido";
  fechaProgramada: string;
  fechaVencimiento: string;
  img: string;
  leido?: boolean;
}

const STORAGE_KEY = "notificaciones";

export const useNotifications = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);

  const cargarNotificaciones = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      setNotificaciones(JSON.parse(data));
    }
  };

  const guardarNotificaciones = (nuevas: Notificacion[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevas));
    setNotificaciones(nuevas);
  };

  const marcarComoLeida = (index: number) => {
    const actualizadas = [...notificaciones];
    actualizadas.splice(index, 1); 
    guardarNotificaciones(actualizadas);
  };

  const marcarTodasComoLeidas = () => {
    localStorage.removeItem(STORAGE_KEY);
    setNotificaciones([]);
  };

  useEffect(() => {
    cargarNotificaciones();
  }, []);

  return {
    notificaciones,
    guardarNotificaciones,
    marcarComoLeida,
    marcarTodasComoLeidas,
  };
};
