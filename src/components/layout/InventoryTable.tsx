import data from "../../data/data.json";
import "./InventoryTable.css";

const InventoryTable = () => {
  return (
    <div className="inventory-container">    
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Estado de stock</th>
            <th>Inventario</th>
            <th>Distribuidor</th>
            <th>Fecha de vencimiento</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.descripcion}</td>
              <td>
                {item.stock}
              </td>
              <td>{item.inventario}</td>
              <td>{item.distribuidor}</td>
              <td>{item.vencimiento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
