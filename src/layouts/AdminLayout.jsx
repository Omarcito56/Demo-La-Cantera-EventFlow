import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { AdminHeader } from "../components/admin/AdminHeader";

export const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuth = localStorage.getItem("eventflow_auth");
    if (!isAuth) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const getHeaderTitle = () => {
    const path = location.pathname;
    if (path.includes("/dashboard")) return "Resumen General · EventFlow";
    if (path.includes("/solicitudes")) return "Solicitudes de Eventos";
    if (path.includes("/espacios") || path.includes("/paquetes")) return "Espacios y Salones Demo";
    if (path.includes("/calendario")) return "Calendario y Disponibilidad";
    if (path.includes("/cotizaciones")) return "Cotizaciones Emitidas";
    if (path.includes("/eventos")) return "Eventos Confirmados";
    if (path.includes("/clientes")) return "Directorio de Clientes";
    if (path.includes("/pagos")) return "Anticipos y Pagos";
    if (path.includes("/configuracion")) return "Configuración del Sistema";
    return "Panel de Administración · La Cantera Events";
  };

  return (
    <div className="admin-wrapper">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title={getHeaderTitle()} />
        <main className="admin-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
