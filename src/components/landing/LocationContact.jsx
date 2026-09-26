import React from "react";
import { ShieldCheckIcon, PhoneIcon, MailIcon, WhatsAppIcon, MapPinIcon, ArrowRightIcon } from "../common/Icons";
import { initialBusinessData } from "../../data/eventFlowData";
import { trackEvent } from "../../analytics/analytics";

export const LocationContact = () => {
  return (
    <section className="contact-editorial-section" id="contacto">
      <div className="container">
        <div className="contact-editorial-box">
          <span className="eyebrow" style={{ color: "var(--color-gold)" }}>ATENCIÓN Y CONTACTO</span>
          <h2 className="contact-title">
            Canales de Contacto Directo
          </h2>
          <p className="contact-desc">
            Comunícate con La Cantera Events para consultar disponibilidad, coordinar visitas a las instalaciones y resolver dudas de tu evento en Reynosa.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", margin: "2.5rem 0" }}>
            {/* Teléfono Card con Botón Llamar */}
            <div className="contact-email-card" style={{ borderColor: "var(--color-arena)", backgroundColor: "var(--color-surface)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div className="contact-email-row">
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)" }}>
                    <PhoneIcon size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-muted)", display: "block" }}>
                      Teléfono de Atención
                    </span>
                    <span className="contact-email-address" style={{ color: "var(--color-charcoal-deep)", fontWeight: 700, fontSize: "1.1rem" }}>
                      {initialBusinessData.phoneFormatted}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                <a 
                  href={`tel:${initialBusinessData.phone}`}
                  className="btn btn-primary contact-send-btn"
                  style={{ flex: 1, justifyContent: "center" }}
                  onClick={() => {
                    trackEvent("demo_cta_clicked", {
                      cta_name: "phone_call_click",
                      location: "contact_section"
                    });
                  }}
                >
                  <PhoneIcon size={16} />
                  <span>Llamar</span>
                </a>

                <a 
                  href={`https://wa.me/528999252352?text=${encodeURIComponent("Hola La Cantera Events, deseo consultar disponibilidad y espacios para mi evento.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp contact-send-btn"
                  style={{ backgroundColor: "#25D366", color: "#FFFFFF", borderColor: "#25D366", padding: "0 0.8rem" }}
                  title="WhatsApp directo"
                >
                  <WhatsAppIcon size={18} />
                </a>
              </div>
            </div>

            {/* Correo Card con Botón Enviar Correo */}
            <div className="contact-email-card" style={{ borderColor: "var(--color-arena)", backgroundColor: "var(--color-surface)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div className="contact-email-row">
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)" }}>
                    <MailIcon size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-muted)", display: "block" }}>
                      Correo Electrónico
                    </span>
                    <span className="contact-email-address" style={{ color: "var(--color-charcoal-deep)", fontWeight: 600, fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                      {initialBusinessData.email}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <a 
                  href={`mailto:${initialBusinessData.email}?subject=${encodeURIComponent("Consulta de Disponibilidad - La Cantera Events")}`}
                  className="btn btn-secondary contact-send-btn"
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={() => {
                    trackEvent("demo_cta_clicked", {
                      cta_name: "email_send_click",
                      location: "contact_section"
                    });
                  }}
                >
                  <MailIcon size={16} />
                  <span>Enviar correo</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mapa Interactivo con Dirección Exacta de Google Maps */}
          <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-sm)", backgroundColor: "var(--color-surface)", marginBottom: "2rem" }}>
            <iframe
              title="Ubicación de La Cantera Events en Google Maps"
              src="https://maps.google.com/maps?q=La+Cantera+Eventos+Reynosa+Tamaulipas&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="330"
              style={{ border: 0, display: "block", width: "100%" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div style={{ padding: "1.1rem 1.4rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.85rem", borderTop: "1px solid var(--border-light)", backgroundColor: "var(--color-surface)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem", maxWidth: "620px" }}>
                <div style={{ width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-gold)", flexShrink: 0, marginTop: "2px" }}>
                  <MapPinIcon size={16} />
                </div>
                <div>
                  <strong style={{ fontSize: "0.92rem", color: "var(--color-charcoal-deep)", display: "block" }}>
                    La Cantera Eventos · {initialBusinessData.city}
                  </strong>
                  <span style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)", lineHeight: 1.4, display: "block" }}>
                    {initialBusinessData.address}
                  </span>
                </div>
              </div>

              <a
                href={initialBusinessData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}
              >
                <span>Cómo llegar (Maps)</span>
                <ArrowRightIcon size={14} />
              </a>
            </div>
          </div>

          <div className="contact-disclaimer-box" style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-arena)" }}>
            <ShieldCheckIcon size={18} className="contact-disclaimer-icon" style={{ color: "var(--color-gold)" }} />
            <p className="contact-disclaimer-text">
              {initialBusinessData.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
