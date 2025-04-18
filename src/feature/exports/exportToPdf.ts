import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.vfs;

type HeaderItem = {
  key: string;
  header: string;
};

export const exportToPDF = (
    headers: HeaderItem[],
    data: Record<string, unknown>[],
    filename: string = "Exportacion.pdf",
    titleInfo: string[][] = []
  ) => {
    const headerLabels: string[] = headers.map((h) => h.header);
    const body: (string | number | boolean | null)[][] = [headerLabels];
  
    data.forEach((item) => {
      const row = headers.map((h) => {
        const value = item[h.key];
        return typeof value === "string" || typeof value === "number" || typeof value === "boolean"
          ? value
          : value?.toString() ?? "";
      });
      body.push(row);
    });
  
    const docDefinition: pdfMake.TDocumentDefinition = {
      pageOrientation: "landscape", // 🧭 orientación horizontal
      pageMargins: [20, 40, 20, 40], // 🧱 espacio en los bordes
      content: [],
      styles: {
        title: {
          fontSize: 14,
          bold: true,
          alignment: "center",
          margin: [0, 2, 0, 2],
        },
      },
    };
  
    // Títulos
    if (titleInfo.length > 0) {
      titleInfo.forEach((row) => {
        docDefinition.content.push({
          text: row.join(" "),
          style: "title",
        });
      });
      docDefinition.content.push({ text: "\n" });
    }
  
    // Tabla ajustada
    docDefinition.content.push({
      table: {
        headerRows: 1,
        widths: headers.map(() => "*"), // 🔄 ancho automático
        body: body,
      },
      layout: {
        fillColor: (rowIndex: number) => (rowIndex === 0 ? "#ADD8E6" : undefined),
        hLineWidth: () => 0.5,
        vLineWidth: () => 0.5,
        hLineColor: () => "#000000",
        vLineColor: () => "#000000",
      },
    });
  
    pdfMake.createPdf(docDefinition).download(filename);
  };

// export const ExportPdfOption: React.FC<ExportOptionProps> = ({
//   headers,
//   data,
//   filename = "Exportacion.pdf",
//   titleInfo = [],
// }) => {
//   return (
//     <button className="export-button" onClick={() => exportToPDF(headers, data, filename, titleInfo)}>
//       {/* Icono PDF (rojo) */}
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         style={{ fill: "#e74c3c" }}
//       >
//         <path d="M19 2H8c-1.1 0-2 .9-2 2v4H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h6v-2H5V10h14v4h2V8c0-1.1-.9-2-2-2h-1V4c0-1.1-.9-2-2-2zm0 6h-2V4h2v4zM15 20v-4h-2v6h6v-2h-4z" />
//       </svg>
//     </button>
//   );
// };
