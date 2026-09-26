import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LaCanteraLogoIcon, MenuIcon, XIcon, ArrowRightIcon, CalendarIcon, WhatsAppIcon } from "../common/Icons";
import { initialBusinessData } from "../../data/eventFlowData";
import { trackEvent } from "../../analytics/analytics";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (hashId) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${hashId}`);
      return;
    }
    const elem = document.getElementById(hashId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCtaClick = (ctaName, targetRoute) => {
    trackEvent("demo_cta_clicked", {
      cta_name: ctaName,
      location: "navbar",
      target_route: targetRoute
    });
    setMobileOpen(false);
  };

  return (
    <header className={`navbar-editorial ${isScrolled ? "scrolled" : ""}`}>
      <div className="container navbar-container">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          <div className="navbar-brand-emblem" style={{ backgroundColor: "#181818", color: "#B9A176", borderColor: "#D8C7AA" }}>
            <LaCanteraLogoIcon size={24} />
          </div>
          <div className="navbar-brand-text">
            <span className="navbar-brand-title">La Cantera</span>
            <span className="navbar-brand-subtitle">Events</span>
          </div>
        </Link>

        {/* Desktop Links (Exact required order: Inicio, Espacios, Eventos, Cotiza, Disponibilidad, Contacto) */}
        <ul className={`navbar-links ${mobileOpen ? "mobile-open" : ""}`}>
          <li>
            <Link 
              to="/" 
              className={`navbar-link ${location.pathname === "/" && !location.hash ? "active" : ""}`}
              onClick={() => { setMobileOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              Inicio
            </Link>
          </li>
          <li>
            <a 
              href="#espacios" 
              className="navbar-link"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("espacios");
              }}
            >
              Espacios
            </a>
          </li>
          <li>
            <a 
              href="#eventos" 
              className="navbar-link"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("eventos");
              }}
            >
              Eventos
            </a>
          </li>
          <li>
            <Link 
              to="/cotizar" 
              className={`navbar-link ${location.pathname === "/cotizar" ? "active" : ""}`}
              onClick={() => {
                setMobileOpen(false);
                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              }}
            >
              Cotiza
            </Link>
          </li>
          <li>
            <a 
              href="#disponibilidad" 
              className="navbar-link"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("disponibilidad");
              }}
            >
              Disponibilidad
            </a>
          </li>
          <li>
            <a 
              href="#contacto" 
              className="navbar-link"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("contacto");
              }}
            >
              Contacto
            </a>
          </li>

          {/* Mobile Actions inside Drawer */}
          <li className="navbar-mobile-actions">
            <Link 
              to="/cotizar" 
              className="btn btn-primary btn-block"
              onClick={() => {
                handleCtaClick("planear_evento_mobile", "/cotizar");
                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              }}
            >
              <ArrowRightIcon size={16} />
              <span>Planear mi evento</span>
            </Link>
            <a 
              href="#disponibilidad" 
              className="btn btn-secondary btn-block"
              onClick={(e) => {
                e.preventDefault();
                handleCtaClick("consultar_fecha_mobile", "#disponibilidad");
                handleNavClick("disponibilidad");
              }}
            >
              <CalendarIcon size={16} />
              <span>Consultar fecha</span>
            </a>
            <a 
              href={`https://wa.me/528999252352?text=${encodeURIComponent("Hola La Cantera Events, deseo consultar disponibilidad y espacios para mi evento")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-block"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
            >
              <WhatsAppIcon size={18} />
              <span>WhatsApp 899 925 2352</span>
            </a>
          </li>
        </ul>

        {/* Actions Desktop */}
        <div className="navbar-actions">
          {/* Segundo CTA: Consultar fecha */}
          <a 
            href="#disponibilidad" 
            className="btn btn-secondary btn-sm navbar-action-calendar"
            onClick={(e) => {
              e.preventDefault();
              handleCtaClick("consultar_fecha", "#disponibilidad");
              handleNavClick("disponibilidad");
            }}
          >
            <CalendarIcon size={15} />
            <span>Consultar fecha</span>
          </a>

          {/* CTA Principal: Planear mi evento */}
          <Link 
            to="/cotizar" 
            className="btn btn-primary btn-sm navbar-action-quote"
            onClick={() => handleCtaClick("planear_mi_evento", "/cotizar")}
          >
            <span>Planear mi evento</span>
            <ArrowRightIcon size={14} />
          </Link>

          {/* Mobile hamburger button */}
          <button 
            type="button" 
            className="navbar-toggle-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú principal"
          >
            {mobileOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};
