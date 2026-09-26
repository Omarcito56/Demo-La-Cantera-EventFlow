import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LaCanteraLogoIcon, ArrowLeftIcon, AlertCircleIcon, ArrowRightIcon, SparklesIcon } from "../../components/common/Icons";
import { trackEvent, useTrackOnMount } from "../../analytics/analytics";

export const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useTrackOnMount("admin_login_opened", { route: "/admin/login" });

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const validEmail = email.trim().toLowerCase();
    if ((validEmail === "admin@eventflow.demo" || validEmail === "lacantera@eventflow.demo" || validEmail === "eventoslacantera@hotmail.com" || validEmail === "admin@lacantera.demo") && password === "demo123") {
      trackEvent("admin_login_success", { route: "/admin/dashboard" });
      localStorage.setItem("eventflow_auth", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Credenciales incorrectas. Utiliza el usuario demo indicado abajo.");
    }
  };

  const handleFillDemoCreds = () => {
    setEmail("admin@eventflow.demo");
    setPassword("demo123");
    setError("");
  };

  return (
    <div className="login-page-wrap">
      <div className="login-card animate-fade-in">
        <div className="login-brand-header">
          <div className="login-logo-circle" style={{ backgroundColor: "var(--color-charcoal-deep)", color: "var(--color-sand)" }}>
            <LaCanteraLogoIcon size={26} />
          </div>
          <span className="login-demo-pill">Panel Administrativo Demo</span>
          <h1 style={{ fontSize: "1.6rem", color: "var(--color-charcoal-deep)", marginBottom: "0.35rem" }}>
            EventFlow Admin
          </h1>
          <p style={{ fontSize: "0.88rem", color: "var(--color-text-secondary)" }}>
            La Cantera Events
          </p>
        </div>

        {error && (
          <div className="alert-banner alert-warning" style={{ marginBottom: "1.25rem" }}>
            <div className="alert-content-left">
              <AlertCircleIcon size={16} />
              <span>{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form">
          <div>
            <label className="form-label" htmlFor="admin-email">
              Correo electrónico demo
            </label>
            <input
              type="email"
              id="admin-email"
              className="form-input"
              value={email}
              placeholder="admin@eventflow.demo"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="form-label" htmlFor="admin-pass">
              Contraseña demo
            </label>
            <input
              type="password"
              id="admin-pass"
              className="form-input"
              value={password}
              placeholder="demo123"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: "0.5rem" }}>
            <span>Ingresar al panel</span>
            <ArrowRightIcon size={16} />
          </button>
        </form>

        {/* Botón rápido para demo */}
        <div className="login-quick-creds">
          <p style={{ fontWeight: 600, color: "var(--color-charcoal-deep)", marginBottom: "0.35rem", fontSize: "0.85rem" }}>
            Credenciales de prueba:
          </p>
          <div style={{ fontFamily: "monospace", fontSize: "0.84rem", color: "var(--color-text-primary)", marginBottom: "0.75rem" }}>
            Usuario: <strong>admin@eventflow.demo</strong><br />
            Contraseña: <strong>demo123</strong>
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-sm btn-block"
            onClick={handleFillDemoCreds}
          >
            <SparklesIcon size={14} />
            <span>Autocompletar credenciales demo</span>
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link to="/" style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
            <ArrowLeftIcon size={14} />
            <span>Volver al sitio público de La Cantera Events</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
