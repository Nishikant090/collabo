import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  token: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) {
      setToken(t);
      fetch('http://localhost:5000/api/auth/me', {
        headers: { Authorization: t }
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.user) setUser(data.user);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setLoading(true);
    fetch('http://localhost:5000/api/auth/me', {
      headers: { Authorization: newToken }
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.user) setUser(data.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
