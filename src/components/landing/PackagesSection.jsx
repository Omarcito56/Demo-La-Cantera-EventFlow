import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEventData } from "../../hooks/useEventData";
import { initialSpacesData } from "../../data/eventFlowData";
import { CheckIcon, ArrowRightIcon, BuildingIcon, SparklesIcon, CalendarIcon, EyeIcon, XIcon } from "../common/Icons";
import { trackEvent } from "../../analytics/analytics";

export const PackagesSection = () => {
  const { spaces, business } = useEventData();
  const [selectedSpaceModal, setSelectedSpaceModal] = useState(null);
  
  const displaySpaces = (spaces && spaces.length >= 3) ? spaces : initialSpacesData;

  const handleSpaceClick = (spaceId, ctaName = "cotizar_espacio_card") => {
    trackEvent("demo_cta_clicked", {
      cta_name: ctaName,
      space_id: spaceId,
      location: "spaces_section"
    });
  };

  return (
    <section className="packages-section" id="espacios">
      <div className="container">
        {/* Header */}
        <div className="section-header-centered">
          <span className="section-demo-badge">ESPACIOS DEMOSTRATIVOS</span>
          <h2 className="section-title-editorial">Encuentra el espacio ideal</h2>
          <p className="section-subtext">
            Explora las distintas configuraciones de gran recinto para eventos sociales de gala, graduaciones masivas y convenciones corporativas en Reynosa.
          </p>
        </div>

        {/* 3 Spaces Grid */}
        <div className="packages-grid">
          {displaySpaces.map((space) => (
            <article 
              key={space.id} 
              className={`package-card ${space.popular ? "highlighted" : ""}`}
            >
              <div className="package-card-img-wrap">
                <img 
                  src={space.image} 
                  alt={`${space.name} en La Cantera Events`} 
                  className="package-card-img"
                  loading="lazy"
                />
                <span className="package-card-tag">{space.badge}</span>
              </div>

              <div className="package-card-body">
                <div className="package-card-title-row">
                  <h3 className="package-card-name">{space.name}</h3>
                </div>

                <div className="space-type-row" style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "var(--color-stone)", marginBottom: "0.6rem", fontWeight: 600 }}>
                  <BuildingIcon size={15} style={{ color: "var(--color-gold)" }} />
                  <span>Montaje: {space.layoutType}</span>
                </div>

                <div className="package-capacity-pill" style={{ backgroundColor: "var(--color-bg)", border: "1px solid var(--border-light)" }}>
                  <span style={{ fontSize: "0.78rem", color: "var(--color-text-secondary)" }}>
                    {space.capacity}
                  </span>
                </div>

                <p className="package-desc" style={{ marginTop: "0.75rem", marginBottom: "1rem" }}>
                  {space.description}
                </p>

                {/* Eventos Ideales */}
                <div style={{ marginBottom: "1.15rem" }}>
                  <span style={{ fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)", fontWeight: 700, display: "block", marginBottom: "0.4rem" }}>
                    Eventos ideales:
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {(space.idealEvents || []).map((ev, i) => (
                      <span 
                        key={i} 
                        style={{ 
                          fontSize: "0.74rem", 
                          padding: "0.2rem 0.55rem", 
                          backgroundColor: "var(--color-bg)", 
                          borderRadius: "var(--radius-xs)", 
                          border: "1px solid var(--border-light)",
                          color: "var(--color-text-primary)",
                          fontWeight: 500
                        }}
                      >
                        {ev}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features / Includes */}
                <ul className="package-includes-list">
                  {space.includes.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="package-include-item">
                      <CheckIcon size={15} style={{ color: "var(--color-gold)", flexShrink: 0 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Botones de Acción: Ver opción y Cotizar */}
                <div className="package-card-actions" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "0.6rem" }}>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      setSelectedSpaceModal(space);
                      handleSpaceClick(space.id, "ver_opcion_modal");
                    }}
                    style={{ borderColor: "var(--color-arena)", color: "var(--color-text-primary)" }}
                  >
                    <EyeIcon size={14} />
                    <span>Ver opción</span>
                  </button>

                  <Link 
                    to={`/cotizar?espacio=${space.id}`} 
                    className={`btn btn-sm ${space.popular ? "btn-accent" : "btn-primary"}`}
                    onClick={() => handleSpaceClick(space.id, "cotizar_espacio_directo")}
                  >
                    <span>Cotizar</span>
                    <ArrowRightIcon size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Modal de Detalle "Ver Opción" */}
        {selectedSpaceModal && (
          <div className="modal-overlay animate-fade-in" onClick={() => setSelectedSpaceModal(null)}>
            <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: "600px", padding: 0, overflow: "hidden" }}>
              <div style={{ position: "relative", height: "220px" }}>
                <img 
                  src={selectedSpaceModal.image} 
                  alt={selectedSpaceModal.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
                <button 
                  type="button" 
                  onClick={() => setSelectedSpaceModal(null)} 
                  style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(24,24,24,0.75)", color: "#FFF", border: "none", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                >
                  <XIcon size={18} />
                </button>
                <div style={{ position: "absolute", bottom: "1rem", left: "1.25rem", background: "rgba(24,24,24,0.85)", padding: "0.3rem 0.8rem", borderRadius: "4px", color: "var(--color-gold)", fontWeight: 700, fontSize: "0.8rem" }}>
                  {selectedSpaceModal.badge}
                </div>
              </div>

              <div style={{ padding: "1.75rem" }}>
                <h3 style={{ fontSize: "1.5rem", color: "var(--color-charcoal-deep)", marginBottom: "0.25rem" }}>
                  {selectedSpaceModal.name}
                </h3>
                <span style={{ fontSize: "0.85rem", color: "var(--color-stone)", display: "block", marginBottom: "0.75rem" }}>
                  Configuración: <strong>{selectedSpaceModal.layoutType}</strong>
                </span>

                <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                  {selectedSpaceModal.description}
                </p>

                <div style={{ padding: "0.9rem 1.1rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)", marginBottom: "1.25rem" }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                    Aviso Importante sobre Capacidad:
                  </span>
                  <p style={{ fontSize: "0.85rem", color: "var(--color-text-primary)", margin: 0, fontWeight: 500 }}>
                    “Capacidad y montaje sujetos a confirmación por el negocio.”
                  </p>
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-charcoal-deep)", display: "block", marginBottom: "0.5rem" }}>
                    Infraestructura demostrativa incluida:
                  </span>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {selectedSpaceModal.includes.map((inc, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.84rem", color: "var(--color-text-secondary)" }}>
                        <CheckIcon size={14} style={{ color: "var(--color-gold)", marginTop: "2px", flexShrink: 0 }} />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setSelectedSpaceModal(null)}>
                    Cerrar
                  </button>
                  <Link 
                    to={`/cotizar?espacio=${selectedSpaceModal.id}`} 
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      setSelectedSpaceModal(null);
                      handleSpaceClick(selectedSpaceModal.id, "cotizar_desde_modal");
                    }}
                  >
                    <span>Cotizar en este espacio</span>
                    <ArrowRightIcon size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mandatory Discrete Disclaimer */}
        <p className="package-disclaimer-note" style={{ textAlign: "center", marginTop: "2.5rem" }}>
          {business.disclaimer}
        </p>
      </div>
    </section>
  );
};
