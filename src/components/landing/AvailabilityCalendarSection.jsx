import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockAvailabilityMap, getDateAvailabilityStatus } from "../../data/eventFlowData";
import { ArrowRightIcon, CalendarIcon, SparklesIcon, CheckCircleIcon } from "../common/Icons";
import { trackEvent } from "../../analytics/analytics";

export const AvailabilityCalendarSection = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

  const today = new Date();
  const currentMonthName = today.toLocaleDateString("es-MX", { month: "long", year: "numeric" });

  const daysList = [];
  for (let i = 1; i <= 28; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso = d.toISOString().split("T")[0];
    
    // Mapeo demostrativo con 4 estados oficiales requeridos:
    // "disponible" (Disponible), "limitada" (En consulta), "apartada" (Apartada), "bloqueada" (No disponible)
    const rawStatus = mockAvailabilityMap[iso] || (
      i % 6 === 0 ? "apartada" :
      i % 4 === 0 ? "limitada" :
      i % 7 === 0 ? "bloqueada" :
      "disponible"
    );
    
    daysList.push({
      dateStr: iso,
      dayNum: d.getDate(),
      dayName: d.toLocaleDateString("es-MX", { weekday: "short" }),
      status: rawStatus
    });
  }

  const handleDateSelect = (day) => {
    setSelectedDate(day);
    trackEvent("availability_checked", {
      status: day.status,
      date: day.dateStr
    });
  };

  const handleProceedToQuote = (isoDate) => {
    trackEvent("demo_cta_clicked", {
      cta_name: "consultar_mi_fecha_calendar",
      location: "availability_section",
      selected_date: isoDate
    });
    navigate(`/cotizar?fecha=${isoDate}`);
  };

  const getStatusDetails = (status) => {
    switch (status) {
      case "disponible":
        return {
          label: "Disponible",
          tagClass: "status-tag-available",
          badgeColor: "#065F46",
          badgeBg: "#ECFDF5",
          dotColor: "#10B981",
          canQuote: true,
          message: "Esta fecha aparece disponible en la demostración para comenzar tu solicitud."
        };
      case "limitada":
        return {
          label: "En consulta",
          shortLabel: "En consulta",
          tagClass: "status-tag-limited",
          badgeColor: "#92400E",
          badgeBg: "#FEF3C7",
          dotColor: "#F59E0B",
          canQuote: true,
          message: "Existe una solicitud en revisión para esta fecha. Puedes enviar tu cotización para lista prioritaria."
        };
      case "apartada":
        return {
          label: "Apartada",
          shortLabel: "Apartada",
          tagClass: "status-tag-reserved",
          badgeColor: "#4A4742",
          badgeBg: "#EDE7DC",
          dotColor: "#B9A176",
          canQuote: false,
          message: "Esta fecha se encuentra apartada con anticipo demostrativo en el calendario."
        };
      case "bloqueada":
      default:
        return {
          label: "No disponible",
          shortLabel: "No disponible",
          tagClass: "status-tag-blocked",
          badgeColor: "#6B7280",
          badgeBg: "#F3F4F6",
          dotColor: "#6B7280",
          canQuote: false,
          message: "Fecha reservada por mantenimiento del recinto o evento masivo ya programado."
        };
    }
  };

  return (
    <section className="calendar-demo-section" id="disponibilidad">
      <div className="container">
        <div className="section-header-centered">
          <span className="eyebrow">CONSULTA TU FECHA + PLANEA TU EVENTO</span>
          <h2 className="section-title-editorial">¿Ya tienes una fecha en mente?</h2>
          <p className="section-subtext">
            Verifica el estado de cualquier día en nuestra agenda demostrativa antes de iniciar tu solicitud.
          </p>
        </div>

        <div className="calendar-demo-box">
          {/* Header & Leyenda de 4 Estados DEMO Oficiales */}
          <div className="calendar-legend-bar">
            <div className="legend-pill">
              <span className="legend-color-dot" style={{ backgroundColor: "#10B981" }} />
              <span>Disponible</span>
            </div>
            <div className="legend-pill">
              <span className="legend-color-dot" style={{ backgroundColor: "#F59E0B" }} />
              <span>En consulta</span>
            </div>
            <div className="legend-pill">
              <span className="legend-color-dot" style={{ backgroundColor: "#B9A176" }} />
              <span>Apartada</span>
            </div>
            <div className="legend-pill">
              <span className="legend-color-dot" style={{ backgroundColor: "#6B7280" }} />
              <span>No disponible</span>
            </div>
          </div>

          <div style={{ textAlign: "center", marginBottom: "1.25rem", textTransform: "capitalize", fontWeight: 700, fontSize: "1.1rem", color: "var(--color-charcoal-deep)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
            <CalendarIcon size={18} style={{ color: "var(--color-gold)" }} />
            <span>{currentMonthName}</span>
          </div>

          {/* Grid de 28 días próximos */}
          <div className="calendar-month-grid">
            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((dow, idx) => (
              <div key={idx} className="calendar-day-header">
                {dow}
              </div>
            ))}

            {daysList.map((day, idx) => {
              const isSelected = selectedDate?.dateStr === day.dateStr;
              const details = getStatusDetails(day.status);

              return (
                <div 
                  key={idx} 
                  className={`calendar-day-cell ${isSelected ? "selected" : ""}`}
                  style={isSelected ? { borderColor: "var(--color-gold)", backgroundColor: "var(--color-gold-soft)", transform: "scale(1.03)" } : {}}
                  onClick={() => handleDateSelect(day)}
                >
                  <span className="day-cell-num" style={isSelected ? { color: "var(--color-charcoal-deep)", fontWeight: 700 } : {}}>
                    {day.dayNum}
                  </span>
                  <span className={`day-cell-status-tag ${details.tagClass}`}>
                    {details.shortLabel || details.label}
                  </span>
                  <span 
                    className="day-cell-dot" 
                    style={{ backgroundColor: details.dotColor, display: "inline-block" }}
                    title={details.label} 
                  />
                </div>
              );
            })}
          </div>

          {/* Callout de fecha seleccionada */}
          {selectedDate && (() => {
            const currentDetails = getStatusDetails(selectedDate.status);
            return (
              <div className="calendar-selected-callout animate-fade-in" style={{ borderLeft: `4px solid ${currentDetails.badgeColor}` }}>
                <div className="callout-info-left">
                  <span className="callout-info-label">Fecha consultada:</span>
                  <div className="callout-info-title" style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                    <strong>{selectedDate.dateStr}</strong>
                    <span 
                      style={{ 
                        fontSize: "0.76rem", 
                        padding: "0.2rem 0.6rem", 
                        borderRadius: "var(--radius-full)", 
                        backgroundColor: currentDetails.badgeBg, 
                        color: currentDetails.badgeColor,
                        fontWeight: 600
                      }}
                    >
                      {currentDetails.label}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginTop: "0.25rem", display: "block" }}>
                    {currentDetails.message}
                  </span>
                </div>

                <div className="callout-action-wrap">
                  <button 
                    type="button" 
                    className="btn btn-primary btn-sm callout-action-btn"
                    onClick={() => handleProceedToQuote(selectedDate.dateStr)}
                  >
                    <SparklesIcon size={15} />
                    <span>Planear en esta fecha</span>
                    <ArrowRightIcon size={15} />
                  </button>
                </div>
              </div>
            );
          })()}

          {!selectedDate && (
            <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => handleProceedToQuote("")}
              >
                <CalendarIcon size={15} />
                <span>Consultar fecha en el cotizador</span>
                <ArrowRightIcon size={15} />
              </button>
            </div>
          )}

          <p style={{ textAlign: "center", marginTop: "1.75rem", fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
            Disponibilidad demostrativa. Sujeta a confirmación por parte de La Cantera Events.
          </p>
        </div>
      </div>
    </section>
  );
};
