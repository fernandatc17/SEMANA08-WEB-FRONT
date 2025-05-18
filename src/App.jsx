import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation  } from "react-router-dom";
import Medicamentos from "./components/Medicamentos";
import Laboratorios from "./components/Laboratorios";
import Navigation from "./components/Navigation";
import Ordenes from "./components/Ordenes";
import Detalles from "./components/Detalles";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import ModPage from "./pages/ModeratorPage";
import UserPage from "./pages/UserPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthService from "./Services/AuthService";
import AppNavbar from "./components/Navbar";



// Wrapper para ocultar navbar en login/register
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <AppNavbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
<Layout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> 
          
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRoles={["ROLE_ADMIN"]}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mod"
            element={
              <ProtectedRoute requiredRoles={["ROLE_MODERATOR"]}>
                <ModPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute requiredRoles={["ROLE_USER", "ROLE_MODERATOR", "ROLE_ADMIN"]}>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medicamentos"
            element={
              <ProtectedRoute requiredRoles={["ROLE_ADMIN", "ROLE_MODERATOR"]}>
                <Medicamentos />
              </ProtectedRoute>
            }
          />

          <Route
            path="/laboratorios"
            element={
              <ProtectedRoute requiredRoles={["ROLE_ADMIN"]}>
                <Laboratorios />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ordenes"
            element={
              <ProtectedRoute requiredRoles={["ROLE_ADMIN", "ROLE_USER"]}>
                <Ordenes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/detalles"
            element={
              <ProtectedRoute requiredRoles={["ROLE_ADMIN", "ROLE_USER"]}>
                <Detalles />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
