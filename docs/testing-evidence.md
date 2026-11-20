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
| Firefox escritorio | Firefox 155 (build de pruebas) y 160.0.1 instalado | 1440×900 | No ejecutado | **Pendiente: prueba manual** (ver abajo) |

Total: 85 pruebas pasan en 5 configuraciones.

**Sobre Safari:** se probó el motor WebKit 26.6, el mismo de Safari, pero no la aplicación Safari 27.2 instalada. Confirma con el checklist manual.

**Sobre Firefox:** en este entorno el navegador no llega a abrirse (el proceso termina con «Could not find profile folder», también con la instalación 160.0.1 y con un perfil propio; el entorno restringe la creación de procesos auxiliares). No es un fallo de la aplicación. La configuración de pruebas ya incluye el proyecto `firefox-desktop` para ejecutarlo en una máquina sin esa restricción.

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

Sitio: https://gustavoduocuc.github.io/viajes-gustavo-dominguez-pfy2202 · Recorrido: Inicio → Destinos (filtro) → detalle → Vuelos (filtro) → Hoteles (filtro) → elegir vuelo y hotel → Mi viaje → refrescar → página no encontrada. Usar una ventana normal (en la privada de Firefox los service workers están deshabilitados).

| Navegador | Versión | Viewport | Recorrido | Resultado | Correcciones | Capturas |
|---|---|---|---|---|---|---|
| Firefox escritorio | _pendiente_ | _pendiente_ | _pendiente_ | _pendiente_ | _pendiente_ | _pendiente_ |
| Firefox móvil (modo adaptable) | _pendiente_ | _pendiente_ | _pendiente_ | _pendiente_ | _pendiente_ | _pendiente_ |
| Safari escritorio | _pendiente_ | _pendiente_ | _pendiente_ | _pendiente_ | _pendiente_ | _pendiente_ |
| Safari móvil (modo adaptable) | _pendiente_ | _pendiente_ | _pendiente_ | _pendiente_ | _pendiente_ | _pendiente_ |
| Chrome o Edge | _pendiente_ | _pendiente_ | _pendiente_ | _pendiente_ | _pendiente_ | _pendiente_ |

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
