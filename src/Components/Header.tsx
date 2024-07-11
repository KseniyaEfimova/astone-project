import styles from '../styles/header.module.css';
// import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img
          src='../assets/logo.png'
          alt='Star Wars Logo'
          className={styles.logo}
        />
      </div>
      <div className={styles.authButtons}>
        <button className={styles.authButton}>Sign In</button>
        <button className={styles.authButton}>Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
