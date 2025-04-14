

// const inventoryData: InventoryItem[] = [
//   { name: "Laptop", category: "Electrónica", price: 1200, stock: 5, edad: 2 },
//   { name: "Monitor", category: "Electrónica", price: 300, stock: 10, edad: 1 },
//   { name: "Teclado", category: "Accesorios", price: 50, stock: 15, edad: 3 },
//   { name: "Mouse", category: "Accesorios", price: 25, stock: 7, edad: 4 },
//   { name: "Silla", category: "Mobiliario", price: 150, stock: 3, edad: 5 },
//   { name: "Silla", category: "Mobiliario", price: 150, stock: 3, edad: 5 },
//   { name: "Silla", category: "Mobiliario", price: 150, stock: 3, edad: 5 },
//   { name: "Silla", category: "Mobiliario", price: 150, stock: 3, edad: 5 },
//   { name: "Silla", category: "Mobiliario", price: 150, stock: 3, edad: 5 },
//   { name: "Silla", category: "Mobiliario", price: 150, stock: 3, edad: 5 },
// ];

// const inventoryColumns: { key: keyof InventoryItem; header: string; isNumeric?: boolean }[] = [
  //   { key: "name", header: "Producto" },
//   { key: "category", header: "Categoría" },
//   { key: "price", header: "Precio", isNumeric: true },
//   { key: "stock", header: "Stock", isNumeric: true },
//   { key: "edad", header: "Edad", isNumeric: true },
// ];

// import { useEffect, useState } from "react";
// import { Table } from "./components/layout/Table/Table";
// import PharmacyApi from "./api/PharmacyApi";
// import type {ColumnDefinition} from './types.d.ts';


// type InventoryItem = {
//   descripcion: string;
//   stock: number;
//   distribuidor: string;
//   fechaVencimiento: string;
// };


// export default function App() {
//   const [headers, setHeaders] = useState<ColumnDefinition<InventoryItem>[]>([]);
//   const [data, setData] = useState<InventoryItem[]>([]);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const dataP = await PharmacyApi.get("/inventory/getInventoryData").then(
//           (response) => {
//             if (!response) throw new Error("Error al cargar los datos");
//             return response.data;
//           }
//         );

//         const { headers: hdrs, data } = dataP;

//         const mappedHeaders = hdrs.map((h: { key: string; header: string }) => ({
//           key: h.key as keyof InventoryItem,
//           header: h.header,
//           isNumeric: h.key === "stock",
//         }));

//         setHeaders(mappedHeaders);
//         setData(data);
//         console.log("Headers:", mappedHeaders);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     getData();
//   }, []);

//   return (
//     <div style={{ padding: "16px" }}>
//       <h1>Inventario</h1>
//       <Table columns={headers} data={data} itemsPerPage={5} />
//     </div>
//   );
// }


import AppRouter from "./routes";
import "./App.css";

export default function App() {


  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

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
