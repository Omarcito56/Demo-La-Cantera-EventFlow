import React, { useState } from "react";
import { useEventData } from "../../hooks/useEventData";
import { SearchIcon, FilterIcon, EyeIcon, XIcon, CheckCircleIcon } from "../../components/common/Icons";
import { StatusBadge } from "../../components/common/StatusBadge";
import { useTrackOnMount } from "../../analytics/analytics";

export const AdminQuotesPage = () => {
  const { quotes, updateQuoteStatus } = useEventData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [notice, setNotice] = useState("");

  useTrackOnMount("admin_quotes_opened", { module: "quotes" });

  const QUOTE_STATUSES = [
    "Borrador",
    "Enviada",
    "Aceptada",
    "Rechazada",
    "Vencida"
  ];

  const filteredQuotes = quotes.filter((q) => {
    const matchesSearch = 
      (q.folio && q.folio.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (q.clientName && q.clientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (q.eventType && q.eventType.toLowerCase().includes(searchTerm.toLowerCase())) ||
      ((q.spaceName || q.packageName) && (q.spaceName || q.packageName).toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = filterStatus === "todos" || q.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id, newStatus) => {
    updateQuoteStatus(id, newStatus);
    setNotice(`Estado de cotización actualizado a "${newStatus}"`);
    if (selectedQuote && selectedQuote.id === id) {
      setSelectedQuote({ ...selectedQuote, status: newStatus });
    }
    setTimeout(() => setNotice(""), 3000);
  };

  return (
    <div>
      {notice && (
        <div className="alert-banner alert-warning" style={{ backgroundColor: "#ECFDF5", color: "#065F46", borderColor: "#A7F3D0", marginBottom: "1.25rem" }}>
          <div className="alert-content-left">
            <CheckCircleIcon size={16} />
            <span>{notice}</span>
          </div>
        </div>
      )}

      <div className="admin-card-table">
        <div className="admin-table-toolbar">
          <div className="table-toolbar-left">
            <div className="table-search-input-wrap">
              <SearchIcon size={16} />
              <input
                type="text"
                placeholder="Buscar por cliente, evento o espacio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <FilterIcon size={16} style={{ color: "var(--color-text-muted)" }} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ padding: "0.45rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)", fontSize: "0.85rem" }}
              >
                <option value="todos">Todos los estados</option>
                {QUOTE_STATUSES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ fontSize: "0.84rem", color: "var(--color-text-secondary)" }}>
            Cotizaciones registradas: <strong>{filteredQuotes.length}</strong>
          </div>
        </div>

        {/* Tabla Oficial Requerida:
            Cliente | Evento | Asistentes | Espacio | Servicios | Total | Estado (+ Folio y Acciones) */}
        <div className="table-responsive-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Folio</th>
                <th>Cliente</th>
                <th>Evento</th>
                <th>Asistentes</th>
                <th>Espacio</th>
                <th>Servicios</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.map((quote) => (
                <tr key={quote.id}>
                  <td className="folio-cell">{quote.folio}</td>
                  <td className="client-name-cell ph-mask">
                    {quote.clientName}
                    <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                      {quote.clientEmail}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{quote.eventType}</td>
                  <td>{quote.guests || 200} pax</td>
                  <td style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>
                    {quote.spaceName || quote.packageName || "Salón Principal"}
                  </td>
                  <td>
                    <span style={{ fontSize: "0.82rem", padding: "0.2rem 0.5rem", borderRadius: "3px", backgroundColor: "var(--color-bg)", border: "1px solid var(--border-light)" }}>
                      {quote.servicesCount || 3} servicios demo
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: "var(--color-charcoal-deep)" }}>
                    ${(quote.total || 0).toLocaleString("es-MX")} MXN
                  </td>
                  <td>
                    <StatusBadge status={quote.status} />
                  </td>
                  <td>
                    <div className="table-actions-cell">
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        style={{ padding: "0.25rem 0.55rem", fontSize: "0.75rem" }}
                        onClick={() => setSelectedQuote(quote)}
                        title="Ver desglose completo"
                      >
                        <EyeIcon size={13} />
                        <span>Ver</span>
                      </button>

                      <select
                        value={quote.status}
                        onChange={(e) => handleStatusChange(quote.id, e.target.value)}
                        style={{ padding: "0.25rem 0.45rem", borderRadius: "var(--radius-xs)", border: "1px solid var(--border-light)", fontSize: "0.75rem", cursor: "pointer" }}
                      >
                        {QUOTE_STATUSES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detalle de Cotización */}
      {selectedQuote && (
        <div className="modal-overlay animate-fade-in" onClick={() => setSelectedQuote(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: "500px" }}>
            <div className="modal-header">
              <div>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-gold)", fontWeight: 700 }}>
                  Detalle de Cotización · La Cantera
                </span>
                <h3 style={{ fontSize: "1.25rem", color: "var(--color-charcoal-deep)" }}>
                  Folio: {selectedQuote.folio}
                </h3>
              </div>
              <button 
                type="button" 
                onClick={() => setSelectedQuote(null)} 
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)" }}
              >
                <XIcon size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Cliente</span>
                  <div style={{ fontWeight: 600, color: "var(--color-charcoal-deep)" }} className="ph-mask">{selectedQuote.clientName}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }} className="ph-mask">{selectedQuote.clientEmail}</div>
                </div>

                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Fecha del evento</span>
                  <div style={{ fontWeight: 600 }}>{selectedQuote.date}</div>
                </div>

                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Tipo de evento</span>
                  <div style={{ fontWeight: 600 }}>{selectedQuote.eventType}</div>
                </div>

                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Espacio seleccionado</span>
                  <div style={{ fontWeight: 600, color: "var(--color-primary)" }}>{selectedQuote.spaceName || selectedQuote.packageName}</div>
                </div>

                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Asistentes proyectados</span>
                  <div style={{ fontWeight: 600 }}>{selectedQuote.guests || 200} personas</div>
                </div>

                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Servicios adicionales</span>
                  <div style={{ fontWeight: 600 }}>{selectedQuote.servicesCount || 3} servicios demo</div>
                </div>
              </div>

              <div style={{ padding: "1rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-sm)", marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase" }}>Total cotizado (DEMO):</span>
                  <div style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--color-primary)" }}>
                    ${(selectedQuote.total || 0).toLocaleString("es-MX")} MXN
                  </div>
                </div>
                <StatusBadge status={selectedQuote.status} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
