import {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';

import useLocalStorage from './use-locale-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  getCurrentUserEmail: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useLocalStorage<string | null>('authToken', null);

  const login = useCallback((newToken: string) => {
    setToken(newToken);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
  }, []);

  const getCurrentUserEmail = useCallback((): string | null => {
    if (!token) return null;
    return atob(token).split(':')[0];
  }, [token]);

  const value = useMemo(
    () => ({
      isAuthenticated: !!token,
      login,
      logout,
      getCurrentUserEmail,
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('use an AuthProvider');
  }
  return context;
};
