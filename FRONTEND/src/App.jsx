import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useContext, useState } from "react";

import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./pages/Home";
import Layout from "./Layout";
import AddPlayer from "./components/AddPlayer";
import PlayerList from "./components/PlayerList";
import BidPage from "./components/BidForm";

// ---------- AUTH CONTEXT SETUP ---------- //
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ---------- MAIN APP ROUTING ---------- //
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="auction" element={<AddPlayer />} />
            <Route path="players" element={<PlayerList />} />
            <Route path="/bid/:id" element={<BidPage />} />

          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
