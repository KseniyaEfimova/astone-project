import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './utils/Error-fallback/error-fallback.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
