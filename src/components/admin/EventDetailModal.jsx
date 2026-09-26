import React, { useState } from "react";
import { XIcon, CheckCircleIcon, SparklesIcon, CreditCardIcon } from "../common/Icons";
import { StatusBadge } from "../common/StatusBadge";
import { useEventData } from "../../hooks/useEventData";

export const EventDetailModal = ({ item, isOpen, onClose }) => {
  const { 
    updateRequestStatus, 
    convertRequestToEvent, 
    registerDepositDemo
  } = useEventData();

  const [statusVal, setStatusVal] = useState(item?.status || "Nueva");
  const [actionSuccess, setActionSuccess] = useState("");

  if (!isOpen || !item) return null;

  const handleStatusChange = (newStatus) => {
    setStatusVal(newStatus);
    updateRequestStatus(item.id, newStatus);
    setActionSuccess(`Estado actualizado a: ${newStatus}`);
    setTimeout(() => setActionSuccess(""), 3000);
  };

  const handleConvertToEvent = () => {
    convertRequestToEvent(item.id);
    setActionSuccess("¡Solicitud convertida con éxito en Evento en Agenda!");
    setTimeout(() => setActionSuccess(""), 3000);
  };

  const handleRegisterDeposit = () => {
    registerDepositDemo(item.folio, {
      amount: item.suggestedDeposit || 5000,
      method: "Transferencia demo",
      clientName: item.clientName,
      eventType: item.eventType
    });
    setActionSuccess("¡Anticipo demo registrado! La solicitud ahora está Confirmada.");
    setStatusVal("Confirmada");
    setTimeout(() => setActionSuccess(""), 3000);
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-accent)" }}>
              Detalle de Solicitud
            </span>
            <h3 style={{ fontSize: "1.3rem", color: "var(--color-charcoal-deep)" }}>
              Folio: {item.folio}
            </h3>
          </div>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)" }}>
            <XIcon size={20} />
          </button>
        </div>

        <div className="modal-body">
          {actionSuccess && (
            <div className="alert-banner alert-warning" style={{ marginBottom: "1rem", backgroundColor: "#ECFDF5", color: "#065F46", borderColor: "#A7F3D0" }}>
              <div className="alert-content-left">
                <CheckCircleIcon size={16} />
                <span>{actionSuccess}</span>
              </div>
            </div>
          )}

          {/* Estado y Acciones de Estado */}
          <div style={{ padding: "1rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-sm)", marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", display: "block" }}>Estado actual:</span>
              <StatusBadge status={statusVal} />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <label htmlFor="modal-status-select" style={{ fontSize: "0.82rem", fontWeight: 600 }}>Cambiar estado:</label>
              <select
                id="modal-status-select"
                value={statusVal}
                onChange={(e) => handleStatusChange(e.target.value)}
                style={{ padding: "0.35rem 0.65rem", borderRadius: "var(--radius-xs)", border: "1px solid var(--border-light)", fontSize: "0.84rem" }}
              >
                <option value="Nueva">Nueva</option>
                <option value="Contactado">Contactado</option>
                <option value="Cotizando">Cotizando</option>
                <option value="Esperando anticipo">Esperando anticipo</option>
                <option value="Confirmada">Confirmada</option>
                <option value="Descartada">Descartada</option>
              </select>
            </div>
          </div>

          {/* Grid de Información */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.5rem" }}>
            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Cliente / Contacto</span>
              <div style={{ fontWeight: 600, color: "var(--color-charcoal-deep)" }} className="ph-mask">{item.clientName}</div>
              <div style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)" }} className="ph-mask">{item.clientPhone} · {item.clientEmail}</div>
              {item.company && <div style={{ fontSize: "0.8rem", color: "var(--color-accent)", marginTop: "0.2rem" }} className="ph-mask">Empresa: {item.company}</div>}
            </div>

            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Tipo de Evento</span>
              <div style={{ fontWeight: 600, color: "var(--color-charcoal-deep)" }}>{item.eventType}</div>
            </div>

            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Fecha Tentativa</span>
              <div style={{ fontWeight: 600, color: "var(--color-charcoal-deep)" }}>{item.date}</div>
            </div>

            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Invitados Proyectados</span>
              <div style={{ fontWeight: 600, color: "var(--color-charcoal-deep)" }}>{item.guests} personas</div>
            </div>

            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Espacio Solicitado</span>
              <div style={{ fontWeight: 600, color: "var(--color-charcoal-deep)" }}>{item.spaceName || item.packageName || "Salón Principal"}</div>
            </div>

            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Montaje Sugerido</span>
              <div style={{ fontWeight: 600, color: "var(--color-charcoal-deep)" }}>{item.layoutType || "Banquete"}</div>
            </div>

            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Presupuesto Estimado (Demo)</span>
              <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--color-accent)" }}>
                ${(item.estimatedTotal || 0).toLocaleString("es-MX")} MXN
              </div>
            </div>

            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Anticipo Demo Sugerido</span>
              <div style={{ fontWeight: 600, color: "var(--color-charcoal-deep)" }}>
                ${(item.suggestedDeposit || 5000).toLocaleString("es-MX")} MXN
              </div>
            </div>

            {item.services && item.services.length > 0 && (
              <div style={{ gridColumn: "1 / -1" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Servicios Adicionales Demo:</span>
                <div style={{ fontSize: "0.85rem", color: "var(--color-charcoal-deep)", fontWeight: 500, marginTop: "0.25rem" }}>
                  {item.services.join(" · ")}
                </div>
              </div>
            )}
          </div>

          {/* Comentarios del cliente */}
          {item.comments && (
            <div style={{ padding: "0.85rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-sm)", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-muted)", display: "block", marginBottom: "0.25rem" }}>
                Notas y Requerimientos del Cliente:
              </span>
              <p style={{ fontSize: "0.86rem", color: "var(--color-text-primary)", margin: 0 }} className="ph-mask">
                {item.comments}
              </p>
            </div>
          )}

          {/* Acciones de Flujo Comercial */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", paddingTop: "0.5rem" }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleRegisterDeposit}
            >
              <CreditCardIcon size={15} />
              <span>Registrar anticipo demo</span>
            </button>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleConvertToEvent}
            >
              <SparklesIcon size={15} />
              <span>Convertir en Evento</span>
            </button>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
            Cerrar detalle
          </button>
        </div>
      </div>
    </div>
  );
};
