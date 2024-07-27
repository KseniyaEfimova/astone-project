import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Authentication/Auth-context.tsx';
import s from './header.module.css';
import logo from '../../assets/logo.png';

const Header = () => {
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth();

  const handleSignIn = () => navigate('/sign-in');
  const handleSignUp = () => navigate('/sign-up');
  const handleFavorites = () => navigate('/favorites');
  const handleHistory = () => navigate('/history');
  const handleLogout = () => {
    logout();
    if (!window.location.pathname.startsWith('/character/')) {
      navigate('/');
    }
  };

  return (
    <header className={s.header}>
      <Link to='/' className={s.logoContainer}>
        <img src={logo} alt='Star Wars Logo' className={s.logo} />
      </Link>

      <div className={s.authButtons}>
        {isAuthenticated ? (
          <>
            <button onClick={handleFavorites} className={s.authButton}>
              Favorites
            </button>

            <button onClick={handleHistory} className={s.authButton}>
              History
            </button>

            <button onClick={handleLogout} className={s.authButton}>
              LogOut
            </button>
          </>
        ) : (
          <>
            <button onClick={handleSignIn} className={s.authButton}>
              Sign In
            </button>
            <button onClick={handleSignUp} className={s.authButton}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
