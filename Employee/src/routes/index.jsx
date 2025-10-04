import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import ExpenseListPage from "../pages/ExpenseListPage";
import ExpenseFormPage from "../pages/ExpenseFormPage";
import Spinner from "../components/ui/Spinner";

// Role-based dashboard redirect component
const RoleBasedDashboard = () => {
  const { user } = useAuth();

  console.log("[RoleBasedDashboard] User role:", user?.role);

  // Redirect based on user role
  if (user?.role === "admin") {
    // For admin users, show admin-specific message and redirect
    console.log("[RoleBasedDashboard] Redirecting admin to admin dashboard");
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Welcome {user.name}! You have administrator access.
          </p>
          <div className="space-y-4">
            <a
              href="/admin"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Go to Admin Panel
            </a>
            <div className="text-sm text-gray-500">
              <p>Admin features:</p>
              <ul className="list-disc list-inside mt-2">
                <li>User Management</li>
                <li>Approval Rules</li>
                <li>All Expenses Overview</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (user?.role === "manager") {
    // For manager users, redirect to HomePage with manager context
    console.log("[RoleBasedDashboard] Redirecting manager to homepage");
    return <HomePage />;
  } else {
    // For employee users, redirect to HomePage
    console.log("[RoleBasedDashboard] Redirecting employee to homepage");
    return <HomePage />;
  }
};

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* Main Dashboard - Role-based routing */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <RoleBasedDashboard />
            </PrivateRoute>
          }
        />

        {/* Direct access to HomePage */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

        {/* Expense Management Routes - Protected */}
        <Route
          path="/expenses"
          element={
            <PrivateRoute>
              <ExpenseListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/expenses/new"
          element={
            <PrivateRoute>
              <ExpenseFormPage />
            </PrivateRoute>
          }
        />

        {/* Keep admin dashboard protected for now */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboardPage />
            </PrivateRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
