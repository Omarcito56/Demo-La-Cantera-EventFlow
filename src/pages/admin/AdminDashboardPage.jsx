import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEventData } from "../../hooks/useEventData";
import { 
  FileTextIcon, CalendarIcon, CreditCardIcon, 
  EyeIcon, ArrowRightIcon, CheckCircleIcon, SendIcon, SparklesIcon, UsersIcon, BuildingIcon 
} from "../../components/common/Icons";
import { StatusBadge } from "../../components/common/StatusBadge";
import { EventDetailModal } from "../../components/admin/EventDetailModal";
import { useTrackOnMount } from "../../analytics/analytics";

export const AdminDashboardPage = () => {
  const { metrics, requests, events } = useEventData();
  const [selectedItem, setSelectedItem] = useState(null);

  useTrackOnMount("admin_requests_opened", { module: "dashboard" });

  const recentRequests = requests.slice(0, 5);

  // Ordenar próximos eventos/fechas
  const upcomingEvents = events
    .filter(e => e.status !== "Cancelado")
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  return (
    <div>
      {/* Disclaimer de datos demo */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", padding: "0.6rem 1rem", backgroundColor: "#FEF3C7", borderRadius: "var(--radius-sm)", border: "1px solid #FDE68A", fontSize: "0.82rem", color: "#92400E" }}>
        <span>
          <strong>Entorno de Demostración Comercial:</strong> Métricas, folios y saldos mostrados son simulaciones para La Cantera Events en BS EventFlow.
        </span>
        <span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: "0.72rem" }}>Datos Demostrativos</span>
      </div>

      {/* 5 Métricas Demo Oficiales Requeridas:
          1. Solicitudes nuevas
          2. Eventos próximos
          3. Cotizaciones pendientes
          4. Asistentes proyectados
          5. Anticipos registrados */}
      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {/* 1. Solicitudes nuevas */}
        <div className="stat-card">
          <div>
            <div className="stat-val" style={{ color: "var(--color-primary)" }}>
              {metrics.newRequests}
            </div>
            <div className="stat-label">Solicitudes nuevas</div>
          </div>
          <div className="stat-icon-wrap" style={{ backgroundColor: "var(--color-bg)", color: "var(--color-primary)" }}>
            <FileTextIcon size={22} />
          </div>
        </div>

        {/* 2. Eventos próximos */}
        <div className="stat-card">
          <div>
            <div className="stat-val" style={{ color: "#059669" }}>
              {metrics.upcomingEvents}
            </div>
            <div className="stat-label">Eventos próximos</div>
          </div>
          <div className="stat-icon-wrap" style={{ backgroundColor: "#ECFDF5", color: "#059669" }}>
            <SparklesIcon size={22} />
          </div>
        </div>

        {/* 3. Cotizaciones pendientes */}
        <div className="stat-card">
          <div>
            <div className="stat-val" style={{ color: "#D97706" }}>
              {metrics.pendingQuotes}
            </div>
            <div className="stat-label">Cotizaciones pendientes</div>
          </div>
          <div className="stat-icon-wrap" style={{ backgroundColor: "#FEF3C7", color: "#D97706" }}>
            <SendIcon size={22} />
          </div>
        </div>

        {/* 4. Asistentes proyectados */}
        <div className="stat-card" style={{ borderColor: "var(--border-arena)", backgroundColor: "#FAF8F4" }}>
          <div>
            <div className="stat-val" style={{ color: "var(--color-charcoal-deep)" }}>
              {metrics.projectedGuests.toLocaleString("es-MX")}
            </div>
            <div className="stat-label">Asistentes proyectados</div>
          </div>
          <div className="stat-icon-wrap" style={{ backgroundColor: "#EFF6FF", color: "#2563EB" }}>
            <UsersIcon size={22} />
          </div>
        </div>

        {/* 5. Anticipos registrados */}
        <div className="stat-card">
          <div>
            <div className="stat-val" style={{ color: "var(--color-primary)" }}>
              ${metrics.totalDeposits.toLocaleString("es-MX")}
            </div>
            <div className="stat-label">Anticipos registrados</div>
          </div>
          <div className="stat-icon-wrap" style={{ backgroundColor: "var(--color-bg)", color: "var(--color-primary)" }}>
            <CreditCardIcon size={22} />
          </div>
        </div>
      </div>

      {/* Grid de 2 Columnas: Solicitudes Recientes y Módulo Próximas Fechas */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
        {/* Solicitudes Recientes */}
        <div className="admin-card-table">
          <div className="admin-table-toolbar">
            <h3 style={{ fontSize: "1.05rem", color: "var(--color-charcoal-deep)" }}>
              Solicitudes Recientes
            </h3>
            <Link to="/admin/solicitudes" className="btn btn-outline btn-sm">
              <span>Ver todas</span>
              <ArrowRightIcon size={14} />
            </Link>
          </div>

          <div className="table-responsive-container">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Cliente</th>
                  <th>Evento</th>
                  <th>Espacio</th>
                  <th>Fecha</th>
                  <th>Estimado</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((req) => (
                  <tr key={req.id}>
                    <td className="folio-cell">{req.folio}</td>
                    <td className="client-name-cell ph-mask">{req.clientName}</td>
                    <td>{req.eventType}</td>
                    <td style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)" }}>
                      {req.spaceName || req.packageName || "Salón Principal"}
                    </td>
                    <td>{req.date}</td>
                    <td style={{ fontWeight: 600 }}>${(req.estimatedTotal || 0).toLocaleString("es-MX")}</td>
                    <td><StatusBadge status={req.status} /></td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        style={{ padding: "0.3rem 0.6rem", fontSize: "0.75rem" }}
                        onClick={() => setSelectedItem(req)}
                      >
                        <EyeIcon size={13} />
                        <span>Ver</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Próximas Fechas y Eventos en Agenda */}
        <div className="admin-card-table">
          <div className="admin-table-toolbar">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CalendarIcon size={18} style={{ color: "var(--color-gold)" }} />
              <h3 style={{ fontSize: "1.05rem", color: "var(--color-charcoal-deep)" }}>
                Próximos eventos
              </h3>
            </div>
            <Link to="/admin/calendario" className="btn btn-outline btn-sm">
              <span>Ver calendario</span>
              <ArrowRightIcon size={14} />
            </Link>
          </div>

          <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {upcomingEvents.map((evt) => (
              <div 
                key={evt.id} 
                style={{ 
                  padding: "0.9rem 1.1rem", 
                  backgroundColor: "var(--color-bg)", 
                  borderRadius: "var(--radius-sm)", 
                  border: "1px solid var(--border-light)", 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center" 
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.25rem" }}>
                    <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--color-primary)" }}>
                      {evt.date}
                    </span>
                    <span style={{ fontSize: "0.76rem", color: "var(--color-text-muted)" }}>
                      ({evt.folio})
                    </span>
                  </div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--color-charcoal-deep)" }}>
                    {evt.eventType}
                    <span style={{ fontSize: "0.8rem", fontWeight: 400, color: "var(--color-text-secondary)", marginLeft: "0.5rem" }} className="ph-mask">
                      · {evt.spaceName || evt.packageName} ({evt.guests} pax)
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <StatusBadge status={evt.status} />
                </div>
              </div>
            ))}

            {upcomingEvents.length === 0 && (
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", textAlign: "center", padding: "1rem" }}>
                No hay eventos agendados próximamente.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Detalle */}
      <EventDetailModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};
