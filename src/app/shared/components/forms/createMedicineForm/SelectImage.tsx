import React, { useRef, useState, ChangeEvent } from "react";

const ImageUploadBox: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

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
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          backgroundColor: "#fff",
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
      </div>
      </>
  );
};

export default ImageUploadBox;
