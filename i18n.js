/* ============================================================
   Veltaro · Sistema de traducción ES <-> EN
   ------------------------------------------------------------
   - Inyecta un botón de idioma (ES / EN) en la cabecera de cada
     página, respetando su paleta de colores.
   - Traduce todo el texto visible (y atributos como aria-label,
     title, alt, placeholder) salvo nombres propios de personas
     y nombres de marca, que se dejan sin tocar.
   - Guarda la preferencia en localStorage (clave compartida)
     para que el idioma se mantenga al navegar entre las páginas
     enlazadas, hasta que se cambie manualmente.
   - Reaplica la traducción al contenido generado dinámicamente
     por el JS de cada página (menús, calendario, galería, etc.).
   ============================================================ */
(function () {
  "use strict";

  var STORAGE_KEY = "veltaro_lang";

  function norm(s) { return String(s).replace(/\s+/g, " ").trim(); }

  /* Construye un diccionario { es_normalizado: en } a partir de pares */
  function D(pairs) {
    var o = {};
    for (var i = 0; i < pairs.length; i++) o[norm(pairs[i][0])] = pairs[i][1];
    return o;
  }

  /* ============================================================
     CONFIGURACIÓN POR PÁGINA
     mount: dónde insertar el botón (selector + ref para insertBefore,
            o abs:true para posicionarlo absoluto dentro del host)
     colors: paleta del conmutador para encajar con cada diseño
     dict / phrases: traducciones
     ============================================================ */
  var PAGES = {};

  /* ---------------------- INDEX ---------------------- */
  PAGES["index.html"] = {
    mount: { sel: ".nav-inner", before: ".menu-btn" },
    colors: { bg: "rgba(20,48,79,.55)", border: "rgba(71,85,105,.6)", fg: "#94a3b8", activeBg: "#3b82f6", activeFg: "#06121f" },
    phrases: [],
    dict: D([
      ["Veltaro | Diseño Web para Pequeñas y Medianas Empresas", "Veltaro | Web Design for Small and Medium Businesses"],
      ["Inicio", "Home"],
      ["Sobre Nosotros", "About Us"],
      ["Catálogo", "Catalog"],
      ["Contáctanos", "Contact Us"],
      ["Abrir menú", "Open menu"],
      ["Agencia de diseño digital", "Digital design agency"],
      ["Diseño web profesional para", "Professional web design for"],
      ["pequeñas y medianas empresas", "small and medium businesses"],
      ["Impulsamos tu transformación digital con sitios modernos, rápidos y a la medida de tu negocio. Tu marca merece una presencia en línea que genere confianza y resultados.",
       "We drive your digital transformation with modern, fast websites tailored to your business. Your brand deserves an online presence that builds trust and delivers results."],
      ["Ver Catálogo", "View Catalog"],
      ["Diseño responsivo", "Responsive design"],
      ["Centrado en el usuario", "User-centered"],
      ["PYMES", "SMEs"],
      ["Nuestra especialidad", "Our specialty"],
      ["Quiénes somos", "Who we are"],
      ["Sobre Veltaro", "About Veltaro"],
      ["En", "At"],
      ["somos creadores digitales apasionados por el estilo, la creación y el diseño. Convertimos ideas en experiencias web claras, atractivas y funcionales que conectan con tu audiencia.",
       "we are digital creators passionate about style, creation and design. We turn ideas into clear, attractive and functional web experiences that connect with your audience."],
      ["Nos mantenemos a la vanguardia de las tendencias tecnológicas para ofrecer un servicio de primer nivel, enfocado en",
       "We stay at the forefront of technology trends to deliver top-tier service, focused on"],
      ["potenciar el crecimiento de pequeñas y medianas empresas", "boosting the growth of small and medium businesses"],
      ["a través de soluciones web accesibles y de alta calidad.", "through accessible, high-quality web solutions."],
      ["Cada proyecto es una colaboración: escuchamos tus objetivos, cuidamos cada detalle y entregamos un producto que representa con orgullo lo que tu negocio significa.",
       "Every project is a collaboration: we listen to your goals, care for every detail and deliver a product that proudly represents what your business means."],
      ["Diseño con propósito", "Design with purpose"],
      ["Estética cuidada al servicio de tus objetivos de negocio.", "Refined aesthetics in service of your business goals."],
      ["Vanguardia tecnológica", "Technological edge"],
      ["Trabajamos con las últimas tendencias y mejores prácticas.", "We work with the latest trends and best practices."],
      ["Enfoque en PYMES", "Focus on SMEs"],
      ["Soluciones accesibles pensadas para hacer crecer tu empresa.", "Accessible solutions designed to grow your company."],
      ["Nuestro trabajo", "Our work"],
      ["Catálogo de proyectos", "Project catalog"],
      ["Diseño de menú digital interactivo para restaurante, con navegación fluida por categorías y una experiencia visual apetecible en cualquier dispositivo.",
       "Interactive digital menu design for a restaurant, with smooth category navigation and an appetizing visual experience on any device."],
      ["Menú digital", "Digital menu"],
      ["Web de servicios legales con sistema de citas en línea, diseñada para transmitir profesionalismo y facilitar el primer contacto con cada cliente.",
       "Legal services website with an online booking system, designed to convey professionalism and ease the first contact with each client."],
      ["Citas online", "Online booking"],
      ["Corporativo", "Corporate"],
      ["Portafolio dinámico para fotografía profesional, con galerías que destacan cada imagen y una estructura pensada para captar nuevos clientes.",
       "Dynamic portfolio for professional photography, with galleries that highlight every image and a structure designed to attract new clients."],
      ["Portafolio", "Portfolio"],
      ["Galería", "Gallery"],
      ["Sitio web urbano para barbería con lista de precios dinámica y perfiles del equipo, en un diseño oscuro y elegante que refleja la identidad de la marca.",
       "Urban barbershop website with a dynamic price list and team profiles, in a dark, elegant design that reflects the brand identity."],
      ["Precios Dinámicos", "Dynamic pricing"],
      ["Web clínica enfocada en la generación de confianza, con un slider interactivo de Antes y Después que muestra resultados reales de los tratamientos.",
       "Clinic website focused on building trust, with an interactive Before and After slider showing real treatment results."],
      ["Salud", "Health"],
      ["Slider Interactivo", "Interactive slider"],
      ["Hablemos", "Let's talk"],
      ["Cotiza tu proyecto hoy", "Get a quote for your project today"],
      ["Cuéntanos tu idea y diseñemos juntos la presencia digital que tu empresa necesita. Estamos a un mensaje de distancia.",
       "Tell us your idea and let's design together the digital presence your company needs. We're just one message away."],
      ["Mira nuestro trabajo", "See our work"],
      ["Escríbenos directo", "Message us directly"],
      ["Correo Electrónico", "Email"],
      ["© 2026 Veltaro. Diseño web para pequeñas y medianas empresas.", "© 2026 Veltaro. Web design for small and medium businesses."]
    ])
  };

  /* ---------------------- BISTRO ---------------------- */
  PAGES["bistro.html"] = {
    mount: { sel: ".header", abs: true },
    colors: { bg: "rgba(255,255,255,.08)", border: "rgba(194,161,76,.45)", fg: "#F7F2E8", activeBg: "#C2A14C", activeFg: "#0D2034" },
    phrases: [],
    dict: D([
      ["Bistró del Mar — Menú Digital", "Bistró del Mar — Digital Menu"],
      ["Menú Digital", "Digital Menu"],
      ["Red WiFi del local", "Venue WiFi"],
      ["Contraseña", "Password"],
      ["Todos", "All"],
      ["Entradas", "Starters"],
      ["Platos Fuertes", "Main Courses"],
      ["Del Mar", "From the Sea"],
      ["Bebidas", "Drinks"],
      ["Cocina costera", "Coastal cuisine"],
      ["Nuestra carta", "Our menu"],
      ["Entrada", "Starter"],
      ["Plato Fuerte", "Main Course"],
      ["Bebida", "Drink"],
      ["Ceviche del Puerto", "Harbor Ceviche"],
      ["Pesca blanca curada en limón con cebolla morada, cilantro fresco y un toque de ají amarillo.",
       "White fish cured in lime with red onion, fresh cilantro and a touch of yellow chili."],
      ["Carpaccio de Pulpo", "Octopus Carpaccio"],
      ["Finas láminas de pulpo a la brasa con aceite de oliva, alcaparras y ralladura de limón.",
       "Thin slices of grilled octopus with olive oil, capers and lemon zest."],
      ["Vuelve a la Vida", "Seafood Reviver"],
      ["Coctel de mariscos surtidos en salsa de tomate de la casa, aguacate y galletas saladas.",
       "Assorted seafood cocktail in house tomato sauce, avocado and crackers."],
      ["Paella Marinera", "Seafood Paella"],
      ["Arroz bomba al azafrán con camarón, mejillón, calamar y pimientos asados. Para compartir.",
       "Saffron bomba rice with shrimp, mussel, squid and roasted peppers. To share."],
      ["Arroz Negro de Calamar", "Squid Ink Black Rice"],
      ["Arroz cremoso teñido en tinta de calamar, alioli de ajo dulce y crujiente de cebollín.",
       "Creamy rice tinted with squid ink, sweet garlic aioli and crispy chives."],
      ["Pulpo a la Brasa", "Grilled Octopus"],
      ["Tentáculo a la parrilla sobre puré de papa ahumada, pimentón de la Vera y aceite de hierbas.",
       "Grilled tentacle over smoked potato purée, La Vera paprika and herb oil."],
      ["Salmón a la Parrilla", "Grilled Salmon"],
      ["Lomo de salmón sellado con mantequilla de eneldo, espárragos verdes y limón asado.",
       "Seared salmon fillet with dill butter, green asparagus and roasted lemon."],
      ["Camarones al Ajillo", "Garlic Shrimp"],
      ["Camarones jumbo salteados en aceite de oliva, ajo dorado y guindilla, con pan de la casa.",
       "Jumbo shrimp sautéed in olive oil, golden garlic and chili, with house bread."],
      ["Limonada de Coco", "Coconut Lemonade"],
      ["Refrescante mezcla de limón natural, crema de coco y hierbabuena, servida bien fría.",
       "Refreshing blend of fresh lemon, coconut cream and spearmint, served ice cold."],
      ["Sangría de Vino Blanco", "White Wine Sangría"],
      ["Vino blanco frutal con duraznos, cítricos y un toque de cava. Por copa o jarra.",
       "Fruity white wine with peaches, citrus and a touch of cava. By glass or pitcher."],
      ["No hay platillos en esta categoría por ahora.", "No dishes in this category right now."],
      ["Pedir por WhatsApp", "Order via WhatsApp"],
      ["· Pescados y mariscos frescos cada día", "· Fresh fish and seafood every day"],
      ["Av. del Malecón 214, Costa Azul · Diseño digital de carta", "214 Malecón Ave., Costa Azul · Digital menu design"]
    ])
  };

  /* ---------------------- BUFETE ---------------------- */
  PAGES["bufete.html"] = {
    mount: { sel: ".nav", before: "#burger" },
    colors: { bg: "rgba(255,255,255,.08)", border: "rgba(200,164,92,.45)", fg: "#ffffff", activeBg: "#c8a45c", activeFg: "#08111c" },
    phrases: [
      [" de ", " "],
      ["Enero", "January"], ["Febrero", "February"], ["Marzo", "March"], ["Abril", "April"],
      ["Mayo", "May"], ["Junio", "June"], ["Julio", "July"], ["Agosto", "August"],
      ["Septiembre", "September"], ["Octubre", "October"], ["Noviembre", "November"], ["Diciembre", "December"]
    ],
    dict: D([
      ["Bufete Corporativo | Excelencia Legal Empresarial", "Bufete Corporativo | Corporate Legal Excellence"],
      ["Inicio", "Home"],
      ["Áreas de Práctica", "Practice Areas"],
      ["Equipo", "Team"],
      ["Citas", "Appointments"],
      ["Agendar Consulta", "Schedule Consultation"],
      ["Abrir menú", "Open menu"],
      ["Cerrar menú", "Close menu"],
      ["Firma legal de alto nivel", "Top-tier law firm"],
      ["Protegemos el futuro de su empresa con", "We protect the future of your company with"],
      ["excelencia legal", "legal excellence"],
      ["Asesoría jurídica empresarial integral para compañías que operan en mercados exigentes. Estrategia, precisión y resultados que sostienen decisiones de negocio.",
       "Comprehensive corporate legal counsel for companies operating in demanding markets. Strategy, precision and results that support business decisions."],
      ["Conozca nuestros servicios", "Discover our services"],
      ["Agendar Cita", "Book Appointment"],
      ["Años de ejercicio", "Years in practice"],
      ["Empresas asesoradas", "Companies advised"],
      ["Casos resueltos a favor", "Cases won"],
      ["Lo que hacemos", "What we do"],
      ["Áreas de práctica", "Practice areas"],
      ["Equipos especializados que cubren las necesidades jurídicas de la empresa moderna, desde la constitución hasta la disputa más compleja.",
       "Specialized teams covering the legal needs of the modern company, from incorporation to the most complex dispute."],
      ["Derecho Corporativo", "Corporate Law"],
      ["Constitución de sociedades, gobierno corporativo, fusiones, adquisiciones y reestructuraciones con respaldo estratégico.",
       "Company incorporation, corporate governance, mergers, acquisitions and restructurings with strategic backing."],
      ["Saber más", "Learn more"],
      ["Litigios Comerciales", "Commercial Litigation"],
      ["Representación firme en controversias contractuales, cobranzas y arbitrajes ante tribunales y centros de mediación.",
       "Firm representation in contractual disputes, debt collection and arbitration before courts and mediation centers."],
      ["Propiedad Intelectual", "Intellectual Property"],
      ["Registro y defensa de marcas, patentes y derechos de autor. Protegemos los activos intangibles que dan ventaja competitiva.",
       "Registration and defense of trademarks, patents and copyrights. We protect the intangible assets that provide competitive advantage."],
      ["Derecho Laboral Empresarial", "Corporate Labor Law"],
      ["Contratación, cumplimiento normativo, prevención de conflictos y defensa patronal ante autoridades del trabajo.",
       "Hiring, regulatory compliance, conflict prevention and employer defense before labor authorities."],
      ["Quiénes lo representan", "Who represents you"],
      ["Socios fundadores", "Founding partners"],
      ["Abogados con trayectoria comprobada en los foros más exigentes y una sola prioridad: los intereses de su empresa.",
       "Lawyers with a proven track record in the most demanding forums and a single priority: your company's interests."],
      ["Socia · Derecho Corporativo", "Partner · Corporate Law"],
      ["Lidera operaciones de fusión y adquisición de gran escala con un enfoque meticuloso en la gestión de riesgo.",
       "Leads large-scale merger and acquisition deals with a meticulous focus on risk management."],
      ["Socio · Litigios", "Partner · Litigation"],
      ["Estratega procesal con experiencia en arbitrajes internacionales y disputas comerciales de alta complejidad.",
       "Procedural strategist with experience in international arbitration and highly complex commercial disputes."],
      ["Socia · Propiedad Intelectual", "Partner · Intellectual Property"],
      ["Especialista en protección de marcas y tecnología, asesora a empresas en innovación y activos intangibles.",
       "Specialist in trademark and technology protection, advising companies on innovation and intangible assets."],
      ["Atención personalizada", "Personalized attention"],
      ["Agende su consulta inicial", "Schedule your initial consultation"],
      ["Reserve un espacio con uno de nuestros socios. La primera consulta es confidencial y orientada a entender el panorama legal de su empresa.",
       "Book a slot with one of our partners. The first consultation is confidential and aimed at understanding your company's legal landscape."],
      ["Sesión de 45 minutos con un especialista.", "45-minute session with a specialist."],
      ["Diagnóstico jurídico sin compromiso.", "No-obligation legal assessment."],
      ["Confidencialidad garantizada por contrato.", "Confidentiality guaranteed by contract."],
      ["Servicio de interés", "Service of interest"],
      ["Seleccione una fecha", "Select a date"],
      ["Mes anterior", "Previous month"],
      ["Mes siguiente", "Next month"],
      ["Mes", "Month"],
      ["Lu", "Mo"], ["Ma", "Tu"], ["Mi", "We"], ["Ju", "Th"], ["Vi", "Fr"], ["Sá", "Sa"], ["Do", "Su"],
      ["Horarios disponibles", "Available times"],
      ["Confirmar cita", "Confirm appointment"],
      ["Seleccione fecha y horario para continuar.", "Select a date and time to continue."],
      ["Cita agendada con éxito", "Appointment booked successfully"],
      ["Hemos reservado su espacio. Recibirá una confirmación con los detalles de su consulta inicial en breve.",
       "We've reserved your slot. You'll receive a confirmation with the details of your initial consultation shortly."],
      ["Agendar otra cita", "Book another appointment"],
      /* fragmentos del resumen dinámico (nodos de texto sueltos) */
      ["Cita el", "Appointment on"],
      ["a las", "at"],
      ["Fecha:", "Date:"],
      [". Elija un horario.", ". Choose a time."],
      ["Horario:", "Time:"],
      [". Elija una fecha.", ". Choose a date."],
      ["Por favor seleccione una fecha y un horario.", "Please select a date and time."],
      /* footer */
      ["Excelencia legal al servicio de la empresa. Estrategia jurídica que protege el valor de su organización.",
       "Legal excellence at the service of business. Legal strategy that protects the value of your organization."],
      ["Navegación", "Navigation"],
      ["Contacto", "Contact"],
      ["Oficina", "Office"],
      ["Torre Reforma, Piso 32", "Reforma Tower, Floor 32"],
      ["Av. Paseo de la Reforma 483", "483 Paseo de la Reforma Ave."],
      ["Distrito Financiero, Ciudad de México", "Financial District, Mexico City"],
      ["© 2026 Bufete Corporativo. Todos los derechos reservados.", "© 2026 Bufete Corporativo. All rights reserved."],
      ["Aviso de Privacidad", "Privacy Notice"],
      ["Términos Legales", "Legal Terms"],
      ["Código de Ética", "Code of Ethics"]
    ])
  };

  /* ---------------------- ESTUDIO ---------------------- */
  PAGES["estudio.html"] = {
    mount: { sel: "#nav", before: "#navToggle" },
    colors: { bg: "rgba(255,255,255,.92)", border: "#E9ECEF", fg: "#6C757D", activeBg: "#2C3A4F", activeFg: "#ffffff" },
    phrases: [],
    dict: D([
      ["Estudio Visual — Fotografía profesional", "Estudio Visual — Professional Photography"],
      ["Portafolio", "Portfolio"],
      ["Servicios", "Services"],
      ["Sobre Mí", "About Me"],
      ["Contacto", "Contact"],
      ["Abrir menú", "Open menu"],
      ["Cerrar menú", "Close menu"],
      ["Retrato artístico con luz dramática", "Artistic portrait with dramatic lighting"],
      ["Fotografía profesional", "Professional photography"],
      ["Capturamos la esencia.", "We capture the essence."],
      ["Contamos tu historia.", "We tell your story."],
      ["Explorar galería", "Explore gallery"],
      ["Filtrar galería por categoría", "Filter gallery by category"],
      ["Todos", "All"],
      ["Retratos", "Portraits"],
      ["Bodas", "Weddings"],
      ["Paisajes", "Landscapes"],
      /* títulos de la galería */
      ["Mirada serena", "Serene gaze"],
      ["El sí, en silencio", "The vows, in silence"],
      ["Cordillera al alba", "Mountains at dawn"],
      ["Geometría de moda", "Fashion geometry"],
      ["Carácter", "Character"],
      ["Primer baile", "First dance"],
      ["Bruma en el valle", "Mist in the valley"],
      ["Línea editorial", "Editorial line"],
      ["Luz natural", "Natural light"],
      ["Promesa", "Promise"],
      ["Horizonte abierto", "Open horizon"],
      ["Movimiento", "Movement"],
      /* lightbox */
      ["Imagen ampliada", "Enlarged image"],
      ["Cerrar", "Close"],
      ["Anterior", "Previous"],
      ["Siguiente", "Next"],
      /* CTA */
      ["Reservas abiertas", "Bookings open"],
      ["¿Listo para inmortalizar tus momentos?", "Ready to immortalize your moments?"],
      ["Cuéntanos tu visión y diseñamos una sesión a la medida de tu historia.",
       "Tell us your vision and we'll design a session tailored to your story."],
      ["Agendar sesión", "Book a session"],
      /* footer */
      ["Fotografía de autor · San Salvador · © 2026", "Fine art photography · San Salvador · © 2026"],
      ["Correo electrónico", "Email"]
    ])
  };

  /* ---------------------- ODONTOLOGO ---------------------- */
  PAGES["odontologo.html"] = {
    mount: { sel: ".nav", before: "#menuToggle" },
    colors: { bg: "#ffffff", border: "#e1ebf1", fg: "#5f7384", activeBg: "#0a7ea4", activeFg: "#ffffff" },
    phrases: [],
    dict: D([
      ["Sonrisa Vital — Clínica Dental", "Sonrisa Vital — Dental Clinic"],
      ["Lun — Sáb · 08:00 a 20:00", "Mon — Sat · 08:00 to 20:00"],
      ["Emergencias 24/7: (555) 911-3333", "Emergencies 24/7: (555) 911-3333"],
      ["Servicios", "Services"],
      ["Resultados", "Results"],
      ["Testimonios", "Testimonials"],
      ["Contacto", "Contact"],
      ["Agendar", "Book"],
      ["Abrir menú", "Open menu"],
      ["Tecnología de última generación", "State-of-the-art technology"],
      ["Tecnología dental", "Dental technology"],
      ["sin dolor", "pain-free"],
      ["Tratamientos estéticos y de salud bucal con equipos digitales de precisión. Tu sonrisa en las mejores manos, en un ambiente cálido y libre de ansiedad.",
       "Aesthetic and oral-health treatments with precision digital equipment. Your smile in the best hands, in a warm, anxiety-free environment."],
      ["Agendar Evaluación", "Book Evaluation"],
      ["Ver resultados", "See results"],
      ["Paciente sonriendo", "Smiling patient"],
      ["sonrisas transformadas", "smiles transformed"],
      ["Especialidades", "Specialties"],
      ["Cuidamos cada detalle", "We care for every detail"],
      ["Soluciones integrales con un enfoque humano y resultados que se notan.",
       "Comprehensive solutions with a human approach and results you can see."],
      ["Ortodoncia Invisible", "Invisible Orthodontics"],
      ["Alineadores transparentes y removibles para corregir tu sonrisa con total discreción.",
       "Clear, removable aligners to correct your smile with total discretion."],
      ["Blanqueamiento", "Teeth Whitening"],
      ["Recupera el brillo natural de tus dientes con tecnología LED segura y sin sensibilidad.",
       "Restore the natural shine of your teeth with safe LED technology and no sensitivity."],
      ["Implantes", "Implants"],
      ["Reemplazo de piezas dentales con titanio de grado médico y guía quirúrgica digital.",
       "Tooth replacement with medical-grade titanium and digital surgical guidance."],
      ["Odontopediatría", "Pediatric Dentistry"],
      ["Atención cálida y lúdica para los más pequeños, creando hábitos sanos desde la infancia.",
       "Warm, playful care for the little ones, building healthy habits from childhood."],
      ["Antes & Después", "Before & After"],
      ["Resultados que hablan solos", "Results that speak for themselves"],
      ["Arrastra el control deslizante para descubrir la transformación de un blanqueamiento real.",
       "Drag the slider to reveal the transformation of a real whitening."],
      ["Antes del blanqueamiento", "Before whitening"],
      ["Después del blanqueamiento", "After whitening"],
      ["ANTES", "BEFORE"],
      ["DESPUÉS", "AFTER"],
      ["Desliza con el ratón o el dedo ↔", "Slide with your mouse or finger ↔"],
      ["Lo que dicen nuestros pacientes", "What our patients say"],
      ['"Le tenía pánico al dentista y aquí cambié por completo. Cero dolor y un trato increíble. Mi blanqueamiento quedó perfecto."',
       '"I was terrified of the dentist and here I changed completely. Zero pain and incredible care. My whitening turned out perfect."'],
      ['"Mis implantes se ven y se sienten como dientes naturales. Profesionalismo de principio a fin. Totalmente recomendados."',
       '"My implants look and feel like natural teeth. Professionalism from start to finish. Highly recommended."'],
      ['"Mi hija de 6 años pide volver al dentista. El equipo de odontopediatría hace magia con los niños. Estamos felices."',
       '"My 6-year-old daughter asks to go back to the dentist. The pediatric dentistry team works magic with kids. We\'re delighted."'],
      ["Implantes dentales", "Dental implants"],
      ["Testimonio 1", "Testimonial 1"],
      ["Testimonio 2", "Testimonial 2"],
      ["Testimonio 3", "Testimonial 3"],
      ["Clínica dental integral comprometida con tu salud y el cuidado estético de tu sonrisa.",
       "Comprehensive dental clinic committed to your health and the aesthetic care of your smile."],
      ["Horarios", "Hours"],
      ["Lun — Vie: 08:00 — 20:00", "Mon — Fri: 08:00 — 20:00"],
      ["Sábado: 09:00 — 14:00", "Saturday: 09:00 — 14:00"],
      ["Av. Salud 480, Torre Médica", "480 Salud Ave., Medical Tower"],
      ["Encuéntranos", "Find us"],
      ["Mapa de ubicación", "Location map"],
      ["© 2026 Sonrisa Vital · Clínica Dental. Todos los derechos reservados.",
       "© 2026 Sonrisa Vital · Dental Clinic. All rights reserved."]
    ])
  };

  /* ---------------------- BARBERIA ---------------------- */
  PAGES["barberia.html"] = {
    mount: { sel: ".nav", before: "#menuToggle" },
    colors: { bg: "rgba(255,255,255,.06)", border: "#2c2c31", fg: "#f4f1ea", activeBg: "#c9a44c", activeFg: "#1a1409" },
    phrases: [],
    dict: D([
      ["Corte & Filo — Barbería Clásica", "Corte & Filo — Classic Barbershop"],
      ["Servicios", "Services"],
      ["Nuestro Equipo", "Our Team"],
      ["Galería", "Gallery"],
      ["Reservas", "Bookings"],
      ["Abrir menú", "Open menu"],
      ["Desde 1992 · Tradición urbana", "Since 1992 · Urban tradition"],
      ["El arte de la", "The art of"],
      ["barbería", "classic"],
      ["clásica", "barbering"],
      ["Cortes a navaja, afeitado tradicional con toalla caliente y un ambiente donde cada detalle está pensado para ti. Esto no es una peluquería: es un ritual.",
       "Razor cuts, traditional hot-towel shaves and a space where every detail is designed for you. This isn't a hair salon: it's a ritual."],
      ["Reservar Turno", "Book Appointment"],
      ["Ver servicios →", "See services →"],
      ["Carta de servicios", "Service menu"],
      ["Precios & Servicios", "Prices & Services"],
      ["Trabajo de precisión con productos premium. Sin prisas, sin atajos.",
       "Precision work with premium products. No rush, no shortcuts."],
      ["Corte Clásico", "Classic Cut"],
      ["Lavado, corte a tijera o máquina y peinado", "Wash, scissor or clipper cut and styling"],
      ["Arreglo de Barba con Toalla Caliente", "Beard Grooming with Hot Towel"],
      ["Perfilado a navaja, aceites y bálsamo", "Razor lining, oils and balm"],
      ["Corte + Barba (Combo)", "Cut + Beard (Combo)"],
      ["La experiencia completa Corte & Filo", "The full Corte & Filo experience"],
      ["Afeitado Tradicional a Navaja", "Traditional Razor Shave"],
      ["Espuma caliente y piedra de alumbre", "Hot foam and alum block"],
      ["Corte Infantil", "Kids' Cut"],
      ["Menores de 12 años", "Under 12 years old"],
      ["Diseño de Líneas & Degradado", "Line Design & Fade"],
      ["Freestyle y detalles a navaja", "Freestyle and razor details"],
      ["Maestros de la navaja", "Masters of the razor"],
      ["Tres estilos, una misma obsesión por el detalle.", "Three styles, one shared obsession with detail."],
      ["Barbero Marco Ávila", "Barber Marco Ávila"],
      ["Barbero Diego Salas", "Barber Diego Salas"],
      ["Barbero Iván Mora", "Barber Iván Mora"],
      ["Especialista en degradados", "Fade specialist"],
      ["Maestro del fade y las líneas imposibles. 14 años dándole forma a la ciudad.",
       "Master of the fade and impossible lines. 14 years shaping the city."],
      ["Afeitado clásico a navaja", "Classic razor shaving"],
      ["El ritual de la toalla caliente es su firma. Precisión quirúrgica y mano firme.",
       "The hot-towel ritual is his signature. Surgical precision and a steady hand."],
      ["Estilismo & barba de diseño", "Styling & designer beard"],
      ["Combina lo vintage con tendencias urbanas. Tu barba nunca se vio tan bien.",
       "He blends vintage with urban trends. Your beard has never looked this good."],
      ["Nuestro trabajo", "Our work"],
      ["Resultados reales de la silla de Corte & Filo.", "Real results from the Corte & Filo chair."],
      ["Corte 1", "Cut 1"], ["Corte 2", "Cut 2"], ["Corte 3", "Cut 3"],
      ["Corte 4", "Cut 4"], ["Corte 7", "Cut 7"], ["Corte 8", "Cut 8"],
      ["Asegura tu silla", "Secure your chair"],
      ["Reserva tu turno", "Book your appointment"],
      ["Las mejores horas se agotan rápido. Aparta tu cita y deja el resto en nuestras manos.",
       "The best slots sell out fast. Reserve your appointment and leave the rest to us."],
      ["Reservar Ahora", "Book Now"],
      ["Horarios de Atención", "Opening Hours"],
      ["Lunes — Viernes", "Monday — Friday"],
      ["Sábado", "Saturday"],
      ["Domingo", "Sunday"],
      ["Cerrado", "Closed"],
      ["Feriados", "Holidays"],
      ["Dónde Estamos", "Where We Are"],
      ["Av. del Roble 1245, Barrio Centro", "1245 Roble Ave., Downtown"],
      ["Reserva Directa", "Direct Booking"],
      ["Escríbenos y confirma tu turno en minutos. Atención personalizada.",
       "Message us and confirm your appointment in minutes. Personalized service."],
      ["Contactar", "Contact"],
      ["© 2026 Corte & Filo Barbershop. Todos los derechos reservados.",
       "© 2026 Corte & Filo Barbershop. All rights reserved."]
    ])
  };

  /* ============================================================
     MOTOR
     ============================================================ */
  function getPageKey() {
    var f = (location.pathname.split("/").pop() || "").toLowerCase();
    if (!f || f.indexOf(".htm") === -1) f = "index.html";
    return f;
  }
  var CFG = PAGES[getPageKey()] || PAGES["index.html"];
  var dict = CFG.dict || {};
  var phrases = CFG.phrases || [];
  var ATTRS = ["aria-label", "title", "alt", "placeholder"];

  var origText = new WeakMap();   // nodo de texto -> texto original (ES)
  var origAttr = new WeakMap();   // elemento -> { atributo: valor original }
  var titleOrig = document.title;

  function getLang() {
    try { return localStorage.getItem(STORAGE_KEY) || "es"; }
    catch (e) { return window.__vltLang || "es"; }
  }
  function setLangStore(l) {
    try { localStorage.setItem(STORAGE_KEY, l); }
    catch (e) { window.__vltLang = l; }
  }

  function translateString(es) {
    if (Object.prototype.hasOwnProperty.call(dict, es)) return dict[es];
    if (phrases.length) {
      var out = es, changed = false;
      for (var i = 0; i < phrases.length; i++) {
        if (out.indexOf(phrases[i][0]) !== -1) { out = out.split(phrases[i][0]).join(phrases[i][1]); changed = true; }
      }
      if (changed) return out;
    }
    return null;
  }

  function skip(node) {
    var p = node.parentNode;
    while (p && p.nodeType === 1) {
      var tn = p.tagName;
      if (tn === "SCRIPT" || tn === "STYLE" || tn === "NOSCRIPT") return true;
      if (p.classList && p.classList.contains("vlt-i18n")) return true;
      if (p.hasAttribute && p.hasAttribute("data-no-i18n")) return true;
      p = p.parentNode;
    }
    return false;
  }

  function eachTextNode(fn) {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (skip(n)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n; while ((n = w.nextNode())) fn(n);
  }

  function applyTextNode(node, lang) {
    if (!origText.has(node)) origText.set(node, node.nodeValue);
    var baseRaw = origText.get(node);
    if (lang === "es") {
      if (node.nodeValue !== baseRaw) node.nodeValue = baseRaw;
      return;
    }
    var m = baseRaw.match(/^(\s*)([\s\S]*?)(\s*)$/);
    var t = translateString(norm(m[2]));
    var val = (t != null) ? (m[1] + t + m[3]) : baseRaw;
    if (node.nodeValue !== val) node.nodeValue = val;
  }

  function applyAttrs(lang) {
    var sel = "[" + ATTRS.join("],[") + "]";
    var els = document.querySelectorAll(sel);
    Array.prototype.forEach.call(els, function (el) {
      if (el.closest && el.closest(".vlt-i18n")) return;
      var store = origAttr.get(el);
      if (!store) { store = {}; origAttr.set(el, store); }
      ATTRS.forEach(function (a) {
        if (!el.hasAttribute(a)) return;
        if (!(a in store)) store[a] = el.getAttribute(a);
        var base = store[a];
        if (lang === "es") { if (el.getAttribute(a) !== base) el.setAttribute(a, base); return; }
        var t = translateString(norm(base));
        var val = (t != null) ? t : base;
        if (el.getAttribute(a) !== val) el.setAttribute(a, val);
      });
    });
  }

  function applyTitle(lang) {
    if (lang === "es") { if (document.title !== titleOrig) document.title = titleOrig; return; }
    var t = translateString(norm(titleOrig));
    document.title = (t != null) ? t : titleOrig;
  }

  var observer = null, applying = false;

  function apply(lang) {
    applying = true;
    if (observer) observer.disconnect();
    eachTextNode(function (n) { applyTextNode(n, lang); });
    applyAttrs(lang);
    applyTitle(lang);
    document.documentElement.lang = lang;
    applying = false;
    if (observer) observe();
    updateButtons(lang);
  }

  function observe() {
    if (!("MutationObserver" in window)) return;
    if (!observer) {
      observer = new MutationObserver(function () {
        if (applying) return;
        if (getLang() === "es") return;          // contenido nuevo ya está en español
        if (observer._t) return;
        observer._t = setTimeout(function () {
          observer._t = null;
          apply("en");
        }, 30);
      });
    }
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  /* ---------------------- Botón ---------------------- */
  var groupEl = null;

  function injectCSS() {
    if (document.getElementById("vlt-i18n-css")) return;
    var css =
      ".vlt-i18n{display:inline-flex;align-items:center;gap:2px;padding:3px;border-radius:999px;" +
      "border:1px solid var(--vi-border);background:var(--vi-bg);-webkit-backdrop-filter:blur(6px);" +
      "backdrop-filter:blur(6px);font-family:inherit;line-height:1;flex:0 0 auto}" +
      ".vlt-i18n button{appearance:none;-webkit-appearance:none;border:0;margin:0;background:transparent;" +
      "cursor:pointer;font-family:inherit;font-size:.72rem;font-weight:600;letter-spacing:.04em;" +
      "color:var(--vi-fg);padding:6px 11px;border-radius:999px;line-height:1;" +
      "transition:background .2s,color .2s}" +
      ".vlt-i18n button[aria-pressed=\"true\"]{background:var(--vi-active-bg);color:var(--vi-active-fg)}" +
      ".vlt-i18n button:focus-visible{outline:2px solid var(--vi-active-bg);outline-offset:2px}" +
      ".vlt-i18n.vlt-abs{position:absolute;top:16px;right:16px;z-index:20}";
    var s = document.createElement("style");
    s.id = "vlt-i18n-css";
    s.textContent = css;
    document.head.appendChild(s);
  }

  function buildButton() {
    var c = CFG.colors;
    var g = document.createElement("div");
    g.className = "vlt-i18n" + (CFG.mount.abs ? " vlt-abs" : "");
    g.setAttribute("role", "group");
    g.setAttribute("aria-label", "Idioma / Language");
    g.setAttribute("data-no-i18n", "");
    g.style.cssText =
      "--vi-bg:" + c.bg + ";--vi-border:" + c.border + ";--vi-fg:" + c.fg +
      ";--vi-active-bg:" + c.activeBg + ";--vi-active-fg:" + c.activeFg + ";";
    ["es", "en"].forEach(function (l) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("data-set-lang", l);
      b.textContent = l.toUpperCase();
      b.addEventListener("click", function () { setLangStore(l); apply(l); });
      g.appendChild(b);
    });
    return g;
  }

  function updateButtons(lang) {
    if (!groupEl) return;
    Array.prototype.forEach.call(groupEl.querySelectorAll("button"), function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-set-lang") === lang ? "true" : "false");
    });
  }

  function mount() {
    var m = CFG.mount;
    var host = document.querySelector(m.sel) || document.body;
    groupEl = buildButton();
    if (!m.abs && m.before) {
      var ref = host.querySelector(m.before);
      if (ref) { host.insertBefore(groupEl, ref); return; }
    }
    host.appendChild(groupEl);
  }

  function init() {
    injectCSS();
    mount();
    observe();
    apply(getLang());
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
