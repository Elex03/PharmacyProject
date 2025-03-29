import { useEffect, useState } from "react";

export default function BarcodeScanner() {
  const [scanning, setScanning] = useState<boolean>(false);
  const [scannedCode, setScannedCode] = useState<string>("");
  const [buffer, setBuffer] = useState<string>("");

  useEffect(() => {
    if (!scanning) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        setScannedCode(buffer);
        console.log("Código escaneado:", buffer);
        setBuffer(""); // Reiniciar buffer después de leer
      } else {
        setBuffer((prev) => prev + event.key);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [scanning, buffer]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Escáner de Código de Barras</h1>

      <button
        onClick={() => setScanning((prev) => !prev)}
        className={`px-4 py-2 rounded-lg text-white font-semibold ${
          scanning ? "bg-red-600" : "bg-green-600"
        }`}
      >
        {scanning ? "Detener Escaneo" : "Iniciar Escaneo"}
      </button>

      <div className="bg-white shadow-md rounded-lg p-4 text-center w-80 mt-4">
        <p className="text-gray-700">Código Escaneado:</p>
        <h2 className="text-lg font-semibold text-blue-600">
          {scannedCode || "Esperando escaneo..."}
        </h2>
      </div>
    </div>
  );
}