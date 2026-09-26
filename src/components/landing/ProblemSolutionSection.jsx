import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboardIcon, CalendarIcon, FileTextIcon, ArrowRightIcon, BuildingIcon, SparklesIcon } from "../common/Icons";
import { trackEvent } from "../../analytics/analytics";

export const ProblemSolutionSection = () => {
  return (
    <section className="system-pitch-section">
      <div className="container">
        <div className="pitch-grid">
          {/* Left Content */}
          <div className="pitch-content">
            <span className="eyebrow" style={{ color: "var(--color-gold)" }}>
              PROPUESTA PARA LA CANTERA EVENTS
            </span>
            <h2 className="pitch-title">
              Menos información dispersa.<br />
              Más eventos bajo control.
            </h2>
            <p className="pitch-text">
              EventFlow puede centralizar solicitudes, asistentes, espacios, cotizaciones, fechas y anticipos desde un solo lugar.
            </p>

            <div className="pitch-features-list">
              <div className="pitch-feature-row">
                <div className="pitch-feature-icon" style={{ backgroundColor: "rgba(185, 161, 118, 0.2)", color: "var(--color-gold)" }}>
                  <BuildingIcon size={18} />
                </div>
                <div className="pitch-feature-body">
                  <h4>Control de Espacios y Montajes</h4>
                  <p>Asigna y gestiona el Salón Principal, Formato Banquete o Salón Privado según formato y afluencia.</p>
                </div>
              </div>

              <div className="pitch-feature-row">
                <div className="pitch-feature-icon" style={{ backgroundColor: "rgba(185, 161, 118, 0.2)", color: "var(--color-gold)" }}>
                  <CalendarIcon size={18} />
                </div>
                <div className="pitch-feature-body">
                  <h4>Agenda y Disponibilidad en Tiempo Real</h4>
                  <p>Permite a los prospectos consultar fechas libres sin saturar mensajes, filtrando clientes calificados.</p>
                </div>
              </div>

              <div className="pitch-feature-row">
                <div className="pitch-feature-icon" style={{ backgroundColor: "rgba(185, 161, 118, 0.2)", color: "var(--color-gold)" }}>
                  <LayoutDashboardIcon size={18} />
                </div>
                <div className="pitch-feature-body">
                  <h4>Centralización de Solicitudes, Anticipos y Saldos</h4>
                  <p>Supervisa cada cotización, fecha apartada y anticipo registrado desde un panel unificado.</p>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1.75rem" }}>
              <Link 
                to="/cotizar" 
                className="btn btn-accent"
                onClick={() => {
                  trackEvent("demo_cta_clicked", {
                    cta_name: "probar_cotizador_pitch",
                    location: "problem_solution_section"
                  });
                }}
                style={{ backgroundColor: "var(--color-gold)", color: "#181818" }}
              >
                <span>Probar cotizador demo</span>
                <ArrowRightIcon size={16} />
              </Link>

              <Link 
                to="/admin/login" 
                className="btn btn-outline"
                style={{ color: "#FFFFFF", borderColor: "rgba(216, 199, 170, 0.5)" }}
              >
                <span>Ver panel administrativo demo</span>
              </Link>
            </div>
          </div>

          {/* Right Visual: Representación Elegante del Calendario y Control Administrativo */}
          <div className="pitch-admin-mock">
            <div className="mock-window-bar">
              <div className="mock-dots">
                <span className="mock-dot" style={{ backgroundColor: "#EF4444" }} />
                <span className="mock-dot" style={{ backgroundColor: "#F59E0B" }} />
                <span className="mock-dot" style={{ backgroundColor: "#10B981" }} />
              </div>
              <span className="mock-title">EventFlow Admin · La Cantera Events</span>
              <span className="mock-active-badge">● Agenda en Vivo</span>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mock-stats-row">
              <div className="mock-stat-box">
                <div className="mock-stat-val">5</div>
                <div className="mock-stat-label">Solicitudes nuevas</div>
              </div>
              <div className="mock-stat-box">
                <div className="mock-stat-val">2,350</div>
                <div className="mock-stat-label">Asistentes proyectados</div>
              </div>
              <div className="mock-stat-box">
                <div className="mock-stat-val">$35,000</div>
                <div className="mock-stat-label">Anticipos demo</div>
              </div>
            </div>

            {/* Calendario Operativo Demostrativo */}
            <div style={{ padding: "1.25rem", backgroundColor: "rgba(0,0,0,0.35)", borderRadius: "var(--radius-sm)", marginBottom: "1rem", border: "1px solid rgba(216,199,170,0.15)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-gold)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Agenda Centralizada
                </span>
                <span style={{ fontSize: "0.74rem", color: "#A8A29E" }}>
                  Espacios & Fechas
                </span>
              </div>

              {/* Mini Calendar Representation */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.4rem", textAlign: "center", fontSize: "0.72rem" }}>
                {["D", "L", "M", "M", "J", "V", "S"].map((d, i) => (
                  <span key={i} style={{ color: "#78716C", fontWeight: 600, paddingBottom: "0.2rem" }}>{d}</span>
                ))}
                
                <div style={{ padding: "0.4rem 0.2rem", background: "rgba(255,255,255,0.04)", borderRadius: "4px", color: "#A8A29E" }}>12</div>
                <div style={{ padding: "0.4rem 0.2rem", background: "rgba(245, 158, 11, 0.2)", border: "1px solid rgba(245, 158, 11, 0.4)", borderRadius: "4px", color: "#FDE68A", fontWeight: 700 }}>
                  13<span style={{ display: "block", fontSize: "0.6rem" }}>Cotiz.</span>
                </div>
                <div style={{ padding: "0.4rem 0.2rem", background: "rgba(255,255,255,0.04)", borderRadius: "4px", color: "#A8A29E" }}>14</div>
                <div style={{ padding: "0.4rem 0.2rem", background: "rgba(16, 185, 129, 0.2)", border: "1px solid rgba(16, 185, 129, 0.4)", borderRadius: "4px", color: "#A7F3D0", fontWeight: 700 }}>
                  15<span style={{ display: "block", fontSize: "0.6rem" }}>Conf.</span>
                </div>
                <div style={{ padding: "0.4rem 0.2rem", background: "rgba(255,255,255,0.04)", borderRadius: "4px", color: "#A8A29E" }}>16</div>
                <div style={{ padding: "0.4rem 0.2rem", background: "rgba(185, 161, 118, 0.3)", border: "1px solid rgba(185, 161, 118, 0.5)", borderRadius: "4px", color: "#E7DDCA", fontWeight: 700 }}>
                  17<span style={{ display: "block", fontSize: "0.6rem" }}>Apart.</span>
                </div>
                <div style={{ padding: "0.4rem 0.2rem", background: "rgba(255,255,255,0.04)", borderRadius: "4px", color: "#A8A29E" }}>18</div>
              </div>
            </div>

            {/* Mock Table Stream */}
            <div className="mock-table-wrap">
              <div className="mock-table-heading" style={{ color: "var(--color-gold)" }}>
                ÚLTIMAS SOLICITUDES POR ESPACIO
              </div>

              <div className="mock-table-row">
                <div className="mock-client-info">
                  <strong style={{ color: "#FFF" }}>CAN-000121</strong> · Mariana Garza (Boda · Salón Principal)
                </div>
                <span className="status-badge badge-blue">Nueva</span>
              </div>

              <div className="mock-table-row">
                <div className="mock-client-info">
                  <strong style={{ color: "#FFF" }}>CAN-000122</strong> · R. Hinojosa (Graduación · 450 pax)
                </div>
                <span className="status-badge badge-warning">En revisión</span>
              </div>

              <div className="mock-table-row">
                <div className="mock-client-info">
                  <strong style={{ color: "#FFF" }}>CAN-000125</strong> · F. López (Empresarial · Confirmada)
                </div>
                <span className="status-badge badge-success">Confirmada</span>
              </div>
            </div>

            <div className="mock-footer-row">
              <span className="mock-footer-note">Centralizado en un solo lugar</span>
              <Link to="/admin/login" className="mock-admin-link" style={{ color: "var(--color-gold)" }}>
                Acceso a administración demo →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
