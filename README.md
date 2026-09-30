# Despensa System · Landing del producto

Sitio estático que presenta el sistema (asistente de WhatsApp con IA + panel de gestión) como producto para otros comercios. Es **independiente** de `landing_page/` (la del almacén): no comparte imágenes, datos, dominio ni páginas legales. La especificación está en [`LANDING_PRODUCTO.md`](LANDING_PRODUCTO.md).

## Estructura

```text
product_page/
├── index.html          # landing (hero, problema, cómo funciona, funciones, panel, para quién, IA, FAQ, contacto)
├── privacidad.html     # privacidad del sitio (datos del formulario, Ley 25.326)
├── terminos.html       # términos de uso del sitio
├── gracias.html        # destino del formulario (noindex)
├── 404.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js      # menú mobile, año del footer, pestañas del mockup, validación del formulario
│   └── img/            # logo.svg, favicon.svg/.png, apple-touch-icon.png, og-image.png
├── netlify.toml        # encabezados de seguridad (CSP) y cache
├── robots.txt
└── sitemap.xml
```

Sin build ni dependencias: HTML + CSS + JS.

## Ver en local

```bash
python -m http.server 8000
# abrir http://localhost:8000
```

Usar un servidor (no `file://`) para que funcionen las rutas absolutas de `404.html` y `gracias.html`.

## Publicar

1. Crear un **sitio nuevo** en Netlify apuntando a esta carpeta (no reutilizar el del almacén).
2. En *Forms*, habilitar la detección de formularios: el formulario `demo` usa Netlify Forms y redirige a `/gracias.html`. Configurar la notificación por email para recibir los pedidos de demo.
3. Reemplazar el dominio `despensa-system.netlify.app` si se usa otro (ver pendientes).

## Pendientes antes de publicar

Buscar `COMPLETAR` en todo el sitio:

| Qué | Dónde |
| --- | --- |
| Dominio definitivo | `index.html` (canonical, og:url, og:image, JSON-LD), `privacidad.html` y `terminos.html` (canonical), `robots.txt`, `sitemap.xml` |
| Titular del software: nombre o razón social, CUIT y domicilio | `privacidad.html` §2, `terminos.html` §1 |
| Email del proyecto | `privacidad.html` §2 y §7 |
| Jurisdicción | `terminos.html` §9 |

Otras decisiones tomadas con valores por defecto (cambiar si hace falta):

- **Nombre:** se usa el nombre de trabajo *Despensa System*. Si cambia, reemplazarlo en todos los HTML y regenerar `og-image.png`.
- **Precio:** la FAQ dice que se cotiza a medida ("Pedí una demo").
- **Caso real:** se menciona "un almacén de barrio en Argentina", sin nombre, localidad ni cifras. Confirmar con el comercio que está de acuerdo.
- **Próximamente:** "Usuarios y contraseñas para tu equipo" (el login del panel no está montado) y "Reportes de ventas" (la sección del dashboard no existe todavía). Sacar la etiqueta cuando estén en producción.
- Los textos legales son un borrador: **conviene que los revise un profesional**.

> Antes de ofrecer demos **en línea** del panel, resolver que las rutas de la API no tienen autenticación (ver `despensa_system/ARCHITECTURE.md`). Mientras tanto, hacer las demos en una instancia local con la base de prueba.

## Imágenes

- Las capturas del panel son un **mockup en HTML/CSS** dentro de `index.html` con datos inventados (comercio "Almacén Don Pepe"). No hay capturas reales del dashboard.
- `favicon.png`, `apple-touch-icon.png` y `og-image.png` se generaron renderizando HTML con Edge headless: son PNG sin metadatos EXIF. Si se cambia el logo, regenerarlas.

## Checklist rápido

```bash
# No debe devolver nada
grep -rniE "cacho|uspallata|guido|hispano|las heras|2616609894|660-9894|ElCachoUsp|despensa-el-cacho" . --exclude=LANDING_PRODUCTO.md --exclude=README.md

# Tampoco detalles técnicos internos
grep -rniE "api/v1|:4000|:4001|localhost|DATABASE_URL|JWT|webhook" . --exclude=LANDING_PRODUCTO.md --exclude=README.md
```

Después, revisar en mobile (360 px) y desktop, y pasar Lighthouse (accesibilidad y SEO) sobre el sitio publicado.
