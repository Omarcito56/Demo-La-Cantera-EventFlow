import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useEventData } from "../../hooks/useEventData";
import { 
  initialExtrasData, 
  eventTypesList, 
  initialSpacesData,
  layoutOptionsList,
  guestRangesList,
  getDateAvailabilityStatus 
} from "../../data/eventFlowData";
import { 
  CalendarIcon, CheckIcon, SparklesIcon, 
  ArrowRightIcon, ArrowLeftIcon, AlertCircleIcon,
  HeartIcon, BriefcaseIcon, GiftIcon, AcademicIcon, StarIcon, UsersIcon,
  ChevronLeftIcon, ChevronRightIcon, BuildingIcon, UtensilsIcon, WineIcon
} from "../../components/common/Icons";

import { 
  trackEvent, 
  useTrackOnMount, 
  getGuestRange, 
  getEstimatedTotalRange 
} from "../../analytics/analytics";

export const QuotePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { spaces, business, createRequest } = useEventData();

  // Stepper Oficial de 8 Pasos
  const [currentStep, setCurrentStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");

  const today = new Date();
  const todayISO = today.toISOString().split("T")[0];

  // Leer parámetros de URL si viene de landing
  const paramDate = searchParams.get("fecha") || "";
  const paramType = searchParams.get("tipo") || "boda";
  const paramSpace = searchParams.get("espacio") || searchParams.get("paquete") || "salon-principal";

  const [quoteState, setQuoteState] = useState({
    eventType: paramType,
    guests: 250,
    guestRangeId: "251-500",
    spaceId: paramSpace,
    layoutId: "banquete",
    selectedExtras: ["catering", "audio", "iluminacion"],
    date: paramDate,
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    company: "",
    comments: "",
    privacyAccepted: false
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useTrackOnMount("quote_started", {
    flow_type: "event_quote_8steps",
    route: "/cotizar",
    has_initial_date: Boolean(paramDate),
    initial_event_type: paramType
  });

  // Espacio seleccionado
  const availableSpaces = (spaces && spaces.length >= 3) ? spaces : initialSpacesData;
  const selectedSpace = availableSpaces.find(s => s.id === quoteState.spaceId) || availableSpaces[0];

  // Montaje seleccionado
  const selectedLayout = layoutOptionsList.find(l => l.id === quoteState.layoutId) || layoutOptionsList[0];

  // Tipo de evento seleccionado
  const selectedTypeObj = eventTypesList.find(t => t.id === quoteState.eventType) || eventTypesList[0];

  // Precios base demostrativos
  const basePrice = selectedSpace.priceNumber || 45000;
  const baseGuests = selectedSpace.baseGuests || 200;
  const extraGuestPrice = selectedSpace.extraGuestPrice || 180;

  // Ajuste por asistentes adicionales demo
  const extraGuestsCount = Math.max(0, quoteState.guests - baseGuests);
  const guestsAdjustment = extraGuestsCount * extraGuestPrice;

  // Ajuste por montaje demo
  const layoutAdjustmentMap = {
    banquete: 0,
    auditorio: 2000,
    cocktail: 2500,
    conferencia: 2000,
    "cena-formal": 3500,
    otro: 0
  };
  const layoutAdjustment = layoutAdjustmentMap[quoteState.layoutId] || 0;

  // Suma de servicios extras demo
  const extrasTotal = quoteState.selectedExtras.reduce((sum, extraId) => {
    const extraObj = initialExtrasData.find(e => e.id === extraId);
    return sum + (extraObj ? extraObj.price : 0);
  }, 0);

  // Estimado Total DEMO
  const estimatedTotal = basePrice + guestsAdjustment + layoutAdjustment + extrasTotal;
  const suggestedDeposit = 8000; // Anticipo demo

  // Estados de disponibilidad para la fecha
  const getDateStatus = (dateStr) => {
    if (!dateStr) return null;
    return getDateAvailabilityStatus(dateStr);
  };

  const selectedDateStatus = getDateStatus(quoteState.date);

  // Vista de mes en el calendario
  const [calendarViewDate, setCalendarViewDate] = useState(() => {
    if (paramDate) {
      const parts = paramDate.split("-").map(Number);
      if (parts.length === 3 && !isNaN(parts[0])) {
        return new Date(parts[0], parts[1] - 1, 1);
      }
    }
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const viewYear = calendarViewDate.getFullYear();
  const viewMonth = calendarViewDate.getMonth();
  const isCurrentMonthView = viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const handlePrevMonth = () => {
    if (isCurrentMonthView) return;
    setCalendarViewDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  const monthLabel = calendarViewDate.toLocaleDateString("es-MX", {
    month: "long",
    year: "numeric"
  });

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInViewMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push({ isPlaceholder: true, key: `empty-${i}` });
  }
  for (let d = 1; d <= daysInViewMonth; d++) {
    const yyyy = viewYear;
    const mm = String(viewMonth + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    const iso = `${yyyy}-${mm}-${dd}`;
    const isPast = iso < todayISO;
    const isToday = iso === todayISO;
    const isSelected = quoteState.date === iso;
    const status = getDateStatus(iso);

    calendarDays.push({
      isPlaceholder: false,
      key: iso,
      iso,
      dayNum: d,
      isPast,
      isToday,
      isSelected,
      status
    });
  }

  // Manejo de pasos y validación
  const goToNextStep = () => {
    setErrorMsg("");

    // Validaciones específicas
    if (currentStep === 1 && !quoteState.eventType) {
      setErrorMsg("Por favor selecciona el tipo de evento que deseas organizar.");
      return;
    }

    if (currentStep === 2) {
      const g = Number(quoteState.guests);
      if (!g || g < 1) {
        setErrorMsg("Por favor indica una cantidad válida de asistentes esperados.");
        return;
      }
      trackEvent("guest_range_selected", {
        guests_count: g,
        guest_range: getGuestRange(g)
      });
    }

    if (currentStep === 3 && !quoteState.spaceId) {
      setErrorMsg("Por favor selecciona un espacio para tu evento.");
      return;
    }

    if (currentStep === 4 && !quoteState.layoutId) {
      setErrorMsg("Por favor selecciona un formato de montaje.");
      return;
    }

    if (currentStep === 6 && !quoteState.date) {
      setErrorMsg("Por favor selecciona una fecha en el calendario interactivo.");
      return;
    }

    if (currentStep === 7) {
      if (!quoteState.clientName.trim()) {
        setErrorMsg("Por favor ingresa tu nombre completo.");
        return;
      }
      if (!quoteState.clientPhone.trim() || quoteState.clientPhone.length < 8) {
        setErrorMsg("Por favor proporciona un número de teléfono o WhatsApp válido de 10 dígitos.");
        return;
      }
      if (!quoteState.clientEmail.trim() || !quoteState.clientEmail.includes("@")) {
        setErrorMsg("Por favor ingresa un correo electrónico válido para enviarte el folio.");
        return;
      }
      if (!quoteState.privacyAccepted) {
        setErrorMsg("Debes aceptar el aviso de privacidad demostrativo para continuar.");
        return;
      }
    }

    // Scroll to top of wizard
    const topElem = document.getElementById("quote-wizard-top");
    if (topElem) {
      topElem.scrollIntoView({ behavior: "smooth" });
    }

    setCurrentStep(prev => Math.min(8, prev + 1));
  };

  const goToPrevStep = () => {
    setErrorMsg("");
    const topElem = document.getElementById("quote-wizard-top");
    if (topElem) {
      topElem.scrollIntoView({ behavior: "smooth" });
    }
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleEventTypeSelect = (typeId) => {
    setQuoteState(prev => ({ ...prev, eventType: typeId }));
    trackEvent("quote_event_type_selected", {
      event_type: typeId
    });
  };

  const handleGuestRangeClick = (range) => {
    setQuoteState(prev => ({
      ...prev,
      guestRangeId: range.id,
      guests: range.defaultNum
    }));
  };

  const handleSpaceSelect = (spaceId) => {
    setQuoteState(prev => ({ ...prev, spaceId }));
    trackEvent("venue_selected", {
      space_id: spaceId
    });
  };

  const handleLayoutSelect = (layoutId) => {
    setQuoteState(prev => ({ ...prev, layoutId }));
    trackEvent("event_layout_selected", {
      layout_id: layoutId
    });
  };

  const handleToggleExtra = (extraId) => {
    setQuoteState(prev => {
      const exists = prev.selectedExtras.includes(extraId);
      const updated = exists 
        ? prev.selectedExtras.filter(id => id !== extraId)
        : [...prev.selectedExtras, extraId];
      return { ...prev, selectedExtras: updated };
    });
  };

  const handleDateSelect = (dayObj) => {
    if (dayObj.isPast) return;
    setQuoteState(prev => ({ ...prev, date: dayObj.iso }));
    trackEvent("quote_date_selected", {
      status: dayObj.status,
      date: dayObj.iso
    });
  };

  // Envío final de Solicitud (Paso 8)
  const handleSubmitQuote = (e) => {
    e.preventDefault();

    const createdReq = createRequest({
      clientName: quoteState.clientName,
      clientPhone: quoteState.clientPhone,
      clientEmail: quoteState.clientEmail,
      company: quoteState.company,
      eventType: selectedTypeObj.name,
      guests: quoteState.guests,
      spaceId: selectedSpace.id,
      spaceName: selectedSpace.name,
      layout: selectedLayout.name,
      packageBasePrice: basePrice,
      extras: quoteState.selectedExtras,
      extrasTotal,
      estimatedTotal,
      suggestedDeposit,
      date: quoteState.date,
      comments: quoteState.comments,
      status: "En revisión"
    });

    trackEvent("quote_completed", {
      event_type: selectedTypeObj.name,
      space_id: selectedSpace.id,
      layout_id: selectedLayout.id,
      guests_count: quoteState.guests,
      extras_count: quoteState.selectedExtras.length,
      estimated_total_range: getEstimatedTotalRange(estimatedTotal)
    });

    // Navegar a confirmación
    navigate("/confirmacion", { state: { request: createdReq } });
  };

  // Nombres de los 8 pasos oficiales
  const STEP_TITLES = [
    "01 Evento",
    "02 Asistentes",
    "03 Espacio",
    "04 Montaje",
    "05 Servicios",
    "06 Fecha",
    "07 Datos",
    "08 Resumen"
  ];

  return (
    <div className="quote-page-wrap" id="quote-wizard-top">
      <div className="container">
        {/* Header Cotizador */}
        <div className="quote-header-box">
          <span className="quote-demo-badge">COTIZACIÓN DEMOSTRATIVA</span>
          <h1 className="quote-title">Planea tu evento en La Cantera</h1>
          <p className="quote-subtext">
            Explora salones de gran formato, selecciona el montaje a tu medida y obtén una proyección estimada en tiempo real.
          </p>
        </div>

        {/* Stepper Oficial de 8 Pasos */}
        <nav className="stepper-nav" aria-label="Progreso de cotización">
          <div className="stepper-progress-line">
            <div 
              className="stepper-progress-fill" 
              style={{ width: `${((currentStep - 1) / 7) * 100}%` }}
            />
          </div>

          {STEP_TITLES.map((stepName, idx) => {
            const stepNumber = idx + 1;
            const isPassed = currentStep > stepNumber;
            const isCurrent = currentStep === stepNumber;

            return (
              <button 
                type="button"
                key={stepNumber}
                className={`stepper-step-item ${isCurrent ? "active" : ""} ${isPassed ? "completed" : ""}`}
                onClick={() => {
                  if (isPassed) setCurrentStep(stepNumber);
                }}
                disabled={!isPassed && !isCurrent}
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`Paso ${stepNumber}: ${stepName}`}
              >
                <div className="stepper-circle">
                  {isPassed ? <CheckIcon size={14} /> : stepNumber}
                </div>
                <span className="stepper-label">
                  {stepName}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Indicador visible en pantallas pequeñas y teléfonos */}
        <div className="stepper-mobile-current">
          <span className="eyebrow" style={{ color: "var(--color-gold)", marginBottom: "0.2rem", fontSize: "0.72rem" }}>
            PASO 0{currentStep} / 08
          </span>
          <div style={{ fontWeight: 700, fontSize: "1.08rem", color: "var(--color-charcoal-deep)" }}>
            {STEP_TITLES[currentStep - 1]?.replace(/^\d+\s*/, "")}
          </div>
        </div>

        {/* Mensaje de Error / Alerta */}
        {errorMsg && (
          <div className="alert-banner alert-warning animate-fade-in" style={{ maxWidth: "860px", margin: "0 auto 1.5rem" }}>
            <div className="alert-content-left">
              <AlertCircleIcon size={18} />
              <span>{errorMsg}</span>
            </div>
          </div>
        )}

        {/* Layout Grid: Stepper Form + Summary Sticky Bar */}
        <div className="quote-layout-grid">
          {/* Main Form Area */}
          <div className="quote-step-card">
            {/* ==================================================
                PASO 1: EVENTO
                ================================================== */}
            {currentStep === 1 && (
              <div className="animate-fade-in">
                <div className="step-header-box">
                  <span className="step-num-eyebrow">PASO 01 / 08</span>
                  <h2 className="quote-step-title">¿Qué tipo de evento estás organizando?</h2>
                  <p className="quote-step-desc">
                    Selecciona una categoría social o corporativa para adaptar las opciones y capacidades recomendadas.
                  </p>
                </div>

                <div className="type-picker-grid">
                  {eventTypesList.map((type) => {
                    const isSelected = quoteState.eventType === type.id;
                    return (
                      <div
                        key={type.id}
                        className={`type-picker-card ${isSelected ? "selected" : ""}`}
                        onClick={() => handleEventTypeSelect(type.id)}
                      >
                        <div className="type-picker-card-header">
                          <span className="type-picker-cat">
                            {type.category === "corporativo" ? "Corporativo" : "Social"}
                          </span>
                          {isSelected && <CheckIcon size={16} style={{ color: "var(--color-gold)" }} />}
                        </div>
                        <h4 className="type-picker-title">
                          {type.name}
                        </h4>
                        <p className="type-picker-subtitle">
                          {type.subtitle}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ==================================================
                PASO 2: ASISTENTES
                ================================================== */}
            {currentStep === 2 && (
              <div className="animate-fade-in">
                <div className="step-header-box">
                  <span className="step-num-eyebrow">PASO 02 / 08</span>
                  <h2 className="quote-step-title">¿Cuántas personas esperas?</h2>
                  <p className="quote-step-desc">
                    Elige un rango sugerido o escribe el número exacto estimado para tu celebración o convención.
                  </p>
                </div>

                <div style={{ margin: "2rem 0" }}>
                  <label className="form-label" style={{ marginBottom: "0.75rem", display: "block" }}>
                    Rangos de capacidad frecuentes:
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.75rem", marginBottom: "2rem" }}>
                    {guestRangesList.map((range) => {
                      const isSelected = quoteState.guestRangeId === range.id;
                      return (
                        <button
                          key={range.id}
                          type="button"
                          className={`btn ${isSelected ? "btn-primary" : "btn-outline"}`}
                          onClick={() => handleGuestRangeClick(range)}
                          style={{
                            padding: "0.85rem 0.5rem",
                            borderRadius: "var(--radius-sm)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0.25rem"
                          }}
                        >
                          <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>{range.label}</span>
                          <span style={{ fontSize: "0.72rem", opacity: 0.9 }}>{range.badge}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Número Personalizado */}
                  <div style={{ padding: "1.5rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                      <label htmlFor="custom-guests-input" className="form-label" style={{ margin: 0, fontWeight: 700 }}>
                        Número personalizado de asistentes:
                      </label>
                      <span style={{ fontSize: "0.82rem", color: "var(--color-stone)", fontWeight: 600 }}>
                        Recinto apto para gran formato
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <input
                        type="number"
                        id="custom-guests-input"
                        className="form-input ph-mask"
                        min="10"
                        max="2000"
                        step="10"
                        value={quoteState.guests}
                        onChange={(e) => setQuoteState({ ...quoteState, guests: Math.max(1, Number(e.target.value)), guestRangeId: "custom" })}
                        style={{ fontSize: "1.4rem", fontWeight: 700, maxWidth: "180px", textAlign: "center" }}
                      />
                      <span style={{ fontSize: "1rem", color: "var(--color-text-secondary)", fontWeight: 500 }}>
                        invitados proyectados
                      </span>
                    </div>

                    {quoteState.guests > 500 && (
                      <div style={{ marginTop: "0.85rem", fontSize: "0.82rem", color: "#92400E", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <SparklesIcon size={14} />
                        <span>Excelente: El Salón Principal de La Cantera cuenta con la escala ideal para este número de comensales.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ==================================================
                PASO 3: ESPACIO
                ================================================== */}
            {currentStep === 3 && (
              <div className="animate-fade-in">
                <div className="step-header-box">
                  <span className="step-num-eyebrow">PASO 03 / 08</span>
                  <h2 className="quote-step-title">Selecciona un espacio</h2>
                  <p className="quote-step-desc">
                    Elige la configuración de recinto que mejor se adapta a tu evento. Capacidad y montaje sujetos a confirmación por el negocio.
                  </p>
                </div>

                <div className="space-selection-grid">
                  {availableSpaces.map((space) => {
                    const isSelected = quoteState.spaceId === space.id;
                    return (
                      <div
                        key={space.id}
                        className={`space-card-item ${isSelected ? "selected" : ""}`}
                        onClick={() => handleSpaceSelect(space.id)}
                      >
                        <div className="space-card-img-wrap">
                          <img 
                            src={space.image} 
                            alt={space.name} 
                            loading="lazy"
                          />
                          <span className="space-card-badge">
                            {space.badge}
                          </span>
                          {isSelected && (
                            <span className="space-card-check">
                              <CheckIcon size={14} />
                            </span>
                          )}
                        </div>

                        <div className="space-card-body">
                          <div>
                            <h3 className="space-card-title">
                              {space.name}
                            </h3>
                            <div className="space-card-layout">
                              {space.layoutType}
                            </div>
                            <div className="space-card-price">
                              {space.priceFrom}
                            </div>
                            <p className="space-card-desc">
                              {space.description}
                            </p>
                          </div>

                          <div className="space-card-note">
                            * Capacidad y montaje sujetos a confirmación por el negocio.
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ==================================================
                PASO 4: MONTAJE
                ================================================== */}
            {currentStep === 4 && (
              <div className="animate-fade-in">
                <div className="step-header-box">
                  <span className="step-num-eyebrow">PASO 04 / 08</span>
                  <h2 className="quote-step-title">¿Cómo quieres montar tu evento?</h2>
                  <p className="quote-step-desc">
                    Elige el estilo de distribución para tus invitados o asistentes dentro de las instalaciones.
                  </p>
                </div>

                <div className="layout-selection-grid">
                  {layoutOptionsList.map((layout) => {
                    const isSelected = quoteState.layoutId === layout.id;
                    return (
                      <div
                        key={layout.id}
                        className={`layout-card-item ${isSelected ? "selected" : ""}`}
                        onClick={() => handleLayoutSelect(layout.id)}
                      >
                        <div className="layout-card-icon">
                          <UsersIcon size={22} />
                        </div>

                        <h4 className="layout-card-name">
                          {layout.name}
                        </h4>
                        <span style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-stone)", fontWeight: 700 }}>
                          {layout.recommendedGuests}
                        </span>
                        <p className="layout-card-desc">
                          {layout.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ==================================================
                PASO 5: SERVICIOS
                ================================================== */}
            {currentStep === 5 && (
              <div className="animate-fade-in">
                <div className="step-header-box">
                  <span className="step-num-eyebrow">PASO 05 / 08</span>
                  <h2 className="quote-step-title">Servicios adicionales</h2>
                  <p className="quote-step-desc">
                    Agrega los extras que requieras para complementar tu evento. Precios e inclusiones son demostrativos.
                  </p>
                </div>

                <div className="extras-selection-grid">
                  {initialExtrasData.map((extra) => {
                    const isChecked = quoteState.selectedExtras.includes(extra.id);
                    return (
                      <div
                        key={extra.id}
                        className={`extra-select-card ${isChecked ? "active" : ""}`}
                        onClick={() => handleToggleExtra(extra.id)}
                      >
                        <div className="extra-info-left">
                          <span className="extra-name">{extra.name}</span>
                          <span className="extra-price-tag">+${extra.price.toLocaleString("es-MX")} MXN</span>
                          <p style={{ fontSize: "0.78rem", color: "var(--color-text-secondary)", margin: "0.25rem 0 0 0", lineHeight: 1.35 }}>
                            {extra.description}
                          </p>
                        </div>
                        <div className="extra-toggle-switch">
                          <div className="toggle-knob" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ==================================================
                PASO 6: FECHA
                ================================================== */}
            {currentStep === 6 && (
              <div className="animate-fade-in">
                <div className="step-header-box">
                  <span className="step-num-eyebrow">PASO 06 / 08</span>
                  <h2 className="quote-step-title">Consulta tu fecha</h2>
                  <p className="quote-step-desc">
                    Selecciona en el calendario la fecha deseada para verificar su estado demostrativo.
                  </p>
                </div>

                <div className="quote-calendar-card">
                  {/* Navegación y Título del Mes */}
                  <div className="quote-calendar-header">
                    <div className="quote-calendar-month-title">
                      <CalendarIcon size={20} style={{ color: "var(--color-gold)" }} />
                      <span>{monthLabel}</span>
                    </div>

                    <div className="quote-calendar-nav">
                      <button 
                        type="button" 
                        className="quote-calendar-btn" 
                        onClick={handlePrevMonth}
                        disabled={isCurrentMonthView}
                        aria-label="Mes anterior"
                      >
                        <ChevronLeftIcon size={16} />
                      </button>

                      <button 
                        type="button" 
                        className="quote-calendar-btn" 
                        onClick={handleNextMonth}
                        aria-label="Mes siguiente"
                      >
                        <ChevronRightIcon size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Leyenda Elegante */}
                  <div className="quote-calendar-legend">
                    <div className="quote-calendar-legend-item">
                      <span className="quote-calendar-legend-dot" style={{ backgroundColor: "#10B981" }} />
                      <span>Disponible</span>
                    </div>
                    <div className="quote-calendar-legend-item">
                      <span className="quote-calendar-legend-dot" style={{ backgroundColor: "#F59E0B" }} />
                      <span>En consulta</span>
                    </div>
                    <div className="quote-calendar-legend-item">
                      <span className="quote-calendar-legend-dot" style={{ backgroundColor: "#B9A176" }} />
                      <span>Apartada</span>
                    </div>
                  </div>

                  {/* Cuadrícula de Días */}
                  <div className="quote-calendar-grid">
                    {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d, i) => (
                      <div key={i} className="quote-calendar-dow">
                        {d}
                      </div>
                    ))}

                    {calendarDays.map((day) => {
                      if (day.isPlaceholder) {
                        return <div key={day.key} className="quote-calendar-cell placeholder" />;
                      }

                      return (
                        <div
                          key={day.key}
                          onClick={() => !day.isPast && handleDateSelect(day)}
                          className={`quote-calendar-cell ${day.isPast ? "past" : `status-${day.status}`} ${day.isSelected ? "selected" : ""}`}
                        >
                          <span className="quote-calendar-cell-num">{day.dayNum}</span>
                          {!day.isPast && (
                            <span className={`quote-calendar-dot dot-${day.status}`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {quoteState.date && (
                  <div className="quote-selected-date-card animate-fade-in">
                    <div>
                      <span style={{ fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-stone)", fontWeight: 700 }}>
                        Fecha seleccionada
                      </span>
                      <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-primary)", textTransform: "capitalize", display: "flex", alignItems: "center", gap: "0.45rem", marginTop: "0.2rem" }}>
                        <CalendarIcon size={16} style={{ color: "var(--color-gold)" }} />
                        <span>{quoteState.date}</span>
                      </div>
                    </div>
                    <span style={{ fontSize: "0.8rem", padding: "0.35rem 0.75rem", borderRadius: "var(--radius-full)", backgroundColor: "#ECFDF5", color: "#065F46", fontWeight: 700 }}>
                      ✓ Fecha verificada
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* ==================================================
                PASO 7: DATOS
                ================================================== */}
            {currentStep === 7 && (
              <div className="animate-fade-in">
                <div className="step-header-box">
                  <span className="step-num-eyebrow">PASO 07 / 08</span>
                  <h2 className="quote-step-title">Datos de contacto</h2>
                  <p className="quote-step-desc">
                    Proporciona tus datos para generar tu folio único de seguimiento formal en La Cantera Events.
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.15rem", marginTop: "1.5rem" }}>
                  <div>
                    <label className="form-label" htmlFor="input-name">Nombre completo *</label>
                    <input
                      type="text"
                      id="input-name"
                      className="form-input ph-mask"
                      placeholder="Ej. Mariana Garza Villarreal"
                      value={quoteState.clientName}
                      onChange={(e) => setQuoteState({ ...quoteState, clientName: e.target.value })}
                      required
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label className="form-label" htmlFor="input-phone">WhatsApp / Teléfono *</label>
                      <input
                        type="tel"
                        id="input-phone"
                        className="form-input ph-mask"
                        placeholder="Ej. 899 925 2352"
                        value={quoteState.clientPhone}
                        onChange={(e) => setQuoteState({ ...quoteState, clientPhone: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="form-label" htmlFor="input-email">Correo electrónico *</label>
                      <input
                        type="email"
                        id="input-email"
                        className="form-input ph-mask"
                        placeholder="Ej. mariana.garza@gmail.com"
                        value={quoteState.clientEmail}
                        onChange={(e) => setQuoteState({ ...quoteState, clientEmail: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label" htmlFor="input-company">Empresa o Institución (Opcional)</label>
                    <input
                      type="text"
                      id="input-company"
                      className="form-input ph-mask"
                      placeholder="Ej. Consorcio Industrial / Universidad"
                      value={quoteState.company}
                      onChange={(e) => setQuoteState({ ...quoteState, company: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="form-label" htmlFor="input-comments">Comentarios o requerimientos especiales</label>
                    <textarea
                      id="input-comments"
                      className="form-textarea ph-mask"
                      rows={3}
                      placeholder="Indícanos si requieres escenario, pruebas de sonido, horario preferente o especificaciones de montaje..."
                      value={quoteState.comments}
                      onChange={(e) => setQuoteState({ ...quoteState, comments: e.target.value })}
                    />
                  </div>

                  {/* Checkbox de Privacidad Estricta */}
                  <div style={{ padding: "0.9rem 1rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)" }}>
                    <label style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", cursor: "pointer", fontSize: "0.82rem", color: "var(--color-text-secondary)" }}>
                      <input
                        type="checkbox"
                        checked={quoteState.privacyAccepted}
                        onChange={(e) => setQuoteState({ ...quoteState, privacyAccepted: e.target.checked })}
                        style={{ marginTop: "3px" }}
                      />
                      <span>
                        He leído y acepto el <strong>aviso de privacidad demostrativo</strong>. Entiendo que los precios, montajes, capacidades y disponibilidad mostrados son de carácter demostrativo para La Cantera Events. Sus datos están protegidos contra telemetría invasiva.
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* ==================================================
                PASO 8: RESUMEN Y ENVÍO
                ================================================== */}
            {currentStep === 8 && (
              <div className="animate-fade-in">
                <div className="step-header-box">
                  <span className="step-num-eyebrow">PASO 08 / 08</span>
                  <h2 className="quote-step-title">Resumen de tu cotización</h2>
                  <p className="quote-step-desc">
                    Revisa todos los parámetros seleccionados antes de enviar tu solicitud a revisión con La Cantera Events.
                  </p>
                </div>

                <div style={{ backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)", padding: "1.5rem", margin: "1.5rem 0" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem", marginBottom: "1.25rem" }}>
                    <div>
                      <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase" }}>Tipo de Evento:</span>
                      <div style={{ fontWeight: 700, color: "var(--color-primary)", fontSize: "1.05rem" }}>{selectedTypeObj.name}</div>
                    </div>

                    <div>
                      <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase" }}>Asistentes Proyectados:</span>
                      <div style={{ fontWeight: 700, color: "var(--color-primary)", fontSize: "1.05rem" }}>{quoteState.guests} personas</div>
                    </div>

                    <div>
                      <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase" }}>Espacio Elegido:</span>
                      <div style={{ fontWeight: 700, color: "var(--color-primary)", fontSize: "1.05rem" }}>{selectedSpace.name}</div>
                    </div>

                    <div>
                      <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase" }}>Montaje:</span>
                      <div style={{ fontWeight: 700, color: "var(--color-primary)", fontSize: "1.05rem" }}>{selectedLayout.name}</div>
                    </div>

                    <div>
                      <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase" }}>Fecha Consultada:</span>
                      <div style={{ fontWeight: 700, color: "var(--color-primary)", fontSize: "1.05rem" }}>{quoteState.date}</div>
                    </div>

                    <div>
                      <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase" }}>Contacto Demo:</span>
                      <div style={{ fontWeight: 600, color: "var(--color-primary)" }} className="ph-mask">{quoteState.clientName}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }} className="ph-mask">{quoteState.clientPhone}</div>
                    </div>
                  </div>

                  {/* Servicios Extras */}
                  <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "1rem", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                      Servicios adicionales ({quoteState.selectedExtras.length}):
                    </span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {quoteState.selectedExtras.length === 0 && (
                        <span style={{ fontSize: "0.82rem", color: "var(--color-text-muted)" }}>Ninguno seleccionado</span>
                      )}
                      {quoteState.selectedExtras.map(extraId => {
                        const extraObj = initialExtrasData.find(e => e.id === extraId);
                        return (
                          <span key={extraId} style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem", borderRadius: "3px", backgroundColor: "var(--color-surface)", border: "1px solid var(--border-light)" }}>
                            {extraObj?.name} (+${extraObj?.price.toLocaleString("es-MX")})
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Desglose de Estimado */}
                  <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem" }}>
                    <div>
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-primary)", textTransform: "uppercase" }}>
                        Estimado Total Demostrativo:
                      </span>
                      <div style={{ fontSize: "0.74rem", color: "var(--color-stone)" }}>
                        Base espacio + ajuste asistentes + montaje + servicios
                      </div>
                    </div>

                    <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--color-primary)" }}>
                      ${estimatedTotal.toLocaleString("es-MX")} MXN
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={handleSubmitQuote}
                    style={{ padding: "1.1rem", fontSize: "1.05rem", fontWeight: 700 }}
                  >
                    <SparklesIcon size={18} />
                    <span>Confirmar y Enviar Solicitud</span>
                    <ArrowRightIcon size={18} />
                  </button>
                  <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", display: "block", marginTop: "0.65rem" }}>
                    * Al enviar, se generará tu folio formal <strong>CAN-...</strong> con apartado demostrativo y seguimiento directo vía WhatsApp y correo.
                  </span>
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="step-actions-row">
              {currentStep > 1 ? (
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={goToPrevStep}
                >
                  <ArrowLeftIcon size={15} />
                  <span>Paso anterior</span>
                </button>
              ) : <div />}

              {currentStep < 8 ? (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={goToNextStep}
                >
                  <span>Siguiente paso</span>
                  <ArrowRightIcon size={15} />
                </button>
              ) : null}
            </div>
          </div>

          {/* Sticky Summary Bar / Sidebar Calculator */}
          <aside className="quote-sidebar-calculator">
            <h3 className="calc-sidebar-title">Resumen en Vivo</h3>
            <span className="calc-badge-demo">Cotización Estimada · DEMO</span>

            <div className="calc-breakdown-list">
              <div className="calc-line-item">
                <span>Tipo de evento:</span>
                <strong className="calc-line-val" style={{ color: "var(--color-charcoal-deep)" }}>{selectedTypeObj.name}</strong>
              </div>
              <div className="calc-line-item">
                <span>Asistentes estimados:</span>
                <strong className="calc-line-val" style={{ color: "var(--color-charcoal-deep)" }}>{quoteState.guests} personas</strong>
              </div>
              <div className="calc-line-item">
                <span>Espacio base:</span>
                <strong className="calc-line-val" style={{ color: "var(--color-charcoal-deep)" }}>{selectedSpace.name}</strong>
              </div>
              <div className="calc-line-item">
                <span>Configuración de montaje:</span>
                <strong className="calc-line-val" style={{ color: "var(--color-charcoal-deep)" }}>{selectedLayout.name}</strong>
              </div>
              <div className="calc-line-item">
                <span>Servicios y extras:</span>
                <strong className="calc-line-val" style={{ color: "var(--color-charcoal-deep)" }}>
                  {quoteState.selectedExtras.length > 0 ? `${quoteState.selectedExtras.length} seleccionados` : "Sin extras"}
                </strong>
              </div>
              <div className="calc-line-item">
                <span>Fecha tentativa:</span>
                <strong className="calc-line-val" style={{ color: "var(--color-charcoal-deep)" }}>{quoteState.date || "Por definir"}</strong>
              </div>
            </div>

            <div className="calc-total-box">
              <span className="calc-total-label">Inversión Estimada:</span>
              <div className="calc-total-val" style={{ color: "var(--color-primary)" }}>
                ${estimatedTotal.toLocaleString("es-MX")} <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-stone)" }}>MXN</span>
              </div>
            </div>

            <div className="calc-disclaimer">
              * Estimación demostrativa en tiempo real. La propuesta formal final se valida según agenda, requerimientos logísticos y banquete con el equipo de La Cantera Events.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
