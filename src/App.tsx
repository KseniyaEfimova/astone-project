import { Suspense } from 'react';
import Header from './Components/Header/Header.tsx';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './Authentication/Auth-context.tsx';
import Loader from './Components/Loader/Loader.tsx';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
