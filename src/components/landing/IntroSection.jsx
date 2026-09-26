import React from "react";
import { CalendarIcon, SparklesIcon, BuildingIcon, ShieldCheckIcon } from "../common/Icons";

export const IntroSection = () => {
  return (
    <section className="intro-section" id="concepto">
      <div className="container">
        <div className="intro-grid">
          {/* Visual Composition */}
          <div className="intro-photo-composition">
            <img 
              src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80" 
              alt="Gran salón de gala en La Cantera Events"
              className="intro-img-main"
              loading="lazy"
            />
            <div className="intro-card-overlay" style={{ backgroundColor: "rgba(24, 24, 24, 0.9)", borderColor: "rgba(216, 199, 170, 0.35)" }}>
              <div className="intro-overlay-num" style={{ color: "var(--color-gold)" }}>DEMO</div>
              <p className="intro-overlay-text" style={{ color: "#E0DDD5" }}>
                Solución interactiva para planear tu evento, elegir espacio, cotizar en vivo y verificar disponibilidad inmediata en Reynosa.
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div className="intro-content">
            <span className="eyebrow" style={{ color: "var(--color-stone)" }}>CONCEPTO COMERCIAL</span>
            <h2 className="intro-heading">
              Planea tu evento + Elige espacio + Cotiza + Consulta disponibilidad
            </h2>
            <p className="intro-text-concept">
              La Cantera Events combina la amplitud de un recinto de gran escala con una plataforma digital pensada para simplificar la toma de decisiones. Visualiza salones, elige tu montaje y proyecta tu cotización de manera transparente.
            </p>

            <div className="intro-points-grid">
              <div className="intro-point-card">
                <div className="intro-point-icon" style={{ backgroundColor: "var(--color-bg)", color: "var(--color-primary)" }}>
                  <BuildingIcon size={22} />
                </div>
                <h3 className="intro-point-title">Consulta de Espacios</h3>
                <p className="intro-point-desc">
                  Salón Principal, Formato Banquete o Salón Privado según la escala y naturaleza de tu evento.
                </p>
              </div>

              <div className="intro-point-card">
                <div className="intro-point-icon" style={{ backgroundColor: "var(--color-bg)", color: "var(--color-primary)" }}>
                  <CalendarIcon size={22} />
                </div>
                <h3 className="intro-point-title">Disponibilidad Inmediata</h3>
                <p className="intro-point-desc">
                  Comprueba en segundos si la fecha de tu celebración o congreso se encuentra libre en la agenda demo.
                </p>
              </div>

              <div className="intro-point-card">
                <div className="intro-point-icon" style={{ backgroundColor: "var(--color-bg)", color: "var(--color-primary)" }}>
                  <SparklesIcon size={22} />
                </div>
                <h3 className="intro-point-title">Formatos Flexibles</h3>
                <p className="intro-point-desc">
                  Montaje en banquete, auditorio, cóctel o conferencia, adaptado a eventos de 100 hasta más de 800 asistentes.
                </p>
              </div>

              <div className="intro-point-card">
                <div className="intro-point-icon" style={{ backgroundColor: "var(--color-bg)", color: "var(--color-primary)" }}>
                  <ShieldCheckIcon size={22} />
                </div>
                <h3 className="intro-point-title">Apartado Demostrativo</h3>
                <p className="intro-point-desc">
                  Generación de folio único para seguimiento comercial y simulación interactiva de anticipo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
