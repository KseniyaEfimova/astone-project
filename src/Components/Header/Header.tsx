import { Link } from 'react-router-dom';
import styles from './header.module.css';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <header className={styles.header}>
      <Link to='/' className={styles.logoContainer}>
        <img src={logo} alt='Star Wars Logo' className={styles.logo} />
      </Link>

      <div className={styles.authButtons}>
        <button onClick={handleSignIn} className={styles.authButton}>
          Sign In
        </button>
        <button onClick={handleSignUp} className={styles.authButton}>
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Header;
