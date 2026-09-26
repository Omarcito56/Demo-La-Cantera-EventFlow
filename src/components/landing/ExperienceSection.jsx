import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, CalendarIcon } from "../common/Icons";
import { trackEvent } from "../../analytics/analytics";

const steps = [
  {
    num: "01",
    title: "Elige espacio",
    desc: "Explora el Salón Principal, Formato Banquete o Salón Privado según la escala de tu celebración o evento corporativo."
  },
  {
    num: "02",
    title: "Consulta fecha",
    desc: "Verifica fechas libres en la agenda interactiva en tiempo real sin tener que esperar confirmaciones lentas."
  },
  {
    num: "03",
    title: "Configura y cotiza",
    desc: "Selecciona el número de asistentes, tipo de montaje (banquete, auditorio, cóctel) y servicios adicionales."
  },
  {
    num: "04",
    title: "Apartado demo",
    desc: "Genera tu folio formal único de seguimiento y experimenta la simulación de apartado con anticipo demostrativo."
  },
  {
    num: "05",
    title: "Control total",
    desc: "Mantén todas las solicitudes, contratos, anticipos y saldos organizados desde un solo sistema centralizado."
  }
];

export const ExperienceSection = () => {
  return (
    <section className="experience-section">
      <div className="container">
        <div className="section-header-centered">
          <span className="eyebrow">PASO A PASO</span>
          <h2 className="section-title-editorial">De la fecha al gran día</h2>
          <p className="section-subtext">
            Un proceso pensado para que planear tu evento en La Cantera Events sea ágil, estructurado y sin información dispersa.
          </p>
        </div>

        <div className="experience-steps-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="experience-step-card">
              <span className="experience-step-num" style={{ color: "var(--color-gold)" }}>{step.num}</span>
              <h3 className="experience-step-title">{step.title}</h3>
              <p className="experience-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem", display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link 
            to="/cotizar" 
            className="btn btn-primary btn-lg"
            onClick={() => {
              trackEvent("demo_cta_clicked", {
                cta_name: "planear_evento_experience",
                location: "experience_section"
              });
            }}
          >
            <span>Planear mi evento</span>
            <ArrowRightIcon size={18} />
          </Link>

          <a 
            href="#disponibilidad" 
            className="btn btn-secondary btn-lg"
            onClick={() => {
              trackEvent("demo_cta_clicked", {
                cta_name: "consultar_fecha_experience",
                location: "experience_section"
              });
            }}
          >
            <CalendarIcon size={18} />
            <span>Consultar disponibilidad</span>
          </a>
        </div>
      </div>
    </section>
  );
};
