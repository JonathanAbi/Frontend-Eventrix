import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("authToken");
    //mengambil token dari localStorage saat aplikasi dimuat untuk mempertahankan sesi login user meskipun halaman di-refresh atau browser ditutup.
    return token ? { token } : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem(
      "authToken",
      JSON.stringify({
        username: userData.username,
        email: userData.email,
        accessToken: userData.accessToken,
        refreshToke: userData.refreshToken,
      })
    );
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
