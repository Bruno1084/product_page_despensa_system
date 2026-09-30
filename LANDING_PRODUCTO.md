# Landing del producto · Especificación

Documento de trabajo para crear una **landing page que promocione el sistema** (bot de WhatsApp con IA + panel de gestión) como producto propio, **separada del sitio de Despensa El Cacho**.

---

## 1. Por qué una landing separada

La landing actual (`landing_page/`) está hecha para los **clientes del almacén** y para que Meta apruebe la app de WhatsApp Business. Por eso publica, a propósito, datos del negocio: dirección, teléfono, email, zona, JSON-LD de `GroceryStore`, política de privacidad con razón social y CUIT.

Si esa misma página se usara para vender el sistema a otras PYMEs:

- Se expondrían datos personales y comerciales del local a una audiencia que no los necesita.
- El producto quedaría atado a un único comercio y no se vería como una solución reutilizable.
- Mezclaría dos responsables de datos distintos (el almacén frente a sus clientes y el proveedor del software frente a sus clientes PYME).

**Objetivo:** un sitio nuevo, con marca, dominio y textos propios, que muestre qué hace el sistema sin revelar a quién pertenece ni dónde opera el caso real.

---

## 2. Qué NO debe aparecer (lista de exclusión)

| Categoría | Ejemplos en el sitio actual | En la landing del producto |
| --- | --- | --- |
| Identidad del comercio | "Despensa El Cacho", logo, `og-image.png` | Nombre y logo del producto. Si hace falta un ejemplo, usar un comercio ficticio ("Almacén Don Pepe") |
| Ubicación | Av. Guido Hispano, Uspallata, Las Heras, Mendoza, link a Google Maps | Como mucho "Hecho en Argentina" |
| Contacto del negocio | +54 261 660-9894, `wa.me/5492616609894`, ElCachoUsp@gmail.com | Canales propios del producto (email del proyecto, formulario, WhatsApp comercial distinto) |
| Datos legales del negocio | Razón social y CUIT (`privacidad.html`) | Datos del titular del software, solo si corresponde y en sus propias páginas legales |
| Datos operativos reales | Nombres de clientes, pedidos, productos, precios o conversaciones reales | Datos de demostración inventados |
| Capturas del panel | Dashboard, inbox u órdenes con información real | Capturas con base de datos de prueba (`005_mock_values_schema.sql`) o mockups |
| Detalles técnicos internos | Endpoints (`/api/v1/...`), puertos (4000/4001), variables de entorno, estado de la autenticación, nombres de tablas | Nada de esto. Hablar de beneficios, no de la implementación |
| Metadatos | JSON-LD `GroceryStore`, `canonical`/`og:url` a `despensa-el-cacho.netlify.app` | JSON-LD `SoftwareApplication`, dominio propio |

> Ojo con los datos técnicos: hoy la API tiene rutas CRUD montadas sin el middleware de autenticación (ver `despensa_system/ARCHITECTURE.md`). Publicar URLs, puertos o nombres de endpoints en una página pública facilita que alguien los encuentre. No incluirlos, y resolver ese punto antes de ofrecer demos en línea.

---

## 3. Identidad del producto

- **Nombre:** a definir (nombre de trabajo en el repo: *Despensa System*). Elegir uno que no incluya el nombre del almacén ni la localidad.
- **Logo, favicon e imagen para compartir:** nuevos. No reutilizar `logo-original.jpeg`, `logo.png` ni `og-image.png`.
- **Paleta:** conviene diferenciarse del azul `#1f3a9e` de El Cacho para que no se asocien visualmente. Se puede mantener la base técnica (variables en `:root`, tipografía Inter, estilo mobile-first).
- **Tono:** voseo rioplatense, directo, orientado al dueño de un comercio chico que no es técnico.

---

## 4. Público y propuesta de valor

**A quién le habla:** almacenes, despensas, autoservicios, dietéticas, forrajerías y otros comercios de barrio que ya reciben pedidos por WhatsApp y los gestionan a mano.

**Problemas que resuelve:**

- Mensajes que llegan fuera de horario y quedan sin respuesta.
- Preguntas repetidas sobre precios y stock.
- Pedidos anotados en papel o en el chat, fáciles de perder o confundir.
- Poco control sobre el stock real.

**Propuesta de valor (borrador):**

> Tu comercio atiende pedidos por WhatsApp las 24 horas. Un asistente con IA responde precios y stock, arma el pedido con el cliente y te lo deja listo en un panel para prepararlo.

---

## 5. Funcionalidades a comunicar

Tomadas de lo que el sistema hace hoy (`despensa_system`), expresadas como beneficios:

| Módulo del sistema | Cómo presentarlo |
| --- | --- |
| Bot gateway + agente IA | Asistente en WhatsApp que entiende mensajes en lenguaje natural, 24/7 |
| Consulta de stock y listado por categoría | "Tus clientes preguntan qué hay y cuánto sale, y reciben la respuesta al instante" |
| Carrito conversacional (agregar, quitar, modificar ítems) | "Arman el pedido chateando, como si hablaran con vos" |
| Checkout (dirección de entrega, medio de pago, incluido Mercado Pago) | "El asistente pide los datos que faltan antes de confirmar" |
| Confirmación y revisión de pedidos | "Cada pedido queda registrado y pasa por tu revisión" |
| Derivación a una persona | "Si el cliente lo pide, lo atendés vos" |
| Dashboard: inbox, pedidos, productos, clientes | Panel web para ver conversaciones, pedidos y catálogo en un solo lugar |
| Productos, inventario y movimientos de stock | Control de stock actualizado con cada venta |
| Tickets | Impresión del ticket del pedido para prepararlo |

No prometer funciones que todavía no están en producción (por ejemplo, el login del panel o la app de stock si no están terminados). Marcar lo que venga como "Próximamente".

---

## 6. Estructura de la página

Una sola página (`index.html`) más páginas legales propias del producto.

1. **Header:** logo del producto, navegación (Cómo funciona · Funciones · Para quién · Preguntas · Contacto), botón "Pedí una demo".
2. **Hero:** título + bajada con la propuesta de valor, dos botones ("Pedí una demo" / "Ver cómo funciona") y un mockup de teléfono con una conversación de ejemplo **de un comercio ficticio**. Se puede reutilizar el componente `.phone` / `.bubble` de la landing actual cambiando nombre y avatar.
3. **Problema:** 3 o 4 tarjetas con los dolores de la sección 4.
4. **Cómo funciona (3 pasos):** el cliente escribe → el asistente arma el pedido → vos lo preparás desde el panel.
5. **Funciones:** grilla con las funcionalidades de la sección 5.
6. **Panel de gestión:** 2 o 3 capturas del dashboard (inbox, pedidos, productos) con datos de prueba, o mockups.
7. **Para quién es:** tipos de comercio.
8. **IA responsable:** el asistente se presenta como automático, se puede pedir una persona, no pide contraseñas ni datos de tarjeta, y el comercio revisa los pedidos antes de prepararlos.
9. **Caso de uso (opcional):** "Ya funciona en un almacén de barrio en Argentina", sin nombre, localidad ni cifras que permitan identificarlo. Solo agregar un testimonio con nombre si el comercio lo autoriza por escrito.
10. **Preguntas frecuentes:** ¿Necesito un número nuevo? ¿Qué pasa si el bot no entiende? ¿Cómo cargo mis productos? ¿Quién ve las conversaciones? ¿Cuánto cuesta?
11. **Contacto / CTA final:** formulario simple o link a un canal comercial propio del producto.
12. **Footer:** © nombre del producto, links a Privacidad y Términos del producto.

---

## 7. Ejemplo de conversación para el hero

Con datos inventados, sin marcas reales si no se tiene permiso para usarlas:

```text
Cliente:    Hola! ¿Tienen yerba de 1 kg y leche?
Asistente:  ¡Hola! Sí 🙌 Tenemos yerba de 1 kg y leche entera y descremada. ¿Cuáles te separo?
Cliente:    Una yerba y 2 leches enteras
Asistente:  Listo ✅ Tu pedido:
            • 1 × Yerba 1 kg
            • 2 × Leche entera 1 L
            ¿Retirás en el local o te lo enviamos?
Cliente:    Envío, por favor
Asistente:  Perfecto. ¿A qué dirección y cómo vas a pagar? (efectivo o Mercado Pago)
```

Cabecera del chat: "Almacén Don Pepe · Asistente automático". Avatar genérico.

---

## 8. Contenido técnico (implementación)

Se mantiene el mismo enfoque que la landing actual, que ya funciona bien:

- **Stack:** HTML + CSS + JS sin build, sin frameworks.
- **Ubicación:** carpeta nueva en el monorepo, por ejemplo `despensa_saas/product_landing/`, o un repositorio aparte. **No** agregarla dentro de `landing_page/`, para que un deploy no publique una con datos de la otra.
- **Reutilizable desde `landing_page/`:**
  - `assets/css/styles.css` como base (cambiar variables de color y quitar lo específico del almacén).
  - `assets/js/main.js` (menú mobile y año del footer).
  - `netlify.toml` con los encabezados de seguridad y cache. Si se agrega un formulario de Netlify, ajustar `form-action` en la CSP.
- **No copiar:** `assets/img/*`, `privacidad.html`, `eliminacion-datos.html`, `terminos.html`, `_redirects`, `sitemap.xml`, `robots.txt` (todos tienen datos o dominio del almacén).
- **SEO y metadatos:**
  - `canonical`, `og:*` y `sitemap.xml` con el dominio del producto.
  - JSON-LD de tipo `SoftwareApplication` (`applicationCategory: "BusinessApplication"`), sin dirección ni teléfono del almacén.
- **Formulario de contacto:** Netlify Forms o un enlace `mailto:` a un email del proyecto. Pedir solo nombre, comercio, email/WhatsApp y mensaje.
- **Hosting:** sitio de Netlify distinto (por ejemplo `nombre-producto.netlify.app` o dominio propio).
- **Accesibilidad:** mantener skip-link, `aria-*`, foco visible y contraste AA como en la landing actual.

### Estructura sugerida

```text
product_landing/
├── index.html
├── privacidad.html      # política del sitio del producto (datos del formulario)
├── terminos.html        # términos del sitio / del servicio
├── 404.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── img/             # logo, favicon, og-image y capturas con datos de prueba
├── netlify.toml
├── robots.txt
└── sitemap.xml
```

---

## 9. Páginas legales del producto

Son distintas de las del almacén:

- **Privacidad del sitio:** qué datos se recolectan en el formulario de contacto, para qué y cómo pedir su eliminación (Ley 25.326).
- **Términos:** uso del sitio y, si ya se comercializa, condiciones del servicio.
- Si el sistema se ofrece a otras PYMEs, cada comercio que lo use necesita **su propia** política de privacidad para sus clientes finales (como la que hoy tiene El Cacho). La landing del producto puede ofrecer una plantilla, pero no debe publicar la de ningún cliente.

Conviene que un profesional revise los textos antes de publicarlos.

---

## 10. Checklist antes de publicar

- [ ] Buscar en la carpeta nueva y confirmar que no hay resultados:

  ```bash
  grep -rniE "cacho|uspallata|guido|hispano|las heras|2616609894|660-9894|ElCachoUsp|despensa-el-cacho" product_landing/
  ```

- [ ] Revisar las capturas y mockups: sin nombres, teléfonos, direcciones ni pedidos reales.
- [ ] Borrar metadatos EXIF de las imágenes (fecha, ubicación, dispositivo).
- [ ] Ningún endpoint, puerto, variable de entorno ni detalle de la base de datos en el HTML, comentarios o JS.
- [ ] `canonical`, `og:url`, `og:image`, `robots.txt` y `sitemap.xml` apuntan al dominio del producto.
- [ ] El JSON-LD es `SoftwareApplication` y no contiene datos del almacén.
- [ ] Las funciones anunciadas existen hoy; lo pendiente dice "Próximamente".
- [ ] Links de Privacidad y Términos llevan a las páginas del producto, no a las del almacén.
- [ ] Revisar en mobile (360 px) y desktop, y con Lighthouse (accesibilidad y SEO).

---

## 11. Pendientes de definir

- Nombre, logo y dominio del producto.
- Canal de contacto comercial (email y/o WhatsApp distinto al del almacén).
- Modelo de precios o si se muestra "Consultá".
- Si se menciona el caso real y con qué nivel de detalle (y la autorización del comercio).
- Capturas del dashboard con datos de prueba.
