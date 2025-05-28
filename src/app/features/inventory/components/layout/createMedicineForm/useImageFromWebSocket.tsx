import { useState, useEffect, useRef } from "react";

type WebSocketStatus = "Conectado" | "Desconectado";

export const useImageFromWebSocket = (url: string) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [status, setStatus] = useState<WebSocketStatus>("Desconectado");
  const socketRef = useRef<WebSocket | null>(null);
  const isWaitingRef = useRef(false);

  useEffect(() => {
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      setStatus("Conectado");
    };

    ws.onmessage = (event) => {
      console.log("Mensaje recibido:", event.data);
      try {
        const data = JSON.parse(event.data);

        if (data.type === "image" && data.data && isWaitingRef.current) {
          const imageUrl = data.data;

          if (typeof imageUrl === "string" && imageUrl.startsWith("http")) {
            setImageSrc(imageUrl);
            setIsWaiting(false);
            isWaitingRef.current = false; // detener espera
          } else {
            console.error("Formato de imagen inválido:", imageUrl);
          }
        }
      } catch (err) {
        console.error("Error procesando mensaje:", err);
      }
    };

    ws.onerror = (error) => {
      console.error("Error WebSocket:", error);
    };

    ws.onclose = () => {
      setStatus("Desconectado");
    };

    return () => {
      ws.close();
    };
  }, [url]); // ✅ Solo se conecta/desconecta con el URL

  const waitForImage = () => {
    setIsWaiting(true);
    isWaitingRef.current = true;
    setImageSrc(null);
  };

  const cancelWait = () => {
    setIsWaiting(false);
    isWaitingRef.current = false;
  };

  return {
    imageSrc,
    isWaiting,
    status,
    waitForImage,
    cancelWait,
  };
};
