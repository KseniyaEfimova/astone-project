import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Authentication/Auth-context.tsx';
import useLocalStorage from '../../Authentication/use-locale-storage.ts';
import s from './auth-form.module.css';

export interface UserData {
  password: string;
  favorites: string[];
}

export interface AuthProps {
  mode: 'register' | 'login';
}

const AuthForm = ({ mode }: AuthProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [users, setUsers] = useLocalStorage<Record<string, UserData>>(
    'users',
    {}
  );
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === 'register') {
      if (users[email]) {
        alert('User already exists');
        return;
      }
      setUsers(prevUsers => ({
        ...prevUsers,
        [email]: { password, favorites: [], searchHistory: [] },
      }));
      const token = btoa(`${email}:${password}`);
      login(token);
      navigate('/');
    } else if (mode === 'login') {
      if (users[email]?.password === password) {
        const token = btoa(`${email}:${password}`);
        login(token);
        navigate('/');
      } else {
        alert('Invalid email or password');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={s['auth-form']}>
      <div className={s['input-group']}>
        <label className={s['auth-label']}>Email:</label>
        <input
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={s['auth-input']}
        />
      </div>
      <div className={s['input-group']}>
        <label className={s['auth-label']}>Password:</label>
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={s['auth-input']}
        />
      </div>
      <button type='submit' className={s['auth-button']}>
        {mode === 'register' ? 'Sign Up' : 'Sign In'}
      </button>
    </form>
  );
};

export default AuthForm;
