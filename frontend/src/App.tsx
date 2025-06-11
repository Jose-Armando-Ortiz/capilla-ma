import React, { useEffect, useState } from "react";
import { Header } from "./components/headers/Header";
import { fetchMisas, type Misa } from "./services/misasServises";
import { fetchEventos, type Evento } from "./services/eventosServices";

// No necesitas importar useAuth aquí directamente si solo Header y Login lo usan

type AppScreen = "main_content" | "login_page";

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("main_content");
  const [misas, setMisas] = useState<Misa[]>([]);

  // Cargar misas al iniciar la aplicación

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMisas();
      console.log("📦 Datos recibidos:", data);
      setMisas(data);
    };
    getData();
  }, []);

  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    const getDataEvento = async () => {
      try {
        const data = await fetchEventos();
        console.log(" Datos de eventos recibidos", data);
        setEventos(data);
      } catch (error) {
        console.error("Error al cargar eventos:", error);
      }
    };
    getDataEvento();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex flex-col">
      {/* Header siempre visible, y puede usar useAuth porque App está envuelto */}
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl p-8 flex flex-col ">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Misas Dominicales del mes
            </h2>
            <div className="flex-1 flex flex-col justify-center space-y-6">
              {Array.isArray(misas) &&
                misas.map((misa) => (
                  <div
                    key={misa.id}
                    className="text-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200"
                  >
                    <p className="text-lg font-medium text-gray-800">
                      Domigo {new Date(misa.fecha).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl p-8 flex flex-col ">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Actividades Semanales
            </h2>
            <div className="flex-1 flex flex-col justify-center space-y-8">
              {eventos.map((eventos) => (
                <div
                  key={eventos.id}
                  className="text-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200"
                >
                  <p className="text-xl font-bold text-gray-800 mb-2">
                    {new String(eventos.descripcion)}
                  </p>
                  <p className="text-lg text-gray-600">
                   Fecha: {new Date(eventos.fecha).toLocaleDateString("es-ES")}

                    <span className="px-6">
                      {" Hora: "}
                      {new String(eventos.hora)}
                    </span>
                  </p>
                  {/* <p className="text-lg text-gray-600">
                  </p> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-blue-800 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-lg font-medium mb-2">
              <span className="font-bold">Dirección:</span> Km 7 ½ acaray,
              Ciudad del Este
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-blue-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span>Capilla María Auxiliadora - Ciudad del Este, Paraguay</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
