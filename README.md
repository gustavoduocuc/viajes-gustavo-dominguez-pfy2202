# Agencia de viajes

Aplicación web de una agencia de viajes para la asignatura PFY2202 (Desarrollo Frontend II).
Por ahora solo tiene la base del proyecto y una página de inicio provisoria; los dominios se irán agregando.

## Stack

- React y React Router
- Tailwind CSS
- API REST mock con MSW
- API GraphQL mock con MSW y Apollo Client

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

Los destinos se sirven desde una API REST mock (`GET /api/destinations` y `GET /api/destinations/:slug`).
En desarrollo (`npm start`) puedes provocar un error 500:

- Detalle: abre `/destinos/error-500`.
- Lista: en la consola del navegador ejecuta `localStorage.mockFail = 'destinations'` y recarga; para quitarlo, `localStorage.removeItem('mockFail')`.

En el sitio publicado estos mecanismos están desactivados: `/destinos/error-500` se trata como un destino inexistente.

## Publicación

https://gustavoduocuc.github.io/viajes-gustavo-dominguez-pfy2202
