# Pruebas en navegadores

Revisé la app en Chrome, Safari y Firefox, en escritorio y en móvil. Parte de las pruebas son automáticas (corren sobre el recorrido completo) y parte las hice a mano en el sitio publicado.

## Resumen

| Navegador | Cómo se probó | Ancho | Resultado |
|---|---|---|---|
| Chrome 153 (escritorio) | Automática | 1440 px | Todo bien |
| Safari (motor WebKit 26.6, escritorio) | Automática | 1440 px | Todo bien |
| Chrome en Pixel 7 | Automática | 412 px | Todo bien |
| Safari en iPhone 13 | Automática | 390 px | Todo bien |
| Tablet (iPad Mini) | Automática | 768 px | Todo bien |
| Safari 27.2 | A mano, sitio publicado | 570 a 1290 px | Todo bien |
| Firefox 160 | A mano, sitio publicado | 500 a 1390 px | Todo bien |

Las pruebas automáticas son 17 por configuración (85 en total) y pasan todas. Firefox no se pudo automatizar en mi equipo porque el navegador no arranca desde las pruebas (es un problema del entorno, no de la app), así que lo probé a mano.

## Qué se comprueba

- **Recorrido completo:** Inicio → Destinos → detalle de Cusco → Vuelos → Hoteles → elegir vuelo y hotel → Mi viaje, con 7 noches y un total de 1085 US$.
- **Viaje guardado:** sigue ahí al refrescar, y lo agotado no se puede elegir.
- **Cambio de destino:** si eliges algo de otro destino, el viaje se reemplaza y aparece el aviso (que se puede cerrar).
- **Pantallas vacías:** Mi viaje sin nada elegido, destino sin vuelos ni hoteles, filtros sin resultados y hoteles agotados.
- **Errores:** fallo al cargar la lista de destinos, el detalle o las ofertas, siempre con una salida (volver o reintentar).
- **No encontrado:** destino que no existe y direcciones desconocidas, con enlace para volver.
- **Sitio publicado:** abrir una ruta directa (por ejemplo `/mi-viaje`) carga la app, el servicio que simula las APIs se registra y no hay peticiones a terceros.

En las pruebas automáticas revisé también que ninguna pantalla tenga scroll horizontal.

## Diferencias entre navegadores

No encontré ninguna que hubiera que corregir. Fechas y precios se ven igual en Chrome y Safari («5 sept 2027», «1085 US$»), y los layouts se comportan igual. Lo único distinto es cosmético: los selectores de Región y País usan el aspecto nativo de cada navegador (en Safari con flechas arriba y abajo, en Firefox con una flecha hacia abajo).

## Prueba a mano en el sitio publicado

Hecha el 20 de noviembre de 2026 en https://gustavoduocuc.github.io/viajes-gustavo-dominguez-pfy2202, con ventanas normales (no privadas) y cambiando el ancho de la ventana para ver la versión móvil.

| Navegador | Qué vi | Capturas |
|---|---|---|
| Firefox, escritorio (~1390 px) | Los 8 destinos en 3 columnas y los filtros de Región y País | [destinos](screenshots/firefox-desktop-destinos.jpg) |
| Firefox, ventana estrecha (~990 px) | Destinos en 2 columnas | [destinos](screenshots/firefox-ventana-estrecha-destinos.jpg) |
| Firefox, vista móvil (~500 px) | Inicio, Destinos, detalle de Cusco y Mi viaje con un vuelo: total 420 US$ y el aviso «Falta elegir un hotel» | [inicio](screenshots/firefox-movil-home.jpg), [destinos](screenshots/firefox-movil-destinos.jpg), [detalle](screenshots/firefox-movil-detalle.jpg), [mi viaje](screenshots/firefox-movil-mi-viaje.jpg) |
| Safari, escritorio (~1290 px) | Destinos en 3 columnas con sus filtros | [destinos](screenshots/safari-desktop-destinos.jpg) |
| Safari, ventana estrecha (~970 px) | Destinos en 2 columnas | [destinos](screenshots/safari-ventana-estrecha-destinos.jpg) |
| Safari, vista móvil (~570 px) | Destinos, detalle de Buenos Aires y Mi viaje con un hotel: 7 noches × 70 US$ = 490 US$ y el aviso «Falta elegir un vuelo» | [destinos](screenshots/safari-movil-destinos.jpg), [detalle](screenshots/safari-movil-detalle.jpg), [mi viaje](screenshots/safari-movil-mi-viaje.jpg) |

En todas las capturas los datos cargan, el menú inferior se ve bien en móvil, el contador de Mi viaje marca 1 y no hay textos cortados ni desbordes.

## Capturas de las pruebas automáticas

Están en [screenshots](screenshots/) con el formato `<navegador>-<pantalla>.jpg`.

| Pantalla | Chrome escritorio | Safari escritorio | Chrome móvil | Safari móvil |
|---|---|---|---|---|
| Inicio | [ver](screenshots/chromium-desktop-home.jpg) | [ver](screenshots/webkit-desktop-home.jpg) | [ver](screenshots/mobile-chromium-home.jpg) | [ver](screenshots/mobile-webkit-home.jpg) |
| Destinos | [ver](screenshots/chromium-desktop-destinos.jpg) | [ver](screenshots/webkit-desktop-destinos.jpg) | [ver](screenshots/mobile-chromium-destinos.jpg) | [ver](screenshots/mobile-webkit-destinos.jpg) |
| Mi viaje | [ver](screenshots/chromium-desktop-mi-viaje.jpg) | [ver](screenshots/webkit-desktop-mi-viaje.jpg) | [ver](screenshots/mobile-chromium-mi-viaje.jpg) | [ver](screenshots/mobile-webkit-mi-viaje.jpg) |
| Detalle | [ver](screenshots/chromium-desktop-detalle.jpg) | | | |
| Vuelos con filtro | [ver](screenshots/chromium-desktop-vuelos-filtro.jpg) | | | |
| Hoteles | [ver](screenshots/chromium-desktop-hoteles.jpg) | | | |
| Sin ofertas | [ver](screenshots/chromium-desktop-vacio.jpg) | | | |
| No encontrado | [ver](screenshots/chromium-desktop-404-destino.jpg) | | | [ver](screenshots/mobile-webkit-404-destino.jpg) |
| Error | [ver](screenshots/chromium-desktop-error-500.jpg) | | | [ver](screenshots/mobile-webkit-error-500.jpg) |

Del sitio publicado también hay capturas: [destinos](screenshots/publicado-destinos.jpg) y [Mi viaje](screenshots/publicado-mi-viaje.jpg).

## Pendiente

- Repetir a mano en Firefox y Safari lo que falta: Vuelos, Hoteles con sus filtros y la página no encontrada.
- Una pasada rápida en Chrome o Edge.
- Probar en un iPhone o Android real.
