import React from "react";

interface InfoQuantityDataProps {
  QuantityData: number;
}

export const InfoQuantityData: React.FC<InfoQuantityDataProps> = ({
  QuantityData,
}) => {
  return (
    <div style={{ alignSelf: "flex-start", padding: "0 10px" }}>
      <p className="label">
        Se encontraron{" "}
        <span
          className="highlight-bubble"
          style={{ backgroundColor: "#A5DDFF" }}
        >
          {QuantityData}
        </span>{" "}
        elementos
      </p>
    </div>
  );
};
