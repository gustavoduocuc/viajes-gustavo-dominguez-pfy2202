# Evidencia de pruebas en navegadores

Fecha: 18 de noviembre de 2026 · Equipo: macOS 27, Apple Silicon · Aplicación servida en modo desarrollo (viewport indicado) y como compilación de producción bajo el subpath publicado.

## Navegadores y resultados

| Navegador | Motor / versión | Viewport | Pruebas automatizadas | Resultado |
|---|---|---|---|---|
| Chrome escritorio | Chromium 153.0.8010.12 | 1440×900 | 17/17 | Correcto |
| Safari escritorio | WebKit 26.6 | 1440×900 | 17/17 | Correcto |
| Chrome móvil (Pixel 7) | Chromium 153.0.8010.12 | 412×839 | 17/17 | Correcto |
| Safari móvil (iPhone 13) | WebKit 26.6 | 390×664 | 17/17 | Correcto |
| Tablet (iPad Mini) | Chromium 153.0.8010.12 | 768×1024 | 17/17 | Correcto |
| Firefox escritorio | Firefox 160.0.1 | ~1390 px | No automatizado en este equipo | Verificado a mano (ver «Prueba manual») |

Total: 85 pruebas pasan en 5 configuraciones.

**Sobre Safari:** las pruebas automatizadas usan el motor WebKit 26.6, el mismo de Safari. La aplicación Safari 27.2 se probó además a mano en el sitio publicado (ver «Prueba manual»).

**Sobre Firefox:** en el equipo de desarrollo el navegador no se puede controlar desde las pruebas automatizadas (el proceso termina con «Could not find profile folder»; es una limitación del entorno, no de la aplicación). Se probó entonces a mano en el sitio publicado (ver «Prueba manual»).

## Flujos verificados

| Flujo | Qué se comprueba |
|---|---|
| Recorrido completo | Inicio → Destinos (8) → detalle de Cusco → Vuelos → Hoteles → elegir vuelo y hotel → Mi viaje con 7 noches y total 1085 US$ |
| Persistencia | El viaje sobrevive a un refresco; una oferta agotada no se puede elegir |
| Reemplazo | Elegir una oferta de otro destino reemplaza el viaje y muestra el aviso, que se cierra |
| Estado vacío | Mi viaje sin elementos; destino sin vuelos ni hoteles; filtro sin resultados; hoteles agotados |
| Estado de error | Lista de destinos (500), detalle (500) y ofertas GraphQL con error, con acción de salida |
| No encontrado | Destino inexistente y dirección desconocida, con enlace de vuelta |
| Producción bajo subpath | Ruta profunda abre la app (el servidor responde 404 y sirve `404.html`); el worker de la API mock se registra con alcance `/viajes-gustavo-dominguez-pfy2202/`; REST y GraphQL responden; sin peticiones externas |

Revisión visual en las 4 configuraciones principales: sin desplazamiento horizontal en ninguna pantalla (inicio, destinos, detalle, vuelos con filtro, hoteles, Mi viaje, vacío, 404 y error).

## Comparación de visualización y funcionamiento

| Aspecto | Chromium | WebKit | Resultado |
|---|---|---|---|
| Fechas (`Intl`, español) | `5 sept 2027` | `5 sept 2027` | Idéntico |
| Precios (`Intl`, USD) | `1085 US$` | `1085 US$` | Idéntico |
| Fuentes, layouts flex/grid | Según diseño | Según diseño | Sin diferencias |
| Worker de la API mock (producción) | Registrado | Registrado | Idéntico |
| Barra de menú fija en móvil | Correcta | Correcta | Idéntico |

## Correcciones aplicadas

Ninguna fue necesaria en la aplicación: no apareció ninguna diferencia de visualización ni de funcionamiento entre Chromium y WebKit. Los únicos cambios fueron en las pruebas (nuevos recorridos y estados, selectores exactos).

## Capturas

Carpeta [screenshots](screenshots/). Nombre: `<navegador>-<pantalla>.jpg`.

| Pantalla | Chrome escritorio | Safari escritorio | Chrome móvil | Safari móvil |
|---|---|---|---|---|
| Inicio | [ver](screenshots/chromium-desktop-home.jpg) | [ver](screenshots/webkit-desktop-home.jpg) | [ver](screenshots/mobile-chromium-home.jpg) | [ver](screenshots/mobile-webkit-home.jpg) |
| Destinos | [ver](screenshots/chromium-desktop-destinos.jpg) | [ver](screenshots/webkit-desktop-destinos.jpg) | [ver](screenshots/mobile-chromium-destinos.jpg) | [ver](screenshots/mobile-webkit-destinos.jpg) |
| Mi viaje | [ver](screenshots/chromium-desktop-mi-viaje.jpg) | [ver](screenshots/webkit-desktop-mi-viaje.jpg) | [ver](screenshots/mobile-chromium-mi-viaje.jpg) | [ver](screenshots/mobile-webkit-mi-viaje.jpg) |
| Detalle | [ver](screenshots/chromium-desktop-detalle.jpg) | | | |
| Vuelos con filtro | [ver](screenshots/chromium-desktop-vuelos-filtro.jpg) | | | |
| Hoteles | [ver](screenshots/chromium-desktop-hoteles.jpg) | | | |
| Estado vacío | [ver](screenshots/chromium-desktop-vacio.jpg) | | | |
| No encontrado | [ver](screenshots/chromium-desktop-404-destino.jpg) | | | [ver](screenshots/mobile-webkit-404-destino.jpg) |
| Error | [ver](screenshots/chromium-desktop-error-500.jpg) | | | [ver](screenshots/mobile-webkit-error-500.jpg) |

## Prueba manual en navegadores reales (sitio publicado)

Fecha: 20 de noviembre de 2026 · Sitio: https://gustavoduocuc.github.io/viajes-gustavo-dominguez-pfy2202 · Equipo: macOS, ventanas normales (no privadas), con el redimensionado de ventana como modo adaptable. Versiones: las instaladas en el equipo (Safari 27.2, Firefox 160.0.1). El ancho es el aproximado de la ventana.

| Navegador | Ancho aprox. | Pantallas verificadas | Resultado | Correcciones | Capturas |
|---|---|---|---|---|---|
| Firefox 160 escritorio | 1390 px | Destinos (8 destinos, filtros Región y País) | Correcto, con 3 columnas | Ninguna | [destinos](screenshots/firefox-desktop-destinos.jpg) |
| Firefox 160 ventana estrecha | 990 px | Destinos | Correcto, con 2 columnas | Ninguna | [destinos](screenshots/firefox-ventana-estrecha-destinos.jpg) |
| Firefox 160 vista móvil | 500 px | Inicio, Destinos, detalle de Cusco, Mi viaje con un vuelo elegido | Correcto: menú inferior, contador de Mi viaje (1), total 420 US$ y aviso «Falta elegir un hotel» | Ninguna | [inicio](screenshots/firefox-movil-home.jpg), [destinos](screenshots/firefox-movil-destinos.jpg), [detalle](screenshots/firefox-movil-detalle.jpg), [mi viaje](screenshots/firefox-movil-mi-viaje.jpg) |
| Safari 27.2 escritorio | 1290 px | Destinos (filtros Región y País) | Correcto, con 3 columnas | Ninguna | [destinos](screenshots/safari-desktop-destinos.jpg) |
| Safari 27.2 ventana estrecha | 970 px | Destinos | Correcto, con 2 columnas | Ninguna | [destinos](screenshots/safari-ventana-estrecha-destinos.jpg) |
| Safari 27.2 vista móvil | 570 px | Destinos, detalle de Buenos Aires, Mi viaje con un hotel elegido | Correcto: 7 noches × 70 US$ = 490 US$, aviso «Falta elegir un vuelo», contador (1) | Ninguna | [destinos](screenshots/safari-movil-destinos.jpg), [detalle](screenshots/safari-movil-detalle.jpg), [mi viaje](screenshots/safari-movil-mi-viaje.jpg) |
| Chrome o Edge | — | — | Pendiente | — | — |

Observaciones:
- Los datos de las APIs simuladas se cargan en ambos navegadores (el service worker funciona en ventana normal).
- Sin desbordes horizontales ni cortes de texto en las capturas.
- Diferencia solo cosmética: los selectores de Región y País usan el aspecto nativo de cada navegador (en Safari con flechas arriba/abajo, en Firefox con una flecha hacia abajo).
- Las capturas no cubren Vuelos, Hoteles, sus filtros ni la página no encontrada en estos dos navegadores; esos flujos están verificados en Chromium y WebKit (ver arriba). Pendiente completarlos en Firefox y Safari si se quiere cobertura total.

## Sitio publicado

Verificado el 18 de noviembre de 2026 en https://gustavoduocuc.github.io/viajes-gustavo-dominguez-pfy2202 (Chromium 153, 1280×900): menú con Inicio, Destinos y Mi viaje; 8 destinos (REST mock); elección de vuelo y hotel (GraphQL mock) con total 1085 US$ y persistencia tras refrescar; `/destinos/error-500` desactivado; sin peticiones a terceros. Las rutas profundas responden 404 de GitHub Pages pero la aplicación se muestra por el fallback. Capturas: [destinos](screenshots/publicado-destinos.jpg) y [Mi viaje](screenshots/publicado-mi-viaje.jpg).

## Checklist manual (Safari y Firefox)

Abrir el sitio publicado, o `npm start` con `PUBLIC_URL=/`, en Safari 27 (Mac) y Firefox. Repetir en Safari de iPhone si es posible.

1. Inicio: carga el título «Agencia de viajes» y 3 destinos destacados.
2. Destinos: se ven 8; el filtro por texto reduce la lista; un texto sin coincidencias muestra el mensaje amable.
3. Detalle de Cusco: descripción, actividades y resumen de ofertas (3 vuelos, 3 hoteles).
4. Vuelos: fechas como «10 mar 2027»; el filtro «Salida desde» (selector de fecha nativo) funciona; JetSMART aparece «Agotado» y su botón está deshabilitado.
5. Elegir vuelo LATAM: aparece «Elegido». En Hoteles, elegir Casa Andina Koricancha.
6. Mi viaje: 7 noches, vuelo 420 US$, hotel 665 US$, total 1085 US$; el menú muestra el contador 2.
7. Refrescar la página: el viaje sigue ahí. Navegar con teclado (Tab): foco visible en enlaces y botones.
8. Quitar hotel: el total parcial se actualiza y el foco pasa a la sección Hotel. «Vaciar viaje» muestra el estado vacío.
9. En Destinos elegir una oferta de Roma con otro destino en el viaje: aparece el aviso de reemplazo con «Cerrar aviso».
10. Abrir `/destinos/no-existe` y `/cualquier-cosa`: mensaje de no encontrado con enlace de vuelta.
11. Móvil: sin desplazamiento horizontal; barra inferior de secciones visible y sin tapar el contenido final.
12. Sitio publicado: abrir una ruta profunda directamente (por ejemplo `/mi-viaje`) y comprobar que carga la app.
13. Consola: sin errores salvo, a propósito, los de recursos 404/500 de las pruebas de error.
