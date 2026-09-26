import React, { useState } from "react";
import { useEventData } from "../../hooks/useEventData";
import { 
  EyeIcon, SearchIcon, FilterIcon, SparklesIcon, CheckCircleIcon 
} from "../../components/common/Icons";
import { StatusBadge } from "../../components/common/StatusBadge";
import { EventDetailModal } from "../../components/admin/EventDetailModal";
import { useTrackOnMount } from "../../analytics/analytics";

export const AdminRequestsPage = () => {
  const { requests, updateRequestStatus, convertRequestToEvent } = useEventData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [selectedItem, setSelectedItem] = useState(null);
  const [bannerNotice, setBannerNotice] = useState("");

  useTrackOnMount("admin_requests_opened", { module: "requests" });

  const REQUEST_STATUSES = [
    "Nueva",
    "En revisión",
    "Contactado",
    "Cotizando",
    "Esperando anticipo",
    "Confirmada",
    "Descartada"
  ];

  const filteredRequests = requests.filter((req) => {
    const matchesSearch = 
      (req.folio && req.folio.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (req.clientName && req.clientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (req.eventType && req.eventType.toLowerCase().includes(searchTerm.toLowerCase())) ||
      ((req.spaceName || req.packageName) && (req.spaceName || req.packageName).toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = filterStatus === "todos" || req.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleFastStatusChange = (id, newStatus) => {
    updateRequestStatus(id, newStatus);
    setBannerNotice(`Estado de la solicitud actualizado a "${newStatus}"`);
    setTimeout(() => setBannerNotice(""), 3000);
  };

  const handleFastConvert = (req) => {
    convertRequestToEvent(req.id);
    setBannerNotice(`¡Solicitud ${req.folio} convertida en Evento confirmado!`);
    setTimeout(() => setBannerNotice(""), 3000);
  };

  return (
    <div>
      {bannerNotice && (
        <div className="alert-banner alert-warning" style={{ backgroundColor: "#ECFDF5", color: "#065F46", borderColor: "#A7F3D0", marginBottom: "1.25rem" }}>
          <div className="alert-content-left">
            <CheckCircleIcon size={16} />
            <span>{bannerNotice}</span>
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
                placeholder="Buscar por folio, cliente o espacio..."
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
                {REQUEST_STATUSES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ fontSize: "0.84rem", color: "var(--color-text-secondary)" }}>
            Total solicitudes: <strong>{filteredRequests.length}</strong>
          </div>
        </div>

        {/* Tabla Oficial Requerida:
            Folio | Cliente | Evento | Asistentes | Espacio | Fecha | Estimado | Estado | Acciones */}
        <div className="table-responsive-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Folio</th>
                <th>Cliente</th>
                <th>Evento</th>
                <th>Asistentes</th>
                <th>Espacio</th>
                <th>Fecha</th>
                <th>Estimado</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req.id}>
                  <td className="folio-cell">{req.folio}</td>
                  <td className="client-name-cell ph-mask">
                    {req.clientName}
                    <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontWeight: 400 }}>
                      {req.clientPhone}
                    </div>
                  </td>
                  <td>{req.eventType}</td>
                  <td style={{ fontWeight: 600 }}>{req.guests} personas</td>
                  <td style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>
                    {req.spaceName || req.packageName || "Salón Principal"}
                  </td>
                  <td style={{ fontWeight: 600 }}>{req.date}</td>
                  <td style={{ fontWeight: 700, color: "var(--color-charcoal-deep)" }}>
                    ${(req.estimatedTotal || 0).toLocaleString("es-MX")} MXN
                  </td>
                  <td>
                    <StatusBadge status={req.status} />
                  </td>
                  <td>
                    <div className="table-actions-cell">
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        style={{ padding: "0.3rem 0.6rem", fontSize: "0.76rem" }}
                        onClick={() => setSelectedItem(req)}
                        title="Ver detalle completo"
                      >
                        <EyeIcon size={14} />
                        <span>Ver</span>
                      </button>

                      {/* Dropdown de cambio rápido de estado */}
                      <select
                        value={req.status}
                        onChange={(e) => handleFastStatusChange(req.id, e.target.value)}
                        style={{ padding: "0.25rem 0.5rem", borderRadius: "var(--radius-xs)", border: "1px solid var(--border-light)", fontSize: "0.75rem", cursor: "pointer" }}
                      >
                        {REQUEST_STATUSES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>

                      {req.status !== "Confirmada" && (
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          style={{ padding: "0.3rem 0.6rem", fontSize: "0.75rem", whiteSpace: "nowrap" }}
                          onClick={() => handleFastConvert(req)}
                          title="Convertir a evento confirmado"
                        >
                          <SparklesIcon size={12} />
                          <span>A Evento</span>
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

      <EventDetailModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};
