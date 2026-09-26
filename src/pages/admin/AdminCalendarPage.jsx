import React, { useState } from "react";
import { useEventData } from "../../hooks/useEventData";
import { useTrackOnMount } from "../../analytics/analytics";
import { CheckCircleIcon, CalendarIcon, XIcon, CheckIcon } from "../../components/common/Icons";

export const AdminCalendarPage = () => {
  const { events, requests, calendarOverrides, updateCalendarDayStatus } = useEventData();
  const [activeDayModal, setActiveDayModal] = useState(null);
  const [modalStatus, setModalStatus] = useState("Disponible");
  const [saveNotice, setSaveNotice] = useState("");

  useTrackOnMount("admin_calendar_opened", { module: "calendar" });

  const today = new Date();
  const currentMonthName = today.toLocaleDateString("es-MX", { month: "long", year: "numeric" });

  // 6 Estados Oficiales Solicitados:
  // Disponible, Solicitud, Cotización, Apartado, Confirmado, Bloqueado
  const OFFICIAL_STATUSES = [
    { label: "Disponible", color: "#10B981", bg: "#ECFDF5", border: "#A7F3D0" },
    { label: "Solicitud", color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE" },
    { label: "Cotización", color: "#D97706", bg: "#FEF3C7", border: "#FDE68A" },
    { label: "Apartado", color: "#8C734B", bg: "#F7F3EB", border: "#D8C7AA" },
    { label: "Confirmado", color: "#059669", bg: "#D1FAE5", border: "#6EE7B7" },
    { label: "Bloqueado", color: "#4B5563", bg: "#F3F4F6", border: "#E5E7EB" }
  ];

  // Construir 28 días próximos para la cuadrícula del calendario
  const calendarDays = [];
  for (let i = -3; i <= 24; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso = d.toISOString().split("T")[0];

    // Buscar eventos y solicitudes correspondientes a esta fecha
    const dayEvents = events.filter(e => e.date === iso);
    const dayRequests = requests.filter(r => r.date === iso);

    // Revisar si existe override guardado por el usuario en localStorage
    let status = calendarOverrides[iso];

    if (!status) {
      if (dayEvents.some(e => e.status === "Confirmado")) {
        status = "Confirmado";
      } else if (dayEvents.some(e => e.status === "Apartado")) {
        status = "Apartado";
      } else if (dayRequests.some(r => r.status === "Esperando anticipo" || r.status === "Cotizando" || r.status === "Cotización enviada")) {
        status = "Cotización";
      } else if (dayRequests.some(r => r.status === "Nueva" || r.status === "Contactado")) {
        status = "Solicitud";
      } else if (i === 10 || i === 19) {
        status = "Bloqueado";
      } else {
        status = "Disponible";
      }
    }

    calendarDays.push({
      dateStr: iso,
      dayNum: d.getDate(),
      dayName: d.toLocaleDateString("es-MX", { weekday: "short" }),
      isToday: i === 0,
      status,
      events: dayEvents,
      requests: dayRequests
    });
  }

  const handleOpenModal = (day) => {
    setActiveDayModal(day);
    setModalStatus(day.status);
    setSaveNotice("");
  };

  const handleSaveDayStatus = (e) => {
    e.preventDefault();
    if (!activeDayModal) return;

    updateCalendarDayStatus(activeDayModal.dateStr, modalStatus);
    setSaveNotice(`¡Estado de la fecha ${activeDayModal.dateStr} actualizado a "${modalStatus}" y guardado en localStorage!`);
    
    // Actualizar estado en el modal abierto
    setActiveDayModal(prev => ({ ...prev, status: modalStatus }));

    setTimeout(() => {
      setSaveNotice("");
    }, 3000);
  };

  const getStatusColor = (statusLabel) => {
    const found = OFFICIAL_STATUSES.find(s => s.label === statusLabel);
    return found || OFFICIAL_STATUSES[0];
  };

  return (
    <div>
      <div className="admin-calendar-wrapper">
        <div className="admin-calendar-header-row">
          <div>
            <h2 style={{ fontSize: "1.35rem", textTransform: "capitalize", color: "var(--color-charcoal-deep)" }}>
              {currentMonthName}
            </h2>
            <span style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)" }}>
              Agenda operativa y calendario de disponibilidad demostrativa de La Cantera Events
            </span>
          </div>

          {/* Leyenda de los 6 Estados Oficiales */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", fontSize: "0.78rem" }}>
            {OFFICIAL_STATUSES.map(s => (
              <span key={s.label} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.2rem 0.5rem", borderRadius: "4px", backgroundColor: s.bg, color: s.color, fontWeight: 600 }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "2px", backgroundColor: s.color }} />
                {s.label}
              </span>
            ))}
          </div>
        </div>

        {/* Cuadrícula de 7 columnas */}
        <div className="admin-calendar-grid">
          {calendarDays.map((day, idx) => {
            const statusConfig = getStatusColor(day.status);
            return (
              <div 
                key={idx} 
                className="admin-cal-day-cell"
                style={{
                  backgroundColor: day.isToday ? "#FAF3F2" : "#FAF8F5",
                  borderColor: day.isToday ? "var(--color-terracotta)" : "var(--border-light)",
                  cursor: "pointer"
                }}
                onClick={() => handleOpenModal(day)}
                title="Haz clic para ver detalles y cambiar estado"
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="admin-cal-day-num" style={{ color: day.isToday ? "var(--color-terracotta)" : "var(--color-charcoal-deep)" }}>
                    {day.dayNum}
                  </span>
                  <span style={{ fontSize: "0.68rem", textTransform: "capitalize", color: "var(--color-text-muted)" }}>
                    {day.dayName}
                  </span>
                </div>

                {/* Eventos del día */}
                {day.events.map(e => (
                  <div key={e.id} className="admin-event-pill pill-confirmed ph-mask" title={`${e.eventType} - ${e.clientName}`}>
                    ✓ {e.eventType}: {e.clientName.split(" ")[0]}
                  </div>
                ))}

                {/* Solicitudes del día */}
                {day.requests.map(r => (
                  <div key={r.id} className="admin-event-pill pill-pending ph-mask" title={`${r.eventType} (${r.status})`}>
                    ⏳ {r.eventType} ({r.folio})
                  </div>
                ))}

                {/* Status Badge en la celda */}
                <div style={{ marginTop: "auto", paddingTop: "0.35rem" }}>
                  <span 
                    style={{ 
                      fontSize: "0.68rem", 
                      fontWeight: 700, 
                      padding: "0.15rem 0.4rem", 
                      borderRadius: "3px",
                      backgroundColor: statusConfig.bg, 
                      color: statusConfig.color,
                      border: `1px solid ${statusConfig.border}`,
                      display: "inline-block"
                    }}
                  >
                    {day.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Interactivo de Fecha: Ver Solicitudes/Eventos + Cambiar Estado */}
      {activeDayModal && (
        <div className="modal-overlay animate-fade-in" onClick={() => setActiveDayModal(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: "520px" }}>
            <div className="modal-header">
              <div>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-terracotta)", fontWeight: 700 }}>
                  Gestión de Fecha en Calendario
                </span>
                <h3 style={{ fontSize: "1.25rem", color: "var(--color-charcoal-deep)" }}>
                  Día: {activeDayModal.dateStr}
                </h3>
              </div>
              <button 
                type="button" 
                onClick={() => setActiveDayModal(null)} 
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)" }}
              >
                <XIcon size={20} />
              </button>
            </div>

            <div className="modal-body">
              {saveNotice && (
                <div className="alert-banner alert-warning" style={{ backgroundColor: "#ECFDF5", color: "#065F46", borderColor: "#A7F3D0", marginBottom: "1rem" }}>
                  <div className="alert-content-left">
                    <CheckCircleIcon size={16} />
                    <span>{saveNotice}</span>
                  </div>
                </div>
              )}

              {/* Selector de Estado Oficial y Persistencia */}
              <div style={{ padding: "1.1rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-sm)", marginBottom: "1.25rem", border: "1px solid var(--border-light)" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--color-charcoal-deep)", display: "block", marginBottom: "0.6rem" }}>
                  Marcar estado de esta fecha:
                </span>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", marginBottom: "1rem" }}>
                  {OFFICIAL_STATUSES.map(s => {
                    const isSelected = modalStatus === s.label;
                    return (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => setModalStatus(s.label)}
                        style={{
                          padding: "0.45rem 0.5rem",
                          borderRadius: "var(--radius-xs)",
                          border: isSelected ? `2px solid ${s.color}` : `1px solid ${s.border}`,
                          backgroundColor: isSelected ? s.bg : "var(--color-surface)",
                          color: isSelected ? s.color : "var(--color-charcoal-deep)",
                          fontWeight: isSelected ? 700 : 500,
                          fontSize: "0.8rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.3rem"
                        }}
                      >
                        {isSelected && <CheckIcon size={12} />}
                        <span>{s.label}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-sm btn-block"
                  onClick={handleSaveDayStatus}
                >
                  <CalendarIcon size={14} />
                  <span>Guardar estado en agenda (localStorage)</span>
                </button>
              </div>

              {/* Solicitudes / Eventos Relacionados */}
              <div>
                <h4 style={{ fontSize: "0.9rem", color: "var(--color-charcoal-deep)", marginBottom: "0.6rem" }}>
                  Movimientos registrados para este día:
                </h4>

                {activeDayModal.events.length > 0 && (
                  <div style={{ marginBottom: "0.85rem" }}>
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#065F46", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>
                      Eventos confirmados / en agenda:
                    </span>
                    {activeDayModal.events.map(e => (
                      <div key={e.id} style={{ padding: "0.75rem", backgroundColor: "#ECFDF5", borderRadius: "var(--radius-xs)", border: "1px solid #A7F3D0", marginBottom: "0.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <strong className="ph-mask" style={{ color: "#065F46" }}>{e.eventType} — {e.clientName}</strong>
                          <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>{e.folio}</span>
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#047857", marginTop: "0.2rem" }}>
                          Invitados: {e.guests} pax | Total: ${(e.total || 0).toLocaleString("es-MX")} | Saldo: ${(e.balance || 0).toLocaleString("es-MX")}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeDayModal.requests.length > 0 && (
                  <div>
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#92400E", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>
                      Solicitudes en trámite:
                    </span>
                    {activeDayModal.requests.map(r => (
                      <div key={r.id} style={{ padding: "0.75rem", backgroundColor: "#FEF3C7", borderRadius: "var(--radius-xs)", border: "1px solid #FDE68A", marginBottom: "0.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <strong className="ph-mask" style={{ color: "#92400E" }}>{r.folio} — {r.clientName}</strong>
                          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#B45309" }}>{r.status}</span>
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#92400E", marginTop: "0.2rem" }}>
                          {r.eventType} ({r.guests} pax) | Total estimado: ${(r.estimatedTotal || 0).toLocaleString("es-MX")}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeDayModal.events.length === 0 && activeDayModal.requests.length === 0 && (
                  <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", padding: "0.75rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-xs)" }}>
                    No hay solicitudes ni eventos agendados para este día. Fecha disponible para asignar servicios.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
