/**
 * Datos iniciales y catálogo comercial para BS EventFlow
 * Propuesta demostrativa: LA CANTERA EVENTS (Reynosa, Tamaulipas)
 * Concepto: "Large Event Venue Experience" (Gran escala social y corporativa)
 */

export const initialBusinessData = {
  name: "La Cantera Events",
  brandShort: "La Cantera",
  category: "Recinto para Grandes Eventos",
  tagline: "Un espacio. Muchas formas de celebrar.",
  city: "Reynosa, Tamaulipas",
  address: "Jose de Escandón No. 1385, Av. Praxedis Balboa esq, 88670 Reynosa, Tamps.",
  addressShort: "Jose de Escandón No. 1385, esq. Av. Praxedis Balboa",
  postalCode: "88670",
  googleMapsUrl: "https://maps.app.goo.gl/11h2H5GBkfS7M12n7",
  phone: "8999252352",
  phoneFormatted: "899 925 2352",
  whatsappUrl: "https://wa.me/528999252352",
  email: "eventoslacantera@hotmail.com",
  heroTitle: "Un espacio.\nMuchas formas de celebrar.",
  heroSubtitle: "Explora opciones, selecciona el formato de tu evento y solicita una cotización inicial de manera sencilla.",
  conceptText: "PLANEA TU EVENTO + ELIGE ESPACIO + COTIZA + CONSULTA DISPONIBILIDAD.",
  disclaimer: "Capacidad, montajes, precios y disponibilidad mostrados con fines demostrativos para La Cantera Events. Capacidad y montaje sujetos a confirmación por el negocio.",
  footerNote: "Propuesta comercial demostrativa desarrollada por BS Code para La Cantera Events."
};

// Espacios DEMO Oficiales
export const initialSpacesData = [
  {
    id: "salon-principal",
    name: "Salón Principal",
    type: "Gran Recinto / Gran Formato",
    badge: "Gran Escala",
    popular: true,
    priceFrom: "Desde $45,000 MXN",
    priceNumber: 45000,
    baseGuests: 300,
    extraGuestPrice: 180,
    capacity: "Gran capacidad demo (Sujeto a confirmación)",
    capacityNote: "Capacidad y montaje sujetos a confirmación por el negocio.",
    layoutType: "Auditorio / Escenario / Gran Banquete",
    idealEvents: ["Bodas magnas", "Graduaciones masivas", "Congresos y convenciones", "Posadas empresariales"],
    description: "Imponente salón de gran escala y alta capacidad arquitectónica con escenario principal, acústica envolvente e infraestructura técnica para eventos masivos y magnos espectáculos.",
    includes: [
      "Uso de salón de gran formato climatizado con accesos de alta afluencia",
      "Escenario principal y área para presidium o pista de gala",
      "Iluminación perimetral arquitectónica y estructura para pantallas",
      "Mobiliario base de gran capacidad distribuible según formato",
      "Capacidad y montaje sujetos a confirmación por el negocio",
      "Personal de soporte en accesos, estacionamiento y logística demo"
    ],
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    status: "Disponible",
    upcomingEventsCount: 4
  },
  {
    id: "formato-banquete",
    name: "Formato Banquete",
    type: "Banquete & Gala Social",
    badge: "Social & Galas",
    popular: false,
    priceFrom: "Desde $35,000 MXN",
    priceNumber: 35000,
    baseGuests: 200,
    extraGuestPrice: 200,
    capacity: "Media a alta capacidad (Sujeto a confirmación)",
    capacityNote: "Capacidad y montaje sujetos a confirmación por el negocio.",
    layoutType: "Mesas redondas / Imperiales / Pista central",
    idealEvents: ["Bodas elegantes", "XV años de gala", "Cenas de fin de año", "Aniversarios empresariales"],
    description: "Configuración espaciosa con distribución de mesas redondas o imperiales de gala, pista de baile central, iluminación cálida y servicio de banquete fluido.",
    includes: [
      "Distribución diseñada para cenas de gala con pista de baile central",
      "Mobiliario de diseño con sillas de gala y mantelería texturizada",
      "Capacidad y montaje sujetos a confirmación por el negocio",
      "Área de recepción para bienvenida y cóctel de inicio",
      "Coordinación básica de tiempos de servicio y música ambiental",
      "Personal de servicio demostrativo en salón y barra"
    ],
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    status: "Disponible",
    upcomingEventsCount: 3
  },
  {
    id: "salon-privado",
    name: "Salón Privado",
    type: "Corporativo / Ejecutivo",
    badge: "Privado & Ejecutivo",
    popular: false,
    priceFrom: "Desde $18,000 MXN",
    priceNumber: 18000,
    baseGuests: 80,
    extraGuestPrice: 150,
    capacity: "Formato privado (Sujeto a confirmación)",
    capacityNote: "Capacidad y montaje sujetos a confirmación por el negocio.",
    layoutType: "Conferencia / Herradura / Cena ejecutiva",
    idealEvents: ["Conferencias ejecutivas", "Cenas empresariales", "Presentaciones de marca", "Reuniones corporativas"],
    description: "Espacio sobrio y exclusivo para eventos corporativos, congresos ejecutivos, conferencias, presentaciones o cenas de gala íntimas con atención personalizada.",
    includes: [
      "Espacio exclusivo privado con acústica controlada y climatización",
      "Montaje versátil en auditorio, herradura o mesa imperial",
      "Capacidad y montaje sujetos a confirmación por el negocio",
      "Área asignada para coffee break o estación gastronómica",
      "Puntos de conexión para proyección y equipo audiovisual demo",
      "Soporte logístico de bienvenida y recepción"
    ],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    status: "Disponible",
    upcomingEventsCount: 2
  }
];

// Alias para compatibilidad con código existente que lee initialPackagesData
export const initialPackagesData = initialSpacesData;

// Servicios Extras DEMO Oficiales
export const initialExtrasData = [
  {
    id: "catering",
    name: "Catering",
    price: 8500,
    description: "Servicio gastronómico formal de 2 o 3 tiempos, menú demo degustación y vajilla de gala",
    category: "Gastronomía"
  },
  {
    id: "mobiliario",
    name: "Mobiliario",
    price: 4500,
    description: "Mesas imperiales, periqueras de cóctel, salas lounge ejecutivas y sillería especial",
    category: "Mobiliario"
  },
  {
    id: "audio",
    name: "Audio",
    price: 6000,
    description: "Sistema de sonido lineal de alta fidelidad, microfonía inalámbrica y consola para conferencias o música",
    category: "Producción"
  },
  {
    id: "iluminacion",
    name: "Iluminación",
    price: 5500,
    description: "Iluminación arquitectónica perimetral, cabezas móviles beam y reflectores escénicos",
    category: "Producción"
  },
  {
    id: "escenario",
    name: "Escenario",
    price: 4800,
    description: "Tarima modular de gala para orquesta, presidium empresarial o pasarela protocolaria",
    category: "Estructura"
  },
  {
    id: "pantallas",
    name: "Pantallas",
    price: 6500,
    description: "Pantallas LED de gran formato para proyección corporativa, videos de gala y conferencias",
    category: "Audiovisual"
  },
  {
    id: "decoracion",
    name: "Decoración",
    price: 5200,
    description: "Diseño floral contemporáneo, centros de mesa arquitectónicos y ambientación de acceso",
    category: "Ambientación"
  },
  {
    id: "personal",
    name: "Personal",
    price: 3500,
    description: "Equipo de apoyo: capitán de servicio, meseros adicionales, hostess bilingüe y logística",
    category: "Personal"
  },
  {
    id: "fotografia",
    name: "Fotografía",
    price: 5500,
    description: "Cobertura fotográfica profesional de gran formato con entrega en galería digital HD",
    category: "Foto y video"
  },
  {
    id: "video",
    name: "Video",
    price: 7000,
    description: "Producción cinematográfica 4K, tomas aéreas y cápsula conmemorativa del evento",
    category: "Foto y video"
  }
];

// Tipos de Evento Oficiales requeridos
export const eventTypesList = [
  {
    id: "boda",
    name: "Boda",
    subtitle: "Ceremonias de gala, cenas nupciales y recepciones de gran formato",
    category: "social",
    icon: "HeartIcon",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    popularSpace: "salon-principal"
  },
  {
    id: "xv-anos",
    name: "XV años",
    subtitle: "Recepciones majestuosas, pista de gala, vals y producción moderna",
    category: "social",
    icon: "SparklesIcon",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
    popularSpace: "formato-banquete"
  },
  {
    id: "graduacion",
    name: "Graduación",
    subtitle: "Galas universitarias, brindis de generación y eventos conmemorativos masivos",
    category: "corporativo",
    icon: "AcademicIcon",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
    popularSpace: "salon-principal"
  },
  {
    id: "posada",
    name: "Posada",
    subtitle: "Celebraciones de fin de año empresariales y comunitarias de gran escala",
    category: "social",
    icon: "GiftIcon",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    popularSpace: "salon-principal"
  },
  {
    id: "conferencia",
    name: "Conferencia",
    subtitle: "Presentaciones magistrales, keynotes ejecutivos y seminarios",
    category: "corporativo",
    icon: "BriefcaseIcon",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    popularSpace: "salon-privado"
  },
  {
    id: "congreso",
    name: "Congreso",
    subtitle: "Convenciones empresariales, foros multidisciplinarios y simposios",
    category: "corporativo",
    icon: "BuildingIcon",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    popularSpace: "salon-principal"
  },
  {
    id: "evento-empresarial",
    name: "Evento empresarial",
    subtitle: "Lanzamientos de producto, entrega de reconocimientos y asambleas corporativas",
    category: "corporativo",
    icon: "BriefcaseIcon",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
    popularSpace: "salon-principal"
  },
  {
    id: "cena",
    name: "Cena",
    subtitle: "Cenas de gala, homenajes formales y encuentros culinarios distinguidos",
    category: "social",
    icon: "StarIcon",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    popularSpace: "formato-banquete"
  },
  {
    id: "otro",
    name: "Otro",
    subtitle: "Cualquier celebración o evento especial personalizado a gran escala",
    category: "social",
    icon: "SparklesIcon",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
    popularSpace: "salon-principal"
  }
];

// Opciones de Montaje DEMO requeridas
export const layoutOptionsList = [
  {
    id: "banquete",
    name: "Banquete",
    description: "Mesas redondas o imperiales con pista central para cenas formales",
    recommendedGuests: "100 - 600+ pax",
    icon: "UtensilsIcon"
  },
  {
    id: "auditorio",
    name: "Auditorio",
    description: "Sillas orientadas al escenario principal para máxima audiencia",
    recommendedGuests: "150 - 800+ pax",
    icon: "BuildingIcon"
  },
  {
    id: "cocktail",
    name: "Cocktail",
    description: "Salas lounge, periqueras altas y espacio fluido para networking",
    recommendedGuests: "80 - 400 pax",
    icon: "WineIcon"
  },
  {
    id: "conferencia",
    name: "Conferencia",
    description: "Mesas de trabajo y presidium ejecutivo con proyección",
    recommendedGuests: "50 - 350 pax",
    icon: "BriefcaseIcon"
  },
  {
    id: "cena-formal",
    name: "Cena formal",
    description: "Disposición sobria para protocolo de etiqueta y servicio gourmet",
    recommendedGuests: "100 - 500 pax",
    icon: "StarIcon"
  },
  {
    id: "otro",
    name: "Otro",
    description: "Configuración a la medida según el diseño y logística de tu evento",
    recommendedGuests: "Personalizado",
    icon: "SparklesIcon"
  }
];

// Rangos de asistentes para el Cotizador (Paso 2)
export const guestRangesList = [
  { id: "1-100", label: "1–100", min: 1, max: 100, defaultNum: 80, badge: "Íntimo / Ejecutivo" },
  { id: "101-250", label: "101–250", min: 101, max: 250, defaultNum: 180, badge: "Medio" },
  { id: "251-500", label: "251–500", min: 251, max: 500, defaultNum: 350, badge: "Gran Formato" },
  { id: "501-800", label: "501–800", min: 501, max: 800, defaultNum: 650, badge: "Masivo" },
  { id: "800+", label: "800+", min: 801, max: 1200, defaultNum: 850, badge: "Mega Evento" }
];

// Fechas demo dinámicas relativas
const getOffsetDate = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};

// Datos MOCK iniciales con folios CAN-000121 al CAN-000125 y variedad requerida
export const initialRequestsData = [
  {
    id: "req-121",
    folio: "CAN-000121",
    clientName: "Mariana Garza Villarreal",
    clientPhone: "8999234512",
    clientEmail: "mariana.garza@gmail.com",
    company: "",
    eventType: "Boda",
    guests: 320,
    spaceId: "salon-principal",
    spaceName: "Salón Principal",
    packageId: "salon-principal",
    packageName: "Salón Principal",
    layout: "Banquete",
    extras: ["catering", "audio", "iluminacion", "fotografia"],
    estimatedTotal: 65000,
    suggestedDeposit: 8000,
    date: getOffsetDate(18),
    status: "Nueva",
    comments: "Boda de gala con 320 invitados. Requerimos pista central iluminada y área de bienvenida.",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: "req-122",
    folio: "CAN-000122",
    clientName: "Lic. Roberto Hinojosa Peña",
    clientPhone: "8991204891",
    clientEmail: "roberto.hinojosa@uanl.edu",
    company: "Facultad de Ciencias y Tecnologías",
    eventType: "Graduación",
    guests: 450,
    spaceId: "salon-principal",
    spaceName: "Salón Principal",
    packageId: "salon-principal",
    packageName: "Salón Principal",
    layout: "Auditorio",
    extras: ["escenario", "pantallas", "audio", "personal"],
    estimatedTotal: 72000,
    suggestedDeposit: 10000,
    date: getOffsetDate(24),
    status: "Contactado",
    comments: "Ceremonia de graduación universitaria. Requerimos presidium en escenario y 2 pantallas LED.",
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString()
  },
  {
    id: "req-123",
    folio: "CAN-000123",
    clientName: "Ing. Carlos Mendoza Cantú",
    clientPhone: "8993456789",
    clientEmail: "carlos.mendoza@maquila.com",
    company: "Industrial Global Reynosa",
    eventType: "Conferencia",
    guests: 180,
    spaceId: "salon-privado",
    spaceName: "Salón Privado",
    packageId: "salon-privado",
    packageName: "Salón Privado",
    layout: "Conferencia",
    extras: ["pantallas", "audio", "mobiliario"],
    estimatedTotal: 38000,
    suggestedDeposit: 6000,
    date: getOffsetDate(35),
    status: "Cotizando",
    comments: "Simposio industrial anual con directivos y ponentes internacionales. Factura demo requerida.",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  },
  {
    id: "req-124",
    folio: "CAN-000124",
    clientName: "Andrea Rodríguez Morales",
    clientPhone: "8997891234",
    clientEmail: "andrea.rodriguez@gmail.com",
    company: "",
    eventType: "XV años",
    guests: 260,
    spaceId: "formato-banquete",
    spaceName: "Formato Banquete",
    packageId: "formato-banquete",
    packageName: "Formato Banquete",
    layout: "Banquete",
    extras: ["iluminacion", "video", "catering"],
    estimatedTotal: 52000,
    suggestedDeposit: 8000,
    date: getOffsetDate(12),
    status: "Esperando anticipo",
    comments: "XV años de gala temática moderna. Interesa prueba de iluminación escénica y video cinematográfico.",
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString()
  },
  {
    id: "req-125",
    folio: "CAN-000125",
    clientName: "Lic. Fernanda López Salinas",
    clientPhone: "8995678901",
    clientEmail: "fernanda.lopez@corporativo.com",
    company: "Consorcio Empresarial del Norte",
    eventType: "Evento empresarial",
    guests: 380,
    spaceId: "salon-principal",
    spaceName: "Salón Principal",
    packageId: "salon-principal",
    packageName: "Salón Principal",
    layout: "Cena formal",
    extras: ["catering", "escenario", "pantallas", "personal"],
    estimatedTotal: 68000,
    suggestedDeposit: 12000,
    date: getOffsetDate(42),
    status: "Confirmada",
    comments: "Gala corporativa de fin de año con entrega de galardones. Anticipo demo registrado en agenda.",
    createdAt: new Date(Date.now() - 3600000 * 96).toISOString()
  }
];

export const initialQuotesData = [
  {
    id: "q-121",
    folio: "CAN-000121",
    clientName: "Mariana Garza Villarreal",
    clientEmail: "mariana.garza@gmail.com",
    eventType: "Boda",
    spaceName: "Salón Principal",
    packageName: "Salón Principal",
    guests: 320,
    servicesCount: 4,
    total: 65000,
    date: getOffsetDate(18),
    status: "Enviada",
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString()
  },
  {
    id: "q-122",
    folio: "CAN-000122",
    clientName: "Lic. Roberto Hinojosa Peña",
    clientEmail: "roberto.hinojosa@uanl.edu",
    eventType: "Graduación",
    spaceName: "Salón Principal",
    packageName: "Salón Principal",
    guests: 450,
    servicesCount: 4,
    total: 72000,
    date: getOffsetDate(24),
    status: "Borrador",
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
  },
  {
    id: "q-123",
    folio: "CAN-000123",
    clientName: "Ing. Carlos Mendoza Cantú",
    clientEmail: "carlos.mendoza@maquila.com",
    eventType: "Conferencia",
    spaceName: "Salón Privado",
    packageName: "Salón Privado",
    guests: 180,
    servicesCount: 3,
    total: 38000,
    date: getOffsetDate(35),
    status: "Aceptada",
    createdAt: new Date(Date.now() - 3600000 * 40).toISOString()
  },
  {
    id: "q-124",
    folio: "CAN-000124",
    clientName: "Andrea Rodríguez Morales",
    clientEmail: "andrea.rodriguez@gmail.com",
    eventType: "XV años",
    spaceName: "Formato Banquete",
    packageName: "Formato Banquete",
    guests: 260,
    servicesCount: 3,
    total: 52000,
    date: getOffsetDate(12),
    status: "Aceptada",
    createdAt: new Date(Date.now() - 3600000 * 60).toISOString()
  },
  {
    id: "q-125",
    folio: "CAN-000125",
    clientName: "Lic. Fernanda López Salinas",
    clientEmail: "fernanda.lopez@corporativo.com",
    eventType: "Evento empresarial",
    spaceName: "Salón Principal",
    packageName: "Salón Principal",
    guests: 380,
    servicesCount: 4,
    total: 68000,
    date: getOffsetDate(42),
    status: "Aceptada",
    createdAt: new Date(Date.now() - 3600000 * 90).toISOString()
  }
];

export const initialEventsData = [
  {
    id: "evt-125",
    folio: "CAN-000125",
    clientName: "Lic. Fernanda López Salinas",
    clientPhone: "8995678901",
    eventType: "Evento empresarial",
    spaceName: "Salón Principal",
    packageName: "Salón Principal",
    date: getOffsetDate(42),
    guests: 380,
    total: 68000,
    paid: 12000,
    balance: 56000,
    status: "Confirmado",
    zone: "Parque Industrial Reynosa"
  },
  {
    id: "evt-118",
    folio: "CAN-000118",
    clientName: "Ing. Daniel Ramírez Chapa",
    clientPhone: "8998901234",
    eventType: "Boda",
    spaceName: "Formato Banquete",
    packageName: "Formato Banquete",
    date: getOffsetDate(8),
    guests: 250,
    total: 55000,
    paid: 25000,
    balance: 30000,
    status: "En preparación",
    zone: "Col. Las Fuentes / Reynosa"
  },
  {
    id: "evt-115",
    folio: "CAN-000115",
    clientName: "Dra. Patricia Serna Garza",
    clientPhone: "8999234512",
    eventType: "Congreso",
    spaceName: "Salón Principal",
    packageName: "Salón Principal",
    date: getOffsetDate(2),
    guests: 400,
    total: 64000,
    paid: 64000,
    balance: 0,
    status: "Confirmado",
    zone: "Zona Médica / Reynosa"
  },
  {
    id: "evt-110",
    folio: "CAN-000110",
    clientName: "Ing. Carlos Mendoza Cantú",
    clientPhone: "8991204891",
    eventType: "Conferencia",
    spaceName: "Salón Privado",
    packageName: "Salón Privado",
    date: getOffsetDate(-10),
    guests: 150,
    total: 35000,
    paid: 35000,
    balance: 0,
    status: "Realizado",
    zone: "Reynosa Centro"
  }
];

export const initialClientsData = [
  {
    id: "cli-1",
    name: "Mariana Garza Villarreal",
    phone: "8999234512",
    email: "mariana.garza@gmail.com",
    eventsCount: 1,
    lastRequestDate: getOffsetDate(18),
    estimatedTotal: "$65,000 MXN",
    status: "Activo"
  },
  {
    id: "cli-2",
    name: "Lic. Roberto Hinojosa Peña",
    phone: "8991204891",
    email: "roberto.hinojosa@uanl.edu",
    eventsCount: 1,
    lastRequestDate: getOffsetDate(24),
    estimatedTotal: "$72,000 MXN",
    status: "Activo"
  },
  {
    id: "cli-3",
    name: "Ing. Carlos Mendoza Cantú",
    phone: "8993456789",
    email: "carlos.mendoza@maquila.com",
    eventsCount: 2,
    lastRequestDate: getOffsetDate(35),
    estimatedTotal: "$73,000 MXN",
    status: "Cotizando"
  },
  {
    id: "cli-4",
    name: "Andrea Rodríguez Morales",
    phone: "8997891234",
    email: "andrea.rodriguez@gmail.com",
    eventsCount: 1,
    lastRequestDate: getOffsetDate(12),
    estimatedTotal: "$52,000 MXN",
    status: "Esperando anticipo"
  },
  {
    id: "cli-5",
    name: "Lic. Fernanda López Salinas",
    phone: "8995678901",
    email: "fernanda.lopez@corporativo.com",
    eventsCount: 1,
    lastRequestDate: getOffsetDate(42),
    estimatedTotal: "$68,000 MXN",
    status: "Confirmado"
  }
];

export const initialPaymentsData = [
  {
    id: "pay-1",
    folio: "CAN-000125",
    clientName: "Lic. Fernanda López Salinas",
    eventType: "Evento empresarial",
    concept: "Anticipo",
    amount: 12000,
    method: "Transferencia demo",
    date: getOffsetDate(-3),
    status: "Pagado"
  },
  {
    id: "pay-2",
    folio: "CAN-000118",
    clientName: "Ing. Daniel Ramírez Chapa",
    eventType: "Boda",
    concept: "Anticipo",
    amount: 15000,
    method: "Tarjeta demo",
    date: getOffsetDate(-15),
    status: "Pagado"
  },
  {
    id: "pay-3",
    folio: "CAN-000118",
    clientName: "Ing. Daniel Ramírez Chapa",
    eventType: "Boda",
    concept: "Segundo pago",
    amount: 10000,
    method: "Transferencia demo",
    date: getOffsetDate(-2),
    status: "Pagado"
  },
  {
    id: "pay-4",
    folio: "CAN-000115",
    clientName: "Dra. Patricia Serna Garza",
    eventType: "Congreso",
    concept: "Liquidación",
    amount: 64000,
    method: "Transferencia demo",
    date: getOffsetDate(-1),
    status: "Pagado"
  },
  {
    id: "pay-5",
    folio: "CAN-000124",
    clientName: "Andrea Rodríguez Morales",
    eventType: "XV años",
    concept: "Anticipo",
    amount: 8000,
    method: "Tarjeta demo",
    date: getOffsetDate(1),
    status: "Pendiente"
  }
];

// Mapa de disponibilidad demostrativa con 4 estados oficiales:
// - "disponible" (Disponible)
// - "limitada" (En consulta)
// - "apartada" (Apartada)
// - "bloqueada" (No disponible)
export const mockAvailabilityMap = {
  [getOffsetDate(2)]: "apartada",
  [getOffsetDate(5)]: "disponible",
  [getOffsetDate(6)]: "limitada",
  [getOffsetDate(8)]: "apartada",
  [getOffsetDate(10)]: "bloqueada",
  [getOffsetDate(12)]: "limitada",
  [getOffsetDate(13)]: "disponible",
  [getOffsetDate(14)]: "disponible",
  [getOffsetDate(18)]: "limitada",
  [getOffsetDate(19)]: "bloqueada",
  [getOffsetDate(20)]: "disponible",
  [getOffsetDate(24)]: "limitada",
  [getOffsetDate(25)]: "disponible",
  [getOffsetDate(26)]: "disponible",
  [getOffsetDate(27)]: "apartada",
  [getOffsetDate(35)]: "limitada",
  [getOffsetDate(42)]: "apartada"
};

/**
 * Obtiene el estado de disponibilidad oficial para cualquier fecha ISO (YYYY-MM-DD)
 * 4 Estados: "disponible" (Disponible), "limitada" (En consulta), "apartada" (Apartada), "bloqueada" (No disponible)
 */
export const getDateAvailabilityStatus = (dateStr) => {
  if (!dateStr) return "disponible";
  if (mockAvailabilityMap[dateStr]) return mockAvailabilityMap[dateStr];

  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3) return "disponible";
  const [year, month, day] = parts;
  const hash = (year * 372 + month * 31 + day) % 11;
  if (hash === 0 || hash === 7) return "apartada";
  if (hash === 2 || hash === 5) return "limitada";
  if (hash === 9) return "bloqueada";
  return "disponible";
};
