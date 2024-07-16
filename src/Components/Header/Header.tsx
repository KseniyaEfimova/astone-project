import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import logo from '../../assets/logo.png';
import { useAuth } from '../../Authentication/AuthContext.tsx';

const Header = () => {
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth();

  const handleSignIn = () => navigate('/sign-in');
  const handleSignUp = () => navigate('/sign-up');
  const handleFavorites = () => navigate('/favorites');
  const handleHistory = () => navigate('/history');
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <Link to='/' className={styles.logoContainer}>
        <img src={logo} alt='Star Wars Logo' className={styles.logo} />
      </Link>

      <div className={styles.authButtons}>
        {isAuthenticated ? (
          <>
            <button onClick={handleFavorites} className={styles.authButton}>
              Favorites
            </button>

            <button onClick={handleHistory} className={styles.authButton}>
              History
            </button>

            <button onClick={handleLogout} className={styles.authButton}>
              LogOut
            </button>
          </>
        ) : (
          <>
            <button onClick={handleSignIn} className={styles.authButton}>
              Sign In
            </button>
            <button onClick={handleSignUp} className={styles.authButton}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
