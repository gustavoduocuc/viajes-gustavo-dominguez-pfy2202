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
| Chrome 158 | A mano, sitio publicado | ~495 px | Todo bien |
| Safari 27.2 | A mano, sitio publicado | 570 a 1350 px | Todo bien |
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

No encontré ninguna que hubiera que corregir. Fechas y precios se ven igual en Chrome y Safari («5 sept 2027», «1085 US$»), y los layouts se comportan igual. Lo único distinto es cosmético y viene de los controles nativos de cada navegador: los selectores de Región y País (en Safari con flechas arriba y abajo, en Firefox y Chrome con una flecha hacia abajo) y el campo de fecha de «Salida desde», que en Chrome se ve como `21-11-2026` y en Safari como `11/21/2026`.

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

Segunda tanda, con las pantallas que faltaban (resumen del destino, Vuelos con filtro, Hoteles, destino sin ofertas y destino que no existe):

| Navegador | Qué vi | Capturas |
|---|---|---|
| Chrome 158, vista móvil (~495 px) | Resumen de Cusco con sus actividades y precios «desde»; Vuelos con el filtro de fecha y 3 vuelos; Hoteles con el filtro «Solo disponibles» y el botón Elegir; Isla de Pascua con «Este destino aún no tiene vuelos»; destino inexistente con «Volver a Destinos» | [resumen](screenshots/chrome-movil-resumen-cusco.jpg), [vuelos](screenshots/chrome-movil-vuelos-filtro.jpg), [hoteles](screenshots/chrome-movil-hoteles-cusco.jpg), [sin ofertas](screenshots/chrome-movil-sin-ofertas.jpg), [no encontrado](screenshots/chrome-movil-no-encontrado.jpg) |
| Safari, vista móvil (~570 px) | Lo mismo en Cusco, más el Hostal Inti Wasi marcado como «Agotado» en Hoteles; con un viaje en curso el menú muestra el contador (1) | [resumen](screenshots/safari-movil-resumen-cusco.jpg), [vuelos](screenshots/safari-movil-vuelos-filtro.jpg), [hoteles](screenshots/safari-movil-hoteles-cusco.jpg), [sin ofertas](screenshots/safari-movil-sin-ofertas.jpg), [no encontrado](screenshots/safari-movil-no-encontrado.jpg) |
| Safari, escritorio (~1350 px) | Resumen de Buenos Aires con vuelos y hoteles en dos columnas; Vuelos con filtro y 3 vuelos en 3 columnas; Hoteles con el Hotel Palermo Soho ya «Elegido» y el Alvear Palace para elegir; sin ofertas; destino inexistente | [resumen](screenshots/safari-desktop-resumen-buenos-aires.jpg), [vuelos](screenshots/safari-desktop-vuelos-filtro.jpg), [hoteles](screenshots/safari-desktop-hoteles-buenos-aires.jpg), [sin ofertas](screenshots/safari-desktop-sin-ofertas.jpg), [no encontrado](screenshots/safari-desktop-no-encontrado.jpg) |

En estas capturas la fecha del filtro es de noviembre de 2026 y todos los vuelos salen en 2027, así que siguen apareciendo los 3; no se ve una lista que se reduzca. Ese comportamiento (el filtro actualiza los resultados) está comprobado en las pruebas automáticas.

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

