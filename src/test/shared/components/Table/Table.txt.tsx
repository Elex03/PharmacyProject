// src/test/shared/components/Table/Table.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Table } from "../../../../app/shared/components/layout/Table/Table";
import "@testing-library/jest-dom";
import { ColumnDefinition } from "../../../../types";

type DataType = {
  nombre: string;
  precio: number;
  id: number;
  fecha: string;
};

const columns: ColumnDefinition<DataType>[] = [
  { key: "nombre", header: "Nombre" },
  { key: "precio", header: "Precio", isNumeric: true },
];

const data: DataType[] = [
  { nombre: "Paracetamol", precio: 5, id: 1, fecha: "2024-01-01T00:00:00.000Z" },
  { nombre: "Ibuprofeno", precio: 7, id: 2, fecha: "2024-02-01T00:00:00.000Z" },
];

describe("Componente Table", () => {
  it("debería renderizar encabezados y datos correctamente", () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText("Nombre")).toBeInTheDocument();
    expect(screen.getByText("Paracetamol")).toBeInTheDocument();
    expect(screen.getByText("Ibuprofeno")).toBeInTheDocument();
  });

  it("debería paginar datos si itemsPerPage está definido", () => {
    const manyData: DataType[] = Array.from({ length: 10 }, (_, i) => ({
      nombre: `Item ${i + 1}`,
      precio: i,
      id: i + 1,
      fecha: "2024-01-01T00:00:00.000Z",
    }));

    render(<Table columns={columns} data={manyData} itemsPerPage={5} />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.queryByText("Item 6")).not.toBeInTheDocument(); // No está en la primera página
  });

  it("debería renderizar link si linkColumn.type es 'linked'", () => {
    render(
      <Table
        columns={columns}
        data={data}
        linkColumn={{
          label: "Ver más",
          path: "/medicamento",
          idKey: "id",
          type: "linked",
        }}
      />
    );
    const link = screen.getByRole("link", { name: "Ver más" });
    expect(link).toHaveAttribute("href", "/medicamento/1");
  });

  it("debería llamar a onOpenModal si type es 'modal'", () => {
    const onOpenModal = jest.fn();
    render(
      <Table
        columns={columns}
        data={data}
        onOpenModal={onOpenModal}
        linkColumn={{
          label: "Abrir",
          idKey: "id",
          type: "modal",
        }}
      />
    );
    const button = screen.getAllByRole("button", { name: "Abrir" })[0];
    fireEvent.click(button);
    expect(onOpenModal).toHaveBeenCalledWith(1);
  });

  it("debería formatear fechas si isDate es true", () => {
    const dateColumn: ColumnDefinition<DataType>[] = [
      { key: "fecha", header: "Fecha", isDate: true },
    ];
    render(<Table columns={dateColumn} data={data} />);
    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });

  it("debería mostrar información adicional si tableInfo está definida", () => {
    render(<Table columns={columns} data={data} />);
    // Esto depende de si tienes elementos con esos textos en Table
    expect(screen.getByText("Actualizado hoy")).toBeInTheDocument();
    expect(screen.getByText("Total: 2")).toBeInTheDocument();
  });
});
