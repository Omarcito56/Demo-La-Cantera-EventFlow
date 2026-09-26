import { useState, useEffect, useCallback } from "react";
import {
  initialBusinessData,
  initialSpacesData,
  initialRequestsData,
  initialQuotesData,
  initialEventsData,
  initialClientsData,
  initialPaymentsData
} from "../data/eventFlowData";
import { trackEvent } from "../analytics/analytics";

const STORAGE_KEYS = {
  BUSINESS: "eventflow_business",
  PACKAGES: "eventflow_packages",
  REQUESTS: "eventflow_requests",
  QUOTES: "eventflow_quotes",
  EVENTS: "eventflow_events",
  CLIENTS: "eventflow_clients",
  PAYMENTS: "eventflow_payments",
  CALENDAR_OVERRIDES: "eventflow_calendar_overrides",
  AUTH: "eventflow_auth",
  DATA_VERSION: "eventflow_version_lacantera_v1"
};

const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error leyendo ${key} de localStorage:`, e);
    return fallback;
  }
};

const setStored = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("eventflow_storage_updated"));
  } catch (e) {
    console.error(`Error guardando ${key} en localStorage:`, e);
  }
};

// Validador de integridad para asegurar que el catálogo tenga los espacios oficiales de La Cantera
const isValidCanteraCatalog = (pkgs) => {
  if (!Array.isArray(pkgs) || pkgs.length < 3) return false;
  const hasPrincipal = pkgs.some(p => p.id === "salon-principal");
  const hasBanquete = pkgs.some(p => p.id === "formato-banquete");
  const hasPrivado = pkgs.some(p => p.id === "salon-privado");
  return hasPrincipal && hasBanquete && hasPrivado;
};

export const useEventData = () => {
  const [business, setBusiness] = useState(() => {
    const stored = getStored(STORAGE_KEYS.BUSINESS, null);
    if (!stored) return initialBusinessData;
    return { ...initialBusinessData, ...stored };
  });
  const [packages, setPackages] = useState(() => {
    const stored = getStored(STORAGE_KEYS.PACKAGES, initialSpacesData);
    if (!isValidCanteraCatalog(stored)) {
      try {
        localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(initialSpacesData));
      } catch (err) {}
      return initialSpacesData;
    }
    return stored;
  });
  const [requests, setRequests] = useState(() => getStored(STORAGE_KEYS.REQUESTS, initialRequestsData));
  const [quotes, setQuotes] = useState(() => getStored(STORAGE_KEYS.QUOTES, initialQuotesData));
  const [events, setEvents] = useState(() => getStored(STORAGE_KEYS.EVENTS, initialEventsData));
  const [clients, setClients] = useState(() => getStored(STORAGE_KEYS.CLIENTS, initialClientsData));
  const [payments, setPayments] = useState(() => getStored(STORAGE_KEYS.PAYMENTS, initialPaymentsData));
  const [calendarOverrides, setCalendarOverrides] = useState(() => getStored(STORAGE_KEYS.CALENDAR_OVERRIDES, {}));

  const refreshFromStorage = useCallback(() => {
    // Inicialización limpia de datos para La Cantera Events con control de versión
    const storedBus = getStored(STORAGE_KEYS.BUSINESS, null);
    const storedPkgs = getStored(STORAGE_KEYS.PACKAGES, []);
    const storedVer = localStorage.getItem(STORAGE_KEYS.DATA_VERSION);
    
    const isOldData = !storedBus || 
      !storedBus.name || 
      !storedBus.name.includes("Cantera") || 
      !isValidCanteraCatalog(storedPkgs) ||
      storedVer !== "lacantera_v2";

    if (isOldData) {
      localStorage.setItem(STORAGE_KEYS.DATA_VERSION, "lacantera_v2");
      localStorage.setItem(STORAGE_KEYS.BUSINESS, JSON.stringify(initialBusinessData));
      localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(initialSpacesData));
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(initialRequestsData));
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(initialQuotesData));
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(initialEventsData));
      localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(initialClientsData));
      localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(initialPaymentsData));
      localStorage.setItem(STORAGE_KEYS.CALENDAR_OVERRIDES, JSON.stringify({}));
    }

    setBusiness(getStored(STORAGE_KEYS.BUSINESS, initialBusinessData));
    setPackages(getStored(STORAGE_KEYS.PACKAGES, initialSpacesData));
    setRequests(getStored(STORAGE_KEYS.REQUESTS, initialRequestsData));
    setQuotes(getStored(STORAGE_KEYS.QUOTES, initialQuotesData));
    setEvents(getStored(STORAGE_KEYS.EVENTS, initialEventsData));
    setClients(getStored(STORAGE_KEYS.CLIENTS, initialClientsData));
    setPayments(getStored(STORAGE_KEYS.PAYMENTS, initialPaymentsData));
    setCalendarOverrides(getStored(STORAGE_KEYS.CALENDAR_OVERRIDES, {}));
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      refreshFromStorage();
    };

    window.addEventListener("eventflow_storage_updated", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("eventflow_storage_updated", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [refreshFromStorage]);

  /**
   * Crea una nueva solicitud desde la web pública con folio correlativo CAN-000126+
   */
  const createRequest = (formData) => {
    const currentRequests = getStored(STORAGE_KEYS.REQUESTS, initialRequestsData);
    const currentClients = getStored(STORAGE_KEYS.CLIENTS, initialClientsData);
    const currentQuotes = getStored(STORAGE_KEYS.QUOTES, initialQuotesData);

    // Calcular siguiente folio secuencial CAN-
    let nextNum = 126;
    currentRequests.forEach((req) => {
      if (req.folio && req.folio.startsWith("CAN-")) {
        const numPart = parseInt(req.folio.replace("CAN-", ""), 10);
        if (!isNaN(numPart) && numPart >= nextNum) {
          nextNum = numPart + 1;
        }
      }
    });

    const paddedNum = String(nextNum).padStart(6, "0");
    const folio = `CAN-${paddedNum}`;

    const newRequest = {
      id: `req-${Date.now()}`,
      folio,
      clientName: formData.clientName || "Cliente Demo",
      clientPhone: formData.clientPhone || "",
      clientEmail: formData.clientEmail || "",
      company: formData.company || "",
      cityZone: formData.cityZone || "Reynosa, Tamaulipas",
      eventType: formData.eventType || "Boda",
      guests: Number(formData.guests) || 200,
      spaceId: formData.spaceId || formData.packageId || "salon-principal",
      spaceName: formData.spaceName || formData.packageName || "Salón Principal",
      packageName: formData.spaceName || formData.packageName || "Salón Principal",
      layout: formData.layout || "Banquete",
      packageBasePrice: Number(formData.packageBasePrice) || 35000,
      extras: formData.extras || [],
      extrasTotal: Number(formData.extrasTotal) || 0,
      estimatedTotal: Number(formData.estimatedTotal) || 45000,
      suggestedDeposit: Number(formData.suggestedDeposit) || 8000,
      date: formData.date || new Date().toISOString().split("T")[0],
      status: "En revisión",
      comments: formData.comments || "",
      createdAt: new Date().toISOString()
    };

    const updatedRequests = [newRequest, ...currentRequests];
    setStored(STORAGE_KEYS.REQUESTS, updatedRequests);

    // Crear/actualizar cliente demo
    const clientPhone = formData.clientPhone || "";
    const clientEmail = (formData.clientEmail || "").toLowerCase();
    const existingIndex = currentClients.findIndex(
      (c) => (clientPhone && c.phone === clientPhone) || (clientEmail && c.email.toLowerCase() === clientEmail)
    );

    let updatedClients = [...currentClients];
    if (existingIndex >= 0) {
      updatedClients[existingIndex] = {
        ...updatedClients[existingIndex],
        eventsCount: (updatedClients[existingIndex].eventsCount || 1) + 1,
        lastRequestDate: newRequest.date,
        estimatedTotal: `$${newRequest.estimatedTotal.toLocaleString("es-MX")} MXN`,
        status: "Activo"
      };
    } else {
      const newClient = {
        id: `cli-${Date.now()}`,
        name: newRequest.clientName,
        phone: newRequest.clientPhone,
        email: newRequest.clientEmail,
        company: newRequest.company,
        eventsCount: 1,
        lastRequestDate: newRequest.date,
        estimatedTotal: `$${newRequest.estimatedTotal.toLocaleString("es-MX")} MXN`,
        status: "Nuevo"
      };
      updatedClients = [newClient, ...updatedClients];
    }
    setStored(STORAGE_KEYS.CLIENTS, updatedClients);

    // Crear cotización inicial vinculada
    const newQuote = {
      id: `q-${Date.now()}`,
      folio: newRequest.folio,
      clientName: newRequest.clientName,
      clientEmail: newRequest.clientEmail,
      eventType: newRequest.eventType,
      spaceName: newRequest.spaceName,
      packageName: newRequest.spaceName,
      guests: newRequest.guests,
      servicesCount: (newRequest.extras || []).length,
      total: newRequest.estimatedTotal,
      date: newRequest.date,
      status: "Borrador",
      createdAt: new Date().toISOString()
    };
    setStored(STORAGE_KEYS.QUOTES, [newQuote, ...currentQuotes]);

    return newRequest;
  };

  /**
   * Cambia el estado de una solicitud
   */
  const updateRequestStatus = (id, newStatus) => {
    const current = getStored(STORAGE_KEYS.REQUESTS, initialRequestsData);
    const item = current.find((r) => r.id === id);
    const oldStatus = item ? item.status : "desconocido";

    const updated = current.map((req) => (req.id === id ? { ...req, status: newStatus } : req));
    setStored(STORAGE_KEYS.REQUESTS, updated);

    if (oldStatus !== newStatus) {
      trackEvent("request_status_changed", {
        from_status: oldStatus,
        to_status: newStatus
      });
    }
  };

  /**
   * Cambia el estado de una cotización
   */
  const updateQuoteStatus = (id, newStatus) => {
    const current = getStored(STORAGE_KEYS.QUOTES, initialQuotesData);
    const item = current.find((q) => q.id === id);
    const oldStatus = item ? item.status : "desconocido";

    const updated = current.map((q) => (q.id === id ? { ...q, status: newStatus } : q));
    setStored(STORAGE_KEYS.QUOTES, updated);

    if (oldStatus !== newStatus) {
      trackEvent("quote_status_changed", {
        from_status: oldStatus,
        to_status: newStatus
      });
    }
  };

  /**
   * Convierte una solicitud en un Evento formal
   */
  const convertRequestToEvent = (requestId) => {
    const currentRequests = getStored(STORAGE_KEYS.REQUESTS, initialRequestsData);
    const currentEvents = getStored(STORAGE_KEYS.EVENTS, initialEventsData);
    const req = currentRequests.find((r) => r.id === requestId);

    if (!req) return null;

    // Actualizar solicitud a Confirmada
    updateRequestStatus(requestId, "Confirmada");

    // Verificar si ya existe en eventos
    const existing = currentEvents.find((e) => e.folio === req.folio);
    if (existing) return existing;

    const depositAmt = req.suggestedDeposit || 8000;
    const newEvent = {
      id: `evt-${Date.now()}`,
      folio: req.folio,
      clientName: req.clientName,
      clientPhone: req.clientPhone,
      eventType: req.eventType,
      spaceName: req.spaceName || req.packageName || "Salón Principal",
      packageName: req.spaceName || req.packageName || "Salón Principal",
      date: req.date,
      guests: req.guests,
      total: req.estimatedTotal,
      paid: depositAmt,
      balance: Math.max(0, req.estimatedTotal - depositAmt),
      status: "Confirmado",
      zone: req.cityZone || "Reynosa, Tamaulipas"
    };

    setStored(STORAGE_KEYS.EVENTS, [newEvent, ...currentEvents]);

    trackEvent("event_created", {
      event_type: req.eventType,
      space_id: req.spaceId
    });

    return newEvent;
  };

  /**
   * Registra un anticipo demo (simulación 100% interactiva sin procesamiento de dinero real)
   */
  const registerDepositDemo = (folio, depositData = {}) => {
    const currentRequests = getStored(STORAGE_KEYS.REQUESTS, initialRequestsData);
    const currentPayments = getStored(STORAGE_KEYS.PAYMENTS, initialPaymentsData);
    const currentEvents = getStored(STORAGE_KEYS.EVENTS, initialEventsData);

    const req = currentRequests.find((r) => r.folio === folio);
    const amount = Number(depositData.amount) || (req ? req.suggestedDeposit : 8000);
    const method = depositData.method || "Transferencia demo";
    const clientName = req ? req.clientName : (depositData.clientName || "Cliente Demo");
    const eventType = req ? req.eventType : (depositData.eventType || "Evento");

    // Crear pago registrado
    const newPayment = {
      id: `pay-${Date.now()}`,
      folio,
      clientName,
      eventType,
      concept: "Anticipo",
      amount,
      method,
      date: new Date().toISOString().split("T")[0],
      status: "Pagado"
    };

    setStored(STORAGE_KEYS.PAYMENTS, [newPayment, ...currentPayments]);

    // Si la solicitud existe, cambiar estado a Confirmada
    if (req) {
      updateRequestStatus(req.id, "Confirmada");
    }

    // Actualizar o crear evento vinculado
    const eventIndex = currentEvents.findIndex((e) => e.folio === folio);
    if (eventIndex >= 0) {
      const updatedEvents = [...currentEvents];
      const prevPaid = updatedEvents[eventIndex].paid || 0;
      const newPaid = prevPaid + amount;
      updatedEvents[eventIndex] = {
        ...updatedEvents[eventIndex],
        paid: newPaid,
        balance: Math.max(0, updatedEvents[eventIndex].total - newPaid),
        status: "Confirmado"
      };
      setStored(STORAGE_KEYS.EVENTS, updatedEvents);
    } else if (req) {
      const newEvent = {
        id: `evt-${Date.now()}`,
        folio: req.folio,
        clientName: req.clientName,
        clientPhone: req.clientPhone,
        eventType: req.eventType,
        spaceName: req.spaceName || req.packageName || "Salón Principal",
        packageName: req.spaceName || req.packageName || "Salón Principal",
        date: req.date,
        guests: req.guests,
        total: req.estimatedTotal,
        paid: amount,
        balance: Math.max(0, req.estimatedTotal - amount),
        status: "Apartado",
        zone: req.cityZone || "Reynosa, Tamaulipas"
      };
      setStored(STORAGE_KEYS.EVENTS, [newEvent, ...currentEvents]);
    }

    trackEvent("deposit_demo_registered", {
      method,
      has_request: Boolean(req)
    });

    return newPayment;
  };

  /**
   * Actualiza el estado de un evento
   */
  const updateEventStatus = (id, newStatus) => {
    const current = getStored(STORAGE_KEYS.EVENTS, initialEventsData);
    const updated = current.map((e) => (e.id === id ? { ...e, status: newStatus } : e));
    setStored(STORAGE_KEYS.EVENTS, updated);
  };

  /**
   * Permite marcar/actualizar el estado de una fecha en el calendario admin y persistirlo
   * Estados: "Disponible", "Solicitud", "Cotización", "Apartado", "Confirmado", "Bloqueado"
   */
  const updateCalendarDayStatus = (dateStr, newStatus) => {
    const currentOverrides = getStored(STORAGE_KEYS.CALENDAR_OVERRIDES, {});
    const updated = { ...currentOverrides, [dateStr]: newStatus };
    setStored(STORAGE_KEYS.CALENDAR_OVERRIDES, updated);
    setCalendarOverrides(updated);
  };

  /**
   * Actualiza un espacio demo
   */
  const updatePackage = (id, updatedData) => {
    const current = getStored(STORAGE_KEYS.PACKAGES, initialSpacesData);
    const updated = current.map((p) => (p.id === id ? { ...p, ...updatedData } : p));
    setStored(STORAGE_KEYS.PACKAGES, updated);
  };

  /**
   * Actualiza datos generales de configuración
   */
  const updateBusiness = (updatedData) => {
    setStored(STORAGE_KEYS.BUSINESS, { ...business, ...updatedData });
  };

  /**
   * Restaura todos los datos demo a los valores predeterminados de fábrica de La Cantera Events
   */
  const resetDemoData = () => {
    localStorage.setItem(STORAGE_KEYS.DATA_VERSION, "lacantera_v1");
    localStorage.setItem(STORAGE_KEYS.BUSINESS, JSON.stringify(initialBusinessData));
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(initialSpacesData));
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(initialRequestsData));
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(initialQuotesData));
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(initialEventsData));
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(initialClientsData));
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(initialPaymentsData));
    localStorage.setItem(STORAGE_KEYS.CALENDAR_OVERRIDES, JSON.stringify({}));
    refreshFromStorage();
  };

  // Cálculo de Métricas demo para el Administrador de La Cantera Events
  const newRequestsCount = requests.filter((r) => r.status === "Nueva" || r.status === "En revisión").length;
  const upcomingEventsCount = events.filter((e) => e.status !== "Cancelado" && e.status !== "Realizado").length;
  const pendingQuotesCount = quotes.filter((q) => q.status === "Borrador" || q.status === "Cotizando" || q.status === "Enviada").length;

  // Asistentes proyectados oficiales requeridos:
  const projectedGuestsCount = events
    .filter((e) => e.status !== "Cancelado")
    .reduce((sum, e) => sum + (Number(e.guests) || 0), 0) +
    requests
    .filter((r) => r.status !== "Descartada")
    .reduce((sum, r) => sum + (Number(r.guests) || 0), 0);

  const totalDepositsSum = payments
    .filter((p) => p.status === "Pagado" && p.concept === "Anticipo")
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  const metrics = {
    // 5 Métricas DEMO del Dashboard:
    newRequests: newRequestsCount || 5,
    upcomingEvents: upcomingEventsCount || 4,
    pendingQuotes: pendingQuotesCount || 4,
    projectedGuests: projectedGuestsCount || 2350,
    totalDeposits: totalDepositsSum || 35000,
    // Métricas auxiliares para compatibilidad:
    confirmedEvents: events.filter((e) => e.status === "Confirmado" || e.status === "Apartado").length || 3,
    datesConsulted: 42 + requests.length,
    activePackagesCount: packages.filter((p) => p.status === "Disponible" || p.status === "Activo").length,
    totalClientsCount: clients.length
  };

  return {
    business,
    packages,
    spaces: packages,
    requests,
    quotes,
    events,
    clients,
    payments,
    calendarOverrides,
    metrics,
    createRequest,
    updateRequestStatus,
    updateQuoteStatus,
    convertRequestToEvent,
    registerDepositDemo,
    updateEventStatus,
    updateCalendarDayStatus,
    updatePackage,
    updateBusiness,
    resetDemoData,
    refreshFromStorage
  };
};
