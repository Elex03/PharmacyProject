import './Inventory.css';

const Inventario = () => {
  return (
    <div className="inventory-page">
      <h2>Inventario</h2>
      <div className="inventory-actions">
        <input type="text" placeholder="Buscar" className="search-bar" />
        <select className="filter-dropdown">
          <option value="">Filtrar por nombre</option>
          <option value="A-Z">A - Z</option>          
        </select>
        <button className="register-button">Registrar pedido</button>
      </div>
    </div>
  );
};

export default Inventario;
