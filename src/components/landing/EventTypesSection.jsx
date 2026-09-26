import React from "react";
import { Link } from "react-router-dom";
import { eventTypesList } from "../../data/eventFlowData";
import { ArrowRightIcon, SparklesIcon } from "../common/Icons";
import { trackEvent } from "../../analytics/analytics";

export const EventTypesSection = () => {
  const handleTypeClick = (typeId) => {
    trackEvent("demo_cta_clicked", {
      cta_name: "select_event_type_card",
      event_type: typeId,
      location: "event_types_section"
    });
  };

  return (
    <section className="event-types-section" id="eventos">
      <div className="container">
        <div className="section-header-centered">
          <span className="eyebrow">CELEBRACIONES Y ENCUENTROS DE GRAN ESCALA</span>
          <h2 className="section-title-editorial">Diseñado para cada tipo de evento</h2>
          <p className="section-subtext">
            Desde bodas íntimas o fastuosas galas de XV años, hasta graduaciones universitarias y magnos congresos empresariales en La Cantera Events.
          </p>
        </div>

        {/* 9 Event Types Grid */}
        <div className="event-types-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
          {eventTypesList.map((type) => (
            <Link 
              key={type.id} 
              to={`/cotizar?tipo=${type.id}&espacio=${type.popularSpace}`}
              className="event-type-card"
              onClick={() => handleTypeClick(type.id)}
            >
              <img 
                src={type.image} 
                alt={`${type.name} en La Cantera Events`} 
                className="event-type-bg-img"
                loading="lazy"
              />
              <div className="event-type-gradient-overlay" />
              <div className="event-type-card-content">
                <span style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-gold)", fontWeight: 700, marginBottom: "0.25rem", display: "block" }}>
                  {type.category === "corporativo" ? "Corporativo / Académico" : "Social & Gala"}
                </span>
                <h3 className="event-type-name">{type.name}</h3>
                <p className="event-type-sub">{type.subtitle}</p>
                <div className="event-type-cta-link" style={{ color: "var(--color-gold)" }}>
                  <span>Cotizar {type.name}</span>
                  <ArrowRightIcon size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
