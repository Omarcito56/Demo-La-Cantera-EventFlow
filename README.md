# BS EventFlow — La Cantera Events

Propuesta comercial interactiva desarrollada por **BS Code** para digitalizar la consulta de espacios, selección de tipo de evento, asistentes, formato / salón, servicios adicionales, consulta de fecha en calendario, cotización inicial demostrativa, solicitud formal, simulación de apartado con anticipo demo y administración completa de eventos para **La Cantera Events** (Reynosa, Tamaulipas).

---

## 1. Concepto y Arquitectura Técnica

- **Prospecto**: LA CANTERA EVENTS (Reynosa, Tamaulipas)
- **Contacto Público**: Teléfono / WhatsApp: `899 925 2352` (8999252352) · Correo: `eventoslacantera@hotmail.com`
- **Concepto Comercial**: `PLANEA TU EVENTO + ELIGE ESPACIO + COTIZA + CONSULTA DISPONIBILIDAD`
- **Identidad Visual**: *"Large Event Venue Experience"* — Arquitectónica, elegante, amplia, sobria, premium, corporativa, social y de gran escala.
- **Paleta de Color**:
  - Negro: `#181818`
  - Arena: `#D8C7AA`
  - Crema: `#F5F1E9`
  - Gris piedra: `#77736C`
  - Dorado suave: `#B9A176`
  - Blanco: `#FFFFFF`
- **Framework & Stack**: React 19 + Vite + JavaScript puro + React Router DOM (v7) + CSS puro.
- **Almacenamiento Local**: `localStorage` reactivo (`useEventData`) con persistencia sincronizada, auto-reset de versiones anteriores (`eventflow_version_lacantera_v1`) y folios correlativos (`CAN-000121` a `CAN-000125` mock y `CAN-000126+` en vivo).
- **Despliegue**: Optimizado para Vercel con `vercel.json` (SPA fallback) y `.env.example`.
- **Analítica de Producto & Privacidad**: Vercel Web Analytics + PostHog Product Analytics & Session Replay con enmascaramiento total `.ph-mask` y sin recolección de PII.

---

## 2. Experiencia de Usuario & Flujos

### Web Pública
- **Navbar**:
  - Marca: **La Cantera Events**
  - Enlaces: Inicio, Espacios (`/espacios`), Eventos, Cotiza (`/cotizar`), Disponibilidad, Contacto.
  - CTAs: *"Planear mi evento"* y *"Consultar fecha"*.
  - Enlace rápido a WhatsApp directo (`899 925 2352`).
- **Hero Editorial & Arquitectónico**:
  - Eyebrow: `SOCIAL · CORPORATIVO · GRANDES EVENTOS`
  - Título principal: *"Un espacio. Muchas formas de celebrar."*
  - Subtexto: *"Explora opciones, selecciona el formato de tu evento y solicita una cotización inicial de manera sencilla."*
  - CTAs principales: *"Planear mi evento"* y *"Consultar disponibilidad"*.
- **Espacios Demo ("Encuentra el espacio ideal")**:
  - Muestra los 3 recintos principales:
    1. **Salón Principal** (Gran formato, bodas masivas, congresos, graduaciones de gran escala).
    2. **Formato Banquete** (Cenas de gala, aniversarios, XV años y premiaciones).
    3. **Salón Privado** (Conferencias ejecutivas, sesiones de trabajo, capacitaciones y eventos íntimos).
  - Modal interactivo con aviso destacado: *"Capacidad y montaje sujetos a confirmación por el negocio."*
- **Sección Corporativa Específica ("También para eventos empresariales")**:
  - Diseñada especialmente para diferenciar a La Cantera Events como recinto de gran escala para:
    - Conferencias
    - Congresos
    - Presentaciones de marca
    - Cenas empresariales
    - Graduaciones
- **Tipos de Evento**:
  - Selector visual con los 9 tipos oficiales: Boda, XV años, Graduación, Posada, Conferencia, Congreso, Evento empresarial, Cena, Otro.
- **Disponibilidad en Calendario**:
  - Consulta interactiva con 4 estados oficiales demostrativos: **Disponible**, **En consulta**, **Apartada**, **No disponible**.
- **Problema / Solución**:
  - Título: *"Menos información dispersa. Más eventos bajo control."*
  - Texto: *"EventFlow puede centralizar solicitudes, asistentes, espacios, cotizaciones, fechas y anticipos desde un solo lugar."*
- **Ubicación & Contacto Directo**:
  - Teléfono: `899 925 2352` (botón *"Llamar"*)
  - Correo: `eventoslacantera@hotmail.com` (botón *"Enviar correo"*)
  - Botón de WhatsApp directo con mensaje preconfigurado.
- **Cotizador de 8 Pasos (`/cotizar`)**:
  1. **01 Evento**: Selección de tipo social o corporativo (9 opciones).
  2. **02 Asistentes**: Rangos rápidos (1–100, 101–250, 251–500, 501–800, 800+) o número personalizado.
  3. **03 Espacio**: Salón Principal, Formato Banquete o Salón Privado.
  4. **04 Montaje**: Banquete, Auditorio, Cocktail, Conferencia, Cena formal, Otro.
  5. **05 Servicios**: Catering, Mobiliario, Audio, Iluminación, Escenario, Pantallas, Decoración, Personal, Fotografía, Video (10 servicios demo con selector por categorías).
  6. **06 Fecha**: Calendario con selector de fecha y estado demostrativo en tiempo real.
  7. **07 Datos**: Formulario de contacto protegido con `.ph-mask` (Nombre, WhatsApp, Correo, Empresa opcional, Comentarios y Aviso de privacidad demo). No envía PII a Analytics.
  8. **08 Resumen**: Desglose formal de cotización y botón *"Enviar solicitud"*.
  - Cálculo dinámico permanente con desglose en tiempo real y aviso obligatorio: **COTIZACIÓN DEMOSTRATIVA**.
- **Confirmación (`/confirmacion`)**:
  - Folio asignado correlativo: `CAN-000128` (o correlativo en vivo).
  - Título: *"Tu solicitud fue registrada."*
  - Estado: *"En revisión"*.
  - Muestra: Evento, Fecha, Asistentes, Espacio y Estimado.
  - Sección *"Aparta tu fecha"* con simulación de anticipo demo:
    - Estimado: `$45,000 MXN`
    - Anticipo demo: `$8,000 MXN`
    - Saldo restante: `$37,000 MXN`
    - Registro interactivo de anticipo simulado (no procesa pagos reales).

---

## 3. Panel Administrativo (`/admin` / `EventFlow Admin`)

- **Ruta de Acceso**: `/admin/login`
- **Credenciales Demo**:
  - Usuario: `admin@eventflow.demo` (o `lacantera@eventflow.demo`)
  - Contraseña: `demo123`
  - Incluye botón de autocompletado rápido.

### Módulos del Menú Administrativo
1. **Resumen (`/admin/dashboard`)**:
   - Métricas clave: **Solicitudes nuevas**, **Eventos próximos**, **Cotizaciones pendientes**, **Asistentes proyectados**, **Anticipos registrados**.
   - Tabla de próximos eventos en agenda.
2. **Solicitudes (`/admin/solicitudes`)**:
   - Columnas: Folio, Cliente, Evento, Asistentes, Espacio, Fecha, Estimado, Estado, Acciones.
   - Estados: `Nueva`, `Contactado`, `Cotizando`, `Esperando anticipo`, `Confirmada`, `Descartada`.
   - Modal de detalle completo con conversión directa a evento y registro de anticipo demo.
3. **Espacios (`/admin/espacios`)**:
   - Módulo para visualizar la capacidad demo, formato, estado operativo y próximos eventos de Salón Principal, Formato Banquete y Salón Privado.
4. **Calendario (`/admin/calendario`)**:
   - Calendario operativo con 6 estados oficiales: `Disponible`, `Solicitud`, `Cotización`, `Apartado`, `Confirmado`, `Bloqueado`.
   - Permite seleccionar cualquier fecha, ver los eventos o solicitudes correspondientes y cambiar el estado con persistencia inmediata en `localStorage`.
5. **Cotizaciones (`/admin/cotizaciones`)**:
   - Columnas: Cliente, Evento, Asistentes, Espacio, Servicios, Total, Estado.
   - Estados: `Borrador`, `Enviada`, `Aceptada`, `Rechazada`, `Vencida`.
6. **Eventos (`/admin/eventos`)**:
   - Columnas: Evento, Fecha, Asistentes, Espacio, Total, Pagado, Saldo, Estado.
   - Estados: `Apartado`, `Confirmado`, `En preparación`, `Realizado`, `Cancelado`.
7. **Clientes (`/admin/clientes`)**:
   - Directorio con historial comercial y acumulado por cliente.
8. **Pagos (`/admin/pagos`)**:
   - Registro de anticipos y abonos demo asociados a los folios `CAN-`.
9. **Configuración (`/admin/configuracion`)**:
   - Datos de La Cantera Events (Reynosa, Tamaulipas, `899 925 2352`, `eventoslacantera@hotmail.com`), parámetros de telemetría y zona de reinicio a valores de fábrica.

---

## 4. Telemetría y Analítica Comercial (BS Code)

La aplicación reporta de manera centralizada al proyecto PostHog de BS Code (**"BS Code Demos"**):
- **`demoId`**: `la_cantera_eventflow`
- **`prospectId`**: `la_cantera`
- **`projectType`**: `bs_code_demo`
- **`projectName`**: `BS Code Demos`

Archivo de configuración central:
👉 `src/analytics/analyticsConfig.js`

### Eventos Instrumentados
- `demo_viewed`
- `demo_cta_clicked`
- `quote_started`
- `quote_event_type_selected`
- `venue_selected`
- `guest_range_selected`
- `event_layout_selected`
- `quote_date_selected`
- `quote_completed`
- `availability_checked`
- `deposit_demo_viewed`
- `deposit_demo_registered`
- `admin_requests_opened`
- `admin_quotes_opened`
- `admin_calendar_opened`
- `admin_events_opened`
- `admin_payments_opened`
- `request_status_changed`
- `event_created`
- `admin_login_opened`
- `admin_login_success`
- `$pageview`

### Privacidad y Session Replay
- Enmascaramiento completo de entradas y textos sensibles (`maskAllInputs: true`, `maskTextSelector: ".ph-mask, [data-ph-mask]"`).
- `autocapture: false` para evitar recolección involuntaria.
- `sanitizeProperties` filtra nombres de clientes, teléfonos, emails, nombres de empresa, comentarios y folios directos.

---

## 5. Instrucciones para Ejecución Local

1. Instalar dependencias (si no están instaladas):
   ```bash
   npm install
   ```

2. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Compilar para producción (validación de build):
   ```bash
   npm run build
   ```
