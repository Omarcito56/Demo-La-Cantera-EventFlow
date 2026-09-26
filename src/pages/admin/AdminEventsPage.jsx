import React, { useState } from "react";
import { useEventData } from "../../hooks/useEventData";
import { SearchIcon, FilterIcon, CreditCardIcon, CheckCircleIcon } from "../../components/common/Icons";
import { StatusBadge } from "../../components/common/StatusBadge";
import { useTrackOnMount } from "../../analytics/analytics";

export const AdminEventsPage = () => {
  const { events, updateEventStatus, registerDepositDemo } = useEventData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [notice, setNotice] = useState("");

  useTrackOnMount("admin_events_opened", { module: "events" });

  const EVENT_STATUSES = [
    "Apartado",
    "Confirmado",
    "En preparación",
    "Realizado",
    "Cancelado"
  ];

  const filteredEvents = events.filter((evt) => {
    const matchesSearch = 
      (evt.folio && evt.folio.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (evt.clientName && evt.clientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (evt.eventType && evt.eventType.toLowerCase().includes(searchTerm.toLowerCase())) ||
      ((evt.spaceName || evt.packageName) && (evt.spaceName || evt.packageName).toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = filterStatus === "todos" || evt.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id, newStatus) => {
    updateEventStatus(id, newStatus);
    setNotice(`Estado del evento actualizado a "${newStatus}"`);
    setTimeout(() => setNotice(""), 3000);
  };

  const handleQuickPayment = (evt) => {
    const paymentAmt = Math.min(10000, evt.balance || 8000);
    if (paymentAmt <= 0) return;

    registerDepositDemo(evt.folio, {
      amount: paymentAmt,
      method: "Transferencia demo",
      clientName: evt.clientName,
      eventType: evt.eventType
    });
    setNotice(`Abono demo de $${paymentAmt.toLocaleString("es-MX")} registrado a ${evt.folio}`);
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
                placeholder="Buscar evento por folio, cliente o espacio..."
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
                {EVENT_STATUSES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ fontSize: "0.84rem", color: "var(--color-text-secondary)" }}>
            Eventos en agenda: <strong>{filteredEvents.length}</strong>
          </div>
        </div>

        {/* Tabla Oficial Requerida:
            Evento | Fecha | Asistentes | Espacio | Total | Pagado | Saldo | Estado (+ Folio y Acciones) */}
        <div className="table-responsive-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Folio</th>
                <th>Evento</th>
                <th>Fecha</th>
                <th>Asistentes</th>
                <th>Espacio</th>
                <th>Total</th>
                <th>Pagado</th>
                <th>Saldo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((evt) => (
                <tr key={evt.id}>
                  <td className="folio-cell">{evt.folio}</td>
                  <td style={{ fontWeight: 600 }}>
                    {evt.eventType}
                    <div style={{ fontSize: "0.74rem", color: "var(--color-text-muted)", fontWeight: 400 }} className="ph-mask">
                      {evt.clientName}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{evt.date}</td>
                  <td>{evt.guests} pax</td>
                  <td style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>
                    {evt.spaceName || evt.packageName || "Salón Principal"}
                  </td>
                  <td style={{ fontWeight: 600 }}>${(evt.total || 0).toLocaleString("es-MX")}</td>
                  <td style={{ color: "#059669", fontWeight: 600 }}>${(evt.paid || 0).toLocaleString("es-MX")}</td>
                  <td style={{ color: evt.balance > 0 ? "#DC2626" : "var(--color-text-muted)", fontWeight: 600 }}>
                    ${(evt.balance || 0).toLocaleString("es-MX")}
                  </td>
                  <td>
                    <StatusBadge status={evt.status} />
                  </td>
                  <td>
                    <div className="table-actions-cell">
                      <select
                        value={evt.status}
                        onChange={(e) => handleStatusChange(evt.id, e.target.value)}
                        style={{ padding: "0.25rem 0.45rem", borderRadius: "var(--radius-xs)", border: "1px solid var(--border-light)", fontSize: "0.75rem", cursor: "pointer" }}
                      >
                        {EVENT_STATUSES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>

                      {evt.balance > 0 && (
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          style={{ padding: "0.25rem 0.5rem", fontSize: "0.74rem" }}
                          onClick={() => handleQuickPayment(evt)}
                          title="Registrar abono demo"
                        >
                          <CreditCardIcon size={12} />
                          <span>Abono</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
