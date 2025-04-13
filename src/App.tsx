
import { Table } from "./components/layout/Table/Table"; // Asegúrate que el path coincida

type InventoryItem = {
  name: string;
  category: string;
  price: number;
  stock: number;
  edad: number;
};

const inventoryData: InventoryItem[] = [
  { name: "Laptop", category: "Electrónica", price: 1200, stock: 5, edad: 2 },
  { name: "Monitor", category: "Electrónica", price: 300, stock: 10, edad: 1 },
  { name: "Teclado", category: "Accesorios", price: 50, stock: 15, edad: 3 },
  { name: "Mouse", category: "Accesorios", price: 25, stock: 7, edad: 4 },
  { name: "Silla", category: "Mobiliario", price: 150, stock: 3, edad: 5 },
];

const inventoryColumns: { key: keyof InventoryItem; header: string; isNumeric?: boolean }[] = [
  { key: "name", header: "Producto" },
  { key: "category", header: "Categoría" },
  { key: "price", header: "Precio", isNumeric: true },
  { key: "stock", header: "Stock", isNumeric: true },
  { key: "edad", header: "Edad", isNumeric: true },
];

export default function App() {
  return (
    <div style={{ padding: "16px" }}>
      <h1>Inventario</h1>
      <Table columns={inventoryColumns} data={inventoryData} />
    </div>
  );
}


// import AppRouter from "./routes";
// import './App.css'
// export default function App() {
//   return (
//     <div className="App">
//       <AppRouter />
//     </div>
//   );
// }


// import { ToastContainer, toast, Bounce } from "react-toastify";

// export default function App() {

//   const nombre = "Producto 1";
//   const notify = (nombre: string) =>
//     toast.info(`${nombre} proximo a agotarse`, {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: false,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//       transition: Bounce,
//     });
//   return (
//     <div>
//       <button onClick={() => notify(nombre)}>Notify!</button>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={false}
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//         transition={Bounce}
//       />
//     </div>
//   );
// }

// // App.js o donde lo necesites
// import  { useEffect, useState } from 'react';
// import CustomProgress from './components/progress/CustomProgress'; // Asegúrate de que la ruta esté bien

// function App() {
//   const [value, setValue] = useState(0);

//   // Simulamos carga progresiva
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setValue((prev) => {
//         if (prev >= 200) {
//           clearInterval(interval);
//           return 200;
//         }
//         return prev + 10;
//       });
//     }, 500); // cada medio segundo aumenta

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div style={{ marginTop: '100px', textAlign: 'center' }}>
//       <h2>Cargando datos...</h2>
//       <CustomProgress value={value} />
//     </div>
//   );
// }

// export default App;
