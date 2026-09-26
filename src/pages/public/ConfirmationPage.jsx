import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useEventData } from "../../hooks/useEventData";
import { 
  CheckIcon, CheckCircleIcon, ArrowLeftIcon, 
  CreditCardIcon, SparklesIcon, WhatsAppIcon, CalendarIcon,
  UsersIcon, ArrowRightIcon, BuildingIcon
} from "../../components/common/Icons";
import { StatusBadge } from "../../components/common/StatusBadge";
import { useTrackOnMount } from "../../analytics/analytics";

export const ConfirmationPage = () => {
  const location = useLocation();
  const { registerDepositDemo, requests } = useEventData();

  // Tomar la solicitud del state o de fallback mock oficial
  const request = location.state?.request || (requests && requests[0]) || {
    folio: "CAN-000128",
    clientName: "Cliente Demo",
    eventType: "Boda",
    spaceName: "Salón Principal",
    packageName: "Salón Principal",
    guests: 250,
    date: new Date().toISOString().split("T")[0],
    estimatedTotal: 45000,
    suggestedDeposit: 8000,
    status: "En revisión"
  };

  const [depositMethod, setDepositMethod] = useState("Transferencia");
  const [depositRegistered, setDepositRegistered] = useState(false);

  useTrackOnMount("deposit_demo_viewed", {
    route: "/confirmacion",
    has_request: Boolean(request?.folio)
  });

  const estimatedTotal = request.estimatedTotal || 45000;
  const depositAmount = request.suggestedDeposit || 8000;
  const remainingBalance = Math.max(0, estimatedTotal - depositAmount);

  const formatHumanDate = (dateStr) => {
    if (!dateStr) return "Por definir";
    const parts = dateStr.split("-").map(Number);
    if (parts.length === 3 && !isNaN(parts[0])) {
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      return d.toLocaleDateString("es-MX", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    }
    return dateStr;
  };

  const handleRegisterDeposit = () => {
    registerDepositDemo(request.folio, {
      amount: depositAmount,
      method: `${depositMethod} demo`,
      clientName: request.clientName,
      eventType: request.eventType
    });
    setDepositRegistered(true);
  };

  return (
    <div className="quote-page-wrap">
      <div className="container">
        <div className="confirmation-card-editorial animate-fade-in">
          {/* Success Check */}
          <div className="confirmation-success-icon" style={{ backgroundColor: "#181818", color: "var(--color-gold)", border: "2px solid var(--color-gold)" }}>
            <CheckIcon size={32} />
          </div>

          <span className="confirmation-folio-pill ph-mask" style={{ backgroundColor: "var(--color-bg)", border: "1px solid var(--border-arena)", color: "var(--color-primary)" }}>
            FOLIO DEMO: {request.folio}
          </span>

          <h1 className="confirmation-title">
            Tu solicitud fue registrada.
          </h1>

          <p className="confirmation-lead-text">
            La Cantera Events podrá revisar tu solicitud y ponerse en contacto contigo para confirmar disponibilidad de espacio y afinar los detalles de tu evento.
          </p>

          {/* Botón WhatsApp directo */}
          <div className="confirmation-whatsapp-container">
            <a 
              href={`https://wa.me/528999252352?text=${encodeURIComponent(`Hola La Cantera Events, acabo de enviar mi solicitud en línea con el folio demo ${request.folio} para mi evento.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp confirmation-wa-btn"
            >
              <WhatsAppIcon size={20} />
              <span>Seguir en WhatsApp (899 925 2352)</span>
            </a>
            <span className="confirmation-wa-note">
              Canal directo de atención y confirmación de disponibilidad
            </span>
          </div>

          {/* Details Card (Requeridos: Evento, Fecha, Asistentes, Espacio, Estimado, Estado) */}
          <div className="confirmation-details-card" style={{ border: "1px solid var(--border-light)", backgroundColor: "var(--color-surface)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "1.25rem" }}>
              <div>
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>Evento</span>
                <div style={{ fontWeight: 700, color: "var(--color-charcoal-deep)", fontSize: "1.05rem" }}>{request.eventType}</div>
              </div>

              <div>
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>Fecha</span>
                <div style={{ fontWeight: 700, color: "var(--color-charcoal-deep)", display: "flex", alignItems: "center", gap: "0.4rem", textTransform: "capitalize" }}>
                  <CalendarIcon size={14} style={{ color: "var(--color-gold)" }} />
                  <span>{formatHumanDate(request.date)}</span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>Asistentes</span>
                <div style={{ fontWeight: 600, color: "var(--color-charcoal-deep)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <UsersIcon size={14} style={{ color: "var(--color-stone)" }} />
                  <span>{request.guests} personas</span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>Espacio</span>
                <div style={{ fontWeight: 600, color: "var(--color-charcoal-deep)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <BuildingIcon size={14} style={{ color: "var(--color-gold)" }} />
                  <span>{request.spaceName || request.packageName || "Salón Principal"}</span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>Estimado DEMO</span>
                <div style={{ fontWeight: 800, color: "var(--color-primary)", fontSize: "1.1rem" }}>
                  ${estimatedTotal.toLocaleString("es-MX")} MXN
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>Estado</span>
                <div>
                  <StatusBadge status={depositRegistered ? "Confirmada" : (request.status || "En revisión")} />
                </div>
              </div>
            </div>
          </div>

          {/* ==================================================
              ANTICIPO DEMO: APARTA TU FECHA
              ================================================== */}
          <div className="deposit-demo-box" style={{ borderColor: "var(--border-arena)" }}>
            <span className="simulation-badge" style={{ backgroundColor: "#181818", color: "var(--color-gold)" }}>SIMULACIÓN INTERACTIVA</span>

            <div className="deposit-demo-header">
              <h3 style={{ fontSize: "1.35rem", color: "var(--color-charcoal-deep)" }}>Aparta tu fecha</h3>
              <p style={{ fontSize: "0.86rem", color: "var(--color-text-secondary)" }}>
                En una plataforma como EventFlow, los prospectos pueden asegurar su fecha mediante un anticipo pactado. Esta sección es una simulación interactiva sin cargos reales.
              </p>
            </div>

            <div className="deposit-amounts-row">
              <div className="deposit-amt-box">
                <span className="deposit-amt-label">Estimado:</span>
                <div className="deposit-amt-val">${estimatedTotal.toLocaleString("es-MX")}</div>
              </div>

              <div className="deposit-amt-box" style={{ borderColor: "var(--color-gold)", backgroundColor: "var(--color-gold-soft)" }}>
                <span className="deposit-amt-label">Anticipo demo:</span>
                <div className="deposit-amt-val" style={{ color: "var(--color-primary)" }}>
                  ${depositAmount.toLocaleString("es-MX")}
                </div>
              </div>

              <div className="deposit-amt-box">
                <span className="deposit-amt-label">Saldo:</span>
                <div className="deposit-amt-val">${remainingBalance.toLocaleString("es-MX")}</div>
              </div>
            </div>

            {!depositRegistered ? (
              <div>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--color-charcoal-deep)", display: "block", marginBottom: "0.6rem" }}>
                  Opciones visuales de anticipo demo:
                </span>

                <div className="deposit-method-choices">
                  <div 
                    className={`deposit-method-option ${depositMethod === "Transferencia" ? "selected" : ""}`}
                    onClick={() => setDepositMethod("Transferencia")}
                    style={depositMethod === "Transferencia" ? { borderColor: "var(--color-gold)", backgroundColor: "var(--color-gold-soft)" } : {}}
                  >
                    <span>🏦 Transferencia demo</span>
                  </div>

                  <div 
                    className={`deposit-method-option ${depositMethod === "Tarjeta" ? "selected" : ""}`}
                    onClick={() => setDepositMethod("Tarjeta")}
                    style={depositMethod === "Tarjeta" ? { borderColor: "var(--color-gold)", backgroundColor: "var(--color-gold-soft)" } : {}}
                  >
                    <CreditCardIcon size={18} />
                    <span>Tarjeta demo</span>
                  </div>
                </div>

                <button 
                  type="button" 
                  className="btn btn-primary btn-block confirmation-deposit-btn"
                  onClick={handleRegisterDeposit}
                  style={{ backgroundColor: "var(--color-primary)", color: "#FFFFFF" }}
                >
                  <SparklesIcon size={18} />
                  <span>Simular apartado con anticipo (${depositAmount.toLocaleString("es-MX")} MXN)</span>
                </button>

                <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", marginTop: "0.85rem", textAlign: "center" }}>
                  * No se procesa ningún cobro real ni se solicitan datos financieros. La acción simulará la confirmación inmediata en el panel de administración.
                </p>
              </div>
            ) : (
              <div className="deposit-success-banner animate-fade-in" style={{ backgroundColor: "#ECFDF5", borderColor: "#A7F3D0" }}>
                <div className="deposit-success-title" style={{ color: "#065F46" }}>
                  <CheckCircleIcon size={22} />
                  <span>¡Anticipo demo registrado con éxito!</span>
                </div>
                <p className="deposit-success-desc" style={{ color: "#047857" }}>
                  La fecha para tu evento ha sido apartada en la simulación con un anticipo demostrativo de <strong>${depositAmount.toLocaleString("es-MX")} MXN</strong>.
                </p>
                <div className="deposit-success-meta" style={{ color: "#065F46" }}>
                  <span>Folio: <strong>{request.folio}</strong></span>
                  <span>Saldo restante: <strong>${remainingBalance.toLocaleString("es-MX")} MXN</strong></span>
                </div>
                <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
                  <Link to="/admin/eventos" className="btn btn-secondary btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                    <span>Ver reflejado en panel administrativo</span>
                    <ArrowRightIcon size={14} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Botones de Retorno y Acceso a Admin */}
          <div className="confirmation-bottom-actions">
            <Link to="/" className="btn btn-outline btn-sm">
              <ArrowLeftIcon size={15} />
              <span>Volver al inicio</span>
            </Link>

            <Link to="/admin/login" className="btn btn-secondary btn-sm">
              <span>Ver panel administrativo demo</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
