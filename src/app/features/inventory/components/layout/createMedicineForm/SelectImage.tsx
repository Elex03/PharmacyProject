import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import { useImageFromWebSocket } from "./useImageFromWebSocket";
import { MenuSelect } from "./MenuSelect";
import { Controller, useFormContext } from "react-hook-form";

const ImageUploadBox: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const { imageSrc, isWaiting, waitForImage } = useImageFromWebSocket(
    "ws://localhost:3000"
  );
  const { control } = useFormContext();

  useEffect(() => {
    if (imageSrc) {
      setPreview(imageSrc);
    }
  }, [imageSrc]);

  const handleContainerClick = () => {
    setShowOptions(true);
  };

  const handleSelectFromGallery = () => {
    setShowOptions(false);
    fileInputRef.current?.click();
  };

  const handleTakePhoto = () => {
    if (isWaiting) {
      console.log("Espera de foto cancelada");
    } else {
      waitForImage();
      console.log("Esperando foto...");
    }
  };

  const handleCancelM = () => {
    setShowOptions(false);
  };

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (value: File | string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      onChange(file); // o imageUrl si prefieres guardar una string

      const img = new Image();
      img.onload = () => {
        setShowOptions(false);
      };
      img.src = imageUrl;
    }
  };

  return (
    <Controller
      name="imagen"
      control={control}
      render={({ field: { onChange } }) => (
        <>
          <input
            id="imagen"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, onChange)}
            ref={fileInputRef}
            style={{ display: "none" }}
          />

          <div
            onClick={(e) => {
              e.stopPropagation();
              handleContainerClick();
            }}
            style={{
              height: "246px",
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
            {preview ? (
              <img
                src={preview}
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

            {showOptions && (
              <MenuSelect
                key="options-menu"
                isWaiting={isWaiting}
                onSelectFromGallery={handleSelectFromGallery}
                onTakePhoto={handleTakePhoto}
                onCancel={handleCancelM}
              />
            )}
          </div>
        </>
      )}
    />
  );
};

export default ImageUploadBox;
