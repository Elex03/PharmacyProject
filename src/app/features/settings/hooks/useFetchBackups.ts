import { useEffect, useState } from "react";
import { getBackups } from "../../../shared/api/services/General";
import type { ColumnDefinition } from "../../../../types";

export interface backUpI extends Record<string, unknown> {
  nombre: string;
  fechaCreacion: string;
  horaCreacion: string;
  usuario: string;
}

export const useFetchBackups = () => {
  const [headers, setHeaders] = useState<ColumnDefinition<backUpI>[]>([]);
  const [backups, setBackups] = useState<backUpI[]>([]);

  useEffect(() => {
    getBackups()
      .then((res) => {
        console.log(res);
        const { headers: hdrs, data } = res;
        setBackups(data);
        const mappedHeaders = hdrs.map(
          (h: { key: string; header: string }) => ({
            key: h.key as keyof backUpI,
            header: h.header,
          })
        );
        setHeaders(mappedHeaders);
      })
      .catch((err) => console.log(err));
  }, []);

  return {
    backups,
    headers,
  };
};
