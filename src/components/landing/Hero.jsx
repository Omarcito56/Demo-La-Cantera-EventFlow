import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, CalendarIcon, BuildingIcon, SparklesIcon } from "../common/Icons";
import { trackEvent } from "../../analytics/analytics";

export const Hero = () => {
  const handleCta = (ctaName, target) => {
    trackEvent("demo_cta_clicked", {
      cta_name: ctaName,
      location: "hero",
      target_route: target
    });
  };

  return (
    <section className="hero-editorial">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Copy & CTAs */}
          <div className="hero-content">
            <div className="hero-eyebrow">
              <SparklesIcon size={14} />
              <span>SOCIAL · CORPORATIVO · GRANDES EVENTOS</span>
            </div>

            <h1 className="hero-title">
              Un espacio.<br />
              Muchas formas de celebrar.
            </h1>

            <p className="hero-subtitle">
              Explora opciones, selecciona el formato de tu evento y solicita una cotización inicial de manera sencilla.
            </p>

            <div className="hero-actions">
              <Link 
                to="/cotizar" 
                className="btn btn-primary btn-lg"
                onClick={() => handleCta("planear_mi_evento", "/cotizar")}
              >
                <span>Planear mi evento</span>
                <ArrowRightIcon size={18} />
              </Link>

              <a 
                href="#disponibilidad" 
                className="btn btn-secondary btn-lg"
                onClick={() => handleCta("consultar_disponibilidad", "#disponibilidad")}
              >
                <CalendarIcon size={18} />
                <span>Consultar disponibilidad</span>
              </a>
            </div>

            {/* 4 Indicadores arquitectónicos de la propuesta */}
            <div className="hero-indicators">
              <div className="hero-indicator-item">
                <span className="indicator-number">01</span>
                <span className="indicator-label">Espacios</span>
                <span className="indicator-sub">Salón Principal & Privado</span>
              </div>
              <div className="hero-indicator-item">
                <span className="indicator-number">02</span>
                <span className="indicator-label">Capacidad</span>
                <span className="indicator-sub">Gran escala y versatilidad</span>
              </div>
              <div className="hero-indicator-item">
                <span className="indicator-number">03</span>
                <span className="indicator-label">Cotizador</span>
                <span className="indicator-sub">Estimado dinámico en vivo</span>
              </div>
              <div className="hero-indicator-item">
                <span className="indicator-number">04</span>
                <span className="indicator-label">Agenda</span>
                <span className="indicator-sub">Disponibilidad sin esperas</span>
              </div>
            </div>
          </div>

          {/* Right Column: Fotografía Arquitectónica de Gran Escala */}
          <div className="hero-visual-wrap">
            <div className="hero-main-photo-card">
              <img 
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80" 
                alt="Recinto de gran escala en La Cantera Events" 
                className="hero-img-cover"
                loading="eager"
              />
              <div className="hero-floating-badge" style={{ backgroundColor: "rgba(24, 24, 24, 0.92)", borderColor: "rgba(216, 199, 170, 0.4)" }}>
                <div className="hero-badge-left">
                  <span className="hero-badge-tag" style={{ color: "var(--color-gold)" }}>LARGE EVENT VENUE EXPERIENCE</span>
                  <span className="hero-badge-title" style={{ color: "#FFFFFF" }}>La Cantera Events · Reynosa</span>
                </div>
                <div style={{ color: "var(--color-gold)", display: "flex", alignItems: "center" }}>
                  <BuildingIcon size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
