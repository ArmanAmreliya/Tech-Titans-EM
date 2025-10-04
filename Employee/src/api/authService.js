const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

class AuthService {
  static async login(credentials) {
    try {
      console.log("🔐 AuthService: Attempting login with credentials:", { 
        email: credentials.email, 
        password: "****" 
      });
      console.log("🌐 API URL:", `${API_BASE_URL}/auth/login`);
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      console.log("📡 Login response status:", response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("❌ Login failed:", errorData);
        throw new Error(errorData.error || "Login failed");
      }

      const data = await response.json();
      console.log("✅ Login successful:", { userId: data.user?.id, token: "****" });
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    } catch (error) {
      console.error("🚨 AuthService login error:", error);
      throw new Error(error.message || "Login failed");
    }
  }

  static async register(userData) {
    try {
      console.log("📝 AuthService: Attempting registration with data:", {
        ...userData,
        password: "****"
      });
      console.log("🌐 API URL:", `${API_BASE_URL}/auth/signup`);
      
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log("📡 Registration response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("❌ Registration failed:", errorData);
        throw new Error(errorData.error || "Registration failed");
      }

      const data = await response.json();
      console.log("✅ Registration successful:", { userId: data.user?.id });
      return data;
    } catch (error) {
      console.error("🚨 AuthService registration error:", error);
      throw new Error(error.message || "Registration failed");
    }
  }

  static logout() {
    console.log("🚪 AuthService: Logging out user");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("✅ User logged out successfully");
  }

  static getToken() {
    const token = localStorage.getItem("token");
    console.log("🔑 AuthService: Getting token:", token ? "****" : "null");
    return token;
  }

  static getUser() {
    try {
      const userData = localStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;
      console.log("👤 AuthService: Getting user:", user ? { id: user.id, email: user.email } : "null");
      return user;
    } catch (error) {
      console.error("🚨 AuthService: Error parsing user data:", error);
      return null;
    }
  }

  static isAuthenticated() {
    const isAuth = !!this.getToken();
    console.log("🔍 AuthService: Checking authentication:", isAuth);
    return isAuth;
  }
}

export default AuthService;
