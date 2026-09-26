import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, BuildingIcon, BriefcaseIcon, CalendarIcon, CheckIcon } from "../common/Icons";
import { trackEvent } from "../../analytics/analytics";

const corporateCards = [
  {
    id: "conferencias",
    title: "Conferencias",
    subtitle: "Keynotes magistrales & seminarios",
    desc: "Montaje tipo auditorio con presidium ejecutivo, microfonía inalámbrica y conectividad para proyección.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    typeParam: "conferencia"
  },
  {
    id: "congresos",
    title: "Congresos",
    subtitle: "Convenciones y foros masivos",
    desc: "Alta capacidad para audiencias numerosas, módulos de acreditación, zonas de descanso y logística integral.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    typeParam: "congreso"
  },
  {
    id: "presentaciones",
    title: "Presentaciones",
    subtitle: "Lanzamientos & exposiciones",
    desc: "Escenario modular con iluminación arquitectónica y soporte para pantallas de gran formato y video.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
    typeParam: "evento-empresarial"
  },
  {
    id: "cenas-empresariales",
    title: "Cenas empresariales",
    subtitle: "Galas corporativas & reconocimientos",
    desc: "Cenas de fin de año, aniversarios institucionales y entrega de premios con servicio de banquete distinguido.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    typeParam: "cena"
  },
  {
    id: "graduaciones",
    title: "Graduaciones",
    subtitle: "Ceremonias de generación masivas",
    desc: "Espacio amplio para protocolo de entrega de diplomas, recepción familiar y brindis de gala conmemorativo.",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
    typeParam: "graduacion"
  }
];

export const CorporateSection = () => {
  const handleCorporateClick = (cardId, typeParam) => {
    trackEvent("demo_cta_clicked", {
      cta_name: `corporate_${cardId}_click`,
      target_type: typeParam,
      location: "corporate_section"
    });
  };

  return (
    <section className="corporate-section" id="corporativo" style={{ padding: "5rem 0", backgroundColor: "#181818", color: "#FFFFFF" }}>
      <div className="container">
        <div className="section-header-centered" style={{ maxWidth: "780px", margin: "0 auto 3.5rem", textAlign: "center" }}>
          <span className="eyebrow" style={{ color: "var(--color-gold)", letterSpacing: "0.1em" }}>
            INFRAESTRUCTURA DE GRAN ESCALA
          </span>
          <h2 className="section-title-editorial" style={{ color: "#FFFFFF", fontSize: "2.4rem", marginTop: "0.5rem", marginBottom: "1rem" }}>
            También para eventos empresariales
          </h2>
          <p className="section-subtext" style={{ color: "#D8C7AA", fontSize: "1.05rem", lineHeight: 1.6 }}>
            La Cantera Events no es sólo un salón social: sus dimensiones arquitectónicas, equipamiento audiovisual y áreas configurables lo convierten en el recinto ideal para encuentros corporativos de gran escala en Reynosa.
          </p>
        </div>

        {/* 5 Corporate Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", marginBottom: "3rem" }}>
          {corporateCards.map((card) => (
            <div 
              key={card.id}
              style={{
                backgroundColor: "#232323",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                border: "1px solid rgba(216, 199, 170, 0.2)",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.25s ease, border-color 0.25s ease",
                boxShadow: "0 8px 24px rgba(0,0,0,0.3)"
              }}
              className="corporate-card-hover"
            >
              <div style={{ position: "relative", height: "150px", overflow: "hidden" }}>
                <img 
                  src={card.image} 
                  alt={card.title} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                  loading="lazy" 
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(24,24,24,0.85) 0%, transparent 60%)" }} />
                <span style={{ position: "absolute", bottom: "0.75rem", left: "0.9rem", color: "var(--color-gold)", fontWeight: 700, fontSize: "0.76rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {card.subtitle}
                </span>
              </div>

              <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: "1.2rem", color: "#FFFFFF", marginBottom: "0.4rem" }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "#B3AEA6", lineHeight: 1.5, marginBottom: "1rem" }}>
                    {card.desc}
                  </p>
                </div>

                <Link 
                  to={`/cotizar?tipo=${card.typeParam}`}
                  className="btn btn-sm corporate-card-btn"
                  onClick={() => handleCorporateClick(card.id, card.typeParam)}
                  style={{ 
                    backgroundColor: "#181818", 
                    color: "#FFFFFF", 
                    border: "1.5px solid #B9A176", 
                    justifyContent: "center",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    padding: "0.65rem 1rem",
                    width: "100%",
                    borderRadius: "var(--radius-sm)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.25)"
                  }}
                >
                  <span style={{ color: "#FFFFFF" }}>Cotizar {card.title}</span>
                  <ArrowRightIcon size={14} style={{ color: "var(--color-gold)" }} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Highlights Bar */}
        <div style={{ 
          backgroundColor: "#202020", 
          borderRadius: "var(--radius-md)", 
          padding: "1.75rem 2rem", 
          border: "1px solid rgba(216, 199, 170, 0.25)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem"
        }}>
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "1.1rem", marginBottom: "0.25rem" }}>
              ¿Organizando una convención o evento de gran convocatoria?
            </h4>
            <span style={{ fontSize: "0.85rem", color: "#D8C7AA" }}>
              Consulta capacidad demostrativa, soporte técnico para audio y pantallas, y opciones de montaje ejecutivo.
            </span>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link 
              to="/cotizar?tipo=congreso" 
              className="btn btn-accent btn-sm"
              style={{ backgroundColor: "var(--color-gold)", color: "#181818", fontWeight: 700 }}
            >
              <span>Cotizar evento masivo</span>
              <ArrowRightIcon size={14} />
            </Link>
            <a 
              href="#disponibilidad" 
              className="btn btn-outline-white btn-sm"
              style={{ borderColor: "rgba(255, 255, 255, 0.8)", color: "#FFFFFF" }}
            >
              <CalendarIcon size={14} />
              <span>Ver calendario</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
