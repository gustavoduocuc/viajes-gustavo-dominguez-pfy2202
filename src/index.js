import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { appRouter } from './routing/routes';

// El mock se activa por defecto (también en producción); REACT_APP_USE_MOCKS=false lo desactiva.
async function enableMocking() {
  if (process.env.REACT_APP_USE_MOCKS === 'false') {
    return;
  }
  try {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      serviceWorker: { url: `${process.env.PUBLIC_URL}/mockServiceWorker.js` },
      onUnhandledRequest: 'bypass',
    });
  } catch (error) {
    console.error('No se pudo iniciar la API mock', error);
  }
}

function renderApp() {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <RouterProvider router={appRouter} />
    </React.StrictMode>
  );
}

enableMocking().then(renderApp);

reportWebVitals();
