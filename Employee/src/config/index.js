// Application configuration
const config = {
  apiUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  appName: "Tech Titans EM",
  version: "1.0.0",
  environment: import.meta.env.MODE || "development",

  // Feature flags
  features: {
    expenseManagement: true,
    userManagement: true,
    analytics: false,
  },

  // UI configuration
  ui: {
    theme: "light",
    itemsPerPage: 10,
    maxFileSize: 5 * 1024 * 1024, // 5MB
  },

  // API configuration
  api: {
    timeout: 10000, // 10 seconds
    retryAttempts: 3,
  },
};

export default config;
