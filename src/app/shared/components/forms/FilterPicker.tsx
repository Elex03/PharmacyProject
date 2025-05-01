import React, { useState } from "react";
import Select, { MultiValue } from "react-select";

// Definir el tipo de las opciones
type OptionType = {
  value: string;
  label: string;
};

// Datos de ejemplo
const data = [
  { id: 1, name: "Evento A", date: "2023-05-12" },
  { id: 2, name: "Evento B", date: "2023-06-25" },
  { id: 3, name: "Evento C", date: "2022-08-30" },
  { id: 4, name: "Evento D", date: "2023-05-15" },
  { id: 5, name: "Evento E", date: "2024-01-10" },
  { id: 6, name: "Evento F", date: "2024-01-20" },
  { id: 7, name: "Evento G", date: "2024-02-05" },
];

const CascadingDateFilter = () => {
  // Estado para los filtros seleccionados
  const [selectedFilters, setSelectedFilters] = useState<
    MultiValue<OptionType>
  >([]);

  // Obtener las opciones para el año
  const getYearOptions = (): OptionType[] => {
    const options: OptionType[] = [];
    data.forEach(({ date }) => {
      const [year] = date.split("-");
      if (!options.some((opt) => opt.value === year)) {
        options.push({ value: year, label: year });
      }
    });
    return options.sort((a, b) => a.value.localeCompare(b.value));
  };

  // Obtener las opciones para el mes basado en el año seleccionado
  const getMonthOptions = (): OptionType[] => {
    const options: OptionType[] = [];
    data.forEach(({ date }) => {
      const [year, month] = date.split("-");
      if (
        selectedFilters.some((filter) => filter.value === year) &&
        !options.some((opt) => opt.value === month)
      ) {
        options.push({ value: month, label: `${month}` });
      }
    });
    return options.sort((a, b) => a.value.localeCompare(b.value));
  };

  // Obtener las opciones para el día basado en el año y mes seleccionados
  const getDayOptions = (): OptionType[] => {
    const options: OptionType[] = [];
    data.forEach(({ date }) => {
      const [year, month, day] = date.split("-");
      if (
        selectedFilters.some((filter) => filter.value === year) &&
        selectedFilters.some((filter) => filter.value === month) &&
        !options.some((opt) => opt.value === day)
      ) {
        options.push({ value: day, label: `${day}` });
      }
    });
    return options.sort((a, b) => a.value.localeCompare(b.value));
  };

  // Filtrar los datos según los filtros aplicados
  const filteredData =
    selectedFilters.length === 0
      ? data // Si no hay filtros, mostrar toda la data
      : data.filter(({ date }) => {
          const [year, month, day] = date.split("-");

          // Extraer valores seleccionados
          const selectedYears = selectedFilters
            .filter((filter) =>
              getYearOptions().some((opt) => opt.value === filter.value)
            )
            .map((f) => f.value);

          const selectedMonths = selectedFilters
            .filter((filter) =>
              getMonthOptions().some((opt) => opt.value === filter.value)
            )
            .map((f) => f.value);

          const selectedDays = selectedFilters
            .filter((filter) =>
              getDayOptions().some((opt) => opt.value === filter.value)
            )
            .map((f) => f.value);

          const isYearMatch = selectedYears.includes(year);
          const isMonthMatch = selectedMonths.includes(month);
          const isDayMatch = selectedDays.includes(day);

          // Si solo hay año seleccionado, mostrar todo ese año
          if (
            isYearMatch &&
            selectedMonths.length === 0 &&
            selectedDays.length === 0
          ) {
            return true;
          }

          // Si hay año y mes, pero no día, mostrar todo el mes
          if (isYearMatch && isMonthMatch && selectedDays.length === 0) {
            return true;
          }

          // Aplicar filtrado completo si hay año, mes y día seleccionados
          return isYearMatch && isMonthMatch && isDayMatch;
        });

  // Tipo para manejar los cambios en el select
  const handleChange = (selectedOptions: MultiValue<OptionType>) => {
    setSelectedFilters(selectedOptions);
  };

  // Unir todas las opciones posibles
  const combinedOptions = [
    ...getYearOptions(),
    ...getMonthOptions(),
    ...getDayOptions(),
  ];

  return (
    <div>
      <h2>Filtro de Fechas en Cascada (Usando un solo Select)</h2>

      {/* Select con multi-selección para Año, Mes y Día */}
      <Select
        isMulti
        options={combinedOptions}
        onChange={handleChange}
        value={selectedFilters}
        placeholder="Selecciona Año, Mes o Día"
      />

      {/* Mostrar la tabla con los datos filtrados */}
      <table border={1} style={{ marginTop: "10px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(({ id, name, date }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CascadingDateFilter;
