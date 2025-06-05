// exportDocuments.test.tsx
import { exportToExcel } from "../../../../app/shared/components/exportDocuments/exports/exportToExcel";
import { saveAs } from "file-saver";

jest.mock("file-saver", () => ({
  saveAs: jest.fn(),
}));

describe("exportToExcel", () => {
  it("debería llamar a saveAs con un Blob y nombre de archivo correcto", async () => {
    const headers = [
      { key: "nombre", header: "Nombre" },
      { key: "cantidad", header: "Cantidad" },
    ];
    const data = [
      { nombre: "Paracetamol", cantidad: 10 },
      { nombre: "Ibuprofeno", cantidad: 20 },
    ];

    await exportToExcel(headers, data, "Medicamentos.xlsx");

    expect(saveAs).toHaveBeenCalledTimes(1);

    const [blobArg, filenameArg] = (saveAs as unknown as jest.Mock).mock.calls[0];

    expect(blobArg instanceof Blob).toBe(true);
    expect(filenameArg).toBe("Medicamentos.xlsx");
  });
});
