import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/styles/index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFoundPage from "./pages/nofoundPage.tsx";
import Login from "./pages/Login.tsx";
import Admin from "./pages/Admin.tsx";
import { AuthProvider, useAuth } from "./context/AuthContext.tsx";
import type { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando autenticación...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
