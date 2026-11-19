# Agencia de viajes

Aplicación web de una agencia de viajes para la asignatura PFY2202 (Desarrollo Frontend II).
Permite explorar destinos y ver sus vuelos y hoteles, con datos de APIs mock.

## Stack

- React y React Router
- Tailwind CSS
- API REST mock con MSW (destinos)
- API GraphQL mock con MSW y Apollo Client (vuelos y hoteles)

## Cómo ejecutar

Requiere Node 22 (ver `.nvmrc`).

```bash
npm install
npm start                    # desarrollo en http://localhost:3000
npm test -- --watchAll=false # pruebas
npm run build                # compilación de producción en build/
```

La API mock está activa por defecto, también en producción. Para desactivarla al compilar,
define `REACT_APP_USE_MOCKS=false` (ver `.env.example`).

## API mock y errores simulados

Los destinos se sirven desde una API REST mock (`GET /api/destinations` y `GET /api/destinations/:slug`) y los vuelos y hoteles, desde una API GraphQL mock (`POST /graphql`, operaciones `GetFlights`, `GetHotels` y `GetDestinationOffers`) consumida con Apollo Client.
En desarrollo (`npm start`) puedes provocar un error 500:

- Detalle: abre `/destinos/error-500`.
- Lista: en la consola del navegador ejecuta `localStorage.mockFail = 'destinations'` y recarga; para quitarlo, `localStorage.removeItem('mockFail')`.

Para los vuelos y hoteles (GraphQL), en la consola del navegador ejecuta `localStorage.mockFail = 'graphql'` y recarga cualquier sección de un destino (por ejemplo `/destinos/cusco/vuelos`); la respuesta trae un error y la pantalla lo muestra. Quítalo con `localStorage.removeItem('mockFail')`. La clave `mockFail` admite un valor a la vez (`destinations` o `graphql`).

En el sitio publicado estos mecanismos están desactivados: `/destinos/error-500` se trata como un destino inexistente.

## REST vs GraphQL

| Aspecto | REST (destinos) | GraphQL (vuelos y hoteles) |
|---|---|---|
| Endpoint | `GET /api/destinations`, `GET /api/destinations/:slug` | `POST /graphql` (`GetFlights`, `GetHotels`, `GetDestinationOffers`) |
| Qué pide el cliente | La respuesta completa del recurso | Solo los campos que declara la consulta |
| Varias listas | Una petición por recurso | `destinationOffers` trae vuelos y hoteles en una sola |
| Filtros | Se resuelven en el cliente | Variables de la consulta (`date`, `onlyAvailable`) |
| Errores | Código HTTP (404, 500) y `{ message }` | HTTP 200 con `errors: [{ message }]` |
| Cliente | `fetch` y un hook con `useState` y `useEffect` | Apollo Client y `useQuery` (`loading`, `error`, `data`) |
| Caché | Ninguna | Caché en memoria por operación y variables |
| Mock | MSW `http.get` | MSW `graphql.query` |

## Publicación

https://gustavoduocuc.github.io/viajes-gustavo-dominguez-pfy2202
