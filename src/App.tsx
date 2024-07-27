import { Suspense } from 'react';
import Header from './Components/Header/Header.tsx';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './Authentication/Auth-context.tsx';
import Loader from './Components/Loader/Loader.tsx';
import './App.css';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './utils/Error-fallback/error-fallback.tsx';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <Header />
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
