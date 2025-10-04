/**
 * Format a date string to a readable format
 * @param {string|Date} date - The date to format
 * @param {string} locale - The locale to use for formatting (default: 'en-US')
 * @returns {string} - The formatted date string
 */
export const formatDate = (date, locale = "en-US") => {
  if (!date) return "";

  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return "Invalid Date";
  }

  return dateObj.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Format a date string to a readable date and time format
 * @param {string|Date} date - The date to format
 * @param {string} locale - The locale to use for formatting (default: 'en-US')
 * @returns {string} - The formatted date and time string
 */
export const formatDateTime = (date, locale = "en-US") => {
  if (!date) return "";

  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return "Invalid Date";
  }

  return dateObj.toLocaleString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Get relative time string (e.g., "2 hours ago", "3 days ago")
 * @param {string|Date} date - The date to compare
 * @returns {string} - The relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return "";

  const dateObj = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now - dateObj) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
};
