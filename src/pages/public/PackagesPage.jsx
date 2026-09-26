import React from "react";
import { Link } from "react-router-dom";
import { useEventData } from "../../hooks/useEventData";
import { initialSpacesData } from "../../data/eventFlowData";
import { CheckIcon, ArrowRightIcon, BuildingIcon, SparklesIcon, CalendarIcon } from "../../components/common/Icons";
import { useTrackOnMount } from "../../analytics/analytics";

export const PackagesPage = () => {
  const { spaces, business } = useEventData();
  const displaySpaces = (spaces && spaces.length >= 3) ? spaces : initialSpacesData;

  useTrackOnMount("demo_viewed", {
    view_type: "spaces_catalog",
    route: "/espacios"
  });

  return (
    <div style={{ padding: "4rem 0 6rem", backgroundColor: "var(--color-bg)" }}>
      <div className="container">
        <div className="section-header-centered">
          <span className="section-demo-badge">CATÁLOGO DE ESPACIOS DEMO</span>
          <h1 className="section-title-editorial">Encuentra el espacio ideal</h1>
          <p className="section-subtext">
            Conoce a detalle las diferentes configuraciones y salones de gran formato disponibles en La Cantera Events (Reynosa, Tamaulipas).
          </p>
        </div>

        <div className="packages-grid" style={{ marginBottom: "3rem" }}>
          {displaySpaces.map((space) => (
            <article 
              key={space.id} 
              className={`package-card ${space.popular ? "highlighted" : ""}`}
            >
              <div className="package-card-img-wrap">
                <img 
                  src={space.image} 
                  alt={space.name} 
                  className="package-card-img"
                  loading="lazy"
                />
                <span className="package-card-tag">{space.badge}</span>
              </div>

              <div className="package-card-body">
                <div className="package-card-title-row">
                  <h2 className="package-card-name">{space.name}</h2>
                </div>

                <div className="package-price-wrap">
                  <span className="package-price-from">PRESUPUESTO BASE DEMO</span>
                  <div className="package-price-val">{space.priceFrom}</div>
                </div>

                <div className="package-capacity-pill" style={{ backgroundColor: "var(--color-bg)", border: "1px solid var(--border-light)" }}>
                  <BuildingIcon size={14} style={{ color: "var(--color-gold)" }} />
                  <span>{space.capacity}</span>
                </div>

                <p className="package-desc" style={{ marginTop: "0.75rem", marginBottom: "1rem" }}>
                  {space.description}
                </p>

                {/* Eventos Ideales */}
                <div style={{ marginBottom: "1rem" }}>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>
                    Eventos ideales:
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                    {(space.idealEvents || []).map((ev, i) => (
                      <span key={i} style={{ fontSize: "0.73rem", padding: "0.15rem 0.5rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-xs)", border: "1px solid var(--border-light)" }}>
                        {ev}
                      </span>
                    ))}
                  </div>
                </div>

                <ul className="package-includes-list">
                  {space.includes.map((item, idx) => (
                    <li key={idx} className="package-include-item">
                      <CheckIcon size={15} style={{ color: "var(--color-gold)", flexShrink: 0 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="package-card-actions">
                  <Link 
                    to={`/cotizar?espacio=${space.id}`} 
                    className={`btn btn-block ${space.popular ? "btn-accent" : "btn-primary"}`}
                    style={space.popular ? { backgroundColor: "var(--color-gold)", color: "#181818" } : {}}
                  >
                    <span>Configurar y cotizar</span>
                    <ArrowRightIcon size={15} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Corporate & Masive Notice */}
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", padding: "2rem", backgroundColor: "var(--color-surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-sm)" }}>
          <SparklesIcon size={26} style={{ color: "var(--color-gold)", margin: "0 auto 0.75rem" }} />
          <h3 style={{ fontSize: "1.3rem", color: "var(--color-charcoal-deep)", marginBottom: "0.5rem" }}>
            ¿Requieres un montaje especial para conferencias o gran formato?
          </h3>
          <p style={{ fontSize: "0.92rem", color: "var(--color-text-secondary)", marginBottom: "1.25rem", lineHeight: 1.6 }}>
            La Cantera Events cuenta con infraestructura para montajes en auditorio, áreas para presidium, colocación de pantallas de gran escala y sonido envolvente.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link to="/cotizar?tipo=congreso" className="btn btn-secondary btn-sm">
              <span>Cotizar evento masivo</span>
            </Link>
            <Link to="/#disponibilidad" className="btn btn-primary btn-sm">
              <CalendarIcon size={15} />
              <span>Ver calendario de disponibilidad</span>
            </Link>
          </div>
        </div>

        <p className="package-disclaimer-note" style={{ marginTop: "2.5rem", textAlign: "center" }}>
          {business.disclaimer}
        </p>
      </div>
    </div>
  );
};
