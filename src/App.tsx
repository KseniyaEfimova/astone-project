import './App.css';
import Header from './Components/Header/Header.tsx';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './Authentication/AuthContext.tsx';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Outlet />
    </AuthProvider>
  );
}

export default App;
