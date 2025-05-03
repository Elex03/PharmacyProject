import React from 'react';
import { useImageFromWebSocket } from '../components/forms/createMedicineForm/useImageFromWebSocket';

const WebSocketImageMenu: React.FC = () => {
  const {
    imageSrc,
    isWaiting,
    status,
    waitForImage,
  } = useImageFromWebSocket('ws://localhost:3000');

  const handleSelectFromGallery = () => {
    console.log('Seleccionar desde galería');
    // Lógica para seleccionar desde galería
  };

  const handleCapturePhoto = () => {
    waitForImage();
  };

  return (
    <div>
      <h2>Selecciona una opción</h2>
      <p>Estado WebSocket: {status}</p>

      <button onClick={handleSelectFromGallery}>
        Seleccionar desde galería
      </button>

      <button onClick={handleCapturePhoto} disabled={isWaiting}>
        {isWaiting ? 'Esperando imagen...' : 'Tomar foto'}
      </button>

      {imageSrc && (
        <div>
          <p>Imagen capturada:</p>
          <img
            src={imageSrc}
            alt="Imagen recibida"
            style={{ width: '300px', borderRadius: '8px' }}
          />
        </div>
      )}
    </div>
  );
};

export default WebSocketImageMenu;
