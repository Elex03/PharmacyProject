import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import { useImageFromWebSocket } from "./useImageFromWebSocket";
import { MenuSelect } from "./MenuSelect";
import { AnimatePresence } from "framer-motion";

const ImageUploadBox: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showOptions, setShowOptions] = useState(false);

  const {
    imageSrc,
    isWaiting,
    // status,
    waitForImage,
  } = useImageFromWebSocket("ws://localhost:3000");

  const handleContainerClick = () => {
    setShowOptions(true);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setShowOptions(false);
    }
  };

  const handleSelectFromGallery = () => {
    setShowOptions(false);
    fileInputRef.current?.click();
  };

  const handleTakePhoto = () => {
    setShowOptions(false);
    if (isWaiting) {
      console.log("Espera de foto cancelada");
    } else {
      waitForImage();
      console.log("Esperando foto...");
    }
  };

  const handleCancel = () => {
    setShowOptions(false);
  };

  useEffect(() => {
    if (imageSrc) {
      setImage(imageSrc);
    }
  }, [imageSrc]);

  return (
    <>
      <input
        id="imagen"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />

      <div
        onClick={handleContainerClick}
        style={{
          height: "300px",
          border: "1px solid #5c5c5c",
          borderRadius: "8px",
          cursor: isWaiting ? "default" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          backgroundColor: "#fff",
          position: "relative",
        }}
      >
        {image ? (
          <img
            src={image}
            alt="Vista previa"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        ) : (
          <span style={{ fontSize: "14px", color: "#555" }}>
            Haz clic para seleccionar
          </span>
        )}

        <AnimatePresence>
          {showOptions && (
            <MenuSelect
              key="options-menu"
              isWaiting={isWaiting}
              onSelectFromGallery={handleSelectFromGallery}
              onTakePhoto={handleTakePhoto}
              onCancel={handleCancel}
            />
          )}
        </AnimatePresence>
      </div>

      {/* <p style={{ fontSize: "12px", color: "#999", marginTop: "4px" }}>
        Estado WebSocket: {status}
      </p> */}
    </>
  );
};

export default ImageUploadBox;
