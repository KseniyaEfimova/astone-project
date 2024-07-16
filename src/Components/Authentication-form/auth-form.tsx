import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../Hooks/useLocaleStorage.ts';

interface AuthProps {
  mode: 'register' | 'login';
}

const AuthForm = ({ mode }: AuthProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [users, setUsers] = useLocalStorage<Record<string, string>>(
    'users',
    {}
  );
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === 'register') {
      if (users[email]) {
        alert('User already exists');
        return;
      }
      setUsers(prevUsers => ({ ...prevUsers, [email]: password }));
      navigate('/');
    } else if (mode === 'login') {
      if (users[email] === password) {
        navigate('/');
      } else {
        alert('Invalid email or password');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <label>Password:</label>
      <input
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button type='submit'>
        {mode === 'register' ? 'Sign Up' : 'Sign In'}
      </button>
    </form>
  );
};

export default AuthForm;
