import React, { useState } from "react";
import { useEventData } from "../../hooks/useEventData";
import { ANALYTICS_CONFIG } from "../../analytics/analyticsConfig";
import { CheckCircleIcon, RefreshIcon } from "../../components/common/Icons";
import { useTrackOnMount } from "../../analytics/analytics";

export const AdminSettingsPage = () => {
  const { business, updateBusiness, resetDemoData } = useEventData();
  const [formData, setFormData] = useState({ ...business });
  const [notice, setNotice] = useState("");

  useTrackOnMount("admin_requests_opened", { module: "settings" });

  const handleSave = (e) => {
    e.preventDefault();
    updateBusiness(formData);
    setNotice("¡Configuración guardada en localStorage!");
    setTimeout(() => setNotice(""), 3000);
  };

  const handleReset = () => {
    if (window.confirm("¿Seguro que deseas restaurar todos los datos demostrativos a los valores iniciales de fábrica?")) {
      resetDemoData();
      setFormData({ ...business });
      setNotice("¡Datos demo restaurados con éxito!");
      setTimeout(() => setNotice(""), 3000);
    }
  };

  return (
    <div style={{ maxWidth: "800px" }}>
      {notice && (
        <div className="alert-banner alert-warning" style={{ backgroundColor: "#ECFDF5", color: "#065F46", borderColor: "#A7F3D0", marginBottom: "1.25rem" }}>
          <div className="alert-content-left">
            <CheckCircleIcon size={16} />
            <span>{notice}</span>
          </div>
        </div>
      )}

      <div className="card-editorial" style={{ padding: "2rem", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.3rem", color: "var(--color-charcoal-deep)", marginBottom: "0.25rem" }}>
          Identidad de la Propuesta
        </h2>
        <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: "1.5rem" }}>
          Información visible en la cabecera y pie de página de la landing pública.
        </p>

        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.15rem" }}>
          <div>
            <label className="form-label" htmlFor="settings-name">Nombre comercial</label>
            <input
              type="text"
              id="settings-name"
              className="form-input"
              value={formData.name || ""}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="form-label" htmlFor="settings-short">Nombre corto</label>
            <input
              type="text"
              id="settings-short"
              className="form-input"
              value={formData.brandShort || ""}
              onChange={e => setFormData({ ...formData, brandShort: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="form-label" htmlFor="settings-email">Correo de contacto demo</label>
            <input
              type="email"
              id="settings-email"
              className="form-input"
              value={formData.email || ""}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label className="form-label" htmlFor="settings-phone">Teléfono / WhatsApp</label>
              <input
                type="text"
                id="settings-phone"
                className="form-input"
                value={formData.phone || "899 925 2352"}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="form-label" htmlFor="settings-city">Ubicación</label>
              <input
                type="text"
                id="settings-city"
                className="form-input"
                value={formData.city || "Reynosa, Tamaulipas"}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
            <button type="submit" className="btn btn-primary btn-sm">
              Guardar configuración
            </button>
          </div>
        </form>
      </div>

      {/* Parámetros de BS Code & Analytics */}
      <div className="card-editorial" style={{ padding: "2rem", marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.15rem", color: "var(--color-charcoal-deep)", marginBottom: "0.25rem" }}>
          Telemetría y Analítica Comercial (BS Code)
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: "1.25rem" }}>
          Valores inyectados de forma automática en todos los eventos y sesiones de Session Replay.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", fontFamily: "monospace", fontSize: "0.85rem" }}>
          <div style={{ padding: "0.75rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-xs)" }}>
            <span style={{ color: "var(--color-text-muted)" }}>DEMO_ID:</span><br />
            <strong>{ANALYTICS_CONFIG.demoId}</strong>
          </div>

          <div style={{ padding: "0.75rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-xs)" }}>
            <span style={{ color: "var(--color-text-muted)" }}>PROSPECT_ID:</span><br />
            <strong>{ANALYTICS_CONFIG.prospectId}</strong>
          </div>

          <div style={{ padding: "0.75rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-xs)" }}>
            <span style={{ color: "var(--color-text-muted)" }}>PROJECT_TYPE:</span><br />
            <strong>{ANALYTICS_CONFIG.projectType}</strong>
          </div>

          <div style={{ padding: "0.75rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-xs)" }}>
            <span style={{ color: "var(--color-text-muted)" }}>SESSION_REPLAY:</span><br />
            <strong style={{ color: "#059669" }}>Enmascaramiento Activo (.ph-mask)</strong>
          </div>
        </div>
      </div>

      {/* Restaurar Datos Demo */}
      <div className="card-editorial" style={{ padding: "2rem", borderColor: "#FECACA", backgroundColor: "#FEF2F2" }}>
        <h3 style={{ fontSize: "1.15rem", color: "#991B1B", marginBottom: "0.25rem" }}>
          Zona de Reinicio de Demostración
        </h3>
        <p style={{ fontSize: "0.85rem", color: "#7F1D1D", marginBottom: "1.25rem" }}>
          Si deseas reiniciar las solicitudes, eventos, cotizaciones y anticipos registrados a su estado demo inicial de fábrica.
        </p>

        <button 
          type="button" 
          className="btn btn-outline btn-sm"
          style={{ borderColor: "#DC2626", color: "#DC2626" }}
          onClick={handleReset}
        >
          <RefreshIcon size={14} />
          <span>Restaurar datos demo de fábrica</span>
        </button>
      </div>
    </div>
  );
};
