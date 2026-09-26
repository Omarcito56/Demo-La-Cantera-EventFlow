import React from "react";
import { Link } from "react-router-dom";
import { LaCanteraLogoIcon, WhatsAppIcon, MailIcon, PhoneIcon, MapPinIcon } from "../common/Icons";
import { initialBusinessData } from "../../data/eventFlowData";

export const Footer = () => {
  return (
    <footer className="footer-editorial">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "var(--color-black)", color: "var(--color-gold)", border: "1px solid var(--color-arena)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LaCanteraLogoIcon size={22} />
              </div>
              <h3 className="footer-brand-title">{initialBusinessData.name}</h3>
            </div>
            <span className="footer-brand-subtitle">Large Event Venue Experience · Reynosa, Tamaulipas</span>
            <p className="footer-brand-desc">
              Recinto de gran escala arquitectónica para bodas de gala, graduaciones masivas, congresos, conferencias y eventos empresariales.
            </p>
          </div>

          {/* Nav Col 1 */}
          <div>
            <h4 className="footer-col-heading">Navegación</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item"><Link to="/">Inicio</Link></li>
              <li className="footer-link-item"><a href="#espacios">Espacios demo</a></li>
              <li className="footer-link-item"><a href="#corporativo">Eventos corporativos</a></li>
              <li className="footer-link-item"><a href="#eventos">Formatos y montajes</a></li>
              <li className="footer-link-item"><a href="#disponibilidad">Disponibilidad en vivo</a></li>
              <li className="footer-link-item"><Link to="/cotizar">Cotizador interactivo</Link></li>
              <li className="footer-link-item"><a href="#contacto">Contacto y atención</a></li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div>
            <h4 className="footer-col-heading">Tipos de Evento</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item"><Link to="/cotizar?tipo=boda">Bodas magnas</Link></li>
              <li className="footer-link-item"><Link to="/cotizar?tipo=xv-anos">XV Años de gala</Link></li>
              <li className="footer-link-item"><Link to="/cotizar?tipo=graduacion">Graduaciones</Link></li>
              <li className="footer-link-item"><Link to="/cotizar?tipo=posada">Posadas y fin de año</Link></li>
              <li className="footer-link-item"><Link to="/cotizar?tipo=conferencia">Conferencias</Link></li>
              <li className="footer-link-item"><Link to="/cotizar?tipo=congreso">Congresos masivos</Link></li>
              <li className="footer-link-item"><Link to="/cotizar?tipo=evento-empresarial">Cenas empresariales</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="footer-col-heading">Atención y Citas</h4>
            <div className="footer-contact-info">
              <a 
                href={`tel:${initialBusinessData.phone}`}
                className="footer-contact-pill"
                style={{ color: "#FFFFFF" }}
              >
                <PhoneIcon size={15} style={{ color: "var(--color-gold)" }} />
                <span>Tel: {initialBusinessData.phoneFormatted}</span>
              </a>

              <a 
                href={initialBusinessData.whatsappUrl + "?text=" + encodeURIComponent("Hola La Cantera Events, deseo solicitar informes para mi evento.")} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-contact-pill"
                style={{ borderColor: "rgba(37, 211, 102, 0.4)", color: "#FFFFFF" }}
              >
                <WhatsAppIcon size={16} style={{ color: "#25D366" }} />
                <span>WhatsApp: {initialBusinessData.phoneFormatted}</span>
              </a>

              <a 
                href={`mailto:${initialBusinessData.email}`} 
                className="footer-contact-pill"
                style={{ color: "#FFFFFF" }}
              >
                <MailIcon size={15} style={{ color: "var(--color-gold)" }} />
                <span>{initialBusinessData.email}</span>
              </a>

              <a 
                href={initialBusinessData.googleMapsUrl}
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-contact-pill"
                style={{ color: "#FFFFFF" }}
              >
                <MapPinIcon size={15} style={{ color: "var(--color-gold)", flexShrink: 0 }} />
                <span>{initialBusinessData.addressShort}, {initialBusinessData.city}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="footer-legal-disclaimer">
          {initialBusinessData.disclaimer}
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} {initialBusinessData.name}. Todos los derechos reservados.
          </div>

          <div className="footer-bs-code-tag">
            {initialBusinessData.footerNote}
          </div>

          <div>
            <Link to="/admin/login" className="footer-admin-link">
              Acceso a Panel EventFlow Admin →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
