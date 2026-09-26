import React, { useState } from "react";
import { useEventData } from "../../hooks/useEventData";
import { EditIcon, CheckCircleIcon, BuildingIcon, UsersIcon, CalendarIcon } from "../../components/common/Icons";
import { StatusBadge } from "../../components/common/StatusBadge";
import { useTrackOnMount } from "../../analytics/analytics";

export const AdminSpacesPage = () => {
  const { spaces, updatePackage, events } = useEventData();
  const [editingSpace, setEditingSpace] = useState(null);
  const [saveNotice, setSaveNotice] = useState("");

  useTrackOnMount("admin_requests_opened", { module: "spaces" });

  const handleEditClick = (space) => {
    setEditingSpace({ ...space });
  };

  const handleSaveSpace = (e) => {
    e.preventDefault();
    if (!editingSpace) return;

    updatePackage(editingSpace.id, {
      name: editingSpace.name,
      type: editingSpace.type,
      priceFrom: editingSpace.priceFrom,
      priceNumber: Number(editingSpace.priceNumber) || 35000,
      capacity: editingSpace.capacity,
      description: editingSpace.description,
      status: editingSpace.status
    });

    setEditingSpace(null);
    setSaveNotice("¡Espacio demo actualizado con éxito y persistido en localStorage!");
    setTimeout(() => setSaveNotice(""), 3000);
  };

  // Conteo dinámico de eventos por espacio
  const getSpaceUpcomingCount = (space) => {
    const count = events.filter(e => 
      (e.spaceName && e.spaceName.toLowerCase().includes(space.name.toLowerCase())) ||
      (e.packageName && e.packageName.toLowerCase().includes(space.name.toLowerCase()))
    ).length;
    return count || space.upcomingEventsCount || 2;
  };

  return (
    <div>
      {saveNotice && (
        <div className="alert-banner alert-warning" style={{ backgroundColor: "#ECFDF5", color: "#065F46", borderColor: "#A7F3D0", marginBottom: "1.25rem" }}>
          <div className="alert-content-left">
            <CheckCircleIcon size={16} />
            <span>{saveNotice}</span>
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h2 style={{ fontSize: "1.35rem", color: "var(--color-charcoal-deep)" }}>
            Módulo de Espacios Demo · La Cantera Events
          </h2>
          <span style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)" }}>
            Configuración de salones, capacidades demostrativas, estado operativo y próximos eventos.
          </span>
        </div>

        <div style={{ padding: "0.5rem 1rem", backgroundColor: "#FEF3C7", borderRadius: "var(--radius-sm)", border: "1px solid #FDE68A", fontSize: "0.78rem", color: "#92400E" }}>
          * Capacidad y montaje sujetos a confirmación por el negocio.
        </div>
      </div>

      {/* Grid de Espacios Demo (Campos Requeridos: Nombre, Tipo, Capacidad demo, Estado, Próximos eventos) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {spaces.map((space) => {
          const upcomingCount = getSpaceUpcomingCount(space);
          return (
            <div 
              key={space.id} 
              className="card-editorial"
              style={{ padding: "1.75rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span className="status-badge badge-neutral" style={{ fontSize: "0.7rem", backgroundColor: "var(--color-bg)", color: "var(--color-primary)" }}>
                    {space.badge}
                  </span>
                  <StatusBadge status={space.status || "Disponible"} />
                </div>

                {/* 1. Nombre */}
                <h3 style={{ fontSize: "1.4rem", color: "var(--color-charcoal-deep)", marginBottom: "0.25rem" }}>
                  {space.name}
                </h3>

                {/* 2. Tipo */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "var(--color-stone)", marginBottom: "0.85rem", fontWeight: 600 }}>
                  <BuildingIcon size={15} style={{ color: "var(--color-gold)" }} />
                  <span>Tipo: {space.type}</span>
                </div>

                <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-primary)", marginBottom: "0.85rem" }}>
                  {space.priceFrom}
                </div>

                {/* 3. Capacidad demo */}
                <div style={{ padding: "0.75rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.84rem", color: "var(--color-text-secondary)", fontWeight: 600 }}>
                    <UsersIcon size={14} style={{ color: "var(--color-primary)" }} />
                    <span>Capacidad demo:</span>
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--color-primary)", marginTop: "0.2rem" }}>
                    {space.capacity}
                  </div>
                  <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", fontStyle: "italic", display: "block", marginTop: "0.2rem" }}>
                    Capacidad y montaje sujetos a confirmación por el negocio.
                  </span>
                </div>

                {/* 4. Próximos eventos */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--color-charcoal-deep)", marginBottom: "1rem", padding: "0.5rem 0.75rem", backgroundColor: "#ECFDF5", borderRadius: "var(--radius-xs)", border: "1px solid #A7F3D0" }}>
                  <CalendarIcon size={15} style={{ color: "#059669" }} />
                  <span>Próximos eventos en agenda: <strong>{upcomingCount} evento(s)</strong></span>
                </div>

                <p style={{ fontSize: "0.84rem", color: "var(--color-text-secondary)", lineHeight: 1.5, marginBottom: "1rem" }}>
                  {space.description}
                </p>

                <div style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
                  Incluye {space.includes.length} servicios de infraestructura y soporte logístico demo.
                </div>
              </div>

              <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid var(--border-light)" }}>
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm btn-block"
                  onClick={() => handleEditClick(space)}
                >
                  <EditIcon size={14} />
                  <span>Editar espacio demo</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de Edición de Espacio */}
      {editingSpace && (
        <div className="modal-overlay animate-fade-in" onClick={() => setEditingSpace(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: "520px" }}>
            <div className="modal-header">
              <h3 style={{ fontSize: "1.25rem" }}>Editar Espacio Demo: {editingSpace.name}</h3>
              <button type="button" onClick={() => setEditingSpace(null)} style={{ background: "none", border: "none", cursor: "pointer" }}>✕</button>
            </div>

            <form onSubmit={handleSaveSpace}>
              <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label className="form-label" htmlFor="edit-space-name">Nombre del espacio</label>
                  <input
                    type="text"
                    id="edit-space-name"
                    className="form-input"
                    value={editingSpace.name}
                    onChange={e => setEditingSpace({ ...editingSpace, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="form-label" htmlFor="edit-space-type">Tipo de espacio</label>
                  <input
                    type="text"
                    id="edit-space-type"
                    className="form-input"
                    value={editingSpace.type}
                    onChange={e => setEditingSpace({ ...editingSpace, type: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label className="form-label" htmlFor="edit-space-price-text">Texto de precio (Desde)</label>
                    <input
                      type="text"
                      id="edit-space-price-text"
                      className="form-input"
                      value={editingSpace.priceFrom}
                      onChange={e => setEditingSpace({ ...editingSpace, priceFrom: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label" htmlFor="edit-space-price-num">Valor base numérico (MXN)</label>
                    <input
                      type="number"
                      id="edit-space-price-num"
                      className="form-input"
                      value={editingSpace.priceNumber}
                      onChange={e => setEditingSpace({ ...editingSpace, priceNumber: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label" htmlFor="edit-space-capacity">Capacidad demo</label>
                  <input
                    type="text"
                    id="edit-space-capacity"
                    className="form-input"
                    value={editingSpace.capacity}
                    onChange={e => setEditingSpace({ ...editingSpace, capacity: e.target.value })}
                  />
                </div>

                <div>
                  <label className="form-label" htmlFor="edit-space-desc">Descripción</label>
                  <textarea
                    id="edit-space-desc"
                    className="form-textarea"
                    rows={3}
                    value={editingSpace.description}
                    onChange={e => setEditingSpace({ ...editingSpace, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="form-label" htmlFor="edit-space-status">Estado</label>
                  <select
                    id="edit-space-status"
                    className="form-input"
                    value={editingSpace.status}
                    onChange={e => setEditingSpace({ ...editingSpace, status: e.target.value })}
                  >
                    <option value="Disponible">Disponible</option>
                    <option value="En preparación">En preparación</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setEditingSpace(null)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
