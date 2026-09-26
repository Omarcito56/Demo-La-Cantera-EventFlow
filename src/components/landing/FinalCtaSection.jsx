import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, CalendarIcon } from "../common/Icons";
import { trackEvent } from "../../analytics/analytics";

export const FinalCtaSection = () => {
  return (
    <section className="final-cta-section">
      <img 
        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1500&q=80" 
        alt="Montaje de gala en La Cantera Events" 
        className="final-cta-bg-img"
        loading="lazy"
      />
      <div className="container">
        <div className="final-cta-content">
          <span className="eyebrow" style={{ color: "var(--color-gold)" }}>
            PLANEA TU EVENTO DE GRAN ESCALA
          </span>
          <h2 className="final-cta-title">
            Todo empieza con una fecha.
          </h2>
          <p className="final-cta-text">
            Explora nuestros espacios, personaliza los detalles de tu evento y solicita una cotización demostrativa en tiempo real.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
            <Link 
              to="/cotizar" 
              className="btn btn-accent btn-lg"
              onClick={() => {
                trackEvent("demo_cta_clicked", {
                  cta_name: "planear_evento_final_cta",
                  location: "final_cta_section"
                });
              }}
            >
              <span>Planear mi evento</span>
              <ArrowRightIcon size={18} />
            </Link>

            <a 
              href="#disponibilidad" 
              className="btn btn-outline-white btn-lg"
              onClick={() => {
                trackEvent("demo_cta_clicked", {
                  cta_name: "consultar_fecha_final_cta",
                  location: "final_cta_section"
                });
              }}
            >
              <CalendarIcon size={18} />
              <span>Consultar fecha</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
