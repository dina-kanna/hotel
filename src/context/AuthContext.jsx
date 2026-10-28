import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("stayscape_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    // Accept valid demo users or any mock user input
    const isGuest = email.toLowerCase() === "john@example.com" && password === "password123";
    const isAdmin = email.toLowerCase() === "admin@stayscape.com" && password === "admin123";
    
    // Allow any email/password length >= 4 for custom testing
    if (isGuest || isAdmin || (email.includes("@") && password.length >= 4)) {
      const userData = {
        email,
        name: isAdmin ? "Admin User" : "John Doe",
        role: isAdmin ? "admin" : "user",
      };
      setUser(userData);
      localStorage.setItem("stayscape_user", JSON.stringify(userData));
      return { success: true };
    }

    return { success: false, message: "Invalid email or password." };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("stayscape_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}