import { useState, useEffect, useRef } from 'react';

type WebSocketStatus = 'Conectado' | 'Desconectado';

export const useImageFromWebSocket = (url: string) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [status, setStatus] = useState<WebSocketStatus>('Desconectado');
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      setStatus('Conectado');
      console.log('Conexión WebSocket abierta');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'image' && data.data && isWaiting) {
          const imageUrl = data.data;

          if (typeof imageUrl === 'string' && imageUrl.startsWith('http')) {
            setImageSrc(imageUrl);
            setIsWaiting(false);
            console.log('Imagen recibida correctamente:', imageUrl);
          } else {
            console.error('Formato de imagen inválido:', imageUrl);
          }
        }
      } catch (err) {
        console.error('Error procesando mensaje:', err);
      }
    };

    ws.onerror = (error) => {
      console.error('Error WebSocket:', error);
    };

    ws.onclose = () => {
      setStatus('Desconectado');
      console.log('Conexión WebSocket cerrada');
    };

    return () => {
      ws.close();
    };
  }, [url, isWaiting]);

  const waitForImage = () => {
    setIsWaiting(true);
    setImageSrc(null);
  };

  return {
    imageSrc,
    isWaiting,
    status,
    waitForImage,
  };
};
