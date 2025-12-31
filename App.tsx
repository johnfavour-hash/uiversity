import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import AccountsView from "./components/AccountsView";
// import StudentsView from "./components/StudentsView";
import StudentsPage from "./pages/StudentsPage";
import StaffView from "./components/StaffView";
import PaymentsView from "./components/PaymentsView";
import RolesPermissionsView from "./components/RolesPermissionsView";
import AnnouncementsView from "./components/AnnouncementsView";
import AccountsPage from "./pages/AccountPage";
import SettingsView from "./components/SettingsView";
import { UserSession } from "./types";
import DashboardHome from "./components/DashboardHome";

const SESSION_KEY = "u_university_session";

const App: React.FC = () => {
  const [session, setSession] = useState<UserSession>({
    username: "",
    isLoggedIn: false,
  });

  useEffect(() => {
    // Load persisted session if present
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as UserSession;
        if (parsed?.isLoggedIn) setSession(parsed);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleLogin = (username: string, remember = false) => {
    const s = { username, isLoggedIn: true } as UserSession;
    setSession(s);
    if (remember) localStorage.setItem(SESSION_KEY, JSON.stringify(s));
  };

  const handleLogout = () => {
    setSession({ username: "", isLoggedIn: false });
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        <Route
          path="/dashboard/*"
          element={
            session.isLoggedIn ? (
              <Dashboard username={session.username} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="admin" element={<AccountsPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="staff" element={<StaffView />} />
          <Route path="payments" element={<PaymentsView />} />
          <Route path="roles" element={<RolesPermissionsView />} />
          <Route path="announcements" element={<AnnouncementsView />} />
          <Route path="settings" element={<SettingsView />} />
        </Route>

        <Route
          path="/"
          element={
            <Navigate
              to={session.isLoggedIn ? "/dashboard" : "/login"}
              replace
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
