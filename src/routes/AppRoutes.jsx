import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import { PublicLayout } from "../layouts/PublicLayout";
import { AdminLayout } from "../layouts/AdminLayout";

// Public Pages
import { HomePage } from "../pages/public/HomePage";
import { PackagesPage } from "../pages/public/PackagesPage";
import { QuotePage } from "../pages/public/QuotePage";
import { ConfirmationPage } from "../pages/public/ConfirmationPage";

// Admin Pages
import { AdminLoginPage } from "../pages/admin/AdminLoginPage";
import { AdminDashboardPage } from "../pages/admin/AdminDashboardPage";
import { AdminRequestsPage } from "../pages/admin/AdminRequestsPage";
import { AdminCalendarPage } from "../pages/admin/AdminCalendarPage";
import { AdminEventsPage } from "../pages/admin/AdminEventsPage";
import { AdminClientsPage } from "../pages/admin/AdminClientsPage";
import { AdminQuotesPage } from "../pages/admin/AdminQuotesPage";
import { AdminPaymentsPage } from "../pages/admin/AdminPaymentsPage";
import { AdminPackagesPage } from "../pages/admin/AdminPackagesPage";
import { AdminSpacesPage } from "../pages/admin/AdminSpacesPage";
import { AdminSettingsPage } from "../pages/admin/AdminSettingsPage";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/espacios" element={<PackagesPage />} />
        <Route path="/paquetes" element={<PackagesPage />} />
        <Route path="/cotizar" element={<QuotePage />} />
        <Route path="/confirmacion" element={<ConfirmationPage />} />

        {/* Redirecciones de rutas de proyectos anteriores */}
        <Route path="/servicios" element={<Navigate to="/espacios" replace />} />
        <Route path="/agendar" element={<Navigate to="/cotizar" replace />} />
      </Route>

      {/* Login de Administración */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Panel Administrativo Protegido */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="solicitudes" element={<AdminRequestsPage />} />
        <Route path="espacios" element={<AdminSpacesPage />} />
        <Route path="calendario" element={<AdminCalendarPage />} />
        <Route path="eventos" element={<AdminEventsPage />} />
        <Route path="clientes" element={<AdminClientsPage />} />
        <Route path="cotizaciones" element={<AdminQuotesPage />} />
        <Route path="pagos" element={<AdminPaymentsPage />} />
        <Route path="paquetes" element={<AdminSpacesPage />} />
        <Route path="configuracion" element={<AdminSettingsPage />} />

        {/* Aliases internos para compatibilidad */}
        <Route path="agenda" element={<Navigate to="/admin/calendario" replace />} />
        <Route path="citas" element={<Navigate to="/admin/solicitudes" replace />} />
        <Route path="servicios" element={<Navigate to="/admin/espacios" replace />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
