// import { Header } from "./components/Header";

// import type { eventoSemanal, misaDomicales } from "./types/types";

// const App: React.FC = () => {
//   const misasDominicales: misaDomicales[] = [
//     { fecha: "Domingo yy-mm-dd" },
//     { fecha: "Domingo yy-mm-dd" },
//     { fecha: "Domingo yy-mm-dd" },
//   ];
//   const eventoSemanales: eventoSemanal[] = [
//     { dia: "Lunes", activo: true },
//     { dia: "Miercoles", activo: true },
//     { dia: "Jueves", activo: true },
//   ];

//   return (
//     <div className="min-h-screen bg-blue-200 flex flex-col">
//       <Header />

//       <section className="grid sm:grid-cols-2 gap-4 p-6">
//         <div className="grid gap-2 bg-blue-400 border rounded-2xl p-6">
//           <h2 className="text-2xl font-semibold text-center mb-8">
//             Misas Dominicales del mes
//           </h2>
//           <div className="space-y-6">
//             {misasDominicales.map((misa, index) => (
//               <div
//                 key={index}
//                 className="bg-blue-400 bg-opacity-30 rounded-lg p-4 text-center hover:bg-opacity-5 cursor-pointer"
//               >
//                 <span className="text-lg font-medium">{misa.fecha}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="grid bg-blue-400 rounded-2xl p-6">
//           <h2 className="text-2xl font-semibold text-center mb-8">
//             Misas Dominicales del mes
//           </h2>
//           <div className="space-y-7">
//             {eventoSemanales.map((evento, index) => (
//               <div
//                 key={index}
//                 className="bg-blue-400 bg-opacity-30 rounded-lg p-6 text-center hover:bg-opacity-50 transition-all cursor-pointer"
//               >
//                 <span className="text-xl font-medium">{evento.dia}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <footer>
//         <p className="text-center mt-auto">
//           <span className="font-bold">Direección: </span>Km 7 ½ acaray, Ciudad
//           del Este
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default App;
