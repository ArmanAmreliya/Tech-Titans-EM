import { useState, useEffect } from "react";
import AuthService from "../api/authService";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    console.log("[useAuth] Checking authentication status...");
    try {
      const token = AuthService.getToken();
      console.log(
        "[useAuth] Token from storage:",
        token ? "exists" : "not found"
      );

      if (token) {
        // Decode JWT token to get user info (basic decoding without verification)
        try {
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );

          const tokenData = JSON.parse(jsonPayload);
          console.log("[useAuth] Decoded token data:", tokenData);

          setIsAuthenticated(true);
          setUser({
            id: tokenData.id,
            role: tokenData.role,
            token,
          });
          console.log(
            "[useAuth] User authenticated successfully with role:",
            tokenData.role
          );
        } catch (decodeError) {
          console.error("[useAuth] Token decode error:", decodeError);
          // Fallback to basic auth
          setIsAuthenticated(true);
          setUser({ token });
        }
      } else {
        console.log("[useAuth] No token found, user not authenticated");
      }
    } catch (error) {
      console.error("[useAuth] Auth check failed:", error);
      logout();
    } finally {
      setLoading(false);
      console.log("[useAuth] Auth check completed");
    }
  };

  const login = async (credentials) => {
    console.log("[useAuth] Attempting login with credentials:", {
      email: credentials.email,
      password: "***",
    });

    try {
      setLoading(true);
      const response = await AuthService.login(credentials);
      console.log("[useAuth] Login response received:", response);

      // Store complete user information including role
      setUser({
        ...response.user,
        token: response.token,
      });
      setIsAuthenticated(true);
      console.log(
        "[useAuth] User state updated after login, role:",
        response.user?.role
      );

      return response;
    } catch (error) {
      console.error("[useAuth] Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
      console.log("[useAuth] Login process completed");
    }
  };

  const register = async (userData) => {
    console.log("[useAuth] Attempting registration with data:", {
      ...userData,
      password: "***",
    });

    try {
      setLoading(true);
      const response = await AuthService.register(userData);
      console.log("[useAuth] Registration response received:", response);
      return response;
    } catch (error) {
      console.error("[useAuth] Registration failed:", error);
      throw error;
    } finally {
      setLoading(false);
      console.log("[useAuth] Registration process completed");
    }
  };

  const logout = () => {
    console.log("[useAuth] Logging out user...");
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
    console.log("[useAuth] User logged out successfully");
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
  };
};

export default useAuth;
